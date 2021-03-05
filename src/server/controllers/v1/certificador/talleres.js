const modelWorkshop = require('../../../models/v1/certificador/talleres')
const errorHelperCtrl = require('../../../helpers/v1/errorhelperCtrl');

const ctrlWorkshop ={}

ctrlWorkshop.show = errorHelperCtrl(async(req, res) => {
  console.log('req ', req);
  //console.log('user ', req.userId);
  // console.log('query ', req.query);
  // console.log("params ", req.params);
  // console.log('methods ', req.method);
  //console.log("TALLERES RRL ", req.rateLimit);
  const master = req.query.master;
  const id = req.params.id;
  //const keyRedis = `T_${master}_${id}`;
  // const data3 = 'entrada de error con bad command'
  // redisClient.set("algo3", 3600, JSON.stringify(data3));

  await modelWorkshop.show(master, id, (data) => {
    req.log.warn(`Consulta a Perfil Talleres-> usuario:${req.userId}`);
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
