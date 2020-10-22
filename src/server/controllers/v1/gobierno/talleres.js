//const userProfile = require('../../../models/v1/certificador/profile')
const ctrlWorkshop ={}

ctrlWorkshop.show = (req, res, next) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Obtener  Talleres GNV,Gobierno");

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

ctrlWorkshop.update = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Actualizar Taller GNV,Gobierno", req.params.id);
};

ctrlWorkshop.insert = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," Body ",req.body  );
  res.send("Agregar Taller GNV,Gobierno", req.body);
};

ctrlWorkshop.delete = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("eliminar Taller GNV,Gobierno");
};




module.exports = ctrlWorkshop
