const express = require("express");
const path = require('path')
const morgan = require('morgan');
//const requestIp = require("request-ip");
const cors = require('cors')
const helmet = require('helmet')
//const session = require('express-session')

const app = express()

// SETTINGS
app.set("port", process.env.PORT || 5000);
//app.set("keySecret", process.env.KEY_SECRET)

// MIDDLEWARES

//app.use(favicon(path.join(__dirname, "../", "public/images/favicon.png")));

//app.use(morgan('combined')) // ver el tipo de peticion y el tiempo de respuesta
// ver la respuesta de morgan bajo formato propio. TODAS
// ":status :total-time :date[iso] :remote-addr :remote-user :method :url :req[header] :http-version :referrer :user-agent :res[header] :response-time "

app.use(
  morgan(
    ":method || :url || :status || :remote-addr || :remote-user || :req[header] || :referrer || :res[header] || :response-time"
  )
);

//SECURITY

// Cuando usamos un proxy por encima de node.js, simplemente tendremos que asegurarnos de identificarlo como proxy de confianza para que la dirección del cliente sea la correcta y no la del propio proxy. 
app.set('trust proxy', true);

app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        "https://fonts.googleapis.com/",
        "https://fonts.gstatic.com/",
      ],
      scriptSrc: [
        "'self'",
        "'sha256-s1eR4HA1RGXCCWhJqz18kkFqCQ4RBNXjAPyvQ2lQtrU='",
        "'sha256-bnYo6LV6hM3rTnXS2OK00COE/ojZZnVwLLUMaPjJt20='",
        "'sha256-4Su6mBWzEIFnH4pAGMOuaeBrstwJN4Z3pq/s1Kn4/KQ='",
        "'nonce-bnYo6LV6hM3rTnXS2OK00COE/ojZZnVwLLUMaPjJt20='",
      ],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(express.json()) // recibo las solicitudes json de los clientes
app.use(express.urlencoded({extended:false})) // recibir datos de formularios y lo conviert en objetos de javascript
//app.use(requestIp.mw()); // encontrar Ip de cliente


if (process.env.NODE_ENV === "development") {
  app.use(cors()); // solo permitido el acceso a cors en peticiones en ambiente de desarrollo
}




// ROUTES
const version = process.env.API_VERSION
const api = `${process.env.API}${version}`

app.use(api, require(`../routes${version}/authentication`)); //rutas de Autenticacion y Login 
app.use(api, require(`../routes${version}/authPublic`)); // Rutas de autenticacion y login Usuario Info Publica

const accessAdmin = `${api}/administrador`
app.use(accessAdmin, require(`../routes${version}/administrador`));// rutas del superusuario

//const accessCert = /\/api\/gnvco\/v1\/(administrador|certificador)/; 
// const accessCert = new RegExp('/(administrador|certificador)');
// const accessCert = /\/(administrador|certificador)/;

const accessCert = new RegExp(""+ api + "/(administrador|certificador)");// las rutas de la familia certificador pueden tambien ser accedidas por el superusuario, utilizando el mismo controlador y filtradas en las query del modelo
app.use(accessCert, require(`../routes${version}/certificador`));// Rutas de la familia certificador y superusuario

const accessGob = new RegExp(""+ api + "/(administrador|gobierno)");// las rutas de la familia Gobierno pueden tambien ser accedidas por el superusuario, utilizando el mismo controlador y filtradas en las query del modelo
app.use(accessGob, require(`../routes${version}/gobierno`)) // Rutas de la familia Gobierno y superusuario

const accessInfoPublic = `${api}/infopublica`
app.use(accessInfoPublic, require(`../routes${version}/infoPublica`)) // Rutas del usuario de Info Publica

app.use(api, require(`../routes${version}/wildcards/App`));// Accedo a la ruta para subdominio app.enabletech.tech
app.use(api, require(`../routes${version}/mail`));// La ruta para generar correos automaticos (Pruebas)

// STATIC FILES
// en la carpeta bundle se genera el codigo que se convierte del  FRONTEND con npm run build 
app.use(express.static(path.join(__dirname, "../../../", "build"))); 

//console.log('rutas React ', require('../routes/v1/react'));
require("../routes/v1/react").map((e) => {
  return app.use(e, express.static(path.join(__dirname, "../../../", "build")));
});
// Ej:
// app.use("/proyecto", express.static(path.join(__dirname, "../../../", "build")));
// app.use("/certignv", express.static(path.join(__dirname, "../../../", "build")));
// app.use("/certignv/:user", express.static(path.join(__dirname, "../../../", "build")));
// Dentro del arreglo de react va una ruta al resto *. Con ella renderiza el componente de REACT error 404 ruta no encontrada

// app.use("*", (req, res) => {
//   res.status(404).send("error 404");
// });


module.exports = app


