const { attempts, limiterByIp, limiterByIpFt, limiterByIpMetric, limiterByIpLog, limiterByIpPas, convertMS } = require('../../helpers/v1/rateLimiter')
const RateLimitError = require('../../error/v1/rateLimitError');
const dtoMail = require('../../dto/v1/mail/labelsMail')

const rateLimiterApi = async (req, res, next) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  //console.log('MIDDLEWARE RATE LIMIT API ');
  
  const dataReject = {
    name: "Rate Limit Error",
    status: 429,
    message: `El Acceso ha sido bloqueado.`,
  };

  try {
    const [blockIpLog, blockIpPas] = await Promise.all([
      limiterByIpLog.get(ip), // Bloqueos por ip en /login
      limiterByIpPas.get(ip), // Bloqueos por ip en /login/password
    ]);
        
    if (
      (blockIpLog !== null && blockIpLog.consumedPoints > attempts.ByIpLog) ||
      (blockIpPas !== null && blockIpPas.consumedPoints > attempts.ByIpPas)
    ) {
      next(new RateLimitError(dataReject).toJson());
    } else {
      const limiterPromises = [];
      limiterPromises.push(limiterByIp.consume(ip)); // bloqueo en Memoria (inmemoryBlockOnConsumed) y redis, despues que la solicitud supera los puntos permitidos el metodo .consume() NO incrementa
      limiterPromises.push(limiterByIpFt.consume(ip)); // bloqueo en Redis, despues que la solicitud supera los puntos permitidos el metodo .consume() incrementa
      limiterPromises.push(limiterByIpMetric.consume(ip)); // bloqueo en Redis, despues que la solicitud supera los puntos permitidos el metodo .consume() incrementa

      if (limiterPromises.length > 0) {
        const resultPromises = await Promise.all(limiterPromises);
        const data = {
          type: "ip",
          data: ip,
        };
        let limiter;
        for (let i = 0; i < resultPromises.length; i++) {
          if (i === 0) limiter = limiterByIp;
          else if (i === 1) limiter = limiterByIpFt;
          else limiter = limiterByIpMetric;

          if (resultPromises[i].remainingPoints === 0) {
            // Ultima solicitud permitida, envia correo
            data.points = limiter._points;
            data.duration = convertMS(limiter._duration, "sg");
            data.block = convertMS(limiter._blockDuration, "sg");
            await dtoMail.labelMailBlock(data);
          }
        }
      }
      next();
    }  
  } catch (reject) {
      if (reject instanceof Error) {
        req.log.error(`ERROR REDIS RateLimitApi Middleware: ${Error(reject)}`);
        next();
      } else {
        // console.log("reject rateLimiterAPI", reject);
        // throw new RateLimitError(dataReject).toJson();
        next(new RateLimitError(dataReject).toJson());
      }
    
    }

}

module.exports = rateLimiterApi
