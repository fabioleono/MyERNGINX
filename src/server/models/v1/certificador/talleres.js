const db = require('../index')
const redisClient = require("../redis");
const modelWorkshop = {}

modelWorkshop.show = async (master, id, callback) => {
  let sql = ` SELECT * FROM gnv_t_taller  WHERE n_estado!='4' `;
  if (master !== 0) {
    sql += ` AND r_certificador=${db.escape(master)} `;
  }
  if (id) sql += ` AND k_taller=${db.escape(id)} `;
  console.log(sql);
  const result = await db.query(sql);
  const data = {
    success: true,
    payload: result,
  };
  const dataString = JSON.stringify(data);
  redisClient.setex("algo2", 3600, dataString, (err, data) => {
    // no se deja que el error lo maneje el helper, ya que se necesita que la App continue si hay una desconexion de REDIS y recoja la data de mysql
    //if(err) console.log('redis OUT ');
  }); //almacena en Redis para Cache
  
  callback(data);
  
};

module.exports = modelWorkshop;
