const db = require('../index')
const modelWorkshop = {}

modelWorkshop.show = async (master, id, callback) => {
  let sql = ` SELECT * FROM gnv_t_taller  WHERE n_estado!='4' `;
  if (parseInt(master) !== 0) {
    sql += ` AND r_certificador=${db.escape(master)} AND k_taller='177' `;
  }
  if(id) sql += ` AND k_taller=${db.escape(id)} `
  console.log(sql);
  const result = await db.query(sql)
  const data = Object.values(JSON.parse(JSON.stringify(result)));
  callback(data)
};

//exports.default = userProfile
module.exports = modelWorkshop;
