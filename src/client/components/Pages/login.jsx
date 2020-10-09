import React from "react";
import axios from "axios";

const auth = e => {
  //console.log(e.target);
  e.preventDefault();
  //console.log("entorno ", process.env.REACT_APP_API_URL);
  const url = `${process.env.REACT_APP_API_URL}/Login`;

  const dataForm = {
    user: e.target.user.value,
    pass: e.target.pass.value,
  };
  // console.log('dta', dataForm);
  // console.log("dta stringy", JSON.stringify(dataForm));

  // const myInit = {
  //   method: "POST",
  //   body: JSON.stringify(dataForm),
  // };
  // console.log(myInit);

  //   fetch(url, myInit)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json);
  //       if(json.token){
  //         localStorage.setItem("token", json.token);
  //         window.location="/Users"
  //       }else{
  //         document.getElementById('msgError').innerHTML=json.message
  //       }
  //     }).catch((e) => console.log(e));

  axios
    .post(url, dataForm)
    .then((res) => {
      //console.log(res);
      if (res.data.token) {
        localStorage.removeItem('tokenPublic')
        localStorage.setItem("token", res.data.token);
        window.location.href = `/CertiGNV/${res.data.user}`;
      } else {
        document.getElementById("msgError").innerHTML = res.data.message;
      }
      console.log(res.data);
    })
    .catch((e) => console.log(e));
}

const Login = () => {
  return (
    <>
      <h1>Login Certificadores</h1>
      <form id="formulario" onSubmit={auth.bind()}>
        <label htmlFor="user">
          Usuario
          <input
            type="text"
            name="user"
            id="user"
            placeholder="Ingrese su usuario"
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
      <div id="msgError"></div>
    </>
  );
};
export default Login;
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
