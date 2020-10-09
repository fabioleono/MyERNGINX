const userProfile = require('../models/certignv')
const ctrlCerti ={}

ctrlCerti.profile = (req, res, next) => {
  let user=''
  if(req.params.user) user = req.params.user
  

  userProfile.list(user, (err, data) => {
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
};




module.exports = ctrlCerti
