const ctrlRols = {}

ctrlRols.show = (req, res) => {

  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Obtener todos los Roles");
  
  
}
ctrlRols.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el Rol de ", req.params.id);
}

ctrlRols.insert = (req, res) => {
res.send('Agregar Rol ', req.body)
}

ctrlRols.delete = (req, res) => {
res.send('eliminar Rol')
}

module.exports = ctrlRols
