const router = require('express').Router()
const ctrlAuth = require('../../controllers/v1/auth')
const validateForm = require('../../middlewares/v1/validateForms')
const schemaLogin = require('../../dto/v1/authLogin')
const rateLimitAuth = require('express-rate-limit')

const authLimiter = rateLimitAuth({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 10, // Despues de 10 solicitudes de acceso desde la misma IP, Bloquea
  message:
    "Too many Request to Login from this IP, please try again after an hour",
});

router.post('/login', authLimiter, validateForm(schemaLogin) ,ctrlAuth.login) // procedimiento de Login
router.put('/logout/:user', ctrlAuth.logout) // proceddimiento de Logout y set session
// throw new Error("error Test ");
// router.get('/users', ctrlAuth.list) // muestra el listado de usuarios
// router.get('/users/:user', ctrlAuth.list) // muestra el usuario
// router.put('/users/:user', ctrlAuth.update); // actualiza el usuario
// router.delete('/users/:user', ctrlAuth.delete) // elimina el usuario



module.exports = router
