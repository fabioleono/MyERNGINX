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
      if (cachedData!=null){
        console.log("DATA CACHED....");
        return res.status(200).json(JSON.parse(cachedData));
      }else{
        next()
      }
    } catch (error) {
      req.log.error(`Error Redis Middleware Cache: ${error}`);
      next()
    }

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
