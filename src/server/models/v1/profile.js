const db = require('./index')
const modelProfile = {}

modelProfile.menu = async (user, callback) => {
  let sql = `SELECT K_MODULO AS modId, D_MODULO AS modulo, D_ROL AS rol, D_PATH_API AS path, N_MAESTRO AS master  from gnv_v_menu WHERE K_USUARIO=${db.escape(user)}`;
  //console.log(sql);
  const result = await db.query(sql)
  callback(result)
}

modelProfile.verifyUser = async (user, callback) => {
  let sql = `
            SELECT k_usuario AS user, d_session AS session  from gnv_t_usuario  WHERE k_usuario=${db.escape(user)} AND n_estado='0' `;
  //  console.log(sql);
  const result = await db.query(sql)
  //const data = JSON.parse(JSON.stringify(result)); // Quita el dataRowPacket que envia MySql
  callback(result)
};

module.exports = modelProfile
