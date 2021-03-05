

const captcha = async (req, res, next) => {
  //console.log('Captcha /login ', req.app.locals.captLogin );
  
  req.captLogin = req.app.locals.captLogin;
  
      next();
    
}
module.exports = captcha
