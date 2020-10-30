const modelProfile = require('../../models/v1/profile')
const ctrl = {} // creo el objeto controlador

// creo las funciones para ese controlador

ctrl.profile = (req, res) => {

const user = req.userId;
console.log('USER PROFILE REQUEST ', user);

if(!user) return res.status(400).json({ sucess: false, status: "user not found" }); // por algun caso no trae el dato de la verificacion del JWT y Session
// console.log("Orig ", req.originalUrl);
// console.log("url ", req.url);
//console.log("PARAMS PROFILE ", req.params);

  modelProfile.menu(user, (err, data) => {
    if(err) return res.status(500).json({
      success: false,
      status: "Error DB",
    });
    
    res.status(200).json(data);
      //console.log('tipo de dato', typeof(data))
      //console.log(data);
 });
};


module.exports = ctrl
