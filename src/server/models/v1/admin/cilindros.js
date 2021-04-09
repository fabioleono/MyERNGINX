const db = require('../index')
const cilsModel = {}

cilsModel.show = async (callback) => {
  
// Hacer una vista para los cilindros
  let sql = ` SELECT K_CIL_MARCA, D_MARCA FROM gnv_t_cil_marca   `;
  
  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}



module.exports = cilsModel
