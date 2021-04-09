const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const accessModel = require("../../../models/v1/general/accesos");

const ctrlAccess = {};

ctrlAccess.show = errorHelperCtrl(async (req, res) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  const master = req.masterId;
  const userId = req.params.userId;
  const ctrlData = {
    userId,
    master,
  }

  //console.log("DATA ACCESOS ", accessData);
  await accessModel.show(ctrlData, (data) => {
    req.log.warn(`Consulta a Rol Accesos-> usuario:${req.user} ip:${ip}`);
    res.status(200).json(data);
  });
  
});

ctrlAccess.update = (req, res) => {
  console.log(
    "Orig ",
    req.originalUrl,
    " url ",
    req.url,
    " params ",
    req.params
  );
  res.send("Actualizar el acceso de ", req.params.user);
};

ctrlAccess.insert = (req, res) => {
  res.send("Agregar Acceso ", req.body);
};

ctrlAccess.delete = (req, res) => {
  res.send("eliminar acceso");
};

module.exports = ctrlAccess;

