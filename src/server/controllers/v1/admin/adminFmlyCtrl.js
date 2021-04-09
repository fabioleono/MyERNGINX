const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const adminFmlyModel = require("../../../models/v1/admin/adminFmlyModel");
const ctrlFmly = {}

ctrlFmly.show = errorHelperCtrl(async (req, res) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  const ctrlData = {
    paramId: req.params.id,
    master: req.masterId,
    family: req.familyId,
    path: req.path,
  };
  
  await adminFmlyModel.show(ctrlData, (data) => {
    if (!data.cache)
      req.log.error(
        `Error REDIS CACHE Modelo Familia Administrador -> usuario:${req.user} ip:${ip}`
      );
    req.log.warn(`Consulta a ${req.path}-> usuario:${req.user} ip:${ip}`);
    delete data.cache;
    res.status(200).json(data);
  });
  
  
})
ctrlFmly.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el Familia Administrador de ", req.params.id);
}

ctrlFmly.insert = (req, res) => {
res.send('Agregar Familia Administrador ', req.body)
}

ctrlFmly.delete = (req, res) => {
res.send('eliminar Familia Administrador')
}

module.exports = ctrlFmly
