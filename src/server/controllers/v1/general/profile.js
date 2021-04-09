const profileModel = require('../../../models/v1/general/profile')
const errorHelperCtrl = require('../../../helpers/v1/errorhelperCtrl')
const ctrl = {} // creo el objeto controlador

// creo las funciones para ese controlador

ctrl.profile = errorHelperCtrl(async(req, res) => {
  // console.log('REQ ', req);
  
  //console.log("urlProf ", req.url);
  // console.log("searchProf ", req.search);
  //console.log("pathnameProf ", req.path);
  // console.log("pathProf ", req.path);
  // console.log("hrefProf ", req.href);
  // console.log("rawProf ", req._raw);
  // console.log("routeProf98 ", req.route);
  const user = req.user;
  //console.log("PROFILE RRL ", req.rateLimit, ' usuario ', user);
  await profileModel.menu(user, (data) => {
    res.status(200).json(data);
  });
});


module.exports = ctrl
