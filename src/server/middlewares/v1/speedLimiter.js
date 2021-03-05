const slowDown = require("express-slow-down");

const speedLimiterLog = slowDown({
  windowMs: 10 * 60 * 1000, // 10 minutos
  delayAfter: 20, // Despues de las 20 primeras solicitudes desde la IP realizadas en 10 minutos
  delayMs: 500, // las siguientes solicitudes se retrasaran en una tasa de 500ms
  // solicitud # 4 es retrasado  500ms
  // solicitud # 5 es retrasado 1000ms...etc
  maxDelayMs: 7000, // retardo maximo 7sg
  skipSuccessfulRequests: true, // Cuando la respuesta es exitosa(status<400) no cuenta la solicitud
  // keyGenerator: (req /*, res*/) => {
  //   return req.body.user; // Valida las solicitudes por usuario, por defecto --> return req.ip;
  // },
  // skip: (req /*, res*/) => {
  // if (req.ip === "::1") { //Omite la validacion para una ip
  //   return true;
  // }
  // // if (req.body.user === "admin") { return true; } // O un usuario especifico
  // return false;
  // },
  onLimitReached: (req/*, res*/, options) =>{
    //console.log('options ', options);
    req.log.warn(`Disparador Limitador de Velocidad IP -> ip:${req.ip} endpoint:${req.path} user:${req.body.user}`);
  }
});

module.exports = speedLimiterLog
