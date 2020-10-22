//const userProfile = require('../../../models/v1/certificador/profile')
const ctrlInfoPublic ={}

ctrlInfoPublic.history = (req, res, next) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Obteniene Historial de descargas usuario Info publica");

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

ctrlInfoPublic.download = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," body ",req.body  );
  res.send("Solicita Descarga Info publica", req.params.body);
};

ctrlInfoPublic.conditions = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Muestra Terminos y condiciones de  usuario Info publica");
};




module.exports = ctrlInfoPublic
