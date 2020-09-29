const bcrypt = require('bcryptjs')
const helpers = {}

helpers.encrypt = async (pass) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(pass, salt)
  //return await bcrypt.hashSync(pass, bcrypt.genSaltSync(10)) // con  hashSync usando la dependencia de bcrypt-nodejs
}

helpers.desencrypt = (text, password) => {
  return bcrypt.compare(text, password)
 // return bcrypt.compareSync(text, password) //con compareSync usando la dependencia de bcrypt-nodejs
}

module.exports = helpers