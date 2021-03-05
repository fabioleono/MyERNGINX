const router = require('express').Router()
const ctrlAuth = require('../../controllers/v1/auth')
const validateForm = require('../../middlewares/v1/validateForms')
const schemaLogin = require('../../dto/v1/validationForm/authLogin')
const schemaPass = require("../../dto/v1/validationForm/passLogin");
const speedLimiter = require('../../middlewares/v1/speedLimiter');

router.get("/login", ctrlAuth.captcha);// generacion del Captcha
router.post("/login", speedLimiter, validateForm(schemaLogin), ctrlAuth.login); // procedimiento de Login
router.get("/login/password", ctrlAuth.captcha);// generacion del Captcha
router.post('/login/password', speedLimiter, validateForm(schemaPass), ctrlAuth.pass) // procedimiento de Login

router.put('/logout/:user', ctrlAuth.logout) // proceddimiento de Logout y set session



module.exports = router
