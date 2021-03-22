const  router   = require('express').Router()

const ctrlScript = require('../../controllers/v1/admin/scripts')
// const ctrlRols = require("../../controllers/v1/admin/roles");
// const ctrlFamilies = require("../../controllers/v1/admin/familias");
// const ctrlModuls = require("../../controllers/v1/admin/modulos");

router.put('/scripts', ctrlScript.run)

// router.get("/roles", ctrlRols.show);
// router.post("/roles", ctrlRols.insert);
// router.put("/roles/:id", ctrlRols.update);
// router.delete("/roles/:id", ctrlRols.delete);

// router.get("/familias", ctrlFamilies.show);
// router.post("/familias", ctrlFamilies.insert);
// router.put("/familias/:id", ctrlFamilies.update);
// router.delete("/familias/:id", ctrlFamilies.delete);

// router.get("/modulos", ctrlModuls.show);
// router.post("/modulos", ctrlModuls.insert);
// router.put("/modulos/:id", ctrlModuls.update);
// router.delete("/modulos/:id", ctrlModuls.delete);


module.exports = router
