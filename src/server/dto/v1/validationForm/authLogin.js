const yup = require('yup')

module.exports = yup.object().shape({
  user: yup
    .string('El nombre de usuario solo permite letras')
    .min(5, 'El nombre de usuario es de minimo 5 caracteres')
    .max(8, 'El nombre de usuario es de maximo 8 caracteres').required(),
    //.matches(/^[a-z]+$/, 'El nombre de usuario solo permite letras de la (a - z)').required(),
  pass: yup.string().min(8,'La clave debe ser de minimo 8 caracteres').required()
})
