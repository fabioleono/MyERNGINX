//const userProfile = require('../../../models/v1/certificador/profile')
const ctrlAudit ={}

ctrlAudit.show = (req, res, next) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Obtener todos los Auditores");

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

ctrlAudit.update = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Actualizar Auditor ", req.params.id);
};

ctrlAudit.insert = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," Body ",req.body  );
  res.send("Agregar Auditor ", req.body);
};

ctrlAudit.delete = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("eliminar Auditor");
};




module.exports = ctrlAudit
