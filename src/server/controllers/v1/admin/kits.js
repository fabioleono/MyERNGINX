const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const kitsModel = require("../../../models/v1/admin/kits");



const ctrlKits = {}

ctrlKits.show = errorHelperCtrl(async (req, res) => {

  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener todos los Reguladores");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA ReguladorES ", accessData);
  await kitsModel.show((data) => {
    res.status(200).json(data);
  });
  
  
})
ctrlKits.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el Regulador de ", req.params.id);
}

ctrlKits.insert = (req, res) => {
res.send('Agregar Regulador ', req.body)
}

ctrlKits.delete = (req, res) => {
res.send('eliminar Regulador')
}

module.exports = ctrlKits
