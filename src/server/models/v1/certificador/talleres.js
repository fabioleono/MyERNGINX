const db = require('../index')
const redisClient = require("../redis");
const modelWorkshop = {}

modelWorkshop.show = async (master, id, callback) => {
  let sql = ` SELECT * FROM gnv_t_taller  WHERE n_estado!='4' `;
  if (parseInt(master) !== 0) {
    sql += ` AND r_certificador=${db.escape(master)} `;
  }
  if (id) sql += ` AND k_taller=${db.escape(id)} `;
  console.log(sql);
  const result = await db.query(sql);
  const dataString = JSON.stringify(result);
  redisClient.setex("algo2", 3600, dataString, (err, data) => {
    //if(err) console.log('redis OUT ');// se podria manejar el error por desconexion de REDIS
  }); //almacena en Redis para Cache
  callback(result);
  
};

module.exports = modelWorkshop;
