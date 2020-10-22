const ctrlAccess = {}

ctrlAccess.show = (req, res) => {

  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
     res.send("Obtener todos los accesos");
  
  
}
ctrlAccess.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
     res.send("Actualizar el acceso de ", req.params.user);
}

ctrlAccess.insert = (req, res) => {
  res.send('Agregar Acceso ', req.body)
}

ctrlAccess.delete = (req, res) => {
res.send('eliminar acceso')
}

module.exports = ctrlAccess
