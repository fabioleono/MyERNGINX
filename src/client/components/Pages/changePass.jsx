import React, { useState } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import { outSession } from "../Atoms/functions/logSession";
import { postAxios } from "../Atoms/functions/httpReq";

const ChangePass = ({ history, user, family }) => {
  // console.log('history', history);
  const [stateResp, setStateResp] = useState();
  const url = `${process.env.REACT_APP_API_URL}/${family}/password`;
 
  const change = async(e) => {
    e.preventDefault();
    Array.from(window.document.getElementsByClassName("msg_alert")).map(
      (e) => (e.innerHTML = "")
    );
    window.document.getElementById("btnSndForm").style.display = "none";
    window.document.getElementById("icLoad").style.display = "block";
    
    const dataForm = {
      user,
      pass: e.target.pass.value,
      new_pass: e.target.new_pass.value,
    };
    const token = localStorage.getItem("token");
    const dataAxios = await postAxios(url, token, history, dataForm)
    setStateResp(dataAxios);

    // axios({
    //   method: "post",
    //   url,
    //   data: dataForm,
    //   headers: {
    //     "x-access-token": localStorage.getItem("token"),
    //   },
    // })
    //   .then((res) => {
    //     //console.log("RESPONSE CHANGE PASS", res);
    //     setStateResp(res.data);
    //   })
    //   .catch((error) => {
    //     console.log("ERROR RESPONSE CHANGE PASS", error.response);
    //     const { process, message, path } = error.response.data;
    //     const { status } = error.response;
    //     Array.from(window.document.getElementsByClassName("msg_alert")).map(
    //       (e) => (e.innerHTML = "")
    //     );
    //     window.document.getElementById("btnSndForm").style.display = "block";
    //     window.document.getElementById("icLoad").style.display = "none";
    //     // Validacion JWT
    //     if (status === 401 || status === 403){
    //       outSession(user)
    //       history.push(`/error?error=${status}`);
    //     }else if (process === 0) {
    //       //Validacion Formulario
    //       window.document.getElementById(`msg_${path}`).innerHTML = message;
    //     } else if (process === 1) {
    //       //Validacion Procedimiento
    //       window.document.getElementById("msgForm").innerHTML = message;
    //     } else {
    //       window.document.getElementById("msgForm").innerHTML = "ALGO FUE MAL....";
    //     }
    //   });
  };

console.log('user ', user, 'resp ', stateResp);

  return (
    <>
      <h1>Cambiar Contraseña {user} </h1>
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
                <input id="btnSndForm" type="submit" value="Enviar" />
                <img
                  id="icLoad"
                  src="/images/load.gif"
                  alt="Loading"
                  className="profile_hidden"
                ></img>
              </p>
              <p id="msgForm" className="msg_alert"></p>
            </form>
          ) : stateResp.success ? (
            <div>{<SendOk msg={stateResp.payload.message} user={user} history={history} />}</div>
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


const SendOk = ({ msg, user, history }) => {
  const outLog = () => {
    outSession(user);
    history.push("/login");
  };
  setTimeout(() => {
    outLog();
  }, 3000);
  return (
    <div>
      <p>{msg}.</p>
      <p>
        <button
          onClick={() => outLog()}
        >
          OK
        </button>
      </p>
    </div>
  );
};
