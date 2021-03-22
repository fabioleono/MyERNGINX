const errorHelperCtrl = require("../../../helpers/v1/errorhelperCtrl");
const accessModel = require("../../../models/v1/general/accesos");

const ctrlAccess = {};

ctrlAccess.show = errorHelperCtrl(async (req, res) => {
  // console.log("urlProf ", req.url);
  // console.log("searchProf ", req.search);
  // console.log("pathnameProf ", req.pathname);
  // console.log("pathProf ", req.path);
  // console.log("hrefProf ", req.href);
  // console.log("rawProf ", req._raw);
  // console.log("routeProf98 ", req.route);
  
  const master = req.masterId;
  const userId = req.params.userId;
  const accessData = {
    userId,
    master,
  }

  //console.log("DATA ACCESOS ", accessData);
  await accessModel.show(accessData, (data) => {
    res.status(200).json(data);
  });
  
});

ctrlAccess.update = (req, res) => {
  console.log(
    "Orig ",
    req.originalUrl,
    " url ",
    req.url,
    " params ",
    req.params
  );
  res.send("Actualizar el acceso de ", req.params.user);
};

ctrlAccess.insert = (req, res) => {
  res.send("Agregar Acceso ", req.body);
};

ctrlAccess.delete = (req, res) => {
  res.send("eliminar acceso");
};

module.exports = ctrlAccess;

