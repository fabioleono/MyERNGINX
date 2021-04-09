const db = require('../index')
const redisClient = require("../redis");
const { promisify } = require("util");
const ModelError = require('../../../error/v1/modelResponseError');
const setAsync = promisify(redisClient.set).bind(redisClient);
const technicalsModel = {}

technicalsModel.show = async (ctrlData, callback) => {
  const { tecnicoId, master, family, path } = ctrlData
  let sql = ` SELECT K_TECNICOTALLER, D_NOMBRE, F_INGRESO, R_TALLER FROM gnv_t_tecnicotaller  WHERE n_estado!='4' `;
  // if (master !== 0) {
  //   sql += ` AND r_certificador_comp_lab=${db.escape(master)} `;
  // }
  if (tecnicoId) sql += ` AND k_tecnicotaller=${db.escape(tecnicoId)} `;
  console.log(sql);
  const result = await db.query(sql);

  if (result.length === 0)
    throw new ModelError({
      status: 404,
      message: "Resources Not Found",
    }).toJson();

  const data = {
    success: true,
    payload: result,
  };

  const dataString = JSON.stringify(data);
  let dataCache
  const prefRedis = `vC_${family}_${path}_${master}:`;
  if (redisClient.ready) { // si redis esta ON almacena en CACHE
    dataCache = await setAsync(prefRedis, dataString);
  } else {
    dataCache = false
  }
  data.cache = dataCache
  callback(data);
  
};

module.exports = technicalsModel;
