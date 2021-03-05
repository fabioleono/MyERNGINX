const redisClient = require('../../models/v1/redis')
const { promisify } = require("util");

const getAsync = promisify(redisClient.get).bind(redisClient);
const caching = async (req, res, next) => {
  console.log("MIDDLEWARE CACHING query:", req.query, " params:", req.params);
  // console.log("MIDDLEWARE VALIDATE CACHE ");
  const master = req.query.master;
  const id = req.params.id;

  try {
    const cachedData = await getAsync("algo2");
    if (cachedData != null) {
      console.log("DATA CACHED....");
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      next();
    }
  } catch (error) {
    req.log.error(`ERROR REDIS varifyCache Middleware: ${error}`);
    next();
  }


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

  // -- Version Funcional
  // redisClient.get('algo2', (error, cachedData) => {
  //   if(error){
  //     req.log.error(`Error Redis Middleware Cache: ${error}`);
  //     next()
  //   } else{
  //     if (cachedData != null) {
  //       console.log("DATA CACHED....");
  //       return res.status(200).json(JSON.parse(cachedData));
  //     } else {
  //       next();
  //     }
  //   }

  // });
};

module.exports = caching
