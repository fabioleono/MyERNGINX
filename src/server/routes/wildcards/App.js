const router = require('express').Router()
const ctrlApp = require('../../controllers/wildcards/App')

router.get('/App', ctrlApp.list)

module.exports = router


