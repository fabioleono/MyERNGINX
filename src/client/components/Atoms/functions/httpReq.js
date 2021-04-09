import axios from "axios";
import { outSession } from "./logSession";

export const getAxios = async (user, url, token, history, abortCtrl) => {
  //console.log('data GET Function ',user, url, token, history, abortCtrl);
    try {
      const res = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
        signal: abortCtrl.signal,
      });
      console.log("DATA GETHTTP ", res.data);
      const { success, payload } = res.data;
      return {success, payload}

    } catch (error) {
      console.log("ERROR RESPONSE GETHTTP ", error.response);
      const { status } = error.response;
      history.push(`/error?error=${status}`);
      outSession(user);
    }
};


export const postAxios = async (url, token, history, data) => {
  
  try {
    const res = await axios.post(url, data, {
      headers: {
        "x-access-token": token,
      },
    }); 
    console.log("DATA POSTHTTP ", res.data);
    const { success, payload } = res.data;
    return { success, payload };

  } catch (error) {
     console.log("ERROR RESPONSE POSTHTTP", error.response);
     const { process, message, path } = error.response.data;
     const { status } = error.response;
     Array.from(window.document.getElementsByClassName("msg_alert")).map(
       (e) => (e.innerHTML = "")
     );
     window.document.getElementById("btnSndForm").style.display = "block";
     window.document.getElementById("icLoad").style.display = "none";
     // Validacion JWT
     if (status === 401 || status === 403) {
       outSession(data.user);
       history.push(`/error?error=${status}`);
     } else if (process === 0) {
       //Validacion Formulario
       window.document.getElementById(`msg_${path}`).innerHTML = message;
     } else if (process === 1) {
       //Validacion Procedimiento
       window.document.getElementById("msgForm").innerHTML = message;
     } else {
       window.document.getElementById("msgForm").innerHTML = "ALGO FUE MAL....";
     }
  }
   
}
