const userModel = require('../models/user')
const ctrlCerti ={}

ctrlCerti.list = (req, res, next) => {
  let userData = "";
  //if (req.params.id)  userData.k_usuario = req.params.id

  userModel.list(userData, (err, data) => {
    if (!err) {
      res.status(200).json(data);
      console.log('tipo de dato', typeof(data))
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
};

module.exports = ctrlCerti
