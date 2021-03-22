const { limiterByIpUserFt, convertMS } = require('../../helpers/v1/rateLimiter');

const rateLimiterProfile = async (req, res, next) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  const user = req.userId
  const ipUser = `${ip}_${user}`
  //console.log("MIDDLEWARE RATE LIMIT PROFILE ");
  try {
    await limiterByIpUserFt.consume(ipUser);
    next();
  }catch(reject){
  
    if(reject instanceof Error) {
      //console.error("error RateLimitProfile ", reject);
      req.log.error(`ERROR REDIS RateLimitProfile Middleware: ${Error(reject)}`);
      next()
    }else{
      console.log("reject rateLimiterProfile", reject);
      res.status(200).json({
        success: false,
        payload: `Demasiadas Solicitudes, espere ${convertMS(
          reject.msBeforeNext,'ms'
        )}`,
      });
    }
        
  }
  
}

module.exports = rateLimiterProfile
