const bcrypt = require('bcryptjs')
const crypt = {}

crypt.encrypt = async (pass) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(pass, salt)
}

crypt.desencrypt = (text, password) => {
  return bcrypt.compare(text, password)
}

crypt.genRand = (length) => {
  let uppercase = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let lowercase = "abcdefghijklmnñopqrstuvwxyz";
  let numbers = "0123456789";
  let symbols = "~!@#$%^&*_+=|:;,. -";
  let all = uppercase + lowercase + numbers + symbols;
  let rndom = "";
  for (var index = 0; index < length; index++) {
    let character = Math.floor(Math.random() * all.length);
    rndom += all.charAt(character);
  }
  return rndom;
}

module.exports = crypt
