const modelProfile = require('../../models/v1/profile')
const errorHelperCtrl = require('../../helpers/v1/errorhelperCtrl')
const ctrl = {} // creo el objeto controlador

// creo las funciones para ese controlador

ctrl.profile = errorHelperCtrl(async(req, res) => {
  const user = req.userId;
  //console.log("PROFILE RRL ", req.rateLimit, ' usuario ', user);
  await modelProfile.menu(user, (data) => {
    res.status(200).json(data);
  });
});


module.exports = ctrl
