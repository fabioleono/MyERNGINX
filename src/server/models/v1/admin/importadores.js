const db = require('../index')
const importersModel = {}

importersModel.show = async (callback) => {
  
// Hacer una vista para los importadores
  let sql = ` SELECT K_IMPORTADOR, D_SIGLA, D_DIRECCION, D_TELEFONO FROM gnv_t_importador   `;
  
  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}



module.exports = importersModel
