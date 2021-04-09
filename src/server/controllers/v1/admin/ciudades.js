const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const citiesModel = require("../../../models/v1/admin/ciudades");


const ctrlCities = {}

ctrlCities.show = errorHelperCtrl(async (req, res) => {

  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  // res.send("Obtener todos los ciudades");
  // const master = req.masterId;
  // const userId = req.params.userId;
  // const accessData = {
  //   userId,
  //   master,
  // };

  //console.log("DATA ciudades ", accessData);
  await citiesModel.show((data) => {
    res.status(200).json(data);
  });
  
  
})
ctrlCities.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar la Ciudad de ", req.params.id);
}

ctrlCities.insert = (req, res) => {
res.send('Agregar Ciudad ', req.body)
}

ctrlCities.delete = (req, res) => {
res.send('eliminar Ciudad')
}

module.exports = ctrlCities
