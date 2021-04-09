const db = require('../index')
const modulesModel = {}

modulesModel.show = async (callback) => {
  
// Hacer una vista para los modulos
  let sql = ` SELECT K_MODULO, D_MODULO, D_DESCRIPCION FROM gnv_t_modulo  `;
  
  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}



module.exports = modulesModel
