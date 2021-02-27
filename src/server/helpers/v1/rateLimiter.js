const redisClient = require("../../models/v1/redis");
const { RateLimiterRedis } = require("rate-limiter-flexible");
const RateLimitError = require("../../error/v1/rateLimitError");
const dtoMail = require('../../dto/v1/mail/labelsMail')

// Para esta metrica se tuvo en cuenta que detras de un proxy (misma ip) podrian haber 20 usuarios (web, mobile, eds)
const attempts = {
  ByIpFt: 600, // Aplicable a Middleware ratelimitAPI
  ByIpMetric: 7000, // Aplicable a Middleware ratelimitAPI
  ByIpUserFt: 10, // Aplicable a Middleware ratelimitPROFILE (familias)
  ByIpUserLog: 10, // Aplicable a Modelo AUTH
  ByUserLog: 200, // Aplicable a Modelo AUTH
  ByIpLog: 10, // Aplicable a Modelo AUTH
  ByIpUserPas: 10, // Aplicable a Modelo PASSWORD
  ByUserPas: 200, // Aplicable a Modelo PASSWORD
  ByIpPas: 10, // Aplicable a Modelo PASSWORD
};
// API previene ataque rapido (ip) a la App
const limiterByIpFt = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rL_Api_IpFt",
  points: attempts.ByIpFt,
  duration: 60, // 1 minute
  blockDuration: 60 * 60 * 24 * 365, //Bloqueo indefinido de la ip, Despues de 600 solicitudes a la API en 1 minute
});
// API previene ataque rapido (ip) a la App, con la metrica por usuario/hora
const limiterByIpMetric = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rL_Api_IpMt",
  points: attempts.ByIpMetric,
  duration: 60 * 60, // 1 hour
  blockDuration: 60 * 60 * 24, // Bloqueo de 1 dia a la ip, Despues de 7000 solicitudes (350 por usuario) a la API en 1 hora (aprox 6 solicitudes por minuto por usuario)
});
// PROFILE (familias) previene ataque rapido (ip-User) a los perfiles de la App
const limiterByIpUserFt = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rL_Pro_IpUserFt",
  points: attempts.ByIpUserFt,
  duration: 10, // 10 seconds
  blockDuration: 60, // bloqueo de 1 minuto al usuario en la ip, Despues de 10 solicitudes a un PERFIL en 10 segundos 
});
// AUTH previene ataque lento (ip-user) al login de la App
const limiterByIpUserLog = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rL_Log_IpUser",
  points: attempts.ByIpUserLog,
  duration: 60 * 60 * 24, // 1 day
  blockDuration: 60 * 60 * 24, // Bloqueo de 1 dia al usuario en la ip, Despues de 10 intentos fallidos de LOGIN en 1 dia 
});
// AUTH previene ataque lento distribuido (user) al login de la App
const limiterByUserLog = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rL_Log_User",
  points: attempts.ByUserLog,
  duration: 60 * 60 * 24, // 1 day
  blockDuration: 60 * 60 * 24, // Bloqueo de 1 dia al usuario, despues de 20 intentos fallidos de LOGIN en 1 dia
});
// AUTH previene ataque lento (ip) al login de la App
const limiterByIpLog = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rL_Log_Ip",
  points: attempts.ByIpLog,
  duration: 60 * 60 * 24, // 1 day
  blockDuration: 60 * 60 * 24 * 365, //Bloqueo indefinido de la ip, despues de 200 intentos fallidos de LOGIN (10 por usuario) en 1 dia
});
// PASSWORD previene ataque lento (ip-user) al endpoint /api/login/password (recuperar contraseña)
const limiterByIpUserPas = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rL_Pas_IpUser",
  points: attempts.ByIpUserPas,
  duration: 60 * 60 * 24, // 1 day
  blockDuration: 60 * 60 * 24, // Bloqueo de 1 dia al usuario en la ip, Despues de 10 intentos fallidos de RECUPERAR CONTRASEÑA en 1 dia 
});
// PASSWORD previene ataque lento distribuido (user) al endpoint /api/login/password (recuperar contraseña)
const limiterByUserPas = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rL_Pas_User",
  points: attempts.ByUserPas,
  duration: 60 * 60 * 24, // 1 day
  blockDuration: 60 * 60 * 24, // Bloqueo de 1 dia al usuario, despues de 20 intentos fallidos de RECUPERAR CONTRASEÑA en 1 dia
});
// PASSWORD previene ataque lento (ip) al al endpoint /api/login/password (recuperar contraseña)
const limiterByIpPas = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rL_Pas_Ip",
  points: attempts.ByIpPas,
  duration: 60 * 60 * 24, // 1 day
  blockDuration: 60 * 60 * 24 * 365, //Bloqueo indefinido de la ip, despues de 200 intentos fallidos de RECUPERAR CONTRASEÑA (10 por usuario) en 1 dia
});


