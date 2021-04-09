const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const importersModel = require("../../../models/v1/admin/importadores");

const ctrlImp = {}

ctrlImp.show = errorHelperCtrl(async (req, res) => {

  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener todos los importadores");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA importador ", accessData);
  await importersModel.show((data) => {
    res.status(200).json(data);
  });
  
  
})
ctrlImp.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el importador de ", req.params.id);
}

ctrlImp.insert = (req, res) => {
res.send('Agregar importador ', req.body)
}

ctrlImp.delete = (req, res) => {
res.send('eliminar importador')
}

module.exports = ctrlImp
