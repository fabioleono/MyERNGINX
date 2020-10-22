//const userProfile = require('../../../models/v1/certificador/profile')
const ctrlTechnical = {};

ctrlTechnical.show = (req, res, next) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Obtener todos los Tecnicos de Tecnico de Taller");

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

ctrlTechnical.update = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Actualizar Tecnico de Taller ", req.params.id);
};

ctrlTechnical.insert = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," Body ",req.body  );
  res.send("Agregar Tecnico de Taller ", req.body);
};

ctrlTechnical.delete = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("eliminar Tecnico de Taller");
};




module.exports = ctrlTechnical
