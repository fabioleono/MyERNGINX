const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const technicalsModel = require("../../../models/v1/certificador/tecnicosTaller");
const ctrlTechnical = {};

ctrlTechnical.show = errorHelperCtrl(async (req, res) => {
  const ip = req.header("X-Forwarded-For") || req.ip;
  //  console.log("path tecnicos taller", req.path, 'Familia ', req.familyId);
  const ctrlData = {
    tecnicoId: req.params.tecnicoId,
    master: req.masterId,
    family: req.familyId,
    path: req.path
  };
  
  await technicalsModel.show(ctrlData, (data) => {
    if(!data.cache) req.log.error(
      `Error REDIS CACHE en Rol Tecnicos Taller -> usuario:${req.user} ip:${ip}`
    );
    req.log.warn(
      `Consulta a Rol Tecnicos Talleres-> usuario:${req.user} ip:${ip}`
    );
    delete data.cache
    res.status(200).json(data);
  });
});

ctrlTechnical.update = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Actualizar Tecnico de Taller ", req.params.id);
};

ctrlTechnical.insert = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," Body ",req.body  );
  res.send("Agregar Tecnico de Taller ", req.body);
};

ctrlTechnical.delete = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("eliminar Tecnico de Taller");
};




module.exports = ctrlTechnical
