const db = require('../index')
const gobermentsModel = {}

gobermentsModel.show = async (callback) => {
  
// Hacer una vista para los organismos de certificacion
  let sql = ` SELECT K_GOBIERNO, D_SIGLA, D_DIRECCION, D_TELEFONO FROM gnv_t_gobierno  `;
  
  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}



module.exports = gobermentsModel
