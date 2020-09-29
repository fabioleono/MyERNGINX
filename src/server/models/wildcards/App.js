const db = require('../index')


const appModel = {};

appModel.list = (cb) => {
  let sql =
    "SELECT k_certificador as cert, d_sigla as sigla, d_telefono as tel, gnv_t_ciudad.d_ciudad as city FROM gnv_t_certificador LEFT JOIN gnv_t_ciudad ON gnv_t_ciudad.k_ciudad=gnv_t_certificador.r_ciudad ";
  
   //console.log(sql);

  db.query(sql, (err, result) => {
    if (err) {
      //throw err
      cb(err, { status: "ERROR QUERY ", data: err });
    } else {
      cb(null, result);
    }
  });

  //--- PENDIENTE  SOLUCION CON ASYNC AWAIT (manejar errores???)
  //  const result = await db.query(sql)
  //  console.log(result.err);

  //   if (result.err) {
  //     //throw err
  //     cb(result.err, { status: "ERROR QUERY ", data: result.err });
  //   } else {
  //     cb(null, { status: "LIST OK", data: result });
  //   }

  //  console.log('query', query);
  //  console.log(query.result);
  //----
};

module.exports = appModel
