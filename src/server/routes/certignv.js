const ctrlCerti = require('../controllers/certi')
const router = require('express').Router()

router.get('/CertiGNV', ctrlCerti.list)

module.exports = router
