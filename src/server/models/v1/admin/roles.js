const db = require('../index')
const rolsModel = {}

rolsModel.show = async (callback) => {
  
// Hacer una vista para los roles
  let sql = ` SELECT K_ROL, D_ROL, D_PATH_API FROM gnv_t_rol   `;
  
  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}



module.exports = rolsModel
