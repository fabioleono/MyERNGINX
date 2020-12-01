const router = require('express').Router()

// con el '*' definimos las rutas que no existen y mandamos el error y el etatus del error para generar el contenido de respuesta o podemos generar un controlador especifico en la carpeta controllers
router.get('*', (req, res) => {
  res.status(404).send('error 404 desde archivo en /routes')})


module.exports = router
