const yup = require('yup')

module.exports = yup.object().shape({
  user: yup
    .string()
    .min(5, "El Formato de Usuario es de minimo 3 caracteres")
    .required()
    .max(12, "El Formato de Usuario es de maximo 12 caracteres")
    .required()
    .matches(/^[0-9-a-z-A-Z.;<>_ ]+$/, "El Formato del usuario no es valido")
    .required(),
  pass: yup
    .string()
    .min(8, "La clave debe ser de minimo 8 caracteres")
    .required()
});
