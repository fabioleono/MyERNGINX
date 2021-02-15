const mail = [
  "lramos@enable.com.co",
];
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
const headerMail = (user, family, ip) => {
  const header = {
    from: `" Enable Technologies ${process.env.MAIL_HOST} 👻" <${process.env.MAIL_USER}>`,
    to: mail.toString(),
    subject: `Verificacion Rate Limit ${process.env.MAIL_HOST} ✔`,
    //text: `${user} ${family} ${ip}`, // plain text body
    html: `<h1>Email Automatico</h1>
    <ul>
    <h2>Verificacion Request Rate Limit </h2>
      <h3>Usuario: ${user}</h3>
      <h3>Familia: ${family}</h3>
      <h3>IP: ${ip}</h3>
      <h3>Servidor: Local - AWS Server </h3>`, // html body
  };
  return header
}
module.exports = { headerMail, objMail }
