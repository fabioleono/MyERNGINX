//const userProfile = require('../../../models/v1/certificador/profile')
const ctrlDownload ={}

ctrlDownload.down = (req, res, next) => {
  console.log(
    "Orig ",
    req.originalUrl,
    " url ",
    req.url,
    " body ",
    req.body
  );
  res.send("Descargas Certificador");

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





module.exports = ctrlDownload;
