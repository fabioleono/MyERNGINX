const ctrlWorkshop = require('../../controllers/v1/certificador/talleres')
const ctrlTechnical = require("../../controllers/v1/certificador/tecnicosTaller");
const ctrlAudit = require('../../controllers/v1/certificador/auditores')
const ctrlRegion = require("../../controllers/v1/certificador/regionales");
const ctrlQuery = require("../../controllers/v1/certificador/consulta");
const ctrlDownload = require("../../controllers/v1/certificador/descarga");

const router = require('express').Router()

//router.get('/talleres', (req,res) => {res.send('/')})
router.get('/talleres/:master', ctrlWorkshop.show);
router.post("/talleres", ctrlWorkshop.insert);
router.put('/talleres/:id', ctrlWorkshop.update);
router.delete("/talleres/:id", ctrlWorkshop.delete);

router.get("/talleres/tecnicos", ctrlTechnical.show);
router.post("/talleres/tecnicos", ctrlTechnical.insert);
router.put("/talleres/tecnicos/:id", ctrlTechnical.update);
router.delete("/talleres/tecnicos/:id", ctrlTechnical.delete);

router.get("/auditores", ctrlAudit.show);
router.post("/auditores", ctrlAudit.insert);
router.put("/auditores/:id", ctrlAudit.update);
router.delete("/auditores/:id", ctrlAudit.delete);

router.get("/regionales", ctrlRegion.show);
router.post("/regionales", ctrlRegion.insert);
router.put("/regionales/:id", ctrlRegion.update);
router.delete("/regionales/:id", ctrlRegion.delete);

router.get("/consultas/:query", ctrlQuery.list);
router.post("/descargas", ctrlDownload.down);


// router
//   .route("talleres")
//   .get((req, res) => {
//     res.send("metodo GET");
//   })
//   .post((req, res) => {
//     res.send("metodo POST");
//   })
//   .put((req, res) => {
//     res.send("metodo PUT");
//   })
//   .delete((req, res) => {
//     res.send("metodo DELETE");
//   });

module.exports = router
