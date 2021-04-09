const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const certifiersModel = require("../../../models/v1/admin/certificadores");


const ctrlFmly = {}

ctrlFmly.show = errorHelperCtrl(async (req, res) => {

  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener todos los certificadores");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA CERTIFICADOR ", accessData);
  await certifiersModel.show((data) => {
    res.status(200).json(data);
  });
  
  
})
ctrlFmly.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el certificador de ", req.params.id);
}

ctrlFmly.insert = (req, res) => {
res.send('Agregar certificador ', req.body)
}

ctrlFmly.delete = (req, res) => {
res.send('eliminar certificador')
}

module.exports = ctrlFmly
