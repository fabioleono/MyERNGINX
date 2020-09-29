const db = require("./index");
const helpers = require('../helpers/index')

const userModel = {};

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


userModel.login = (userData, cb) => {
  
  const sql = `
            SET @user = ?;
            SET @password = ?;
            SET @address = ?;
            SET @id = ?;
            CALL gnv_p_user_login(@user, @password, @address, @id, @login, @name, @lastDate, @ip, @message, @master, @type);
            SELECT @login AS log, @name AS name, @lastDate AS lastDate, @ip AS ip, @message AS message, @master AS master, @type AS type; 
            `;
  const userDataOut = {
          log : '',
          name : '',
          lastDate : '',
          ip : '',
          message : '',
          master : '',
          type : ''
  }          
  //console.log('query ', sql);
  
  db.query(sql, [userData.k_usuario, userData.d_password, userData.d_ip, userData.d_session], (err, result, fields) => {
    Array.from(result)
      .flat()
      .find((e) => {
        if (e.log !== "") {
          userDataOut.log = e.log
          userDataOut.name = e.name;
          userDataOut.lastDate = e.lastDate;
          userDataOut.ip = e.ip;
          userDataOut.message = e.message;
          userDataOut.master = e.master;
          userDataOut.type = e.type
        }
      });
    if(err){
      cb(err, { status: "ERROR QUERY ", data: err })
    }else {
      // falta validacion con las variables de salida del procedimiento
      cb(null, {status: "DATA LOGIN OK", data: userDataOut})
    }
  })
};



userModel.insert = (userPass, cb) => {
  // CON PROCEDIMIENTOS
  //const pass = await helpers.encrypt(userData.d_password);
  //console.log('pass ', pass);
  userData = {
    k_usuario: userPass.user,
    d_nombre: "pruebas Node Passport",
    n_cedula: 1121833154,
    d_password: userPass.pass,
    n_maestro: 0,
    d_tipo_maestro: "gnv_t_certificador",
  };
  
  const sql = ` 
        SET @user = ?;
        SET @name = ?;
        SET @doc = ?;
        SET @newpass = ?;
        SET @master = ?;
        SET @family = ?;
        CALL gnv_p_user_create(@user, @name, @doc, @newpass, @master, @family, @errno, @error);
        SELECT @errno AS codErno, @error AS Erno;
        `;
  db.query(
    sql,
    [
      userData.k_usuario,
      userData.d_nombre,
      userData.n_cedula,
      userData.d_password,
      userData.n_maestro,
      userData.d_tipo_maestro,
    ],
    (err, result) => {
      let codErno;
      let Erno;
      /* metodo find, recibe un callback, este callback es ejecutado por cada uno de los elementos del arreglo. Si a la busqueda encuentra varios resultados de la condicion del callback, devuelve el primero. Este callback tiene tres parametros ('elem','index','array')
    elem: valor del elemento que se recorre actualmente
    index: indice del elemento que se recorre 
    array: arreglo completo de donde es llamado el metodo
  ESTOS TRES PARAMETROS TAMBIEN APLICAN PARA LOS METODOS -- foreach, map(crea nuevo arreglo), filter(crea nuevo arreglo) 
*/

      // Busco en el result los valores de los parametros de salida del PROCEDIMIENTO de mysql
      Array.from(result)
        .flat()
        .find((e) => {
          if (e.codErno !== "") {
            codErno = e.codErno;
            Erno = e.Erno;
          }
        });
      console.log("Variables ", codErno, " - ", Erno);

      userDataOut = {
        user: userData.k_usuario,
        name: userData.d_nombre,
        codErno,
        Erno
      }

      if (err) {
        //throw err
        cb(err, { status: "ERROR DATABASE", data: err });
      } else {
        
          cb(null, userDataOut);
        
      }
    }
  );
};

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
