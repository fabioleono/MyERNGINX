const FormError = require("../../error/v1/formValidatedError")
const validation = (schema) => {
  return async (req, res, next) => {
    //console.log('request Form ' , req.body, req.query, req.method);
    try {
      if (req.method === "POST" || req.method === "PUT") {
        const validatedBody = await schema.validate(req.body);
        req.body = validatedBody;
        
      }else if (req.method === "GET") {
        const validatedBody = await schema.validate(req.query);
        req.query = validatedBody;
      } 
      next();
    } catch (error) {
      error.ip = req.header("X-Forwarded-For") || req.ip;
      //error.user = error.value.user;
      next(new FormError(error).toJson());
    }
  };

//   return (req, res, next) => {
//     //console.log("tamaño solicitud ", req.headers["content-length"]); // verificar el tamaño en cada solicitud enviada por el frontend en los formularios (OJO CON envio de archivos) 
    
//       schema.validate(req.body)
//       .then(() => {
//         next();
//       })
//       .catch((err) => {
//         //console.log('ENTRA AL Error ', err);
//         req.body.errId = err.path;
//         req.body.errMsg = err.errors;
//         next()
//       })
//   }

}

module.exports = validation
