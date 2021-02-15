const db = require("./index");
const jwt = require("jsonwebtoken");
const FormError = require("../../error/v1/formValidatedError");
const userModel = {};

userModel.login = async (userData, callback) => {
  const sql = `
            SET @user = ?;
            SET @password = ?;
            SET @ip = ?;
            CALL gnv2_p_user_login_validate(@user, @password, @ip, @error, @errMsg, @lastDate, @master, @family);
            SELECT @error AS error, @errMsg AS errMsg, @lastDate AS lastDate, @master AS master, @family AS family; 
            `;
    //console.log('query ', sql);
    const data = {
      user: userData.k_usuario,
      ip: userData.d_ip,
    };
    
      const result = await db.query(sql, [
        userData.k_usuario,
        userData.d_password,
        userData.d_ip,
      ]);
      result.flat().forEach(e=>{
        if(e.error!==undefined){
          data.process = e.error
          data.message = e.errMsg
          data.lastDate = e.lastDate
          data.master = e.master
          data.family = e.family
        }
      })
      if (data.process !== 0) {
        //console.log('ERRORES DE VALIDACION DB');
        throw new FormError(data).toJson();
       
      } else {
        //console.log("DATA VALIDACION ", data);
        // GENERACION DE TOKEN
        // creo el json webtoken
        const token = jwt.sign(
          { user: data.user, family: data.family },
          process.env.KEY_SECRET,
          {
            //expiresIn: 60 * 24 * 24, //expiracion del token en sg, 1dia
            expiresIn: 60 * 60 * 1, //expiracion del token en sg, 1 hora
            //expiresIn: 60, //expiracion del token en sg, 1 minuto
          }
        );
        data.token = token;
        // ACTUALIZACION SESSION CON TOKEN
        const sqlupdt = `
        SET @user = ?;
        SET @token = ?;
        SET @ip = ?;
        CALL gnv2_p_user_login_auth(@user, @token, @ip, @flag);
        SELECT @flag AS flag;
        `; // Traigo la bandera con el dato de CAMBIO DE CLAVE REQUERIDO

        const resultUpdt = await db.query(sqlupdt, [
          data.user,
          token,
          data.ip,
        ]);
        //console.log("result DBupdate ", resultUpdt);
        resultUpdt.flat().forEach((e) => {
          data.flag = e.flag;
        });
        console.log('DATA AUTORIZACION ', data);
        callback(data);
      }
};

userModel.logout = async (userOut, callback) => {
  const sql = `
            SET @user = ?;
            CALL gnv2_p_salir(@user);
            `;
  //console.log("query ", sql);
  const result = await db.query(sql,[userOut])
  //console.log('result ', result);
  callback(result)

};


// userModel.login = (userData, next, cb) => {
//   const sql = `
//             SET @user = ?;
//             SET @password = ?;
//             SET @ip = ?;
//             CALL gnv2_p_user_login_validate(@user, @password, @ip, @error, @errMsg, @lastDate, @master, @family);
//             SELECT @error AS error, @errMsg AS errMsg, @lastDate AS lastDate, @master AS master, @family AS family; 
//             `;
//   //console.log('query ', sql);
//   const data = {
//     user: userData.k_usuario,
//     ip: userData.d_ip,
//   };
  
//   db.query(
//     sql,
//     [
//       userData.k_usuario,
//       userData.d_password,
//       userData.d_ip,
//     ],
//     (err, result, fields) => {
//       if (err) {
//         //console.log("ERROR QUERY ", err);
//         cb(err, { status: "ERROR QUERY ", sucess: false });
       
//        //throw new Error('ERROR')
       
//       } else {
//         //console.log('result ', result);
//         result
//           .flat() // La query trae un arreglo anidado con el resultado de la validacion del procedimiento mysql, con el metodo flat se crea un nuevo arreglo sin anidar
//           .forEach((e) => {
//             //recorro el arreglo y completo la data de salida
//           if (e.error!==undefined) { // no tiene en cuenta los resultados OnPacket
//               data.process = e.error;
//               data.message = e.errMsg;//Para que tenga la misma designacion de las clases Error
//               data.lastDate = e.lastDate;
//               data.master = e.master;
//               data.family = e.family;
//             }
//           });
//           // console.log("DATA ", data);
//           if(data.process!==0){
//             //cb(null, data);
//             try {
//               throw new Error('Error en Validacion');
//             } catch (error) {
//                 next(new FormError(data).toJson())
//             }
//           }else{
//             //console.log("DATA VALIDACION ", data);
//             // GENERACION DE TOKEN
            
