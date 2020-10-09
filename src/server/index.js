require('dotenv').config() // trae las variables del archivo .env de la raiz
console.log('Entorno ', process.env.NODE_ENV);

const app = require('./server/app')

  app.listen(app.get("port"), () => {
    console.log("server on port: ", app.get("port"));
  });











