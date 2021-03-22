const yup = require('yup')

module.exports = yup.object().shape({
  pass: yup
    .string()
    .required("Ingrese su Contraseña Actual")
    .min(8, "La clave Actual es de minimo 8 caracteres"),
  new_pass: yup
    .string()
    .required("Ingrese su Nueva Contraseña")
    .min(12, "La Nueva clave debe ser de minimo 12 caracteres")
    .matches(
      /^(?=.*\d)/,
      "La Nueva Contraseña debe contener como minimo un numero"
    )
    .matches(
      /^(?=.*[a-zñ])/,
      "La Nueva Contraseña debe contener como minimo una Letra minuscula"
    )
    .matches(
      /^(?=.*[A-ZÑ])/,
      "La Nueva Contraseña debe contener como minimo una Letra Mayuscula"
    )
    .matches(
      /^(?=.*[~!@#$%^&*_+=|:;,. -])/,
      "La Nueva Contraseña debe contener como minimo un Caracter Especial ~!@#$%^&*_+=|:;,. - "
    ),
});
