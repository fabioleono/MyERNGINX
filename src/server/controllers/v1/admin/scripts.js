const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const modelScripts = require("../../../models/v1/admin/scripts");

const ctrlScript = {}

ctrlScript.run= errorHelperCtrl(async(req, res) => {


  // console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  
  const dataScript = {
    description: 'Script que actualiza el campo N_ACCESOS de la tabla gnv_t_usuarios',
  }
  await modelScripts.run(dataScript, (data) => {
    res.status(200).json(data)
  })
  
})


module.exports = ctrlScript
