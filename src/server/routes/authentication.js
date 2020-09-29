const router = require('express').Router()
const ctrlAuth = require('../controllers/auth')


router.get('/Users', ctrlAuth.list) // muestra el listado de usuarios
router.get('/Users/:id', ctrlAuth.profile) // muestra el usuario
router.put('/Users/:id', ctrlAuth.profile); // actualiza el usuario
router.delete('/Users/:id', ctrlAuth.delete) // elimina el usuario
router.post("/Register", ctrlAuth.register); // Registra el usuario

router.post('/Login', ctrlAuth.login) // proceddimiento de Login
router.get('/Prueba', ctrlAuth.prueba)


module.exports = router
