// const router = require("express").Router({ mergeParams: true }); trae los params de la anidacion de rutas
const router = require("express").Router();
const ctrl = require("../../controllers/v1/profile");
const ctrlWorkshop = require("../../controllers/v1/certificador/talleres");
const ctrlTechnical = require("../../controllers/v1/certificador/tecnicosTaller");
// const ctrlAudit = require("../../controllers/v1/certificador/auditores");
// const ctrlRegion = require("../../controllers/v1/certificador/regionales");
// const ctrlQuery = require("../../controllers/v1/certificador/consulta");
// const ctrlDownload = require("../../controllers/v1/certificador/descarga");

const verifyToken = require('../../middlewares/v1/verifyToken');
const verifyCache = require('../../middlewares/v1/verifyCache')
const rateLimiterProfile = require("../../middlewares/v1/rateLimitProfile");

router.use(verifyToken) // para todas las siguientes rutas Verifica si hay un token valido

router.get("/", ctrl.profile); // trae el perfil del usuario 

router.get("/talleres", rateLimiterProfile, verifyCache, ctrlWorkshop.show);// muestro los talleres de la familia
// router.post("/talleres", ctrlWorkshop.insert);

router.get("/talleres/tecnicos", rateLimiterProfile, ctrlTechnical.show);
// router.post("/talleres/tecnicos", ctrlTechnical.insert);
// router.put("/talleres/tecnicos/:id", ctrlTechnical.update);
// router.delete("/talleres/tecnicos/:id", ctrlTechnical.delete);

router.get("/talleres/:id", ctrlWorkshop.show)// muestro un taller
// router.put("/talleres/:id", ctrlWorkshop.update);
// router.delete("/talleres/:id", ctrlWorkshop.delete);




// router.get("/auditores", ctrlAudit.show);
// router.post("/auditores", ctrlAudit.insert);
// router.put("/auditores/:id", ctrlAudit.update);
// router.delete("/auditores/:id", ctrlAudit.delete);

// router.get("/regionales", ctrlRegion.show);
// router.post("/regionales", ctrlRegion.insert);
// router.put("/regionales/:id", ctrlRegion.update);
// router.delete("/regionales/:id", ctrlRegion.delete);

// router.get("/consultas/:query", ctrlQuery.list);
// router.post("/descargas", ctrlDownload.down);



module.exports = router;
