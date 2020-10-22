//const userProfile = require('../../../models/v1/certificador/profile')
const ctrlDownloadAll ={}

ctrlDownloadAll.down = (req, res, next) => {
  console.log(
    "Orig ",
    req.originalUrl,
    " url ",
    req.url,
    " body ",
    req.body
  );
  res.send("Descargas Totales de la Plataforma");

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





module.exports = ctrlDownloadAll;
