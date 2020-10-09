const router = require('express').Router()
const ctrlAuth = require('../controllers/auth')


router.get('/Users', ctrlAuth.list) // muestra el listado de usuarios
router.get('/Users/:user', ctrlAuth.list) // muestra el usuario
router.post('/Login', ctrlAuth.login) // proceddimiento de Login



router.put('/Users/:user', ctrlAuth.update); // actualiza el usuario
router.delete('/Users/:user', ctrlAuth.delete) // elimina el usuario
router.post("/Register", ctrlAuth.register); // Registra el usuario


router.get('/Prueba', ctrlAuth.prueba)


module.exports = router