const consumeRateLimit = async (ip, user, userExist, prefix) => {
  let limByIpUser, limByUser, limByIp
  const dataReject = {
    name: "Rate Limit Error",
    status: 429,
  };
  (prefix==='Log') ? limByIpUser = limiterByIpUserLog : limByIpUser = limiterByIpUserPas;
  (prefix==='Log') ? limByUser = limiterByUserLog : limByUser = limiterByUserPas;
  (prefix==='Log') ? limByIp = limiterByIpLog : limByIp = limiterByIpPas;
  
  try {
    const [blockByIpUser, blockByUser, blockByIp] = await Promise.all([
      limByIpUser.get(`${ip}_${user}`),
      limByUser.get(user),
      limByIp.get(ip),
    ]);
    
    if (
      blockByIpUser !== null &&
      blockByIpUser.consumedPoints > attempts[`ByIpUser${prefix}`]
    ) {
      dataReject.message = `El Acceso para este Usuario ha sido bloqueado.`;
      throw new RateLimitError(dataReject).toJson();
    } else if (
      blockByUser !== null &&
      blockByUser.consumedPoints > attempts[`ByUser${prefix}`]
    ) {
      dataReject.message = `El Acceso para este Usuario ha sido bloqueado.`;
      throw new RateLimitError(dataReject).toJson();
    } else if (
      blockByIp !== null &&
      blockByIp.consumedPoints > attempts[`ByIp${prefix}`]
    ) {
      dataReject.message = `El Acceso para esta IP ha sido bloqueado.`;
      throw new RateLimitError(dataReject).toJson();
    } else {
      const limiterPromises = [];
      limiterPromises.push(limByIpUser.consume(`${ip}_${user}`));
      limiterPromises.push(limByUser.consume(user));
      limiterPromises.push(limByIp.consume(ip));

      if (limiterPromises.length > 0) {
          const resultPromises = await Promise.all(limiterPromises);

        if(resultPromises[1].remainingPoints===0 && userExist){
          //email a soporte por bloqueo de usuario, si el usuario existe
          const data = {
            type: "user",
            data: user,
            prefix,
            maxRequest: limByUser._points,
            duration: convertMS(limByUser._duration,'sg'),
            block: convertMS(limByUser._blockDuration,'sg'),
          };
          await dtoMail.labelMailBlock(data);
         // console.log("MailId alerta Bloqueo Usuario ", sendMail);
        }
        if (resultPromises[2].remainingPoints === 0) {
          //email a soporte por bloqueo de ip
          const data = {
            type: "ip",
            data: ip,
            prefix,
            points: limByIp._points,
            duration: convertMS(limByIp._duration,'sg'),
            block: convertMS(limByIp._blockDuration,'sg'),
          };
          await dtoMail.labelMailBlock(data);
          //console.log("MailId alerta Bloqueo Ip ", sendMail);
        }
      }
    }
  } catch (reject) {
    // El try-Catch capta el error y permite seguir la ejecucion de la logica en caso que se caiga el servicio de REDIS no bloquea los accesos a /login o  /login/password
    if (reject instanceof Error) {
      //console.log("error limiter ", Error(reject));
    } else {
      //console.log("reject limiter ", reject);
      if (dataReject.message === undefined)
      dataReject.message = `Demasiadas Solicitudes El Acceso Ha Sido Bloqueado.`;
      throw new RateLimitError(dataReject).toJson();
    }
    
  }

};

const deleteRateLimit = async (ip, user, prefix) => {
  // Cuando ingresa exitosamente elimina los intentos fallidos de login de la ip-User y User
  // Cuando recupera contraseña elimina los intentos fallidos de recuperacion de la ip-User y User
  let limByIpUser, limByUser
  (prefix==='Log') ? limByIpUser = limiterByIpUserLog : limByIpUser = limiterByIpUserPas;
  (prefix==='Log') ? limByUser = limiterByUserLog : limByUser = limiterByUserPas;
  try {
    const [blockByIpUser, blockByUser] = await Promise.all([
      limByIpUser.get(`${ip}_${user}`),
      limByUser.get(user),
    ]);
    if (
      (blockByIpUser !== null && blockByIpUser.consumedPoints > 0) ||
      (blockByUser !== null && blockByUser.consumedPoints > 0)
    ) {
      const limiterPromises = [];
      limiterPromises.push(limByIpUser.delete(`${ip}_${user}`));
      limiterPromises.push(limByUser.delete(user));

      if (limiterPromises.length > 0) {
        await Promise.all(limiterPromises);
      }
    }
  } catch (reject) { // El try-Catch capta el error y permite seguir la ejecucion de la logica en caso que se caiga el servicio de REDIS no bloquea los accesos a /login o  /login/password
    if (reject instanceof Error) {
      console.log("error deletelimiter ", Error(reject));
    } else {
      console.log("reject deletelimiter ", reject);
    }
  }
}

// Funcion de Conversion de Milisegundos o segundos  a Formato Dias Horas Minutos Segundos(type=ms, type=sg) 
const convertMS = (time,type) => {
  let day, hour, minute, seconds;
  if(type==='sg') seconds=time; else if(type==='ms')seconds = Math.floor(time / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  day = day === 0 ? "" : `${day} dias`;
  hour = hour === 0 ? "" : `${hour} horas`;
  minute = minute === 0 ? "" : `${minute} minutos`;
  seconds = seconds === 0 ? "" : `${seconds} segundos`;
  return `${day} ${hour} ${minute} ${seconds}`;
};
//console.log("tiempo ", convertMS(2592000, "sg"), convertMS(2592000, "ms"));


module.exports = {
  attempts,
  limiterByIpFt,
  limiterByIpMetric,
  limiterByIpUserFt,
  limiterByIpUserLog,
  limiterByUserLog,
  limiterByIpLog,
  limiterByIpUserPas,
  limiterByUserPas,
  limiterByIpPas,
  consumeRateLimit,
  deleteRateLimit,
  convertMS,
};
