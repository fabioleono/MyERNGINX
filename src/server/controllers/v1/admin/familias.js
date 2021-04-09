const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const familiesModel = require("../../../models/v1/admin/familias");

const ctrlFamilies = {}

ctrlFamilies.show = errorHelperCtrl(async (req, res) => {
  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener las familias");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA FAMILIAS ", accessData);
  await familiesModel.show((data) => {
    res.status(200).json(data);
  });
});


ctrlFamilies.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el Familia de ", req.params.id);
}

ctrlFamilies.insert = (req, res) => {
  res.send('Agregar Familia ', req.body)
}

ctrlFamilies.delete = (req, res) => {
res.send('eliminar Familia')
}

module.exports = ctrlFamilies
