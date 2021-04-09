const  router   = require('express').Router()
const ctrlScript = require('../../controllers/v1/admin/scripts')
// const ctrlRols = require("../../controllers/v1/admin/roles");
// const ctrlFamilies = require("../../controllers/v1/admin/familias");
// const ctrlModuls = require("../../controllers/v1/admin/modulos");
// const ctrlCert = require('../../controllers/v1/admin/certificadores');
// const ctrlGob = require('../../controllers/v1/admin/gubernamentales');
// const ctrlImp = require('../../controllers/v1/admin/importadores');
// const ctrlCities = require('../../controllers/v1/admin/ciudades');
// const ctrlCils = require('../../controllers/v1/admin/cilindros');
// const ctrlKits = require('../../controllers/v1/admin/kits');
// const ctrlAlarmas = require('../../controllers/v1/admin/alarmas');
const ctrlFmly = require('../../controllers/v1/admin/adminFmlyCtrl');
const verifyCache = require('../../middlewares/v1/verifyCache')

router.put('/scripts', ctrlScript.run)

router.get("/familias/:id", verifyCache, ctrlFmly.show);
router.get("/familias", verifyCache, ctrlFmly.show);
// router.post("/familias", ctrlFamilies.insert);
// router.put("/familias/:id", ctrlFamilies.update);
// router.delete("/familias/:id", ctrlFamilies.delete);
router.get("/modulos/:id", verifyCache, ctrlFmly.show);
router.get("/modulos", verifyCache, ctrlFmly.show);
// router.post("/modulos", ctrlModuls.insert);
// router.put("/modulos/:id", ctrlModuls.update);
// router.delete("/modulos/:id", ctrlModuls.delete);
router.get("/roles/:id", verifyCache, ctrlFmly.show);
router.get("/roles", verifyCache, ctrlFmly.show);
// router.post("/roles", ctrlRols.insert);
// router.put("/roles/:id", ctrlRols.update);
// router.delete("/roles/:id", ctrlRols.delete);

router.get("/certificadores/:id", verifyCache, ctrlFmly.show);
router.get("/certificadores", verifyCache, ctrlFmly.show);
// router.post("/certificadores", ctrlCert.insert);
// router.put("/certificadores/:id", ctrlCert.update);
// router.delete("/certificadores/:id", ctrlCert.delete);
router.get("/gubernamentales/:id", verifyCache, ctrlFmly.show);
router.get("/gubernamentales", verifyCache, ctrlFmly.show);
// router.post("/gubernamentales", ctrlGob.insert);
// router.put("/gubernamentales/:id", ctrlGob.update);
// router.delete("/gubernamentales/:id", ctrlGob.delete);
router.get("/importadores/:id", verifyCache, ctrlFmly.show);
router.get("/importadores", verifyCache, ctrlFmly.show);
// router.post("/importadores", ctrlImp.insert);
// router.put("/importadores/:id", ctrlImp.update);
// router.delete("/importadores/:id", ctrlImp.delete);
router.get("/ciudades/:id", verifyCache, ctrlFmly.show);
router.get("/ciudades", verifyCache, ctrlFmly.show);
// router.post("/ciudades", ctrlCities.insert);
// router.put("/ciudades/:id", ctrlCities.update);
// router.delete("/ciudades/:id", ctrlCities.delete);
router.get("/cilindros/:id", verifyCache, ctrlFmly.show);
router.get("/cilindros", verifyCache, ctrlFmly.show);
// router.post("/cilindros", ctrlCils.insert);
// router.put("/cilindros/:id", ctrlCils.update);
// router.delete("/cilindros/:id", ctrlCils.delete);
router.get("/reguladores/:id", verifyCache, ctrlFmly.show);
router.get("/reguladores", verifyCache, ctrlFmly.show);
// router.post("/reguladores", ctrlKits.insert);
// router.put("/reguladores/:id", ctrlKits.update);
// router.delete("/reguladores/:id", ctrlKits.delete);
router.get("/alarmas/:id", verifyCache, ctrlFmly.show);
router.get("/alarmas", verifyCache, ctrlFmly.show);
// router.post("/alarmas", ctrlAlarms.insert);
// router.put("/alarmas/:id", ctrlAlarms.update);
// router.delete("/alarmas/:id", ctrlAlarms.delete);

module.exports = router
