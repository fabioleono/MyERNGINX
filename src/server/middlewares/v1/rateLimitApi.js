const { attempts, limiterByIp, limiterByIpFt, limiterByIpMetric, limiterByIpLog, limiterByIpPas, convertMS, limiterByIpUserLog, limiterByUserLog, limiterByIpUserPas, limiterByUserPas } = require('../../helpers/v1/rateLimiter')
const RateLimitError = require('../../error/v1/rateLimitError');
const dtoMail = require('../../dto/v1/mail/labelsMail')

const rateLimiterApi = async (req, res, next) => {
  //console.log('req', req);
  
  const ip = req.header("X-Forwarded-For") || req.ip;
  const user = req.body.user
  //console.log("req.query", req.query);// viene del captcha
  //console.log('MIDDLEWARE RATE LIMIT API ');
  const dataReject = {
    name: "Rate Limit Error",
    status: 429,
    message: `El Acceso ha sido bloqueado.`,
  };

  try {
      const [blockIpLog, blockIpPas, blockIpUserLog, blockIpUserPas, blockUserLog, blockUserPas] = await Promise.all([
      limiterByIpLog.get(ip), // Bloqueos por ip en /login
      limiterByIpPas.get(ip), // Bloqueos por ip en /login/password
      limiterByIpUserLog.get(`${ip}_${user}`),
      limiterByIpUserPas.get(`${ip}_${user}`),
      limiterByUserLog.get(user),
      limiterByUserPas.get(user), 
    ]);
        
    if (blockIpLog !== null && blockIpLog.consumedPoints > attempts.ByIpLog) {
      dataReject.message = `El acceso ha sido bloqueado 101 `
      next(new RateLimitError(dataReject).toJson());
     }else if(blockIpPas !== null && blockIpPas.consumedPoints > attempts.ByIpPas){ 
      dataReject.message = `El acceso ha sido bloqueado 102 `;
      next(new RateLimitError(dataReject).toJson());
     }else if (blockIpUserLog !== null && blockIpUserLog.consumedPoints > attempts.ByIpUserLog){
      dataReject.message = `El acceso ha sido bloqueado 103 `;
      next(new RateLimitError(dataReject).toJson());
    } else if (blockIpUserPas !== null && blockIpUserPas.consumedPoints > attempts.ByIpUserPas){
      dataReject.message = `El acceso ha sido bloqueado 104 `;
      next(new RateLimitError(dataReject).toJson());
    }else if (blockUserLog !== null && blockUserLog.consumedPoints > attempts.ByUserLog){
      dataReject.message = `El acceso ha sido bloqueado 105 `;
      next(new RateLimitError(dataReject).toJson());
    }else if (blockUserPas !== null && blockUserPas.consumedPoints > attempts.ByUserPas){
      dataReject.message = `El acceso ha sido bloqueado 106 `;
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
        //console.error("error RateLimitApi ", reject);
        req.log.error(`ERROR REDIS RateLimitApi Middleware: ${Error(reject)}`);
        next();
      } else {
        console.log("reject rateLimiterAPI", reject);
        // throw new RateLimitError(dataReject).toJson();
        next(new RateLimitError(dataReject).toJson());
      }
    
    }

}

module.exports = rateLimiterApi
