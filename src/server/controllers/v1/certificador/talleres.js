const modelWorkshop = require('../../../models/v1/certificador/talleres')
const ctrlWorkshop ={}

ctrlWorkshop.show = (req, res, next) => {
  //console.log("decoded taller", req.decoded);
  console.log("Token talleres ", req.headers["x-access-token"]);
  console.log("UserId ", req.userId);
  console.log("Family ", req.family);
  console.log("Session ", req.sessionID);
  // req.session.destroy();
  // res.clearCookie("connect.sid");
  // if (req.session.tecnicos) {
  //   req.session.tecnicos += 1;
  //   console.log("existe");
  // } else {
  //   console.log("no existia");

  //   req.session.tecnicos = 1;
  // }
  // console.log("session tecnicos ", req.session.tecnicos);
  // console.log("Orig ", req.originalUrl," url ",req.url," params ",req.params  );
  const master = req.params.master;
  if (!master)
    return res.status(400).json({
      sucess: false,
      status: "Error, Data Incorrect ",
    });

  modelWorkshop.show(master, (err, data) => {
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
