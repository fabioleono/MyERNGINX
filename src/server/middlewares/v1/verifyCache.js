const redisClient = require('../../models/v1/redis')
const { promisify } = require("util");
const getAsync = promisify(redisClient.get).bind(redisClient);

const caching = async (req, res, next) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  // Si el ultimo caracter es un '/' lo elimino
  let path
  if (req.path.charAt(req.path.length - 1) === "/") {
    path = req.path.slice(0, -1);
  } else {
    path = req.path;
  }
  console.log("Verify Cache FAMILY ", req.familyId);
  console.log("Verify Cache PATH ", path);
  const family = req.familyId;
  const master = req.masterId;
  
  const keyRedis = `vC_${family}_${path}_${master}:`;
  if (redisClient.ready) {
    // Si el servicio de REDIS esta activo obtiene el valor de la key de la info en Cache
    const cachedData = await getAsync(keyRedis);
    if (cachedData) {
      console.log("DATA CACHED....");
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      console.log("DATA MYSQL....");
      next(); //continua a la consulta a MySql
    }
  } else {
    //El servicio de Redis esta OFF
    req.log.error(`ERROR REDIS verifyCache Middleware, ip:${ip}`);
    next(); // continua a la consulta a MySql
  }
  // try {
  //   const cachedData = await getAsync("algo2");
  //   if (cachedData != null) {
  //     console.log("DATA CACHED....");
  //     return res.status(200).json(JSON.parse(cachedData));
  //   } else {
  //     next();
  //   }
  // } catch (error) {
  //   req.log.error(`ERROR REDIS verifyCache Middleware: ${error}`);
  //   next();
  // }
};

module.exports = caching


// TEST de verificacion de contenido de Claves
  // try {
  //   redisClient.keys(['rL_Api*'], async (err, dataKeys) => {
  //     const keys = dataKeys;
  //     //console.log("keys ", keys);
  //     for (let index = 0; index < keys.length; index++) {
  //       const element = keys[index];
  //       //console.log("key ", element);
  //       const data = await getAsync(element)
  //       console.log('data ', element, ' : ', data);

  //     }
  //     next()
  //   });
  // } catch (error) {

  // }
