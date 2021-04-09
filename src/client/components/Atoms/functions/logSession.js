import axios from "axios";
import { logOutUser } from "../../../Redux/actionCreators";
import { store } from "../../../Redux/store";

export const outSession = async (user) => {
  console.log('EJECUTA outSession', user);
  
  store.dispatch(logOutUser());
  const api = process.env.REACT_APP_API_URL;
  const url = `${api}/logout/${user}`;
  try {
    await axios.put(url);
  } catch (error) {
    console.log("error data OutSession ", error.response);
  }
};

export const captch = async(url, userInp) => {
  Array.from(window.document.getElementsByClassName("msg_alert")).map(
    (e) => (e.innerHTML = "")
  );
  // Visualizacion del loading por limitador de Velocidad Captcha
  window.document.getElementById("icLoad").style.display = "block";
  window.document.getElementById("respSend").style.display = "none";
  try {
    const res = await axios({ url, method: "GET", params: { user: userInp } });
    //console.log("response ", res);

    window.document.getElementById("icLoad").style.display = "none";
    window.document.getElementById("respSend").style.display = "block";
    window.document.getElementById("svgCaptcha").innerHTML = res.data;
  } catch (error) {
    //console.log("ERROR RESPONSE CAPTCHA", error.response);
    const { message, path } = error.response.data;
    window.document.getElementById("icLoad").style.display = "none";
    window.document.getElementById("respSend").style.display = "block";
    window.document.getElementById(`msg_${path}`).innerHTML = message;
  }
  // axios
  //   .get(url, {
  //     params: {
  //       user: userInp,
  //     },
  //   })
  //   .then((res) => {
  //     window.document.getElementById("icLoad").style.display = "none";
  //     window.document.getElementById("respSend").style.display = "block";
  //     window.document.getElementById("svgCaptcha").innerHTML = res.data;
  //   })
  //   .catch((error) => {
  //     //console.log("ERROR RESPONSE CAPTCHA", error.response);
  //     const { message, path } = error.response.data;
  //     window.document.getElementById("icLoad").style.display = "none";
  //     window.document.getElementById("respSend").style.display = "block";
  //     window.document.getElementById(`msg_${path}`).innerHTML = message;
  //   });
  
};

