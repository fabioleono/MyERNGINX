const userModel = require("../../models/v1/auth");
const errorHelperCtrl = require('../../helpers/v1/errorhelperCtrl');
//const { delRateLimit } = require("./rateLimiter");
const ctrlAuth = {};
const FormError = require("../../error/v1/formValidatedError");
const svgCaptcha = require("svg-captcha");
const redisClient = require("../../models/v1/redis");
const { promisify } = require("util");
const getAsync = promisify(redisClient.get).bind(redisClient);


ctrlAuth.captcha = (req, res) => {
  const userInpt = req.query.userInpt
  const ip = req.header("X-Forwarded-For") || req.ip;
  const conf = {
    size: 1,
    ignoreChars: "0Oo1il", // filter out some characters like 0o1i
    noise: 3, // number of noise lines
    color: false, // characters will have distinct colors instead of grey, true if background option is set
    // background: "#fff", // background color of the svg image
    width: 200, // width of captcha
    height: 50, // height of captcha
    fontSize: 40, // captcha text size
    //charPreset: "string", // random character preset,
  };
  let captcha = svgCaptcha.create(conf);
  res.type("svg");
  //console.log("original--> ", captcha.text);
  let prefix
  // Cambia el prefijo REDIS si el endpoint viene de /login O /login/password
  req.path.includes("password") ? (prefix = "vH_Pas") : (prefix = "vH_Log");
  const dataKey = `${prefix}:${ip}_${userInpt}`;
  redisClient.setex(dataKey, 60, captcha.text, (err, data) => {
    if(err) req.log.error(`Error REDIS Generacion Captcha -> usuario:${userInpt} ip:${ip} error:${err}`);
  });
  res.status(200).send(captcha.data);
};

ctrlAuth.login = errorHelperCtrl(async (req, res) => {
  // console.log("Body ", req.body);
  const ip = req.header("X-Forwarded-For") || req.ip;
  const { user, pass, captcha } = req.body;
  //console.log('captcha Usuario', captcha);
  //console.log('REDIS ', redisClient.ready);
  const dataKey = `vH_Log:${ip}_${user}`;
  let captchaRedis;
  if (redisClient.ready) {
    // Si el servicio de REDIS esta activo obtiene el valor de la key asociada al captcha generado en ctrlAuth.captcha
    captchaRedis = await getAsync(dataKey);
  } else {
    //Si no, NO VALIDA CAPTCHA. No Para el flujo de la APP,
    captchaRedis = captcha;
  }
  //console.log("captcha", captchaRedis);
  const userData = {
    user: user.toLowerCase(),
    pass,
    ip,
    captchaRedis,
    captcha,
  };

  await userModel.login(userData, (data) => {
    req.log.warn(`LogIn WEB-> usuario:${user} ip:${ip}`);
    res.status(200).json(data);
  });
});



ctrlAuth.pass = errorHelperCtrl(async (req, res) => {
  //const slow = req.slowDown;
  //console.log('Body ', req.body);
  //console.log('limitador velocidad /login/password', slow)
  const { user, mail, captcha } = req.body;
  const ip = req.header("X-Forwarded-For") || req.ip;
  const dataKey = `vH_Pas:${ip}_${user}`;
  let captchaRedis;
  if (redisClient.ready) {
    captchaRedis = await getAsync(dataKey);
  } else {
    captchaRedis = captcha;
  }
  const userData = {
    user: user.toLowerCase(),
    mail: mail.toLowerCase(),
    ip,
    captchaRedis,
    captcha,
  };
  
  await userModel.pass(userData, (data) => {
   // console.log('data response ', data);
    if (data.payload.idMail instanceof Error) {
      req.log.error(`Error Servicio de Correo ->userModel.pass: ${Error(data.payload.idMail)}`)
      throw new FormError({
        process: 1,
        message: "EN ESTE MOMENTO NO PODEMOS RECUPERAR LA CONTRASEÑA ",
      }).toJson();
    } else {
      req.log.warn(`Recover Password WEB-> usuario:${user} ip:${ip} correo:${mail} idMail:${data.payload.idMail}`);
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
