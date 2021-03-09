import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { store } from "../../Redux/store";
import { getUser } from "../../Redux/actionCreators";
import { logOutSession } from "../Molecules/logOut";

const Login = () => {
  const [stateLog, setStateLog] = useState();
  const [stateUser, setStateUser] = useState();
  const url = `${process.env.REACT_APP_API_URL}/login`;
  //console.log("URL", url);
  const captch = () =>{
    axios
      .get(`${url}`)
      .then((res) => {
        window.document.getElementById("svgId").innerHTML = res.data;
      })
      .catch((error) => {
        //console.log("ERROR CAPTCHA ", error ;
      });
  }
  
  const auth = (e) => {
    //console.log(e.target);
    e.preventDefault();
    //console.log("entorno ", process.env.REACT_APP_API_URL);
    Array.from(window.document.getElementsByClassName("msg_alert")).map(
      (e) => (e.innerHTML = "")
    );
    window.document.getElementById('btnSnd').style.display = 'none'
    window.document.getElementById("lnkNewPass").style.display = "none";
    window.document.getElementById("icLoad").style.display = "block";
    const dataForm = {
      user: e.target.user.value,
      pass: e.target.pass.value,
      captcha: e.target.captcha.value,
    };
    setStateUser(e.target.user.value);
    axios({
      method: "post",
      url: url,
      data: dataForm,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        console.log("RESPONSE SERVER", res);
        const { token, user, family } = res.data;
        if (token) {
          localStorage.removeItem("tokenPublic"); // elimino el token del usuario de infopublica
          localStorage.setItem("token", token);
          // console.log("USER FAMILY ", family);
          store.dispatch(getUser(user, family));
          window.location.href = `/${family}`;
        }
      })
      .catch((error) => {
        captch();
        console.log("ERROR RESPONSE ", error.response);
        const { process, message, path } = error.response.data;
        Array.from(window.document.getElementsByClassName("msg_alert")).map(
          (e) => (e.innerHTML = "")
        );
        window.document.getElementById("user").value = "";
        window.document.getElementById("pass").value = "";
        window.document.getElementById("captcha").value = "";
        window.document.getElementById("icLoad").style.display = "none";
        window.document.getElementById("btnSnd").style.display = "block";
        window.document.getElementById("lnkNewPass").style.display = "block";
       //validacion por limitacion de solicitudes
        if (error.response.status === 429)
          return (window.document.getElementById("msg_form").innerHTML = message);
        //  if elseif -> Mejor rendimiento que un switch
        if (process === 3) { //Validacion Procedimiento
          setStateLog(process);
        } else if (process === 0) { //Validacion Formulario 
          window.document.getElementById(`msg_${path}`).innerHTML = message;
        } else if (process === 1 || process === 2) { //Validacion Procedimiento
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
        <div id="respSend">
          {captch()}
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
          <Session user={stateUser} />
        </div>
      )}
    </>
  );
};
export default Login;

const Session = ({ user }) => {
  //console.log("Usuario ", user);
  return (
    <div>
      <p>
        Se Detecto que para este Usuario existe una Sesion abierta en otro
        Explorador o Host, O la ultima sesion valida no se cerro de manera
        segura. Desea Cerrar la Sesion Existente y comenzar otra sesion valida?
      </p>
      <p>
        <button onClick={() => logOutSession(user)}>SI</button>
        <button
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          NO
        </button>
      </p>
    </div>
  );
};

// import React, { Component } from "react";

// import axios from "axios";

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: [],
//     };
//   }
//   componentDidMount() {
//     document.getElementById("formu").addEventListener("submit", (e) => {
//       e.preventDefault();
//       const url = `${process.env.REACT_APP_API_URL}/Login`;
//       const dataForm = {
//         user: e.target.user.value,
//         pass: e.target.pass.value,
//       };
//       axios
//         .post(url, dataForm)
//         .then((res) => {
//           //console.log(res);
//           if (res.data.token) {
//             localStorage.removeItem("tokenPublic");
//             localStorage.setItem("token", res.data.token);
//             window.location.href = `/CertiGNV/${res.data.user}`;
//           } else {
//             document.getElementById("msgError").innerHTML = res.data.message;
//           }
//           console.log(res.data);
//         })
//         .catch((e) => console.log(e));
//     });
//   }
//   render() {
//     return (
//       <>
//         <h1>Login Certificadores</h1>
//         {/* <form id="formulario" onSubmit={auth.bind()}> */}
//         <form id="formu">
//           <label htmlFor="user">
//             Usuario
//             <input
//               type="text"
//               name="user"
//               id="user"
//               placeholder="Ingrese su usuario"
//             />
//           </label>
//           <label htmlFor="pass">
//             Contraseña
//             <input
//               type="password"
//               name="pass"
//               id="pass"
//               placeholder="Ingrese su Contraseña"
//             />
//           </label>
//           <input type="submit" value="Enviar" />
//         </form>
//         <div id="msgError"></div>
//       </>
//     );
//   }
// }
// export default Login;
