

const captcha = (req, res, next) => {
  //console.log("SOLICITUD Captcha LA APP ", req.app.locals.captchaPrivate);
  req.captchaPrivate = req.app.locals.captchaPrivate;
  next();
}
module.exports = captcha
