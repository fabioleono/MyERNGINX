const router = require('express').Router()
const ctrlAuthPublic = require('../../controllers/v1/authPublic')


router.get("/info", ctrlAuthPublic.list); // muestra el listado de usuarios de Info Publica
router.get("/info/:consumer", ctrlAuthPublic.list); // muestra el usuario
// router.put("/Info/:consumer", ctrlAuthPublic.update); // actualiza el usuario
// router.delete("/Info/:consumer", ctrlAuthPublic.delete); // elimina el usuario
router.post("/loginpublic", ctrlAuthPublic.login); // procedimiento de Login
router.post("/register", ctrlAuthPublic.register); // Registra el usuario



module.exports = router
