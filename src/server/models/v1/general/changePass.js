const FormError = require('../../../error/v1/formValidatedError');
const crypt = require('../../../helpers/v1/bcrypt');
const db = require('../index')
const modelChangePass = {}
const dtoMail = require('../../../dto/v1/mail/labelsMail')

modelChangePass.create = async (passData, callback) => {
  const payload = {};
  
  if (passData.new_pass === passData.pass) {
    throw new FormError({
      process: 1,
      message: "LA NUEVA CONTRASEÑA NO PUEDE SER IGUAL A LA CONTRASEÑA ACTUAL ",
    }).toJson();
  }

  let querySql = `SELECT D_PASSWORD AS pass from gnv_t_usuario_pass WHERE R_USUARIO=${db.escape(passData.user)} ORDER BY K_USUARIO_PASS DESC `;
  if(process.env.RE_USE_PASSWORD==='true') querySql += ` LIMIT 1`;
  const resultSql = await db.query(querySql);

//Si se permite reutilizar contraseñas el resultado es un arreglo de un unico valor, sino, trae los HASH que han sido asociados al usuario y verifica que no se vuelvan a reutilizar contraseñas
const validatePromises = [];
  for (let i = 0; i < resultSql.length; i++) {
    if(i===0){ 
      const val_present = await crypt.desencrypt(passData.pass, resultSql[i].pass);
      if (!val_present) {
        throw new FormError({
          process: 1,
          message: "LA CONTRASEÑA ACTUAL ES ERRONEA ",
        }).toJson();
      }
    }else{ // NO permite reutilizar contraseñas
      validatePromises.push(crypt.desencrypt(passData.new_pass, resultSql[i].pass))
    }
  }
  if(validatePromises.length>0){ 
    const resultPromises = await Promise.all(validatePromises);
    if(resultPromises.includes(true)){
      throw new FormError({
          process: 1,
          message: "LA NUEVA CONTRASEÑA INGRESADA YA HA SIDO UTILIZADA ",
        }).toJson();
    }
  } 

  const new_pass = await crypt.encrypt(passData.new_pass);
  const sqlupdt = `
    SET @user = ?;
    SET @new_pass = ?;
    SET @ip = ?;
    CALL gnv2_p_user_change_pass(@user, @new_pass, @ip, @error, @errMsg, @mail);
    SELECT @error AS error, @errMsg AS errMsg, @mail AS mail;
  `;

  const resultUpdt = await db.query(sqlupdt, [passData.user, new_pass, passData.ip]);
  resultUpdt.flat().forEach((e) => {
    if (e.error !== undefined) {
      payload.process = e.error;
      payload.message = e.errMsg;
      payload.mail = e.mail;
    }
  });

  if (payload.process !== 0) {
    throw new FormError(payload).toJson();
  }
  //envio correo
  const sendMail = await dtoMail.labelMailChangePass(passData.user, payload.mail, passData.ip);
  payload.idMail = sendMail;
  const data = {
    success: true,
    payload,
  }
  callback(data)
}


module.exports = modelChangePass
