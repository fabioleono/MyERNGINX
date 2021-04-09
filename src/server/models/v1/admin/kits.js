const db = require('../index')
const kitsModel = {}

kitsModel.show = async (callback) => {
  
// Hacer una vista para los reguladores
  let sql = ` SELECT K_KIT_MARCA, D_MARCA FROM gnv_t_kit_marca   `;
  
  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}



module.exports = kitsModel
