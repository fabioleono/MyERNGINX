const db = require('./index')
const modelProfile = {}

modelProfile.menu = (user, cb) => {
  let sql = `
            SELECT K_MODULO AS modId, D_MODULO AS modulo, D_ROL AS rol, D_PATH_API AS path, N_MAESTRO AS master  from gnv_v_menu WHERE K_USUARIO=${db.escape(user)}`;
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

modelProfile.verifyUser = (user, cb) => {
  let sql = `
            SELECT k_usuario AS user, d_session AS session  from gnv_t_usuario  WHERE k_usuario=${db.escape(user)} AND n_estado='0' `;
 
  console.log(sql);

  db.query(sql, (err, result) => {
    if (err) {
      //throw err
      cb(err, { status: "ERROR QUERY", data: err });
    } else {
      //   console.log('dato BD ', result);
      //  if (Object.entries(result).length !== 0)  console.log("DATO CON USUARIO ", result);
       
      // const dtastr = JSON.stringify(result);
      // console.log("datStr ", dtastr);
      // const dtaparse = JSON.parse(dtastr);
      // console.log("datpar ", dtaparse);
      // const dataspre = { ...result }
      // console.log('dtspre ', dataspre);
            
      cb(null, result);
      //console.log('data model ', JSON.parse(JSON.stringify(result))
      
    }
  });
};

//exports.default = userProfile
module.exports = modelProfile
