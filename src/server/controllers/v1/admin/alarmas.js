const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const alarmsModel = require("../../../models/v1/admin/alarmas");

const ctrlAlarmas = {};

ctrlAlarmas.show = errorHelperCtrl(async (req, res) => {
  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener todos los Alarmas");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA Alarmas ", accessData);
  await alarmsModel.show((data) => {
    res.status(200).json(data);
  });
});

ctrlAlarmas.update = (req, res) => {
  console.log(
    "Orig ",
    req.originalUrl,
    " url ",
    req.url,
    " params ",
    req.params
  );
  res.send("Actualizar el Alarma de ", req.params.id);
};

ctrlAlarmas.insert = (req, res) => {
  res.send("Agregar Alarma ", req.body);
};

ctrlAlarmas.delete = (req, res) => {
  res.send("eliminar Alarma");
};

module.exports = ctrlAlarmas;
