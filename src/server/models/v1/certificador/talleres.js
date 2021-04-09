const db = require('../index')
const redisClient = require("../redis");
const { promisify } = require("util");
const ModelError = require('../../../error/v1/modelResponseError');
const setAsync = promisify(redisClient.set).bind(redisClient);
const workshopModel = {}

workshopModel.show = async (ctrlData, callback) => {
  const { tallerId, master, family, path } = ctrlData;
  let sql = ` SELECT N_NIT, D_SIGLA, D_DIRECCION, D_TELEFONO FROM gnv_t_taller  WHERE n_estado!='4' `;
  if (master !== 0) sql += ` AND r_certificador=${db.escape(master)} `;
  if (tallerId) sql += ` AND k_taller=${db.escape(tallerId)} `;

  console.log(sql);
  const result = await db.query(sql);
  
  if(result.length===0) throw new ModelError({
    status: 404,
    message: "Resources Not Found",
  }).toJson();

  const data = {
    success: true,
    payload: result,
  };
  // console.log("result ", result, " data ", data);
  const dataString = JSON.stringify(data);
  let dataCache;
  const prefRedis = `vC_${family}_${path}_${master}:`;
  if (redisClient.ready) {
    // si redis esta ON almacena en CACHE
    dataCache = await setAsync(prefRedis, dataString);
  } else {
    dataCache = false;
  }
  data.cache = dataCache;
  callback(data);

};

module.exports = workshopModel;
