const router = require('express').Router()
const ctrlAuth = require('../../controllers/v1/auth')


router.get('/users', ctrlAuth.list) // muestra el listado de usuarios
router.get('/users/:user', ctrlAuth.list) // muestra el usuario
router.put('/users/:user', ctrlAuth.update); // actualiza el usuario
router.delete('/users/:user', ctrlAuth.delete) // elimina el usuario


router.post('/login', ctrlAuth.login) // proceddimiento de Login
router.post("/register", ctrlAuth.register); // Registra el usuario




module.exports = router
