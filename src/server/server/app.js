const express = require("express");
const path = require('path')
const morgan = require('morgan');
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit')
const compression = require('compression')
const errorMiddleware = require("../middlewares/v1/errorMiddleware");


const app = express()

// SETTINGS
app.set("port", process.env.PORT || 5000);
//app.set("keySecret", process.env.KEY_SECRET)

// MIDDLEWARES

//comprimir todas las respuestas HTTP
app.use(compression())

// lOGS
const pino = require('pino')
const opts = {
  name: "logger-MyERN",
  //timestamp: () => ',"time":"' + new Date().toISOString() + '"',
  timestamp: pino.stdTimeFunctions.isoTime,
};
const logger = require("pino")(opts, pino.destination("./logs/info.log")); // opc 3, cargando opciones
// const logger = require("pino")(
//   pino.destination({
//     dest: "./logs/info.log",
//   })
// ); // opcion 2 pino.destination ~30% faster
//const logger = require("pino")('./logs/info.log'); // Opcion 1
const expressPino = require("express-pino-logger")({
  logger: logger,
});
app.use(expressPino);
//logger.info("LOGGER BASICO7");
let logrotate = require("logrotator");
// use the global rotator
let rotator = logrotate.rotator;
// check file rotation every 5 minutes, and rotate the file if its size exceeds 1 mb.
// keep only 10 rotated files and compress (gzip) them.
rotator.register("./logs/info.log", {
  schedule: "5m",
  size: "1m",
  compress: true,
  count: 10,
});
rotator.on("error", function (err) {
  logger.error("oops, an error occured!");
  //console.log("oops, an error occured!");
});
// 'rotate' event is invoked whenever a registered file gets rotated
rotator.on("rotate", function (file) {
  logger.info("file " + file + " was rotated!");
  //console.log("file " + file + " was rotated!");
});

// Cuando usamos un proxy por encima de node.js, simplemente tendremos que asegurarnos de identificarlo como proxy de confianza para que la dirección del cliente sea la correcta y no la del propio proxy. Es necesario configurar la cabecera (proxy_set_header  X-Forwarded-For  $remote_addr;) a nginx en sus archivos de sites-available
//app.set("trust proxy", true);

//SECURITY
// helmet setea algunas de las cabeceras de las peticiones Y... 
app.use(helmet())
// ...ES EQUIVALENTE A :
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());
// ... carga un modelo de CSP
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


//app.use(favicon(path.join(__dirname, "../", "public/images/favicon.png")));


// LIMITADOR DE SOLICITUDES
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: process.env.REQ_PER_MINUTE || 30, // Numero de salicitudes a la API
  message: "Too Many Request. Please Try Later"
});

//limitacion de json recibidos en el body
app.use(bodyParser.json({ limit: '50kb' })); //100kb por defecto
//limitacion de los datos recibidos en formularios y convertidos en json
app.use(
  bodyParser.urlencoded({ 
    parameterLimit: 100, // cantidad de parametros max permitidos en el POST(1000 por defecto)
    limit: '50kb', //max tamaño del body en bytes.(100kb)
    extended: true,//El objeto contiene pares clave-valor(false: string o array)(true: any type)
    // type: "application/x-www-form-urlencoded", // por defecto
  })
);

if (process.env.NODE_ENV === "development") {
  //app.use(morgan('combined')) // ver el tipo de peticion y el tiempo de respuesta
  // ver la respuesta de morgan bajo formato propio. TODAS
  // ":status :total-time :date[iso] :remote-addr :remote-user :method :url :req[header] :http-version :referrer :user-agent :res[header] :response-time "
  app.use(
    morgan(
      ":method || :url || :status || :remote-addr || :remote-user || :req[header] || :referrer || :res[header] || :response-time"
    )
  );
  app.use(cors()); // solo permitido el acceso a cors en peticiones en ambiente de desarrollo
} 

// ROUTES
const version = process.env.API_VERSION
const api = `${process.env.API}${version}`
app.use(`${api}`, apiLimiter); // limitador de Solicitudes

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

app.use(errorMiddleware)




module.exports = app


