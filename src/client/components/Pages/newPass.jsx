import React, { useState } from "react";
import axios from "axios";
const NewPass = () => {
  const [stateMsg, setStateMsg] = useState();
  const url = `${process.env.REACT_APP_API_URL}/login/password`;
  //console.log("URL", url);
  const captch = () => {
    axios
      .get(`${url}`)
      .then((res) => {
        window.document.getElementById("svgId").innerHTML = res.data;
      })
      .catch((error) => {
        //console.log("ERROR CAPTCHA ", error ;
      });
  };
  const recover = (e) => {
    e.preventDefault();
    Array.from(window.document.getElementsByClassName("msg_alert")).map(
      (e) => (e.innerHTML = "")
    );
    window.document.getElementById("btnSnd").style.display = "none";
    window.document.getElementById("icLoad").style.display = "block";
    
    const dataForm = {
      user: e.target.user.value,
      mail: e.target.mail.value,
      captcha: e.target.captcha.value,
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
      captch();
      console.log("ERROR RESPONSE ", error.response);
      const { process, message, path } = error.response.data;
      console.log("mensaje process ", process);

      Array.from(window.document.getElementsByClassName("msg_alert")).map(
        (e) => (e.innerHTML = "")
      );
      window.document.getElementById("user").value = "";
      window.document.getElementById("mail").value = "";
      window.document.getElementById("captcha").value = "";
      window.document.getElementById("icLoad").style.display = "none";
      window.document.getElementById("btnSnd").style.display = "block";
      // Validacion RateLimit
      if (error.response.status === 429)
        return (window.document.getElementById("msg_form").innerHTML = message);
      if (process === 0) {
        //Validacion Formulario
        window.document.getElementById(`msg_${path}`).innerHTML = message;
      } else if (process === 1) {
        //Validacion Procedimiento
        window.document.getElementById("msg_form").innerHTML = message;
      } else {
        window.document.getElementById("msg_form").innerHTML =
          "ALGO FUE MAL....";
      }
    });
    
  };

// console.log('ESTADO Msg', stateMsg);

  return (
    <>
      <h1>RENOVAR Contraseña CertiGNV</h1>
      {stateMsg === undefined ? (
        <div id="respSend">
          {captch()}
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
                  type="email"
                  name="mail"
                  id="mail"
                  placeholder="Ingrese su eMail"
                />
              </label>
            </p>
            <span id="msg_mail" className="msg_alert"></span>
            <p id="svgId"></p>
            <p>
              <label htmlFor="captcha">
                Cod Verificación
                <input
                  type="text"
                  name="captcha"
                  id="captcha"
                  placeholder="Ingrese el Codigo"
                />
              </label>
            </p>
            <p>
              <input id="btnSnd" type="submit" value="Enviar" />
              <img
                id="icLoad"
                src="/images/load.gif"
                alt="Loading"
                className="profile_hidden"
              ></img>
            </p>
            <p id="msg_form" className="msg_alert"></p>
          </form>
        </div>
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
