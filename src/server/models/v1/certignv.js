const db = require('./index')
const userProfile = {}

userProfile.list = (user, cb) => {
  let sql = `
            SELECT * from gnv_v_menu 
            `;
  if(user!=='') {
    sql += ` WHERE k_usuario=${db.escape(user)} `
  }
            
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
module.exports = userProfile