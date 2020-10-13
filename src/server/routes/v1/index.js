const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/v1/index')


router.get('/', ctrl.root) // Con REACT, a la raiz se llega por medio del staticFiles del server

module.exports = router


/* // !!--- Otra forma de solicitarlas rutas desde el archivo index.js de server. Modelo B

module.exports function(App) {
  app.get('/', (req, res) => {
    res.json([])
  })
}

// O con funcion flecha

module.exports = App => {
  app.get('/', (req, res) => {
    res.json([])
}

// ---!!
*/
