const db = require('./index')
const modelProfile = {}

modelProfile.menu = (user, cb) => {
  let sql = `
            SELECT K_MODULO AS modId, D_MODULO AS modulo, D_ROL AS rol, D_PATH_API AS path, N_MAESTRO AS master, D_TIPO_MAESTRO as family  from gnv_v_menu 
            `;
  if(user!=='') {
    sql += ` WHERE k_usuario=${db.escape(user)} `
  }
console.log(sql);
     
  db.query(sql, (err, result) => {
    if(err){
      //throw err
      cb(err, {status: 'ERROR QUERY', data:err})
    }else{
      cb(null, result)
    }
  })
}

//exports.default = userProfile
module.exports = modelProfile
