const redisClient = require('../../models/v1/redis')

const caching = (req, res, next) => {
  
  console.log('query', req.query);
      console.log("MIDDLEWARE VALIDATE CACHE ");
    // const master = req.query.master;
    // const id = req.params.id;
    
    redisClient.get('algo2', (error, cachedData) => {
      if(error) req.log.error(`Error Redis: ${error}`);
      if (cachedData != null) {
        console.log('CACHINGGGG');
        return res.status(200).json(JSON.parse(cachedData));

      } else {
        next();
      }
    });

};

module.exports = caching
