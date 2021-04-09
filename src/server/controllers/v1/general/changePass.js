const changePassModel = require('../../../models/v1/general/changePass')
const errorHelperCtrl = require('../../../helpers/v1/errorhelperCtrl')
const ctrl = {} // creo el objeto controlador

// creo las funciones para ese controlador

ctrl.changePass = errorHelperCtrl(async(req, res) => {
  // console.log("urlProf ", req.url);
  // console.log("searchProf ", req.search);
  // console.log("pathnameProf ", req.pathname);
  // console.log("pathProf ", req.path);
  // console.log("hrefProf ", req.href);
  // console.log("rawProf ", req._raw);
  // console.log("routeProf98 ", req.route);
  //console.log("body", req.body);
  const { pass, new_pass } = req.body;
  const ip = req.header("X-Forwarded-For") || req.ip;
  const user = req.user;
  const passData = {
    user,
    ip,
    pass,
    new_pass,
  }
  
  await changePassModel.create(passData, (data) => {
    req.log.warn(`Cambio de Clave WEB-> usuario:${user} ip:${ip} idMail:${data.payload.idMail}`);
    res.status(200).json(data);
    if (data.payload.idMail instanceof Error) {
      req.log.error(
        `Error Servicio de Correo ->changePassModel.create: ${Error(
          data.payload.idMail
        )}`
      );
      
    } 

  });
});


module.exports = ctrl
