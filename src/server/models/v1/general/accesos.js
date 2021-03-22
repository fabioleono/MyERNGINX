const db = require('../index')
const accessModel = {}

accessModel.show = async (accessData, callback) => {
  
// Hacer una vista para los usuarios
  let sql = ` SELECT K_USUARIO, D_NOMBRE, D_CORREO, D_DIRECCION, D_TELEFONO FROM gnv_t_usuario  WHERE  n_estado!=8 `;
  if (parseInt(accessData.master) !== 0) {
    sql += ` AND n_maestro=${db.escape(accessData.master)} `;
  }
  if (accessData.userId) sql += ` AND k_usuario=${db.escape(accessData.userId)} `;


  console.log(sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}

accessModel.verifyUser = async (user, callback) => {
  let sql = `
            SELECT k_usuario AS user, d_session AS session  from gnv_t_usuario  WHERE k_usuario=${db.escape(user)} AND n_estado='0' `;
  //  console.log(sql);
  const result = await db.query(sql)
  //const data = JSON.parse(JSON.stringify(result)); // Quita el dataRowPacket que envia MySql
  callback(result)
};

module.exports = accessModel
