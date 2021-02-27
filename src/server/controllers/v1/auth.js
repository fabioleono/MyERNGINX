const userModel = require("../../models/v1/auth");
const errorHelperCtrl = require('../../helpers/v1/errorhelperCtrl');
//const { delRateLimit } = require("./rateLimiter");
const ctrlAuth = {};
const FormError = require("../../error/v1/formValidatedError");


ctrlAuth.login = errorHelperCtrl(async (req, res) => {
  const { user, pass } = req.body;
  const ip = req.header("X-Forwarded-For") || req.ip;
  const userData = {
    user,
    pass,
    ip,
  };
    
  await userModel.login(userData, (data) => {
    //delRateLimit(ip, user)
    req.log.warn(`LogIn WEB-> usuario:${user} ip:${ip}`)
    res.status(200).json(data);
  });
});

ctrlAuth.pass = errorHelperCtrl(async (req, res) => {
  const { user, mail } = req.body;
  const ip = req.header("X-Forwarded-For") || req.ip;
  const userData = {
    user,
    mail,
    ip,
  };
  
  await userModel.pass(userData, (data) => {
   // console.log('data response ', data);
    if (data.idMail instanceof Error) {
      req.log.error(`Error Servicio de Correo ->userModel.pass: ${Error(data.idMail)}`)
      throw new FormError({
        process: 1,
        message: "EN ESTE MOMENTO NO PODEMOS RECUPERAR LA CONTRASEÑA ",
      }).toJson();
    } else {
      req.log.warn(`Recover Password WEB-> usuario:${user} correo:${mail} ip:${ip} idMail:${data.idMail}`);
      res.status(200).json(data);
    }
    
  });
});

ctrlAuth.logout = errorHelperCtrl(async(req, res) => {
  //console.log("SALIR SESION ", req.params);
  const userOut = req.params.user;
  await userModel.logout(userOut, (data) => {
    req.log.warn(`LogOut WEB-> usuario:${userOut} `)
    res.status(200).json(data);
  });
});

module.exports = ctrlAuth;
