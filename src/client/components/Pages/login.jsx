import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { store } from "../../Redux/store";
import { getUser } from "../../Redux/actionCreators";
import { captch, outSession } from "../Atoms/functions/logSession";

const Login = ({ history }) => {
  
  
  const [stateLog, setStateLog] = useState();
  const [stateInpUser, setStateInpUser] = useState();
  const url = `${process.env.REACT_APP_API_URL}/login`;
  const outLog = () => {
    outSession(stateInpUser);
    history.push("/");
  }
  const genCapt = (e) => {
    captch(url, e.target.value);
    // captch(e.target.value);
  };
  const auth = (e) => {
    e.preventDefault();
    Array.from(window.document.getElementsByClassName("msg_alert")).map(
      (e) => (e.innerHTML = "")
    );
    // Visualizacion del loading por limitador de Velocidad Y/O demora en respuesta
    window.document.getElementById("icLoad").style.display = "block";
    window.document.getElementById("respSend").style.display = "none";
    const dataForm = {
      user: e.target.user.value,
      pass: e.target.pass.value,
      captcha: e.target.captcha.value,
    };
    setStateInpUser(e.target.user.value);
    axios({
      method: "post",
      url,
      data: dataForm,
      //config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        window.document.getElementById("respSend").style.display = "none";
        //console.log("RESPONSE SERVER", res);
        const { token, user, family, flag } = res.data.payload;
        if (token) {
          localStorage.removeItem("tokenPublic"); // elimino el token del usuario de infopublica
          localStorage.setItem("token", token);
          store.dispatch(getUser(user, family, flag));
          //window.location.href = `/${family}`;
          history.push(`/${family}`);
        }
      })
      .catch((error) => {
        console.log("ERROR RESPONSE ", error.response);
        const { process, message, path } = error.response.data;
        Array.from(window.document.getElementsByClassName("msg_alert")).map(
          (e) => (e.innerHTML = "")
        );
        window.document.getElementById("icLoad").style.display = "none";
        window.document.getElementById("respSend").style.display = "block";

        //validacion por limitacion de solicitudes
        if (error.response.status === 429)
          return (window.document.getElementById(
            "msg_form"
          ).innerHTML = message);
        //  if elseif -> Mejor rendimiento que un switch
        if (process === 3) {
          //Validacion Procedimiento con Respuesta para Validacion de usuario
          setStateLog(process);
        } else if (process === 0) {
          //Validacion Formulario
          captch(url, window.document.getElementById("user").value);
          window.document.getElementById(`msg_${path}`).innerHTML = message;
        } else if (process === 1 || process === 2) {
          //Validacion Procedimiento
          captch(url, window.document.getElementById("user").value);
          window.document.getElementById("msg_form").innerHTML = message;
        } else {
          window.document.getElementById("msg_form").innerHTML =
            "ALGO FUE MAL....";
        }
      });
  };

  // console.log("ESTADO Usuario ", stateUser);
  return (
    <>
      <h1>Login Certificadores</h1>

      {!stateLog ? (
        <div>
          <div id="respSend">
            {}
            <form id="formulario" onSubmit={auth.bind()}>
              <p>
                <label htmlFor="user">
                  Usuario
                  <input
                    type="text"
                    name="user"
                    id="user"
                    placeholder="Ingrese su usuario"
                    tabIndex="1"
                    // autoFocus // No autofocus, si se activa hace una solicitud GET iniciando
                    onBlur={genCapt.bind()}
                  />
                </label>
              </p>
              <span id="msg_user" className="msg_alert"></span>
              <p>
                <label htmlFor="pass">
                  Contraseña
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Ingrese su Contraseña"
                    tabIndex="2"
                  />
                </label>
              </p>
              <span id="msg_pass" className="msg_alert"></span>
              <p id="svgCaptcha" className="p_captcha"></p>
              <p className="p_ver_captcha">
                <label htmlFor="captcha">
                  Cod Verificación
                  <input
                    type="text"
                    name="captcha"
                    id="captcha"
                    placeholder="Ingrese el Codigo"
                    tabIndex="3"
                  />
                </label>
              </p>
              <span id="msg_captcha" className="msg_alert"></span>
              <p>
                <input id="btnSnd" type="submit" value="Enviar" />
              </p>
              <p id="msg_form" className="msg_alert"></p>
            </form>
            <p id="lnkNewPass">
              <NavLink to="/login/password" exact>
                Renovar Contraseña
              </NavLink>
            </p>
          </div>
          <div>
            <img
              id="icLoad"
              src="/images/load.gif"
              alt="Loading"
              className="profile_hidden"
            ></img>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p>
              Se Detecto que para este Usuario existe una Sesion abierta en otro
              Explorador o Host, O la ultima sesion valida no se cerro de manera
              segura. Desea Cerrar la Sesion Existente y comenzar otra sesion
              valida?
            </p>
            <p>
              <button onClick={outLog.bind()}>
                SI
              </button>
              <button
                onClick={() => {
                  setStateLog();
                }}
              >
                NO
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};;

export default Login;

// const Session = ({ history, inpUser }) => {
//   const logOutSession = (user) => {
//     axios
//       .put(`${process.env.REACT_APP_API_URL}/logout/${user}`)
//       .then((res) => {
//         history.push("/");
//       })
//       .catch((error) => {
//         const { status } = error.response;
//         //console.log("ERROR LogoutSession->Login.jsx", data);
//         history.push(`/error?error=${status}`);
//       });
//   };
//   console.log("Usuario ", user);
//   return (
//     <div>
//       <p>
//         Se Detecto que para este Usuario existe una Sesion abierta en otro
//         Explorador o Host, O la ultima sesion valida no se cerro de manera
//         segura. Desea Cerrar la Sesion Existente y comenzar otra sesion valida?
//       </p>
//       <p>
//         {/* <button onClick={() => logOutSession(inpUser)}>SI</button> */}
//         <button
//           onClick={() => {
//             history.push(`/`);
//           }}
//         >
//           NO
//         </button>
//       </p>
//     </div>
//   );
// };
