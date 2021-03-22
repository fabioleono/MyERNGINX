const router = require("express").Router();

const ctrlWorkshop = require('../../controllers/v1/gobierno/talleres')
// const ctrlUserInfopublic = require("../../controllers/v1/gobierno/UsuariosInfoPublica");
// const ctrlQueryAll = require("../../controllers/v1/gobierno/consultaTotal");
// const ctrlDownloadAll = require("../../controllers/v1/gobierno/descargaTotal");

const verifyToken = require("../../middlewares/v1/verifyToken");

router.use(verifyToken);


router.get('/talleresgnv', ctrlWorkshop.show);
//router.post("/talleresgnv", ctrlWorkshop.insert);
//router.put("/talleresgnv/:id", ctrlWorkshop.update);
//router.delete("/talleresgnv/:id", ctrlWorkshop.delete);

// router.get("/usuariosinfo", ctrlUserInfopublic.show);
// router.put("/usuariosinfo/:id", ctrlUserInfopublic.update);

// router.get("/consultastotal/:query", ctrlQueryAll.query);

// router.post("/descargastotal", ctrlDownloadAll.down);




module.exports = router
