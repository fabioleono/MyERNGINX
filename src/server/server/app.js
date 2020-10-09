const express = require("express");
const path = require('path')
const morgan = require('morgan');
const requestIp = require("request-ip");
const cors = require('cors')
const helmet = require('helmet')

const app = express()

//settings
app.set("port", process.env.PORT || 5000);
//app.set("keySecret", process.env.KEY_SECRET)

//middlewares



//app.use(favicon(path.join(__dirname, "../", "public/images/favicon.png")));
app.use(morgan('combined')) // ver el tipo de peticion y el tiempo de respuesta
//app.use(helmet())
// app.use(
//   helmet({
//     frameguard: false,
//     contentSecurityPolicy: false,
//     dnsPrefetchControl: false,
//     xpectCt: false,
//     hidePoweredBy: false,
//     hsts: false,
//     ieNoOpen: false,
//     noSniff: false,
//     permittedCrossDomainPolicies: false,
//     referrerPolicy: false,
//     xssFilter:false,
//   })
// );
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
app.use(requestIp.mw()); // encontrar Ip de cliente
app.use(cors())

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });



// static Files, carpeta public
// en la carpeta bundle se genera el codigo que se convierte del  FRONTEND con yarn build 
app.use(express.static(path.join(__dirname, "../../../", "build"))); // 
//app.use(express.static(path.join(__dirname, "../../../", "public"))); // Ej. localhost:3000/index.html

//app.use('public', express.static(path.join(__dirname, "../", "public"))); // aca en el browser los archivos publicos seran disponibles desde localhost:3000/public/index.html

// Routes


app.use(require('../routes/index')) // accedo a las rutas del archivo index.js
app.use(require('../routes/authentication')) // accedo a las rutas del archivo autentication.js
app.use(require('../routes/authPublic')) // accedo a las rutas del archivo autentication.js
app.use(require('../routes/certignv'))// Ruta al contents
app.use(require('../routes/wildcards/App'))// Acedo a la ruta para subdominio app.enabletech.tech
app.use(require('../routes/mail'))// La ruta para generar correos automaticos

//app.use('/Links', require('../routes/links')) // acceso a las rutas del archivo links.js, PERO en el dominio le van a preceder la ruta localhost:3000/Links
//app.use(require('../routes/vhost/index'))


module.exports = app


