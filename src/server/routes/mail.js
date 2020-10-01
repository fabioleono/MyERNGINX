const { Router } = require('express')
const { info } = require('node-sass')
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
const mails = ['fabioleon@msn.com', 'lgonzalez@enable.com.co', 'lramos@enable.com.co', 'lucho554@gmail.com', 'fabioleono@gmail.com']




router.get("/sndMail", async(req, res) => {
  //const { name, email, message } = req.body;
  
  const message = "Correo de pruebas desde node localhost:3000";
  const contHTML = `<h1>Email Automatico</h1>
    <ul>
    <p>${message}</p>`;
    //console.log(contHTML);

    // Generando el transport. Objeto de configuracion
    const transporter = nodemailer.createTransport({
      host: "mail.enable.com.co",
      port: 26,
      secure: false,
      auth: {
        user: "enabletech@enable.com.co",
        pass: process.env.MAIL_PASSWORD,
      }, // con esta sentencia no bloquea el correo, ya que deberia salir desde el mismo dominio
      tls: {
        rejectUnauthorized: false,
      },
    });
    // envio el correo. Esto es un metodo asincrono
    

    try{
      const info = await transporter.sendMail({
        from: '"enabletech.tech Server AWS 👻" <enabletech@enable.com.co>', // sender address
        to: mails.toString(), // list of receivers
        subject: "Test envio Correo ✔", // Subject line
        text: "Test Texto Plano ", // plain text body
        html: contHTML, // html body
      });
      //console.log("Message send", info.messageId);
    
    }catch (e){
      console.log('error ', e);
      
    }

    
    res.status(201).send({testCorreo: 'ok'})

    
    
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


// Servidor entrante:

// mail.enable.com.co

//   * IMAP Port: 143

//   * POP3 Port: 110

// Servidor de correo:

// mail.enable.com.co

//   * SMTP Port: 26
