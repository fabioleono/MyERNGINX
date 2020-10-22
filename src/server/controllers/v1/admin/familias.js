const ctrlFamilies = {}

ctrlFamilies.show = (req, res) => {

  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Obtener todos los Familias");
  
  
}
ctrlFamilies.update = (req, res) => {
  console.log("Orig ", req.originalUrl, " url ", req.url, " params ", req.params);
  res.send("Actualizar el Familia de ", req.params.id);
}

ctrlFamilies.insert = (req, res) => {
  res.send('Agregar Familia ', req.body)
}

ctrlFamilies.delete = (req, res) => {
res.send('eliminar Familia')
}

module.exports = ctrlFamilies
