const router = require("express").Router();
const ctrlProfile = require("../../controllers/v1/general/profile");
const ctrlChPass = require('../../controllers/v1/general/changePass')
const ctrlAccess = require('../../controllers/v1/general/accesos')
const verifyToken = require("../../middlewares/v1/verifyToken");
const rateLimiterProfile = require("../../middlewares/v1/rateLimitProfile");
const validateForms = require('../../middlewares/v1/validateForms')
const schemaChangePass = require('../../dto/v1/validationForm/changePass')

router.use(verifyToken)// Verifica el Token para todas las familias y endpoints privados
router.use(rateLimiterProfile)//Verifica el limitador de solicitud para todas las familias y endpoints privados

router.get("/", ctrlProfile.profile); // trae el perfil del usuario 

router.post("/password", validateForms(schemaChangePass) ,ctrlChPass.changePass);

router.get("/accesos/:userId", ctrlAccess.show);
router.get('/accesos', ctrlAccess.show)
router.post('/accesos', ctrlAccess.insert)
router.put('/accesos/:userId', ctrlAccess.update)
router.delete('/accesos/:userId', ctrlAccess.delete)







module.exports = router
