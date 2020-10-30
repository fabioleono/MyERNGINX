import React , { useState } from "react";
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
  setStateUser(e.target.user.value)
  axios
    .put(url, dataForm)
    .then((res) => {
      console.log("RESPONSE SERVER", res);
      const { token, user, type, message, log } = res.data;
      if (!token) {
        if (log === -3) {
          return setStateLog(log);
        } else {
          return window.document.getElementById('msgError').innerHTML=message
        }
      }

      localStorage.removeItem("tokenPublic"); // elimino el token del usuario de infopublica
      localStorage.setItem("token", token);
      const family = type.slice(6);
      // console.log("USER FAMILY ", family);
      store.dispatch(getUser(user, family));

      window.location.href = `/${family}`;
    })
    .catch((e) => console.log(e));
};

const [stateLog, setStateLog] = useState()
const [stateUser, setStateUser] = useState();
//console.log('ESTADO ', stateLog);
  
  return (
    <>

      <h1>Login Certificadores</h1>

      {!stateLog ? 
      <form id="formulario" onSubmit={auth.bind()}>
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
        <label htmlFor="pass">
          Contraseña
          <input
            type="password"
            name="pass"
            id="pass"
            placeholder="Ingrese su Contraseña"
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>
      :
       (
        <div>
          <Session user={stateUser} />
        </div>
      )}
      <div id="msgError"></div>
    </>
  );
};
export default Login;

const Session = ({ user }) => {
  
    return (
      <div>
        <p>
          Se Detecto que para este Usuario existe una Sesion abierta en otro
          Explorador o Host, O la ultima sesion valida no se cerro de manera
          segura. Desea Cerrar la Sesion Existente y comenzar otra sesion
          valida?

        </p>
        <p><button onClick={() => logOutSession(user)}>SI</button><button onClick={() => {window.location.href='/login'}}>NO</button></p>
      </div>
    );        
  

}

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
