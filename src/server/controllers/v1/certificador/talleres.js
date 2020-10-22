const modelWorkshop = require('../../../models/v1/certificador/talleres')
const ctrlWorkshop ={}

ctrlWorkshop.show = (req, res, next) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  const master = req.params.master
  console.log("btener todos los Talleres de un ente");
  

  modelWorkshop.show(master, (err, data) => {
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

ctrlWorkshop.update = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("Actualizar Taller ", req.params.id);
};

ctrlWorkshop.insert = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," Body ",req.body  );
  res.send("Agregar Taller ", req.body);
};

ctrlWorkshop.delete = (req, res) => {
  console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  res.send("eliminar Taller");
};




module.exports = ctrlWorkshop
