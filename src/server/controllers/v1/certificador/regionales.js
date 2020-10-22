//const userProfile = require('../../../models/v1/certificador/profile')
const ctrlRegion ={}

ctrlRegion.show = (req, res, next) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Obtener todos los Regiones");

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

ctrlRegion.update = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Actualizar Region ", req.params.id);
};

ctrlRegion.insert = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," Body ",req.body  );
  res.send("Agregar Region ", req.body);
};

ctrlRegion.delete = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("eliminar Region");
};




module.exports = ctrlRegion
