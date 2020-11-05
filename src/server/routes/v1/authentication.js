const router = require('express').Router()
const ctrlAuth = require('../../controllers/v1/auth')


// router.get('/users', ctrlAuth.list) // muestra el listado de usuarios
// router.get('/users/:user', ctrlAuth.list) // muestra el usuario
// router.put('/users/:user', ctrlAuth.update); // actualiza el usuario
// router.delete('/users/:user', ctrlAuth.delete) // elimina el usuario
// router.get('/', (req, res) => {
//   if (req.session.tecnicos) {
//     req.session.tecnicos += 1;
//     console.log("existe");
//   } else {
//     console.log("no existia");

//     req.session.tecnicos = 1;
//   }

//   //console.log("session validator ", req.session.validator);
//   console.log("session tecnicos ", req.session.tecnicos);
//   console.log("sessiones ", req.session);
//   console.log("sessiones id ", req.sessionID);
//   // console.log("session validator ", req.sessionID.talleres);

//   res.status(201).json({ messsage: "ok" });
// })

router.post('/login', ctrlAuth.login) // proceddimiento de Login
router.put('/logout/:user', ctrlAuth.logout) // proceddimiento de Logout y set session





module.exports = router
