const ctrlCerti = require('../controllers/certignv')
const router = require('express').Router()

router.get('/CertiGNV/:user', ctrlCerti.profile)
router.get("/CertiGNV", ctrlCerti.profile);

module.exports = router
