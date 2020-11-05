const db = require('../index')
const modelWorkshop = {}

modelWorkshop.show = (master, id, cb) => {
  let sql = `
            SELECT * FROM gnv_t_taller  
            `;
  if (parseInt(master) !== 0) {
    sql += ` WHERE r_certificador=${db.escape(master)} `;
  }
  if(id) sql += ` AND k_taller=${db.escape(id)} `
  console.log(sql);
  
  db.query(sql, (err, result) => {
    
    
    if (err) {
      
      //throw err
      cb(err, { status: "ERROR QUERY", data: err });
    } else {
      //console.log("PASA POR ACA");
      cb(null, result);
    }
  });

};

//exports.default = userProfile
module.exports = modelWorkshop;
