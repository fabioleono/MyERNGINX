const router = require('express').Router()
const ctrlAuthPublic = require('../../controllers/v1/authPublic')

router.get('/infopublica/:consumer([0-9]{4,12})', ctrlAuthPublic.list) // muestra el usuario, con la expresion regular se determina que sea de tipo numerico y qu tenga minimo 4 digitos y maximo 12

// router.put("/infopublica/:consumer", ctrlAuthPublic.update); // actualiza el usuario
// router.delete("/infopublica/:consumer", ctrlAuthPublic.delete); // elimina el usuario
router.post("/loginpublic", ctrlAuthPublic.login); // procedimiento de Login
router.post("/register", ctrlAuthPublic.register); // Registra el usuario



module.exports = router
