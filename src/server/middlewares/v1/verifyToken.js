const jwt = require("jsonwebtoken");
const modelProfile = require("../../models/v1/profile");

const verifyToken = (req, res, next) => {
  console.log("IN TOKEN AUTHENTICATION ");
  // console.log("ENV ", process.env.NODE_ENV);
  //console.log("headers cert", req.headers);
  const token =
    req.body.access_token ||
    req.query.access_token ||
    req.headers["x-access-token"];
  // si el token llega por el body (formulario POST), por las query (sobre la ruta de la API) o sobre los Headers (WEB)

  // console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );

  if (!token)
    return res
      .status(403)
      .json({ sucess: false, status: "token is not exist" });

  jwt.verify(token, process.env.KEY_SECRET, (error, decoded) => {
    if (error)
      return res
        .status(401)
        .json({ sucess: false, status: "Token Authentication Failed" }); // Cuando la Fecha del token ha vencido
    //console.log('token ', decoded);

    // almaceno los datos decodificados en el objeto de la peticion para que los puedan procesar todas las rutas en sus request
    const { user, family, iat, exp } = decoded;
    req.userId = user;
    req.family = family;
    console.log(
      "userToken ",
      user,
      " family ",
      family,
      " iatToken ",
      iat,
      "expToken ",
      exp
    );

    // validacion de familia, Desde el browser se podria tipear otra familia. Ej /certificador/talleres por /administrador/talleres. Si la familia no esta incluida en la url retorna un error

    const url = req.originalUrl.toLowerCase();
    if (url.includes(family) === false)
      return res.status(403).json({
        sucess: false,
        status: "Token Authentication Credentials Failed",
      });

    // validacion que el usuario este activo en la BD
    modelProfile.verifyUser(user, (err, data) => {
      if (err)
        return res.status(500).json({
          success: false,
          status: "Error Database Authentication",
        });
      //console.log('tipo ', typeof(data));
      if (Object.entries(data).length === 0)
        return res.status(404).json({
          sucess: false,
          status: "No User found",
        }); // El usuario fue inactivado en la BD


      next(); // Token, Autorizacion y Session verificado NEXT
    });
  });
};

module.exports = verifyToken;
