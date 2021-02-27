const db = require("./index");
const jwt = require("jsonwebtoken");
const FormError = require("../../error/v1/formValidatedError");
const userModel = {};
const crypt = require("../../helpers/v1/bcrypt");
const dtoMail = require("../../dto/v1/mail/labelsMail");
const { consumeRateLimit, deleteRateLimit } = require("../../helpers/v1/rateLimiter");

userModel.login = async (userData, callback) => {
  const sql = `
    SET @user = ?;
    SET @ip = ?;
    CALL gnv2_p_user_login_validate(@user, @ip, @error, @errMsg, @passproc, @lastDate, @master, @family, @userExist);
    SELECT @error AS error, @errMsg AS errMsg, @passproc AS passproc, @lastDate AS lastDate, @master AS master, @family AS family, @userExist AS userExist; 
    `;
    //console.log('query ', sql);
  const data = {
    user: userData.user,
    ip: userData.ip,
  };
  let password
  let userExist
  const result = await db.query(sql, [userData.user, userData.ip]);
  result.flat().forEach(e=>{
    if(e.error!==undefined){
      data.process = e.error
      data.message = e.errMsg
      userExist = e.userExist ? true : false
      if(e.error===0){
        password = e.passproc;
        data.lastDate = e.lastDate;
        data.master = e.master;
        data.family = e.family;
      }
    }
  })
  //console.log("DATA PROCEDURE ", data);
  if (data.process !== 0) {
    await consumeRateLimit(data.ip, data.user, userExist, 'Log'); //intentos fallidos desde /login 
    throw new FormError(data).toJson();
  } else {
    const validate = await crypt.desencrypt(userData.pass, password);
    //console.log('Validacion ', validate);
    if(!validate){
      await consumeRateLimit(data.ip, data.user, userExist, 'Log'); //intentos fallidos desde /login
      throw new FormError({
        process: 1,
        message: "ERROR DE USUARIO O CONTRASEÑA",
      }).toJson();
    }else{
      console.log("DATA VALIDACION ", data);
      // GENERACION DE TOKEN
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
      `; // Traigo la bandera con el dato de CAMBIO DE CLAVE REQUERIDO para detectar en FRONTEND

      const resultUpdt = await db.query(sqlupdt, [data.user, token, data.ip]);
      //console.log("result DBupdate ", resultUpdt);
      resultUpdt.flat().forEach((e) => {
        data.flag = e.flag;
      });
      console.log("DATA AUTORIZACION ", data);
      await deleteRateLimit(data.ip, data.user, 'Log') //Elimino los intentos fallidos desde /login
      callback(data);
    }
  }
};

userModel.pass = async (userData, callback) => {
  const sql = `
            SET @user = ?;
            SET @mail = ?;
            SET @password = ?;
            SET @ip = ?;
            CALL gnv2_p_new_pass(@user, @mail, @password, @ip, @error, @errMsg, @userExist);
            SELECT @error AS error, @errMsg AS errMsg, @userExist AS userExist;
            `;
  //console.log("query ", sql);
  const data = {
    user: userData.user,
    mail: userData.mail,
    ip: userData.ip,
  };
  const rndom = crypt.genRand(10);
  const password = await crypt.encrypt(rndom);
  let userExist
  const result = await db.query(sql, [
    userData.user,
    userData.mail,
    password,
    userData.ip,
  ]);
  result.flat().forEach((e) => {
    if (e.error !== undefined) {
      data.process = e.error;
      data.message = e.errMsg;
      userExist = e.userExist ? true : false;
    }
  });
  //console.log("data process", data, rndom);
  if (data.process !== 0) {
    await consumeRateLimit(data.ip, data.user, userExist, "Pas"); // intentos fallidos /login/password
    throw new FormError(data).toJson();
  } else {
    //envio correo
    const sendMail = await dtoMail.labelMailNewPass(userData.user, userData.mail, userData.ip, rndom);
    //const sendMail = "";
    data.idMail = sendMail;
    await deleteRateLimit(data.ip, data.user, "Pas"); //Elimino los intentos fallidos a /login/password
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
