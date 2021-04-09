const jwt = require("jsonwebtoken");
const errorHelperToken = require('../../helpers/v1/errorhelperToken')
const TokenError = require("../../error/v1/tokenValidatedError");
const profileModel = require("../../models/v1/general/profile");

// Modelo Async Await
const verifyToken = errorHelperToken(async(req, res, next) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  const token =
    req.body.access_token ||
    req.query.access_token ||
    req.headers["x-access-token"];
    // console.log('TOKEN +', token);
    
  // si el token llega por el body (formulario POST), por las query (sobre la ruta de la API) o sobre los Headers (WEB)
  const prefVal = process.env.PRE_VALIDATOR;
  const decoded = await jwt.verify(token, process.env.KEY_SECRET);
  // const { user, faml, mast, iat, exp } = decoded;
  // console.log('USER ', user, ' FAMILIA ', faml, ' MAESTRO ', mast);
  // console.log('TOKEN Generado en ', new Date(iat*1000) , ' --  TOKEN Expira en ', new Date(exp*1000));
  const { user, faml, mast } = decoded;
  let explote = mast.split("-");
  const accesos = parseInt(explote[0]);
  const validador = explote[1];
  const master = parseInt(explote[2]);
  req.user = user; // Cargo en todos los request el Usuario
  req.familyId = faml; // Cargo en todos los request la Familia
  req.masterId = master; // Cargo en todos los request el maestro de la familia
  req.ipClient = ip; // cargo en todos los request la ip
  //VALIDACION FAMILIA. Desde el browser se podria tipear otra familia. Ej /certificador/talleres por /administrador/talleres ya que comparten los mismos controladores y su data de respuesta se filtra por el modelo
  const url = req.originalUrl.toLowerCase();
  if (!url.includes(faml)) {
    console.log('VERIFYTOKEN FAMILIA');
    
    const jwtErrorFamily = {
      name: "JsonWebTokenErrorFamily",
      status: 401,
      message: "Credentials must be provided",
    };
    throw new TokenError(jwtErrorFamily).toJson();
  }
  //VALIDACION GENERAL. si se desea que todos los usuarios salgan de sesiones activas, se cambia la variable de entorno PRE_VALIDATOR por otro numero de 3 digitos y se reinicia la App en nodejs
  if (prefVal !== validador) {
        console.log("VERIFYTOKEN VALIDADOR");

    const jwtErrorFamily = {
      name: "JsonWebTokenErrorFamily",
      status: 401,
      message: "Relaunch New Session",
    };
    throw new TokenError(jwtErrorFamily).toJson();
  }

  // VALIDACION QUE EL USUARIO ESTE ACTIVO EN LA BD , QUE EL TOKEN DE AUTORIZACION SEA EL MISMO GENERADO PARA EL USUARIO Y QUE TENGA ACCESOS VALIDOS.
  await profileModel.verifyUser(user, (data) => {
    if (data.length === 0) {
          console.log("VERIFYTOKEN USERACTIVATED");

      //  USER ACTIVE VALIDATOR
      const jwtErrorUser = {
        name: "JsonWebTokenErrorUser",
        status: 401,
        message: "User is not Activated ",
      };
      throw new TokenError(jwtErrorUser).toJson();
    } else if (token !== data[0].session) {
          console.log("VERIFYTOKEN TOKENDATABASE");

      // TOKEN DB VALIDATOR
      const jwtErrorUser = {
        name: "JsonWebTokenErrorUser",
        status: 401,
        message: "User has another session open",
      };
      throw new TokenError(jwtErrorUser).toJson();
    } else if (accesos !== data[0].accesos) {
          console.log("VERIFYTOKEN ACCESOS");

      //VALIDACION ACCESOS. El usuario en sesion activa pueden cambiarle los accesos. Ej: le quitaron el modulo Reportes o le quitaron roles a un modulo o un modulo se quito de la familia.
      const jwtErrorUser = {
        name: "JsonWebTokenErrorUser",
        status: 401,
        message: "User has another access profiles",
      };
      throw new TokenError(jwtErrorUser).toJson();
    }else {
      
      next(); // Token, Autorizacion y Session verificado NEXT
    }
  });
});
module.exports = verifyToken;

