const db = require('../index')
const modelScripts = {}

modelScripts.run = async (dataScript, callback) => {
  
  let sql = `select k_usuario FROM gnv_t_usuario `
  const result = await db.query(sql);
  let updSql
  let update
  const output = {}
  result.map(async(e, ind) => {
    output[`usuario-${ind}`] = e.k_usuario;
    updSql = `UPDATE gnv_t_usuario set n_accesos=(select count(DISTINCT(R_MODULO)) AS accesos from gnv_t_acceso where r_usuario=${db.escape(e.k_usuario)}) WHERE k_usuario=${db.escape(e.k_usuario)} `;
    update = await db.query(updSql);
    // output[`update-${ind}`] = update.message; // NO SIRVE POR, asincronia??
    // console.log('Update ', update.message);
   
  })
  const data = {
    description: dataScript.description,
    success: true,
    payload: output,
  };
  callback(data);
  
};

module.exports = modelScripts;
