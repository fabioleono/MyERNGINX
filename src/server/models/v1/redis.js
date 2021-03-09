const redis = require('redis');
const port = process.env.PORT_REDIS || 6379

const redisClient = redis.createClient({
  port,
  enable_offline_queue: false, // De manera predeterminada=TRUE. Si no hay conexion con redis los comandos se van agregando en cola y se ejecutan luego de la conexion. EN FALSE se desactivara y emitira un error o una funcion callback con el error. SI SE CAE EL SERVICIO DE REDIS (no hay cacheo de datos ni conteo  de solicitudes por ip y usuario ), SE PUEDE MANEJAR EL ERROR Y NO ME BLOQUEA EL FLUJO DE LA APP
});

redisClient.on("error", async (error) => {
  const { labelRedisDisconnect } = require('../../dto/v1/mail/labelsMail');
  error.service = 'REDIS'
  //labelRedisDisconnect(error)
  //console.log("Redis NOT CONNECTED ", error);
  try {
    await labelRedisDisconnect(error);
  } catch (error) {

  }
  
});

redisClient.on("connect", () => {
  console.log("Redis CONNECTED: ", redisClient.connected);
  
});

module.exports = redisClient

