const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const rolsModel = require("../../../models/v1/admin/roles");

const ctrlRols = {}

ctrlRols.show = errorHelperCtrl(async (req, res) => {

  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener todos los Roles");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA ROLES ", accessData);
  await rolsModel.show((data) => {
    res.status(200).json(data);
  });
  
  
})
ctrlRols.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el Rol de ", req.params.id);
}

ctrlRols.insert = (req, res) => {
res.send('Agregar Rol ', req.body)
}

ctrlRols.delete = (req, res) => {
res.send('eliminar Rol')
}

module.exports = ctrlRols
