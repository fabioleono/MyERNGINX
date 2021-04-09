const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const gobermentsModel = require("../../../models/v1/admin/gubernamentales");


const ctrlGob = {}

ctrlGob.show = errorHelperCtrl(async (req, res) => {

  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener todos los org de Gobierno");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA org de Gobierno ", accessData);
  await gobermentsModel.show((data) => {
    res.status(200).json(data);
  });
  
  
})
ctrlGob.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el org de Gobierno de ", req.params.id);
}

ctrlGob.insert = (req, res) => {
res.send('Agregar org de Gobierno ', req.body)
}

ctrlGob.delete = (req, res) => {
res.send('eliminar org de Gobierno')
}

module.exports = ctrlGob
