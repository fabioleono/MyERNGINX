const redis = require('redis')
const port = process.env.PORT_REDIS || 6379

//const redisClient = redis.createClient(port_redis)
const redisClient = redis.createClient({
  port,
  enable_offline_queue: false, // De manera predeterminada=TRUE. Si no hay conexion con redis los comandos se van agregando en cola y se ejecutan luego de la conexion. EN FALSE se desactivara y emitira un error o una funcion callback con el error. SI SE CAE EL SERVICIO DE REDIS (no hay cacheo de datos ni conteo  de solicitudes por ip y usuario ), SE PUEDE MANEJAR EL ERROR Y NO ME BLOQUEA EL FLUJO DE LA APP
});
redisClient.on("error", (error) => {
  console.log('Redis NOT CONNECTED ',  error);

});

redisClient.on("connect", () => {
  console.log("Redis CONNECTED: ", redisClient.connected);
  
});

module.exports = redisClient

// var redis = require("redis");
// const port_redis = process.env.PORT_REDIS || 6379;
// var Bluebird = require("bluebird");
// Bluebird.promisifyAll(redis.RedisClient.prototype);
// Bluebird.promisifyAll(redis.Multi.prototype);

// var redisClient = redis.createClient(port_redis);

// redisClient.on("connect", function () {
//   console.log("REdis connected");
// });

// module.exports = redisClient;
