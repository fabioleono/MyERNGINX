const jwt = require("jsonwebtoken");
const errorHelperToken = require('../../helpers/v1/errorhelperToken')
const TokenError = require("../../error/v1/tokenValidatedError");
const modelProfile = require("../../models/v1/profile");

// Modelo Async Await
const verifyToken = errorHelperToken(async(req, res, next) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  //console.log("VERIFY TOKEN RRL: ", req.rateLimit, "  ip: ", ip);
  const token =
    req.body.access_token ||
    req.query.access_token ||
    req.headers["x-access-token"];
  // si el token llega por el body (formulario POST), por las query (sobre la ruta de la API) o sobre los Headers (WEB)
  const decoded = await jwt.verify(token, process.env.KEY_SECRET);
  //const { user, family } = decoded;
  const { user, family, iat, exp } = decoded;
  //console.log('TOKEN Generado en ', new Date(iat*1000) , ' --  TOKEN Expira en ', new Date(exp*1000));
  
  req.userId = user; // Cargo en todos los request el Usuario
  req.family = family; // Cargo en todos los request la Familia
  //Busco la familia en la solicitud.Desde el browser se podria tipear otra familia. Ej /certificador/talleres por /administrador/talleres
  const url = req.originalUrl.toLowerCase();
  if (url.includes(family) === false) {
    const jwtErrorFamily = {
      name: "JsonWebTokenErrorFamily",
      status: 401,
      message: "Credentials must be provided",
    };
    throw new TokenError(jwtErrorFamily).toJson();
  }
   // VALIDACION QUE EL USUARIO ESTE ACTIVO EN LA BD Y QUE EL TOKEN DE AUTORIZACION SEA EL MISMO GENERADO PARA EL USUARIO.
  await modelProfile.verifyUser(user, (data) => {
    if (data.length === 0) {
      const jwtErrorUser = {
        name: "JsonWebTokenErrorUser",
        status: 401,
        message: "User is not Activated ",
      };
      throw new TokenError(jwtErrorUser).toJson();
    } else if(token!==data[0].session){ 
      const jwtErrorUser = {
        name: "JsonWebTokenErrorUser",
        status: 401,
        message: "User has another session open",
      };
      throw new TokenError(jwtErrorUser).toJson();
     }else{
      next(); // Token, Autorizacion y Session verificado NEXT
    }
  });
});
module.exports = verifyToken;

// Modelo Funcional

// const verifyToken = (req, res, next) => {
//   console.log("IN TOKEN AUTHENTICATION ");
//   // console.log("ENV ", process.env.NODE_ENV);
//   const ip = req.header("X-Forwarded-For") || req.ip;
//   const token =
//     req.body.access_token ||
//     req.query.access_token ||
//     req.headers["x-access-token"];
//   // si el token llega por el body (formulario POST), por las query (sobre la ruta de la API) o sobre los Headers (WEB)
//   // console.log("VERIFY TOKEN REQ RATE LIMIT ", typeof(req.rateLimit.remaining), req.rateLimit.remaining, '/', req.rateLimit.limit, '  ' ,ip);

//   // console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
//   jwt.verify(token, process.env.KEY_SECRET, (error, decoded) => {
//     // console.log("Error token ", error);
//     if (error) throw new TokenError(error).toJson(); // Cuando No existe Token o cuando el token ha vencido
//     //console.log('token ', decoded);
//     // almaceno los datos decodificados en el objeto de la peticion para que los puedan procesar todas las rutas en sus request
//     const { user, family, iat, exp } = decoded;
//     req.userId = user;
//     req.family = family;
//     console.log(
//       "userToken ",
//       user,
//       " family ",
//       family,
//       " iatToken ",
//       iat,
//       "expToken ",
//       exp
//     );
//     // validacion de familia, Desde el browser se podria tipear otra familia. Ej /certificador/talleres por /administrador/talleres. Si la familia no esta incluida en la url retorna un error
//     const url = req.originalUrl.toLowerCase();
//     if (url.includes(family) === false) {
//       const errorFamily = {
  //       name: "JsonWebTokenErrorFamily",
//         status: 403,
//         message: "Credentials must be provided",
//       };
//       throw new TokenError(errorFamily).toJson();
//     }
//     //VALIDACION DE REQ RATE LIMIT
//     // if (req.rateLimit.remaining===1){
//     //   //console.log('ENTRA A MAIL RRL');
//     //   //console.log("FUNCION ", dtoMail.headerMail(user, family, ip));
//     //   const transporter = nodemailer.createTransport(dtoMail.objMail);
//     //   //envio el correo. Esto es un metodo asincrono
//     //     try {
//     //       const infoMailer = await transporter.sendMail(dtoMail.headerMail(user, family, ip));
//     //       console.log("Message send", infoMailer.messageId);
//     //     } catch (e) {
//     //       console.log("error Mail VerifyToken-RRL", e);
//     //     }
//     // }

//     // validacion que el usuario este activo en la BD
//     modelProfile.verifyUser(user, (err, data) => {
//       // const errorModel = {
//       //   status: 500,
//       //   message: "Credentials database",
//       // };
//       if (err)
//         return res.status(500).json({
//           success: false,
//           status: "Error Database Authentication",
//         });
//       //console.log('tipo ', typeof(data));
//       if (Object.entries(data).length === 0)
//         return res.status(404).json({
//           sucess: false,
//           status: "No User found",
//         }); // El usuario fue inactivado en la BD

//       next(); // Token, Autorizacion y Session verificado NEXT
//     });
//   });
// };

// module.exports = verifyToken;
