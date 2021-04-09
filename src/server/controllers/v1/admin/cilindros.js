const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const cilsModel = require("../../../models/v1/admin/cilindros");


const ctrlCils = {}

ctrlCils.show = errorHelperCtrl(async (req, res) => {

  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener todos los Cilindroes");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA CilindroES ", accessData);
  await cilsModel.show((data) => {
    res.status(200).json(data);
  });
  
  
})
ctrlCils.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el Cilindro de ", req.params.id);
}

ctrlCils.insert = (req, res) => {
res.send('Agregar Cilindro ', req.body)
}

ctrlCils.delete = (req, res) => {
res.send('eliminar Cilindro')
}

module.exports = ctrlCils
