const yup = require('yup')

module.exports = yup.object().shape({
  user: yup
    .string()
    .required("Ingrese su Usuario")
    .min(3, "El nombre de Usuario es de minimo 3 caracteres")
    .max(12, "El nombre de Usuario es de maximo 12 caracteres")
    .matches(/^[A-Za-z0-9.\-_\s]+$/, "El Formato del usuario no es valido"),
  mail: yup
    .string()
    .required("Ingrese su Email")
    .email("El Formato de la cuenta correo no es correcto"),
});
