const redis = require('redis')
const port_redis = process.env.PORT_REDIS || 6379

const redis_client = redis.createClient(port_redis)

redis_client.on("error", (error) => {
  console.log('Redis NOT CONNECTED ',  error);
  // si hay un error en el servidor de redis, cierra la conexion para permitir trabajar todas las consultas sobre Mysql (NO HAY CACHEO DE DATOS EN REDIS)
  redis_client.quit();
});

redis_client.on("connect", () => {
  console.log("Redis CONNECTED: ", redis_client.connected);
  
});

module.exports = redis_client

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
