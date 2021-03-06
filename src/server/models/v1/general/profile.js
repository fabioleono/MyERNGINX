const db = require('../index')
const profileModel = {}

profileModel.menu = async (user, callback) => {
  let sql = `SELECT K_MODULO AS modId, D_MODULO AS modulo, D_ROL AS rol, D_PATH_API AS path from gnv2_v_menu WHERE K_USUARIO=${db.escape(user)}`;
  // console.log('Solicita el Profile',sql);
  const result = await db.query(sql)
  const data = {
    success: true,
    payload: result
  }
  callback(data)
}

profileModel.verifyUser = async (user, callback) => {
  let sql = `
            SELECT k_usuario AS user, d_session AS session, n_accesos AS accesos from gnv_t_usuario  WHERE k_usuario=${db.escape(user)} AND n_estado='0' `;
    // console.log('Valida Usuario TOKEN',sql);
  const result = await db.query(sql)
  //const data = JSON.parse(JSON.stringify(result)); // Quita el dataRowPacket que envia MySql
  callback(result)
};

module.exports = profileModel
