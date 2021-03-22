import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { store } from "../../Redux/store";
import { getUser } from "../../Redux/actionCreators";

const Login = ({ history }) => {
  // Si hay un Token existe un login Valido. Puede ocurrir despues de loguearse yendo ATRAS con el browser. Los browser antiguos se comportan diferente con la navegacion atras adelante
  if (localStorage.getItem('token')) window.location.href = `/`; // Lo lleva a raiz de la Familia
  
  const [stateLog, setStateLog] = useState();
  const [stateInpUser, setStateInpUser] = useState();
  const url = `${process.env.REACT_APP_API_URL}/login`;
  //console.log("URL", url);
  const captch = (userInpt) => {
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
  const auth = (e) => {
    e.preventDefault();
    Array.from(window.document.getElementsByClassName("msg_alert")).map(
      (e) => (e.innerHTML = "")
    );
    window.document.getElementById("btnSnd").style.display = "none";
    window.document.getElementById("lnkNewPass").style.display = "none";
    window.document.getElementById("icLoad").style.display = "block";
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
          // console.log("USER FAMILY ", family);
          store.dispatch(getUser(user, family, flag));
          //window.location.href = `/${family}`;
          history.push(`/${family}`);
        }
      })
      .catch((error) => {
        //console.log("ERROR RESPONSE ", error.response);
        const { process, message, path } = error.response.data;
        Array.from(window.document.getElementsByClassName("msg_alert")).map(
          (e) => (e.innerHTML = "")
        );
        //window.document.getElementById("user").value = "";
        //window.document.getElementById("pass").value = "";
        window.document.getElementById("captcha").value = "";
        window.document.getElementById("icLoad").style.display = "none";
        window.document.getElementById("btnSnd").style.display = "block";
        window.document.getElementById("lnkNewPass").style.display = "block";

        //validacion por limitacion de solicitudes
        if (error.response.status === 429)
          return (window.document.getElementById(
            "msg_form"
          ).innerHTML = message);
        //  if elseif -> Mejor rendimiento que un switch
        if (process === 3) {
          //Validacion Procedimiento
          setStateLog(process);
        } else if (process === 0) {
          //Validacion Formulario
          window.document.getElementById(`msg_${path}`).innerHTML = message;
          captch(window.document.getElementById("user").value);
        } else if (process === 1 || process === 2) {
          //Validacion Procedimiento
          window.document.getElementById("msg_form").innerHTML = message;
          captch(window.document.getElementById("user").value);
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
                  autoFocus
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
                />
              </label>
            </p>
            <span id="msg_pass" className="msg_alert"></span>
            <p id="svgId" className="p_captcha"></p>
            <p className="p_ver_captcha">
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
            <span id="msg_captcha" className="msg_alert"></span>
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
          <p id="lnkNewPass">
            <NavLink to="/login/password" exact>
              Renovar Contraseña
            </NavLink>
          </p>
        </div>
      ) : (
        <div>
          <Session history={history} inpUser={stateInpUser} />
        </div>
      )}
    </>
  );
};;

export default Login;

const Session = ({ history, inpUser }) => {
  const logOutSession = (user) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/logout/${user}`)
      .then((res) => {
        history.push("/");
      })
      .catch((error) => {
        const { status } = error.response;
        //console.log("ERROR LogoutSession->Login.jsx", data);
        history.push(`/error?error=${status}`);
      });
  };
  //console.log("Usuario ", user);
  return (
    <div>
      <p>
        Se Detecto que para este Usuario existe una Sesion abierta en otro
        Explorador o Host, O la ultima sesion valida no se cerro de manera
        segura. Desea Cerrar la Sesion Existente y comenzar otra sesion valida?
      </p>
      <p>
        <button onClick={() => logOutSession(inpUser)}>SI</button>
        <button
          onClick={() => {
            history.push(`/`);
          }}
        >
          NO
        </button>
      </p>
    </div>
  );
};
