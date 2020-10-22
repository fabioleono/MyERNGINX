const modelProfile = require('../../models/v1/profile')
const ctrl = {} // creo el objeto controlador

// creo las funciones para ese controlador

ctrl.profile = (req, res, next) => {
 
 if (req.params.user) {
  const user = req.params.user;
  console.log("Orig ", req.originalUrl);
  console.log("url ", req.url);
  console.log("params", req.params);

  modelProfile.menu(user, (err, data) => {
    if (!err) {
      res.status(200).json(data);
      //console.log('tipo de dato', typeof(data))
      //console.log(data);
    } else {
      console.log("Mysql Error: ", err);

      res.status(500).json({
        success: false,
        message: "Error ",
        data: err,
      });
    }
  });
 }else{
  res.status(401).send('Info Incompleta')

 }

};


module.exports = ctrl
