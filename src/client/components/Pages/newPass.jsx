import React, { useState } from "react";
import axios from "axios";
const NewPass = () => {
  const recover = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/login/password`;
    console.log("URL", url);
    const dataForm = {
      user: e.target.user.value,
      mail: e.target.mail.value,
    };
    axios({
      method: "post",
      url: url,
      data: dataForm,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
    .then((res) => {
      console.log("RESPONSE SERVER", res);
      const { message } = res.data;
      setStateMsg(message)
    })
    .catch((error) => {
      console.log("ERROR RESPONSE ", error.response);
      const { process, message, path } = error.response.data;
      console.log('mensaje process ', process);
      
      Array.from(window.document.getElementsByClassName("msg_alert")).map(
        (e) => (e.innerHTML = "")
      );
      // Validacion RateLimit
      if (error.response.status === 429)
        return (window.document.getElementById("msg_form").innerHTML = message);
      if(process===0){
        window.document.getElementById(`msg_${path}`).innerHTML = message;
      }else if(process===1){
        window.document.getElementById("msg_form").innerHTML = message;
      }else{
        window.document.getElementById("msg_form").innerHTML = 'ALGO FUE MAL....';
      }
    });
  };
const [stateMsg, setStateMsg] = useState();
//console.log('ESTADO ', stateMsg);
  return (
    <>
      <h1>RENOVAR Contraseña CertiGNV</h1>
      {(stateMsg===undefined) ? (
        <form id="formulario" onSubmit={recover.bind()}>
          <p>
            <label htmlFor="user">
              Usuario
              <input
                type="text"
                name="user"
                id="user"
                placeholder="Ingrese su usuario"
                autoFocus
              />
            </label>
          </p>
          <span id="msg_user" className="msg_alert"></span>
          <p>
            <label htmlFor="email">
              Correo Electrónico
              <input
                type="text"
                name="mail"
                id="mail"
                placeholder="Ingrese su eMail"
              />
            </label>
          </p>
          <span id="msg_mail" className="msg_alert"></span>
          <p>
            <input type="submit" value="Enviar" />
          </p>
          <p id="msg_form" className="msg_alert"></p>
        </form>
      ) : (
        <div>
          <SendMail msg={stateMsg} />
        </div>
      )}
    </>
  );
};
export default NewPass;

const SendMail = ({ msg }) => {
  console.log("Mail ", msg);
  return (
    <div>
      <p>
        {msg}.
      </p>
      <p>
        <button
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          OK
        </button>
      </p>
    </div>
  );
};
