

const captcha = async (req, res, next) => {
  //console.log('Captcha /login ', req.app.locals.captLogin );
  
  req.captchaPrivate = req.app.locals.captchaPrivate;
  
  next();
    
}
module.exports = captcha
