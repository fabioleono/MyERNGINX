const { Router } = require('express')

const nodemailer = require('nodemailer')

const router = Router()


router.post('/sndMail', (req, res) => {

  const { name, email, message } = req.body
  const contHTML = `<h1>Email Automatico</h1>
    <ul>
    <li>name: ${name}</li>
    <li>name: ${email}</li>
    </ul>
    <p>${message}</p>`;
})
const mails1 = [
  "fabioleono@gmail.com"
];
const mails2 = [
  "fabioleon@msn.com",
  "fabioleono@gmail.com",
  "lramos@enable.com.co",
  "lgonzalez@enable.com.co",
  "lucho554@gmail.com",
];
//console.log("array ", mails1.toString());


router.get("/sndMail", async(req, res) => {
  //const { name, email, message } = req.body;

  const message = `Test Correos 
  nodejs - nodemailer  
  Cuenta: ${process.env.MAIL_HOST}
  Servidor: Local - AWS Server `;
  const contHTML = `<h1>Email Automatico</h1>
    <ul>
    <p>${message}</p>`;
//console.log(contHTML);

  
  // AWS server , port:465, secure:true

  // CREANDO Objeto de configuracion con variables de entorno
  const objMail = {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: Boolean(parseInt(process.env.MAIL_SECURE)),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    }, // con esta sentencia no bloquea el correo, ya que deberia salir desde el mismo dominio
    tls: {
      rejectUnauthorized: Boolean(parseInt(process.env.MAIL_AUTH)),
    },
  };

  //console.log('objeto', objMail);
  const headerMail = {
    from: `" Enable Technologies ${process.env.MAIL_HOST} 👻" <${process.env.MAIL_USER}>`, // sender address
    to: mails2.toString(), // list of receivers
    subject: `Correo Pruebas ${process.env.MAIL_HOST} ✔`, // Subject line
    text: "texto ", // plain text body
    html: contHTML, // html body
  };
  //console.log('header', headerMail);
  // GENERANDO el transport

  const transporter = nodemailer.createTransport(objMail);

  // //envio el correo. Esto es un metodo asincrono
  try {
    const infoMailer = await transporter.sendMail(headerMail);
    console.log("Message send", infoMailer.messageId);
  } catch (e) {
    console.log("error ", e);
  }

  res.status(201).send({ testCorreo: "ok" });
});

module.exports = router

// Modelo respuesta constante info
// Message send {
//   accepted: [
//     'fabioleon@msn.com',
//     'lgonzalez@enable.com.co',
//     'lramos@enable.com.co',
//     'lucho554@gmail.com',
//     'fabioleono@gmail.com'
//   ],
//   rejected: [],
//   envelopeTime: 417,
//   messageTime: 115,
//   messageSize: 845,
//   response: '250 OK id=1kO0MC-0007Uw-Tx',
//   envelope: {
//     from: 'enabletech@enable.com.co',
//     to: [
//       'fabioleon@msn.com',
//       'lgonzalez@enable.com.co',
//       'lramos@enable.com.co',
//       'lucho554@gmail.com',
//       'fabioleono@gmail.com'
//     ]
//   },
//   messageId: '<4cdc96e3-15b5-e4e0-5e76-d4d21523b749@enable.com.co>'
// } 

