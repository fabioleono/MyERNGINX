//const db = require("../../models/v1/index"); // requiero la coneccion a la base de datos
const ctrl = {} // creo el objeto controlador

// creo las funciones para ese controlador

ctrl.root = (req, res, next) => {
  //res.send('it works')
  res.status(200).json({ conexion: "ok" });
  // console.log("respuesta desde / ", req.url);
  // console.log('vhost ', req.vhost);
  
  // res.json({ conexion: "ok" });
  // console.log('ruta a la raiz ', req.url);
  // console.log('headers raiz ', req.headers);
  
};


module.exports = ctrl
