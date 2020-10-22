//const userProfile = require('../../../models/v1/certificador/profile')
const ctrlUserInfoPublic ={}

ctrlUserInfoPublic.show = (req, res, next) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Obtener  Usuarios Descarga Info publica");

  // userProfile.menu(user, (err, data) => {
  //   if (!err) {
  //     res.status(200).json(data);
  //     //console.log('tipo de dato', typeof(data))
  //     //console.log(data);
      
  //   } else {
  //     console.log("Mysql Error: ", err);

  //     res.status(500).json({
  //       success: false,
  //       message: "Error ",
  //       data: err,
  //     });
  //   }
  // });
};

ctrlUserInfoPublic.update = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Actualizar Usuarios Descarga Info publica", req.params.id);
};






module.exports = ctrlUserInfoPublic
