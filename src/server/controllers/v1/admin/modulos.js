const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const modulesModel = require("../../../models/v1/admin/modulos");
const ctrlModuls = {};

ctrlModuls.show = errorHelperCtrl(async (req, res) => {
  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener todos los modulos");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA modulos ", accessData);
  await modulesModel.show((data) => {
    res.status(200).json(data);
  });
});

ctrlModuls.update = (req, res) => {
  console.log(
    "Orig ",
    req.originalUrl,
    " url ",
    req.url,
    " params ",
    req.params
  );
  res.send("Actualizar el Modulo de ", req.params.id);
};

ctrlModuls.insert = (req, res) => {
  res.send("Agregar Modulo ", req.body);
};

ctrlModuls.delete = (req, res) => {
  res.send("eliminar Modulo");
};

module.exports = ctrlModuls;
