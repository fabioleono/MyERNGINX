const yup = require('yup')

module.exports = yup.object().shape({
  user: yup
    .string()
    .min(3, "El nombre de usuario es de minimo 3 caracteres")
    .required()
    .max(12, "El nombre de usuario es de maximo 12 caracteres")
    .required()
    .matches(/^[0-9-a-z-A-Z.;<>_ ]+$/, "El Formato del usuario no es valido")
    .required(),
  mail: yup
    .string()
    .email("El Formato de la cuenta correo no es correcto")
    .required("Ingrese su Email"),
});
