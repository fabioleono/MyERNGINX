require('dotenv').config() // trae las variables del archivo .env de la raiz
const app = require('./server/app')

  app.listen(app.get("port"), () => {
    console.log("server on port: ", app.get("port"));
  });











