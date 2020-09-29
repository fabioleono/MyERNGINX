const appModel = require('../../models/wildcards/App')
const ctrlApp = {}

ctrlApp.list = (req, res, next) => {

  appModel.list((err, data) => {
    if(!err){
      res.status(200).json(data);
      console.log("dato Wildcard ", data);
    }else{
      res.status(500).json({error: err})
      console.log('error modelo App ', err);
      
      
    }

  })

}

module.exports = ctrlApp
