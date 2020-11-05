const userModel = require('../../models/v1/authPublic')
const jwt = require('jsonwebtoken');
const ctrlAuthPublic = {}

ctrlAuthPublic.list = (req, res, next) => {
  //console.log('solicitud ', req);
  //console.log('respuesta ', res);
  
  
  let userData = ''
  if (req.params.consumer)  userData = req.params.consumer
  
  userModel.list(userData, (err, data) => {
    
    if (!err) {
      res.status(200).json(data);
      // console.log('tipo de dato', typeof(data))
    } else {
      console.log("Mysql Error: ", err);

      res.status(500).json({
        success: false,
        message: "Error ",
        data: err,
      });
    }  
    
  })
  
}


ctrlAuthPublic.login = (req, res, next) => {
  //console.log(req.body);
  const { consumer, code } = req.body;
  const ip = req.clientIp;
  const userData = {
    k_registro: consumer,
    d_password: code,
    d_ip: ip
  };
  //res.status(201).send({"response": "ok"})
  console.log("req.body ", userData);

  userModel.login(userData, (err, data) => {
    if (!err) {
        if (data.log === 0 || data.log === 1){
        // creo el json webtoken
        const token = jwt.sign({ id: consumer }, process.env.KEY_SECRET, {
          expiresIn: 60 * 24 * 24, //expiracion del token en sg
        });
        // asocio el token al header
        req.headers["x-access-token"] = token;
        // console.log('headers3 ', req.headers);
        data.token=token
      }
     res.status(200).json(data);

    } else {
      res.status(500).json({
        sucess: false,
        message: "Error ",
        data
      });
    }
  });
};






// Con el modelo PASSport
// ctrlAuthPublic.register = passport.authenticate("login-local", {
//   successRedirect: "/Profile",
//   failureRedirect: "/Error",
//   passReqToCallback: true,
// });


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



module.exports = ctrlAuthPublic
