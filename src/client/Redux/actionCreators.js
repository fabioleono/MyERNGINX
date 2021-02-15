import axios from "axios";
import { GET_USER, GET_PROFILE, GET_ALL_WORKSHOPS } from "./actions";
const url = process.env.REACT_APP_API_URL;
const code = process.env.REACT_APP_MSG_REQ_PER_MINUTE;

export const getUser = (user, family) => (dispatch) => {
  console.log("DISPATCH GET USER ....");
  return dispatch({
    type: GET_USER,
    user: user,
    family: family,
  });
};

export const getProfile = (family) => (dispatch) => {
  console.log("DISPATCH PROFILE ....");

  axios
    .get(`${url}/${family}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log("DATA DISPATCH PROFILE", res.data);
      return dispatch({
        type: GET_PROFILE,
        profile: res.data,
      });
    })
    .catch((error) => {
      console.log("ERROR DISPATCH PROFILE ", error.response.data);

      const { data, status } = error.response;
      if (data === code && status === 429) {
        return (window.location = `/?code=${code}`);
      } else {
        dispatch({
          type: GET_PROFILE,
          profile: "",
        });
        dispatch({
          type: GET_USER,
          user: "",
          family: "",
        });

        console.log("SET REDUX ");
        localStorage.removeItem("token");
        localStorage.removeItem("persist:nIeTzScHe"); //id del token creado por persist-redux
        console.log("SET TOKENS ");
        return (window.location = `/error?error=${status}`);
      }
    });
};

export const getWorkshops = (master, family) => async (dispatch) => {
  if (master === undefined) return (window.location = `/${family}`); // Si no hay maestro, es por que recargaron el browser desde /family/talleres. El master viene del menu(profile)

  try {
    const res = await axios.get(`${url}/${family}/talleres?master=${master}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log("DATA DISPATCH TALLERES ", res.data);
    return dispatch({
      type: GET_ALL_WORKSHOPS,
      workshops: res.data,
    });
  } catch (error) {
    console.log("ERROR DISPATCH TALLERES ", error.response);

    const { data, status } = error.response;
    if (data === code && status === 429) {
      return (window.location = `/?code=${code}`);
    } else {
      dispatch({
        type: GET_PROFILE,
        profile: "",
      });
      dispatch({
        type: GET_USER,
        user: "",
        family: "",
      });
      console.log("SET REDUX ");
      localStorage.removeItem("token");
      localStorage.removeItem("persist:nIeTzScHe"); //id del token creado por persist-redux
      console.log("SET TOKENS ");
      return (window.location = `/error?error=${status}`);
    }
  }

  // axios
  //   .get(`${url}/${family}/talleres?master=${master}`, {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   })
  //   .then((res) => {
  //     console.log("DATA DISPATCH TALLERES ", res.data);

  //     return dispatch({
  //       type: GET_ALL_WORKSHOPS,
  //       workshops: res.data,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("ERROR DISPATCH TALLERES ", error.response);
  //     dispatch({
  //       type: GET_PROFILE,
  //       profile: "",
  //     });
  //     dispatch({
  //       type: GET_USER,
  //       user: "",
  //       family: "",
  //     });

  //     console.log("SET REDUX ");
  //     const { data, status } = error.response;
  //     if (data === code && status === 429) {
  //       return (window.location = `/?code=${code}`);
  //     } else {
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("persist:nIeTzScHe"); //id del token creado por persist-redux
  //        console.log("SET TOKENS ");
  //       return (window.location = `/error?error=${status}`);
  //     }
  //   });
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

// export const getAllPublics = () => (dispatch) => {
//   axios.get(`${url}/infopublica`).then((res) => {
//     return dispatch({
//       type: GET_ALL_PUBLICS,
//       infos: res.data,
//     });
//   });
// };

// export const getPublic = (consumer) => (dispatch) => {
//   axios.get(`${url}/infopublica/${consumer}`).then((res) => {
//     console.log("data dispatch", res.data);
//     return dispatch({
//       type: GET_PUBLIC,
//       info: res.data,
//       consumer: consumer,
//     });
//   });
// };

// export const getAllUsers = () => (dispatch) => {
//   axios.get(`${url}/users`)
//   .then(res => {
//     return dispatch({
//       type: GET_ALL_USERS,
//       users: res.data
//     })
//   })
// };
