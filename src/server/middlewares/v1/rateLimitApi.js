const { attempts, limiterByIpFt, limiterByIpMetric, limiterByIpLog, limiterByIpPas, convertMS } = require('../../helpers/v1/rateLimiter')
const RateLimitError = require('../../error/v1/rateLimitError');
const dtoMail = require('../../dto/v1/mail/labelsMail')

const rateLimiterApi = async (req, res, next) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
 // console.log('MIDDLEWARE RATE LIMIT API ' );
  const dataReject = {
    name: "Rate Limit Error",
    status: 429,
    message: `El Acceso para esta IP ha sido bloqueado.`,
  };

  try {
    const [blockIpFast, blockIpMetric, blockIpLog, blockIpPas] = await Promise.all([
    limiterByIpFt.get(ip),
    limiterByIpMetric.get(ip),
    limiterByIpLog.get(ip),// Bloqueos por ip en /login
    limiterByIpPas.get(ip),// Bloqueos por ip en /login/password
  ]);
  //console.log("block fast ", blockIpFast, " block Metric ", blockIpMetric);
    if (
      (blockIpFast !== null && blockIpFast.consumedPoints > attempts.ByIpFt) ||
      (blockIpMetric !== null && blockIpMetric.consumedPoints > attempts.ByIpMetric) ||
      (blockIpLog !== null && blockIpLog.consumedPoints > attempts.ByIpLog) ||
      (blockIpPas !== null && blockIpPas.consumedPoints > attempts.ByIpPas)
    ) {
      next(new RateLimitError(dataReject).toJson());
    } else {
      const limiterPromises = [];
      limiterPromises.push(limiterByIpFt.consume(ip));
      limiterPromises.push(limiterByIpMetric.consume(ip));
      if (limiterPromises.length > 0) {
        const resultPromises = await Promise.all(limiterPromises);
        const data = {
          type: "ip",
          data: ip,
        };
        if (resultPromises[0].remainingPoints === 0) {
          data.points= limiterByIpFt._points
          data.duration= convertMS(limiterByIpFt._duration, "sg")
          data.block= convertMS(limiterByIpFt._blockDuration, "sg")
          await dtoMail.labelMailBlock(data);
        }

        if (resultPromises[1].remainingPoints === 0) {
          data.points= limiterByIpMetric._points
          data.duration= convertMS(limiterByIpMetric._duration, "sg")
          data.block= convertMS(limiterByIpMetric._blockDuration, "sg")
          await dtoMail.labelMailBlock(data);
        }
      
      }
      next();
    }  
  } catch (reject) {
      if (reject instanceof Error) {
        req.log.error(`ERROR REDIS Middleware Api: ${Error(reject)}`);
        next();
      } else {
        //console.log("reject ", reject);
        // throw new RateLimitError(dataReject).toJson();
        next(new RateLimitError(dataReject).toJson());
      }
    
    }

}

module.exports = rateLimiterApi
