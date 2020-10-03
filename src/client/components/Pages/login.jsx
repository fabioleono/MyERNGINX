
import React from 'react' 

const auth = e => {
  //console.log(e.target);
  e.preventDefault()
  const url = "/Login";

  const dataForm = {
    user: e.target.user.value,
    pass: e.target.pass.value
  }
  // console.log('dta', dataForm);
  // console.log("dta stringy", JSON.stringify(dataForm));
  const myHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    //'Content-Type': 'application/x-www-form-urlencoded',
  };
  const myInit = {
    method: "POST",
    body: JSON.stringify(dataForm),
    headers: myHeaders,
    // mode: "cors",
    // cache: "default",
  };
  // console.log(myInit);
 
  fetch(url, myInit)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if(json.token){
        localStorage.setItem("token", json.token);
        window.location="/CertiGNV"
      }else{
        document.getElementById('msgError').innerHTML=json.message
      }
    }).catch((e) => console.log(e));
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
        <input type="submit" value="Enviar"  />
      </form>
      <div id="msgError"></div>
    </>
  );
}
export default Login
