const db = require('../index')
const modelWorkshop = {}

modelWorkshop.show = (master, cb) => {
  let sql = `
            SELECT * FROM gnv_t_taller  
            `;
  if (master !== 0) {
    sql += ` WHERE r_certificador=${db.escape(master)} `;
  }
  console.log(sql);

  db.query(sql, (err, result) => {
    if (err) {
      //throw err
      cb(err, { status: "ERROR QUERY", data: err });
    } else {
      cb(null, result);
    }
  });
};

//exports.default = userProfile
module.exports = modelWorkshop;
