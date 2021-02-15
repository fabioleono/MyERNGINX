import React, { useState } from "react";
import axios from "axios";
import { store } from "../../Redux/store";
import { getUser } from "../../Redux/actionCreators";
import { logOutSession } from "../Molecules/logOut";

const Login = () => {
  const auth = (e) => {
    //console.log(e.target);
    e.preventDefault();
    //console.log("entorno ", process.env.REACT_APP_API_URL);
    const url = `${process.env.REACT_APP_API_URL}/login`;
    console.log("URL", url);

    const dataForm = {
      user: e.target.user.value,
      pass: e.target.pass.value,
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
      console.log("ERROR RESPONSE ", error.response);

      const { process, message, path } = error.response.data;
      Array.from(window.document.getElementsByClassName("msg_alert")).map(
        (e) => (e.innerHTML = "")
      );
      //validacion en el Backend: YUP y RequRateLimit
      if (error.response.status === 429)
        return (window.document.getElementById("msg_form").innerHTML =
          error.response.data);

      // Cambiar el switch por un if elseif- Mejor rendimiento
      switch (process) {
        case 3: //determinado en el procedimiento.Session Abierta
          setStateLog(process);
          break;
        case 0:
          window.document.getElementById(`msg_${path}`).innerHTML = message;
          break;
        case 1:
          window.document.getElementById("msg_form").innerHTML = message;
          break;

        default:
          break;
      }
    });
  };

  const [stateLog, setStateLog] = useState();
  const [stateUser, setStateUser] = useState();
//console.log('ESTADO ', stateLog);


  return (
    <>
      <h1>Login Certificadores</h1>

      {!stateLog ? (
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
          <p>
            <input type="submit" value="Enviar" />
          </p>
          <p id="msg_form" className="msg_alert"></p>
        </form>
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
