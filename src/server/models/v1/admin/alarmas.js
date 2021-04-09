const db = require('../index')
const alarmsModel = {}

alarmsModel.show = async (callback) => {
  
// Hacer una vista para los modulos
  let sql = ` SELECT K_ALARMAS, D_ALARMAS, D_CATEGORIA, D_OBSERVACION FROM gnv_t_alarmas  `;
  
  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}



module.exports = alarmsModel
