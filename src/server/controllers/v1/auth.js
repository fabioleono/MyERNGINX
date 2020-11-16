const userModel = require("../../models/v1/auth");
const errorHelperDB = require('../../helpers/v1/errorhelperDB')
const ctrlAuth = {};


ctrlAuth.login = errorHelperDB(async (req, res) => {
  const { user, pass } = req.body;
  //console.log('REQUEST ', req);
  
  console.log('REQ RATE LIMIT ', req.rateLimit);


  
  //console.log(req.body);
  //console.log("IN FORM VALIDATION ");
  //if(req.body) throw new Error("Error generado");

  
  const ip = req.header("X-Forwarded-For") || req.ip;
  const userData = {
    k_usuario: user,
    d_password: pass,
    d_ip: ip,
  };
  console.log("userData ", userData);

  await userModel.login(userData, (data) => {
    
    res.status(200).json(data);
  });
});


ctrlAuth.logout = errorHelperDB(async(req, res) => {
  //console.log("SALIR SESSION ", req.params);

  const userOut = req.params.user;
  console.log('usuario salida ', userOut);

  await userModel.logout(userOut, (data) => {
    //console.log("datos salida ", data);
    res.status(200).json(data);
  });
});



// ctrlAuth.login = (req, res, next) => {
//   const { user, pass } = req.body;
//   //console.log(req.body);
//   console.log("IN FORM VALIDATION ");
//   //if(req.body) throw new Error("Error generado");

//   const ip = req.header("X-Forwarded-For") || req.ip;
//   const userData = {
//     k_usuario: user,
//     d_password: pass,
//     d_ip: ip,
//   };

//   console.log("userData ", userData);

//   userModel.login(userData, next, (err, data) => {

//     if (err) 
//       return res.status(500).json({
//         sucess: false,
//         status: "Error Server DB DB ",
//       });
//     res.status(200).json(data);
//   });
// };

ctrlAuth.update = (req, res, next) => {
  //  const token = req.headers['x-access-token']
  //   if(!token) {
  //     return res.status(401).json({auth: 'NOT AUTHORIZED'})
  //   }
  //   const decoded = jwt.verify(token, process.env.KEY_SECRET)
  //   console.log('token decoded ', decoded);

  //console.log("headers ", req.headers);

  const userUpdate = {
    // k_usuario = decoded.id, // el usuario lo toma del token decodificado
    k_usuario: req.params.user,
    d_nombre: "Paola Gomez",
    d_direccion: "Villaviciencio",
    d_telefono: "3142887855",
    d_mail: "paolitagomez2@hotmail.com",
    r_ciudad: 150001,
  };
  let model;
  //console.log('Usuario ', userData);
  // si al servidor llega una solicitud GET, es por que se estan pidiendo los datos del usuario, si es POST es por que se esta pidiendo actualizar los datos del usuario
  let userData;
  if (req.method === "GET") {
    model = userModel.list;
    userData = req.params.id;
  } else {
    model = userModel.update;
    userData = userUpdate;
  }

  model(userData, (err, data) => {
    if (!err) {
      console.log(data);
      console.log("tipo de dato", typeof data);
      res.status(200).json(data);
    } else {
      console.log("Mysql Error: ", err);

      res.status(500).json({
        success: false,
        message: "Error ",
        data: err,
      });
    }
  });
};

// Con el modelo PASSport
// ctrlAuth.register = passport.authenticate("login-local", {
//   successRedirect: "/Profile",
//   failureRedirect: "/Error",
//   passReqToCallback: true,
// });

ctrlAuth.prueba = (req, res, next) => {
  res.status(200).json({ message: "Ruta a Prueba" });
  // res.send("error en passport");
  console.log("ruta a Prueba ", req.url);
  console.log("headers Prueba ", req.headers);
  console.log("locales ", res.locals);
};

/* // sin modelo Passport
// ctrlAuth.register = (req, res, next) => {
//   // userData={
//   //   k_usuario: req.body.user,
//   //   d_nombre: req.body.name,
//   //   n_cedula: req.body.ced,
//   //   d_direccion: req.body.dir,
//   //   d_telefono: req.body.tel,
//   //   d_password: req.body.pass,
//   //   n_estado: 0,
//   //   n_maestro: req.body.master,
//   //   d_tipo_maestro: "gnv_t_certificador",
//   //   f_registro: '2020-08-11',
//   //   d_correo: req.body.mail,
//   //   f_password: '2020-08-11',
//   //   r_ciudad: 15001
  
//   // }
  
//    userModel.insert(userData, (err, data) => {
//     console.log(req.body);
//    // console.log('error', err);
//    //  console.log('data', data);
//    //console.log('key secret', process.env.KEY_SECRET);
   
  
//     if(!err){
     
//       res.status(200).json({
//         success: true,
//         message: "Consulta Procesada, falta Validar msg de Procedimiento ",
//         data: data,
//         token: token
//       }); 

//     }else {
//       console.log('Mysql Error: ', err);
      
//       res.status(500).json({
//         success: false,
//         message: "Error ",
//         data: err,
//       });
//     }
//   })
  
// };
*/

ctrlAuth.delete = (req, res, next) => {
  const userData = {
    k_usuario: req.params.id,
  };
  //console.log('user ', userData);

  userModel.delete(userData, (err, data) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "User Delete Ok ",
        data: data,
      });
    } else {
      //console.log("Mysql Error: ", err);

      res.status(500).json({
        success: false,
        message: "Error ",
        data: err,
      });
    }
  });
  // res.json({
  //   path: req.path,
  //   route: "authentication",
  //   task: "Elimina el usuario",
  // });
};

module.exports = ctrlAuth;
