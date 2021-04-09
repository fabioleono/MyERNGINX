const slowDown = require("express-slow-down");
// Limitador de Velocidad para endpoints /login y /login/password, validando ip y usuario
const spLimLogIpUs = slowDown({
  windowMs: 10 * 60 * 1000, // 10 minutos
  delayAfter: 7, // Despues de las 7 primeras solicitudes desde la ip_usuario realizadas en 10 minutos
  delayMs: 500, // las siguientes solicitudes se retrasaran en una tasa de 500ms
  // solicitud # 4 es retrasado  500ms
  // solicitud # 5 es retrasado 1000ms...etc
  maxDelayMs: 10000, // retardo maximo 10sg
  skipSuccessfulRequests: true, // Cuando la respuesta es exitosa(status<400) no cuenta la solicitud
  keyGenerator: (req /*, res*/) => {
    // return req.ip;// Por defecto
    //return req.body.user; // Valida las solicitudes por usuario
    return `${req.body.ip}_${req.body.user}`; // Valida solcitudes por ip_usuario
  },
  // skip: (req /*, res*/) => {
  // if (req.ip === "::1") { //Omite la validacion para una ip
  //   return true;
  // }
  // // if (req.body.user === "admin") { return true; } // O un usuario especifico
  // return false;
  // },
  onLimitReached: (req/*, res*/, options) =>{
    //console.log('options ', options);
    req.log.warn(`Disparador Limitador de Velocidad LOGIN -> ip:${req.ip} endpoint:${req.path} user:${req.body.user}`);
  }
});

// Limitador de Velocidad para endpoints validadores de captcha /login y /login/password, validando ip 
const spLimCaptIp = slowDown({
  windowMs: 5 * 60 * 1000, // 5 minutos
  delayAfter: 30, // Despues de las 30 primeras solicitudes desde la IP realizadas en 5 minutos. Se tiene en cuenta que la ip se comparte en vpn y por login de validacion esta funcion se ejecuta minimo 2 veces por usuario si el login presenta errores
  delayMs: 500, // las siguientes solicitudes se retrasaran en una tasa de 500ms
  // solicitud # 4 es retrasado  500ms
  // solicitud # 5 es retrasado 1000ms...etc
  maxDelayMs: 7000, // retardo maximo 7sg
  skipSuccessfulRequests: false, // Cuando la respuesta es exitosa(status<400) no cuenta la solicitud
  // keyGenerator: (req /*, res*/) => {
  //   return req.ip; // Valida las solicitudes por ip, por defecto
  // },
  // skip: (req /*, res*/) => {
  // if (req.ip === "::1") { //Omite la validacion para una ip
  //   return true;
  // }
  // // if (req.body.user === "admin") { return true; } // O un usuario especifico
  // return false;
  // },
  onLimitReached: (req /*, res*/, options) => {
    //console.log('options ', options);
    req.log.warn(
      `Disparador Limitador de Velocidad CAPTCHA -> ip:${req.ip} endpoint:${req.path} user:${req.query.user}`
    );
  },
});

module.exports = { spLimLogIpUs, spLimCaptIp };
