const modelWorkshop = require('../../../models/v1/certificador/talleres')
const ctrlWorkshop ={}

ctrlWorkshop.show = (req, res, next) => {
  //console.log('HEADERS ', req.headers);
  
  console.log("HEADER HOST ", req.hostname);
  console.log("IP ", req.ip);
  console.log("header ", req.header("X-Forwarded-For"));
  
  //console.log("decoded taller", req.decoded);
  console.log("HEADER Token talleres ", req.headers["x-access-token"]);
  console.log("UserId ", req.userId);
  console.log("Family ", req.family);
  console.log('query ', req.query);
  console.log("params ", req.params);
  console.log('methods ', req.method);
  console.log("REQ RATE LIMIT TALLERES", req.rateLimit);
  

  const master = req.query.master;
  const id = req.params.id 

  if (!master)
    return res.status(400).json({
      sucess: false,
      status: "Error, Data Incorrect ",
    });

  modelWorkshop.show(master, id, (err, data) => {
    if (err)
      return res.status(500).json({
        success: false,
        status: "Error DB ",
      });

    res.status(200).json(data);
    //console.log("tipo de dato", typeof data);
    // const dataJson = JSON.stringify(data);
    // res.status(200).send(dataJson);
    // console.log("tipo de dato", typeof dataJson);
    //console.log(data);
  });
};;

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
