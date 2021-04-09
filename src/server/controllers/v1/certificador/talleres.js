const workshopModel = require('../../../models/v1/certificador/talleres')
const errorHelperCtrl = require('../../../helpers/v1/errorhelperCtrl');

const ctrlWorkshop ={}

ctrlWorkshop.show = errorHelperCtrl(async(req, res) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  //  console.log("path taller", req.path, "Familia ", req.familyId);
  const ctrlData = {
    tallerId: req.params.tallerId,
    master: req.masterId,
    family: req.familyId,
    path: req.path,
  };
  
  await workshopModel.show(ctrlData, (data) => {
    //console.log('data talleres ', data);
    if(!data.cache) req.log.error(
      `Error REDIS CACHE en Rol Talleres -> usuario:${req.user} ip:${ip}`
    );
    req.log.warn(`Consulta a Rol Talleres-> usuario:${req.user} ip:${ip}`);
    delete data.cache;
    res.status(200).json(data);
    // let lengthDta
    // try {
    //   lengthDta = Buffer.byteLength(JSON.stringify(data));
    // } catch (error) {
    //   console.log('error basico ', error);
    // }
    // console.log('SIZE ', lengthDta);
  });
});

ctrlWorkshop.update = errorHelperCtrl(async(req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Actualizar Taller ", req.params.id);
});

ctrlWorkshop.insert = errorHelperCtrl(async(req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," Body ",req.body  );
  res.send("Agregar Taller ", req.body);
});

ctrlWorkshop.delete = errorHelperCtrl(async(req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("eliminar Taller");
});




module.exports = ctrlWorkshop
