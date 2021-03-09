// const mail = [
//   "lramos@enable.com.co",
// ];
const nodemailer = require("nodemailer");
const redisClient = require("../../../models/v1/redis");
const { promisify } = require("util");
const getAsync = promisify(redisClient.get).bind(redisClient);
const keysAsync = promisify(redisClient.keys).bind(redisClient);

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

const transporter = nodemailer.createTransport(objMail);

const labelMailNewPass = async (user, mail, ip, pass) => {
  const header = {
    from: `" Enable Technologies ${process.env.MAIL_HOST} 👻" <${process.env.MAIL_USER}>`,
    to: mail, //mail.toString(), // si viene de un arreglo con varios correos
    subject: `Recuperación Contraseña CertiGNV ${process.env.MAIL_HOST} ✔`,
    //text: `${user} ${family} ${ip}`, // plain text body
    html: `<h1>Servidor de Correo Automatico CertiGNV</h1>
    <div>
    <h2>Nueva Contraseña Generada </h2>
    <h3>Usuario: ${user}</h3>
    <p>Contraseña: ${pass}</p>
    <p>Recomendamos ejecutar el procedimiento de cambio de contraseña despues de ingresar en el link CERTIFICADORES con su cuenta de usuario y la contraseña enviada en el presente correo. </>
    <p>generado desde ${ip}</p>
    </div>`, // html body
  };
  try {
    const infoMailer = await transporter.sendMail(header);
    return infoMailer.messageId; 
  } catch (error) {
    return error
  }    
};

const labelMailBlock = async (data) => {
  const receiver = ["lramos@enable.com.co"];
  //const receiver = ["lramos@enable.com.co", "soporte@enable.com.co"];
  let subject, findRedis, endpoint
   
  if(data.type === "ip"){
    findRedis = `*${data.data}*`;
    subject = `a la IP `;
  }else{
    findRedis = `*${data.data}`;
    subject = `al Usuario `;
  }
  let htmlExtra = `<div>Registros de REDIS asociados: `;
  try {
    const keys = await keysAsync([findRedis])
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const dataKey = await getAsync(key);
      htmlExtra += `<p>Redis Key: ${key} -> Value: ${dataKey}</p>`;
    }
  } catch (err) {
  
   }
  htmlExtra += `</div>`;
    
  if(data.prefix==='Log') endpoint = "api/login/"; else if(data.prefix === "Pas") endpoint = "api/login/password"; else endpoint = "api/";

  const html = `<h1>Servidor de Correo Automatico CertiGNV</h1>
  <div>
  <h2>Bloqueo generado ${subject}  ${data.data} </h2>
  <p>Bloqueo por ${data.block}, despues de ${data.points} intentos fallidos al endpoint ${endpoint} en ${data.duration} </p>
  <p>Verificar que:
  <ul><li> No se hayan presentado ataques por fuerza bruta rapido, lento y/o distribuido.</li>
  <li> La metrica calculada por cantidad de usuarios detras de un proxy sea la adecuada. </li>
  <li> Ejecutar el procedimiento de desbloqueo de ip. </p>
  </div> ${htmlExtra}`

  const header = {
    from: `" Enable Technologies ${process.env.MAIL_HOST} 👻" <${process.env.MAIL_USER}>`,
    to: receiver.toString(), // si viene de un arreglo con varios correos
    subject: `Alerta Seguridad Limitador de Solicitudes CertiGNV ${process.env.MAIL_HOST} ✔`,
    //text: `${user} ${family} ${ip}`, // plain text body
    html, // html body
  };
  
  try {
    const infoMailer = await transporter.sendMail(header);
    return infoMailer.messageId; 
  } catch (error) {
    return error
  } 
}

const labelRedisDisconnect = async (data) => {
  const receiver = ["lramos@enable.com.co"];
  //const receiver = ["lramos@enable.com.co", "soporte@enable.com.co"];
  const html = `<h1>Servidor de Correo Automatico CertiGNV</h1>
  <div>
  <h2> Desconexion Servicio ${data.service} </h2>
  <p>Descripcion Error:</p>
  <p>${data} </p>
  </div>`;

  const header = {
    from: `" Enable Technologies ${process.env.MAIL_HOST} 👻" <${process.env.MAIL_USER}>`,
    to: receiver.toString(), // si viene de un arreglo con varios correos
    subject: `Alerta Desconexion Servicio CertiGNV ${process.env.MAIL_HOST} ✔`,
    //text: `${user} ${family} ${ip}`, // plain text body
    html, // html body
  };

  try {
    const infoMailer = await transporter.sendMail(header);
    return infoMailer.messageId;
  } catch (error) {
    return error;
  }
};

module.exports = { labelMailNewPass, labelMailBlock, labelRedisDisconnect };