//             // creo el json webtoken
//             const token = jwt.sign({ user:data.user, family:data.family }, process.env.KEY_SECRET, {
//               //expiresIn: 60 * 24 * 24, //expiracion del token en sg
//               expiresIn: 60 * 60, //expiracion del token en sg
//             });
//             console.log('TOKEN ', token.length);
//             data.token = token;

//             // ACTUALIZACION SESSION CON TOKEN 
//             const sqlupdt = `
//             SET @user = ?;
//             SET @token = ?;
//             SET @ip = ?;
//             CALL gnv2_p_user_login_auth(@user, @token, @ip, @flag);
//             SELECT @flag AS flag; 
//             `; // Traigo la bandera con el dato de CAMBIO DE CLAVE REQUERIDO
//             db.query(sqlupdt,[data.user, token, data.d_ip], (errUpdt, resultUpdt, fields) => {
//               if (errUpdt){
//                // console.log("ERROR QUERYUPDATE ", errUpdt);
//                 cb(err, { status: "ERROR QUERYUPDATE ", sucess: false });
               
//               }else{
//                 // DATA RESPUESTA AUTENTICACION
//                 resultUpdt.flat().forEach((e) => {data.flag=e.flag})
//                 //console.log('DATA AUTORIZACION ', data);
//                 cb(null, data);
//               }
//             })
//           }
//       }
//     }
//   );
// };





userModel.list = (userData, cb) => {
  let sql = "SELECT k_usuario as user, d_nombre as name, n_cedula as id, d_direccion as address, d_telefono as tel, n_estado as state, f_registro as regdate, d_correo as mail, f_password as passdate, gnv_t_ciudad.d_ciudad as city FROM gnv_t_usuario LEFT JOIN gnv_t_ciudad ON gnv_t_ciudad.k_ciudad=gnv_t_usuario.r_ciudad ";
  if (userData !== "") sql += ` WHERE k_usuario=${db.escape(userData)} `;
  // console.log(sql);

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



// userModel.insert = (userPass, cb) => {
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

userModel.update = (userData, cb) => {
  /*
  const sql = `UPDATE gnv_t_usuario SET 
        d_nombre=${db.escape(userData.d_nombre)},
        d_direccion=${db.escape(userData.d_direccion)}
        WHERE 
        k_usuario=${db.escape(userData.k_usuario)}
        `
// Metodo db.escape para evitar inyeccion de SQL

*/
  // CON PROCEDIMIENTOS

  const sql = ` 
        SET @user = ?;
        SET @name = ?;
        SET @address = ?;
        SET @tel = ?;
        SET @mail = ?;
        SET @city = ?;
        CALL gnv_p_user_edit(@user, @name, @address, @tel, @mail, @city);
        `;

  db.query(
    sql,
    [
      userData.k_usuario,
      userData.d_nombre,
      userData.d_direccion,
      userData.d_telefono,
      userData.d_mail,
      userData.r_ciudad,
    ],
    (err, result, fields) => {
      if (err) {
        //throw err
        cb(err, { status: "ERROR QUERY", data: err });
      } else {
        cb(null, { status: "UPDATE OK", data: result, fields: fields });
      }
    }
  );
};

userModel.delete = (userData, cb) => {
  //LA VALIDACION DE LA EXISTENCIA DEL USUARIO LA VALIDARIA EL PROCEDIMIENTO MYSQL
  const sql = `DELETE FROM gnv_t_usuario WHERE k_usuario=${db.escape(
    userData.k_usuario
  )} `;
  console.log(sql);

  db.query(sql, (err, result) => {
    if (err) {
      cb(err, { status: "ERROR QUERY", data: err });
    } else {
      cb(null, { status: "DELETE OK", data: result });
    }
  });
};

module.exports = userModel;
