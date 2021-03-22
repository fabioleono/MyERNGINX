import React, { useState } from "react";
import axios from "axios";


const NewPass = ({ history }) => {
  const [stateResp, setStateResp] = useState();
  const url = `${process.env.REACT_APP_API_URL}/login/password`;
  //console.log("URL", url);
  const captch = (userInpt) => {
    //console.log("ENTRA a captcha", userInpt);
    axios
      .get(url, {
        params: {
          userInpt,
        },
      })
      .then((res) => {
        window.document.getElementById("svgId").innerHTML = res.data;
      })
      .catch((error) => {
        //console.log("ERROR CAPTCHA ", error ;
      });
  };
  const genCapt = () => {
    Array.from(window.document.getElementsByClassName("msg_alert")).map(
      (e) => (e.innerHTML = "")
    );
    if (window.document.getElementById("user").value.length >= 3) {
      captch(window.document.getElementById("user").value);
    }
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
      //config: { headers: { "Content-Type": "multipart/form-data" } },
    })
    .then((res) => {
      //console.log("RESPONSE SERVER", res);
      
      setStateResp(res.data)
    })
    .catch((error) => {
      
      //console.log("ERROR RESPONSE ", error.response);
      const { process, message, path } = error.response.data;
      //console.log("mensaje process ", process);

      Array.from(window.document.getElementsByClassName("msg_alert")).map(
        (e) => (e.innerHTML = "")
      );
      //window.document.getElementById("user").value = "";
      //window.document.getElementById("mail").value = "";
      window.document.getElementById("captcha").value = "";
      window.document.getElementById("icLoad").style.display = "none";
      window.document.getElementById("btnSnd").style.display = "block";
      // Validacion RateLimit
      if (error.response.status === 429)
        return (window.document.getElementById("msg_form").innerHTML = message);
      if (process === 0) {
        //Validacion Formulario
        window.document.getElementById(`msg_${path}`).innerHTML = message;
        captch(window.document.getElementById("user").value);
      } else if (process === 1) {
        //Validacion Procedimiento
        window.document.getElementById("msg_form").innerHTML = message;
        captch(window.document.getElementById("user").value);
      } else {
        window.document.getElementById("msg_form").innerHTML =
          "ALGO FUE MAL....";
      }
      
      
    });
    
  };

// console.log('ESTADO Msg', stateResp);

  return (
    <>
      <h1>RENOVAR Contraseña CertiGNV</h1>
      {!stateResp ? (
        <div id="respSend">
          {}
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
                  onBlur={genCapt.bind()}
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
          <SendMail history={history} msg={stateResp.payload.message} />
        </div>
      )}
    </>
  );
};
export default NewPass;

const SendMail = ({ history, msg }) => {
  
  //console.log("Mail ", msg);
  setTimeout(() => {
    history.push("/");
  }, 3000);
  return (
    <div>
      <p>
        {msg}.
      </p>
      <p>
        <button
          onClick={() => {
            //window.location.href = "/login";
            history.push('/');
          }}
        >
          OK
        </button>
      </p>
    </div>
  );
};
