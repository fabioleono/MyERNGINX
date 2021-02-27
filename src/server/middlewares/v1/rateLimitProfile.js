const { limiterByIpUserFt, attempts, convertMS } = require('../../helpers/v1/rateLimiter');

const rateLimiterProfile = async (req, res, next) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  const user = req.userId
  const ipUser = `${ip}_${user}`
  //console.log("MIDDLEWARE RATE LIMIT PROFILE ");

  try {
    const blockIpUserFast = await limiterByIpUserFt.get(ipUser)
    //console.log("block fast Distributed ", blockIpUserFast);
    if (
      blockIpUserFast !== null &&
      blockIpUserFast.consumedPoints > attempts.ByIpUserFt
    ) {
      res.status(200).json({
        status: "stand By",
        message: `Demasiadas Solicitudes, espere ${convertMS(
          blockIpUserFast.msBeforeNext,'ms'
        )}`,
      });
    } else {
        await limiterByIpUserFt.consume(ipUser);
        next();
    }

  }catch(reject){
  //console.log("reject ", reject);
    if(reject instanceof Error) {
      req.log.error(`ERROR REDIS Middleware Profile: ${Error(reject)}`);
      next()
    }else{
      res.status(200).json({
        status: "stand By",
        message: `Demasiadas Solicitudes, espere ${convertMS(
          reject.msBeforeNext,'ms'
        )}`,
      });
    }
        
  }
  
}

module.exports = rateLimiterProfile
