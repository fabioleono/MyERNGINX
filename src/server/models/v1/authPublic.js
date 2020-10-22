const db = require("./index");
//const helpers = require('../helpers/index')

const userModelPublic = {};

userModelPublic.list = (userData, cb) => {
  const sql = `SELECT k_registro as user, d_nombre_usuario as name, d_direccion as address, n_telefono as tel, n_estado as state, f_registro as regdate, d_correo as mail, f_password as passdate, gnv_t_ciudad.d_ciudad as city FROM gnv_t_registro LEFT JOIN gnv_t_ciudad ON gnv_t_ciudad.k_ciudad=gnv_t_registro.r_ciudad WHERE k_registro=${db.escape(userData)} `;
 
  console.log(sql);

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


  //  console.log('query', query);
  //  console.log(query.result);
  //----
};


userModelPublic.login = (userData, cb) => {
  
  const sql = `
            SET @user = ?;
            SET @password = ?;
            SET @address = ?;
            SET @id = ?;
            CALL gnv_p_public_login(@user, @password, @address, @id, @login, @name, @lastDate, @ip, @message);
            SELECT @login AS log, @name AS name, @lastDate AS lastDate, @ip AS ip, @message AS message; 
            `;
 // console.log('query ', sql);
  const data = {};
  data.consumer = userData.k_registro
  db.query(sql, [userData.k_registro, userData.d_password, userData.d_ip, userData.d_session], (err, result, fields) => {
   // console.log('result', result);
    if(err){
      cb(err, { status: "ERROR QUERY ", data: err })
    }else {
      result
        .flat() // La query trae un arreglo anidado con el resultado de la validacion del procedimiento mysql, con el metodo flat se crea un nuevo arreglo sin anidar
        .forEach((e) => { //recorro el arreglo y completo la data de salida
          data.log = e.log;
          data.name = e.name;
          data.lastDate = e.lastDate;
          data.ip = e.ip;
          data.message = e.message;
          
        });
      cb(null, data);
    }
  })
};



// userModelPublic.insert = (userPass, cb) => {
//   // CON PROCEDIMIENTOS
//   //const pass = await helpers.encrypt(userData.d_password);
//   //console.log('pass ', pass);
//   userData = {
//     k_usuario: userPass.user,
//     d_nombre: "pruebas Node Passport",
//     n_cedula: 1121833154,
//     d_password: userPass.pass,
//     n_maestro: 0,
//     d_tipo_maestro: "gnv_t_certificador",
//   };
  
//   const sql = ` 
//         SET @user = ?;
//         SET @name = ?;
//         SET @doc = ?;
//         SET @newpass = ?;
//         SET @master = ?;
//         SET @family = ?;
//         CALL gnv_p_user_create(@user, @name, @doc, @newpass, @master, @family, @errno, @error);
//         SELECT @errno AS codErno, @error AS Erno;
//         `;
//   db.query(
//     sql,
//     [
//       userData.k_usuario,
//       userData.d_nombre,
//       userData.n_cedula,
//       userData.d_password,
//       userData.n_maestro,
//       userData.d_tipo_maestro,
//     ],
//     (err, result) => {
//       let codErno;
//       let Erno;
//       /* metodo find, recibe un callback, este callback es ejecutado por cada uno de los elementos del arreglo. Si a la busqueda encuentra varios resultados de la condicion del callback, devuelve el primero. Este callback tiene tres parametros ('elem','index','array')
//     elem: valor del elemento que se recorre actualmente
//     index: indice del elemento que se recorre 
//     array: arreglo completo de donde es llamado el metodo
//   ESTOS TRES PARAMETROS TAMBIEN APLICAN PARA LOS METODOS -- foreach, map(crea nuevo arreglo), filter(crea nuevo arreglo) 
// */

//       // Busco en el result los valores de los parametros de salida del PROCEDIMIENTO de mysql
//       Array.from(result)
//         .flat()
//         .find((e) => {
//           if (e.codErno !== "") {
//             codErno = e.codErno;
//             Erno = e.Erno;
//           }
//         });
//       console.log("Variables ", codErno, " - ", Erno);

//       data = {
//         user: userData.k_usuario,
//         name: userData.d_nombre,
//         codErno,
//         Erno
//       }

//       if (err) {
//         //throw err
//         cb(err, { status: "ERROR DATABASE", data: err });
//       } else {
        
//           cb(null, data);
        
//       }
//     }
//   );
// };


module.exports = userModelPublic;
