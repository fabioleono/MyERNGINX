const db = require('../index')
const redisClient = require("../redis");
const { promisify } = require("util");
const ModelError = require("../../../error/v1/modelResponseError");
const setAsync = promisify(redisClient.set).bind(redisClient);
const modelFmly = {}

modelFmly.show = async (ctrlData, callback) => {
  const { paramId, master, family, path } = ctrlData;
  let keyPath;
  // si el path trae parametros elimina el parametro de la uri, para compararlo con la proipiedad del objeto dataModel
  if(paramId) {
    const splitPath = path.split("/");
    splitPath.pop();
    keyPath = splitPath.join("/");
  }else{
    keyPath = path
  }
  // los campos de las query deben estar CORRESPONDIDOS con el roles.JSON del FRONTEND
  const dataModel = {
    "/alarmas": {
      query:
        " SELECT K_ALARMAS, D_ALARMAS, D_CATEGORIA, D_OBSERVACION FROM gnv_t_alarmas ",
      cond: " WHERE K_ALARMAS ",
    },
    "/certificadores": {
      query:
        " SELECT K_CERTIFICADOR, D_SIGLA, D_DIRECCION, D_TELEFONO FROM gnv_t_certificador ",
      cond: " WHERE K_CERTIFICADOR ",
    },
    "/cilindros": {
      query: " SELECT K_CIL_MARCA, D_MARCA FROM gnv_t_cil_marca ",
      cond: " WHERE K_CIL_MARCA ",
    },
    "/reguladores": {
      query: " SELECT K_KIT_MARCA, D_MARCA FROM gnv_t_kit_marca ",
      cond: " WHERE K_KIT_MARCA ",
    },
    "/ciudades": {
      query: " SELECT K_CIUDAD, D_CIUDAD FROM gnv_t_ciudad ",
      cond: " WHERE K_CIUDAD ",
    },
    "/familias": {
      query: " SELECT K_FAMILIA, D_FAMILIA, R_MODULO FROM gnv_t_familia ",
      cond: " WHERE K_FAMILIA ",
    },
    "/gubernamentales": {
      query:
        " SELECT K_GOBIERNO, D_SIGLA, D_DIRECCION, D_TELEFONO FROM gnv_t_gobierno ",
      cond: " WHERE K_GOBIERNO ",
    },
    "/importadores": {
      query:
        " SELECT K_IMPORTADOR, D_SIGLA, D_DIRECCION, D_TELEFONO FROM gnv_t_importador ",
      cond: " WHERE K_IMPORTADOR ",
    },
    "/modulos": {
      query: " SELECT K_MODULO, D_MODULO, D_DESCRIPCION FROM gnv_t_modulo ",
      cond: " WHERE K_MODULO ",
    },
    "/roles": {
      query: " SELECT K_ROL, D_ROL, D_PATH_API FROM gnv_t_rol  ",
      cond: " WHERE K_ROL ",
    },
  };

  let sql = {};
 
  for (const key in dataModel) {
    if (Object.hasOwnProperty.call(dataModel, key)) {
      if (key === keyPath) {
        sql = dataModel[key].query;
        if (paramId) sql += ` ${dataModel[key].cond}=${db.escape(paramId)} `;
      }
    }
  }

  console.log(sql);
  const result = await db.query(sql)

  if (!result.length)
    throw new ModelError({
      status: 404,
      message: "Resources Not Found",
    }).toJson();

  const dataOut = {
    success: true,
    payload: result,
  };
  const dataString = JSON.stringify(dataOut);
  let dataCache;
  const prefRedis = `vC_${family}_${path}_${master}:`;
  
  if (redisClient.ready) {
    // si redis esta ON almacena la consulta en CACHE
    dataCache = await setAsync(prefRedis, dataString);
  } else {
    dataCache = false;
  }
  dataOut.cache = dataCache;
  callback(dataOut);
};

module.exports = modelFmly
