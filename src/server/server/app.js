const express = require("express");
const path = require('path')
const morgan = require('morgan');
const requestIp = require("request-ip");
const cors = require('cors')
//const helmet = require('helmet')

const app = express()

//settings
app.set("port", process.env.PORT || 5000);
//app.set("keySecret", process.env.KEY_SECRET)

//middlewares

//app.use(favicon(path.join(__dirname, "../", "public/images/favicon.png")));

//app.use(morgan('combined')) // ver el tipo de peticion y el tiempo de respuesta
// ver la respuesta de morgan bajo formato propio. TODAS
// ":status :total-time :date[iso] :remote-addr :remote-user :method :url :req[header] :http-version :referrer :user-agent :res[header] :response-time "

app.use(
  morgan(
    ":method || :url || :status || :remote-addr || :remote-user || :req[header] || :referrer || :res[header] || :response-time"
  )
);


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

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [
//         "'self'",
//         "https://fonts.googleapis.com/",
//         "https://fonts.gstatic.com/",
//       ],
//       scriptSrc: [
//         "'self'",
//         "'sha256-s1eR4HA1RGXCCWhJqz18kkFqCQ4RBNXjAPyvQ2lQtrU='",
//         "'sha256-bnYo6LV6hM3rTnXS2OK00COE/ojZZnVwLLUMaPjJt20='",
//         "'sha256-4Su6mBWzEIFnH4pAGMOuaeBrstwJN4Z3pq/s1Kn4/KQ='",
//         "'nonce-bnYo6LV6hM3rTnXS2OK00COE/ojZZnVwLLUMaPjJt20='",
//       ],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//   })
// );

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
// 

//app.use(express.static(path.join(__dirname, "../../../", "public"))); // Ej. localhost:3000/index.html

//app.use('public', express.static(path.join(__dirname, "../", "public"))); // aca en el browser los archivos publicos seran disponibles desde localhost:3000/public/index.html

const version = process.env.API_VERSION
const api = `${process.env.API}${version}`
//app.use(require('../routes/index')) // accedo a las rutas del archivo index.js
app.use(api, require(`../routes${version}/authentication`)); //rutas de Autenticacion y Login 
app.use(api, require(`../routes${version}/authPublic`)); // Rutas de autenticacion y login Usuario Info Publica
app.use(api, require(`../routes${version}/certignv`));// Ruta del menu certignv
app.use(api, require(`../routes${version}/wildcards/App`));// Acedo a la ruta para subdominio app.enabletech.tech
app.use(api, require(`../routes${version}/mail`));// La ruta para generar correos automaticos (Pruebas)
// app.get('*',(req,res)=>{res.redirect('/')})
// router.get("*", (req, res) => {
//   res.status(404).send("error 404");
// });
app.use(express.static(path.join(__dirname, "../../../", "build"))); 
const routesReact = ['/proyecto', '/contacto', '/login', '/certignv', '/certignv/:user', '/loginpublic', '/users', '/info', '/info/:consumer']
routesReact.map(e => {
  return app.use( e ,express.static(path.join(__dirname, "../../../", "build")));
})


// () => {}
// app.use("/proyecto", express.static(path.join(__dirname, "../../../", "build")));
// app.use("/certignv", express.static(path.join(__dirname, "../../../", "build")));
// app.use("/certignv/:user", express.static(path.join(__dirname, "../../../", "build")));
//






module.exports = app


