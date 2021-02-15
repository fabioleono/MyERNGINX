const userModel = require("../../models/v1/auth");
const errorHelperCtrl = require('../../helpers/v1/errorhelperCtrl')
const ctrlAuth = {};

ctrlAuth.login = errorHelperCtrl(async (req, res) => {
  const { user, pass } = req.body;
  
  console.log('AUTH RRL ', req.rateLimit);
  const ip = req.header("X-Forwarded-For") || req.ip;
  const userData = {
    k_usuario: user,
    d_password: pass,
    d_ip: ip,
  };
  await userModel.login(userData, (data) => {
    //console.log('DATA ', data);
    req.log.warn(`LogIn WEB-> usuario:${user} ip:${ip}`)
    res.status(200).json(data);
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
