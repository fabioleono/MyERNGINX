import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { store } from "../../Redux/store";
import { logOutUser } from "../../Redux/actionCreators";

const ChangePass = ({ history, user, family }) => {
  
  const letHome = () => {
    history.push("/contacto");
  };
  const [stateResp, setStateResp] = useState();
  const url = `${process.env.REACT_APP_API_URL}/${family}/password`;
 
  const change = (e) => {
    e.preventDefault();
    Array.from(window.document.getElementsByClassName("msg_alert")).map(
      (e) => (e.innerHTML = "")
    );
    window.document.getElementById("btnSndChangePass").style.display = "none";
    window.document.getElementById("icLoad").style.display = "block";
    
    const dataForm = {
      user,
      pass: e.target.pass.value,
      new_pass: e.target.new_pass.value,
    };
    axios({
      method: "post",
      url,
      data: dataForm,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        //console.log("RESPONSE CHANGE PASS", res);
        setStateResp(res.data);
      })
      .catch((error) => {
        //console.log("ERROR RESPONSE CHANGE PASS", error.response);
        const { process, message, path } = error.response.data;
        const { status } = error.response;
        Array.from(window.document.getElementsByClassName("msg_alert")).map(
          (e) => (e.innerHTML = "")
        );
        window.document.getElementById("btnSndChangePass").style.display = "block";
        window.document.getElementById("icLoad").style.display = "none";
        // Validacion JWT
        if (status === 401 || status === 403){
          //console.log("SET REDUX ");
          store.dispatch(logOutUser());
          history.push(`/error?error=${status}`);
          // return (window.location = `/error?error=${status}`);
        }
        if (process === 0) {
          //Validacion Formulario
          window.document.getElementById(`msg_${path}`).innerHTML = message;
        } else if (process === 1) {
          //Validacion Procedimiento
          window.document.getElementById("msg_form_changePass").innerHTML = message;
        } else {
          window.document.getElementById("msg_form_changePass").innerHTML = "ALGO FUE MAL....";
        }
      });
  };

//console.log('user ', user, 'resp ', stateResp);

  return (
    <>
      <h1 onClick={letHome.bind()}>Cambiar Contraseña {user} </h1>
      {user && (
        <div id="respSend">
          {!stateResp ? (
            <form id="formulario" onSubmit={change.bind()}>
              <p>
                <label htmlFor="pass">
                  Contraseña Actual
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Ingrese su Contraseña Actual"
                    autoFocus
                  />
                </label>
              </p>
              <span id="msg_pass" className="msg_alert"></span>
              <p>
                <label htmlFor="new_pass">
                  Nueva Contraseña
                  <input
                    type="password"
                    name="new_pass"
                    id="new_pass"
                    placeholder="Ingrese su Nueva Contraseña"
                  />
                </label>
              </p>
              <span id="msg_new_pass" className="msg_alert"></span>

              <p>
                <input id="btnSndChangePass" type="submit" value="Enviar" />
                <img
                  id="icLoad"
                  src="/images/load.gif"
                  alt="Loading"
                  className="profile_hidden"
                ></img>
              </p>
              <p id="msg_form_changePass" className="msg_alert"></p>
            </form>
          ) : stateResp.success ? (
            <div>{<SendOk history={history} msg={stateResp.payload.message} user={user} />}</div>
          ) : (
            <div>{stateResp.payload}</div>
          )}
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  family : state.userReducer.family,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);

const SendOk = ({ history, msg, user }) => {
  
  const logOutSession = (user) => {
    store.dispatch(logOutUser());
    axios
      .put(`${process.env.REACT_APP_API_URL}/logout/${user}`)
      .then((res) => {
        history.push("/");
      })
      .catch((error) => {
        const { status } = error.response;
        //console.log("ERROR LogoutSession->ChangePass.jsx", data);
        //return (window.location = `/error`);
        history.push(`/error?error=${status}`);
      });
  };
  
  setTimeout(() => {
    logOutSession(user)
  }, 3000);
  return (
    <div>
      <p>{msg}.</p>
      <p>
        <button
          onClick={() => logOutSession(user)}
        >
          OK
        </button>
      </p>
    </div>
  );
};
