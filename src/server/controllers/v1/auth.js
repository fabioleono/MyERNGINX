const userModel = require("../../models/v1/auth");
const errorHelperCtrl = require('../../helpers/v1/errorhelperCtrl');
//const { delRateLimit } = require("./rateLimiter");
const ctrlAuth = {};
const FormError = require("../../error/v1/formValidatedError");
const svgCaptcha = require("svg-captcha");

ctrlAuth.login = errorHelperCtrl(async (req, res) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  const { user, pass, captcha } = req.body;
  const captLogin = req.captLogin;
  console.log('VALIDATE CAPTCHA ', captLogin, captcha, (captLogin===captcha));
  if (captLogin !== captcha){
    throw new FormError({
      process: 1,
      message: "CODIGO DE VERIFICACION INCORRECTO ",
    }).toJson();
  }
    const userData = {
      user,
      pass,
      ip,
    };
    
  await userModel.login(userData, (data) => {
    req.log.warn(`LogIn WEB-> usuario:${user} ip:${ip}`)
    res.status(200).json(data);
  });
});

ctrlAuth.captcha = (req, res) =>{
  const conf = {
    size: 6,
    ignoreChars: "0Oo1il", // filter out some characters like 0o1i
    noise: 3, // number of noise lines
    color: false, // characters will have distinct colors instead of grey, true if background option is set
    // background: "#fff", // background color of the svg image
    width: 230, // width of captcha
    height: 70, // height of captcha
    fontSize: 60, // captcha text size
    //charPreset: "string", // random character preset,
  };
  var captcha = svgCaptcha.create(conf);
  
  res.type("svg");
  //console.log("original--> ", captcha.text);
  req.app.locals.captLogin = captcha.text;
  res.status(200).send(captcha.data);
}

ctrlAuth.pass = errorHelperCtrl(async (req, res) => {
  //const slow = req.slowDown;
  //console.log('limitador velocidad newPass', slow)
  const { user, mail, captcha } = req.body;
  const ip = req.header("X-Forwarded-For") || req.ip;
  const captLogin = req.captLogin;
  console.log("VALIDATE CAPTCHA ", captLogin, captcha, captLogin === captcha);
  if (captLogin !== captcha) {
    throw new FormError({
      process: 1,
      message: "CODIGO DE VERIFICACION INCORRECTO ",
    }).toJson();
  }
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
      req.log.warn(`Recover Password WEB-> usuario:${user} ip:${ip} correo:${mail} idMail:${data.idMail}`);
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
