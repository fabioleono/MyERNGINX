const db = require('../index')
const citiesModel = {}

citiesModel.show = async (callback) => {
  
// Hacer una vista para los roles
  let sql = ` SELECT K_CIUDAD, D_CIUDAD FROM gnv_t_ciudad   `;
  
  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}



module.exports = citiesModel
