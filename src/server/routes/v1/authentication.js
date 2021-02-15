const router = require('express').Router()
const ctrlAuth = require('../../controllers/v1/auth')
const validateForm = require('../../middlewares/v1/validateForms')
const schemaLogin = require('../../dto/v1/validationForm/authLogin')
const rateLimitAuth = require('express-rate-limit')

const authLimiter = rateLimitAuth({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 20, // Despues de 20 solicitudes de acceso desde la misma IP, La Bloquea por 1 hora
  message:
    " Se ha detectado muchos intentos de Login Fallidos desde su IP. Por seguridad su acceso ha sido bloqueado ",
});

router.post('/login', authLimiter, validateForm(schemaLogin) ,ctrlAuth.login) // procedimiento de Login
router.put('/logout/:user', ctrlAuth.logout) // proceddimiento de Logout y set session

module.exports = router
