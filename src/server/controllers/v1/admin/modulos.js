const ctrlModuls = {}

ctrlModuls.show = (req, res) => {

  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Obtener todos los Modulos");
  
  
}
ctrlModuls.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el Modulo de ", req.params.id);
}

ctrlModuls.insert = (req, res) => {
  res.send('Agregar Modulo ', req.body)
}

ctrlModuls.delete = (req, res) => {
res.send('eliminar Modulo')
}

module.exports = ctrlModuls
