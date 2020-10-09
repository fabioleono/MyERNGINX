const router = require('express').Router()
const ctrlAuthPublic = require('../controllers/authPublic')


router.get("/Info", ctrlAuthPublic.list); // muestra el listado de usuarios de Info Publica
router.get("/Info/:consumer", ctrlAuthPublic.list); // muestra el usuario
router.post("/LoginPublic", ctrlAuthPublic.login); // proceddimiento de Login
router.post("/RegisterPublic", ctrlAuthPublic.register); // Registra el usuario


// router.put("/Info/:consumer", ctrlAuthPublic.update); // actualiza el usuario
// router.delete("/Info/:consumer", ctrlAuthPublic.delete); // elimina el usuario






module.exports = router
