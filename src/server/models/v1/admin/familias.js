const db = require('../index')
const familiesModel = {}

familiesModel.show = async (callback) => {
  
// Hacer una vista para las familias
  let sql = ` SELECT K_FAMILIA, D_FAMILIA, R_MODULO FROM gnv_t_familia  `;
  
  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}



module.exports = familiesModel
