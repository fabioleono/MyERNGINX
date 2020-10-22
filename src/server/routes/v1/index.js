const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/v1/profile')

router.get('/', ctrl.profile); 
router.get('/:user', ctrl.profile) 

module.exports = router

