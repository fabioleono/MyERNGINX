const ctrlCerti = require('../../controllers/v1/certignv')
const router = require('express').Router()

router.get('/certignv/:user', ctrlCerti.profile)
router.get("/certignv", ctrlCerti.profile);

module.exports = router
