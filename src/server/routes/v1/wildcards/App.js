const router = require('express').Router()
const ctrlApp = require('../../../controllers/v1/wildcards/App')

router.get('/App', ctrlApp.list)

module.exports = router


