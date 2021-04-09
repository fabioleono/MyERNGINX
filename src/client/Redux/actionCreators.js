import axios from "axios";
import { GET_USER, GET_PROFILE, } from "./actions";
const url = process.env.REACT_APP_API_URL;


export const getUser = (user, family, flag) => (dispatch) => {
  //console.log("DISPATCH GET USER ....");
  return dispatch({
    type: GET_USER,
    user,
    family,
    flag,
  });
};

export const getProfile = (family) => (dispatch) => {
  
  //console.log("DISPATCH PROFILE ....");
  axios
    .get(`${url}${family}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      //console.log("DATA DISPATCH PROFILE", res.data);
      return dispatch({
        type: GET_PROFILE,
        profile: res.data.payload,
      });
    })
    .catch((error) => {
      const { status } = error.response;
      //console.log("ERROR DISPATCH PROFILE ", error.response.data, data);
      //console.log("SET REDUX ");
      dispatch({
        type: GET_PROFILE,
        profile: "",
      });
      dispatch({
        type: GET_USER,
        user: "",
        family: "",
        flag: "",
      });
      //console.log("SET TOKENS ");
      localStorage.removeItem("token");
      localStorage.removeItem("persist:nIeTzScHe"); //id del token creado por persist-redux
      return (window.location = `/error?error=${status}`);
    });
};


export const logOutUser = () => (dispatch) => {
  //console.log('DISPATCH LOGOUTUSER');
  dispatch({
    type: GET_PROFILE,
    profile: "",
  });
  dispatch({
    type: GET_USER,
    user: "",
    family: "",
    flag: "",
  });
  localStorage.removeItem("token");
  localStorage.removeItem("persist:nIeTzScHe"); //id del token creado por persist-redux
};



// --- ANALIZAR LA SALIDA PARA QUE EL FRONT-END RESPÒNDA EN CASO DE FALLAR EL BACKEND
// if (error.response) {
//   //console.log(error.response.data);
//   console.log(error.response.status);
//   // console.log(error.response.headers);
//   dispatch({
//     type: GET_PROFILE,
//     profile: ""
//   });
//   dispatch({
//     type: GET_USER,
//     user: "",
//     family: ""
//   });
//   return (window.location = `/error?error=${error.response.status}`);
// } else if (error.request) {
//   /*
//    * The request was made but no response was received, `error.request`
//    * is an instance of XMLHttpRequest in the browser and an instance
//    * of http.ClientRequest in Node.js
//    */
//   console.log('Error Request frontend', error.request);
// } else {
//   // Something happened in setting up the request and triggered an Error
//   console.log("Error Triggered", error.message);
// }
//----

//--- VERIFICAR tamaño de la entrada de datos
// let lengthDta;
// try {
//   lengthDta = Buffer.byteLength(JSON.stringify(res.data));
// } catch (error) {
//   console.log("error basico ", error);
// }
// console.log("SIZE ", lengthDta);
//---
