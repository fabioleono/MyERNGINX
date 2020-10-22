const ctrlWorkshop = require('../../controllers/v1/infoPublica/infoPublica')


const router = require('express').Router()


router.get('/historial', ctrlWorkshop.history);
router.post('/descargas', ctrlWorkshop.download);
router.get('/condiciones', ctrlWorkshop.conditions);



module.exports = router
