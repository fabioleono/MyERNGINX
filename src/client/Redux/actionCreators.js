import axios from "axios";
import { GET_USER, GET_PROFILE, GET_ALL_WORKSHOPS, GET_ERRORS } from "./actions";
const url = process.env.REACT_APP_API_URL

export const getUser = (user, family) => (dispatch) => {
    console.log("DISPATCH USER ....");
    return dispatch({
      type: GET_USER,
      user: user,
      family: family
    });
  
};


export const getProfile = (family) => (dispatch) => {
  console.log('DISPATCH PROFILE ....');
  
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
        profile: res.data
      });
    })
    .catch((error) => {
      console.log("ERROR DISPATCH PROFILE ");
      if (error.response) {
        //console.log(error.response.data);
        console.log(error.response.status);
        // console.log(error.response.headers);
        dispatch({
          type: GET_PROFILE,
          profile: ""
        });
        dispatch({
          type: GET_USER,
          user: "",
          family: ""
        });
        dispatch({
          type: GET_ERRORS,
          errors: error.response.data,
        });
        return (window.location = `/error?error=${error.response.status}`);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log('Error Request frontend', error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log("Error Triggered", error.message);
      }
      console.log("DISPATCH ERROR ", error.config);
    });
};

export const getWorkshops = (master, family) => (dispatch) => {
  if(master===undefined) return (window.location = `/${family}`); // recargan el browser desde family/talleres
  axios
    .get(`${url}/${family}/talleres?master=${master}`, {
      headers: {
        'x-access-token': localStorage.getItem("token")
      },
    })
    .then((res) => {
      console.log("DATA DISPATCH TALLERES ", res.data);
      return dispatch({
        type: GET_ALL_WORKSHOPS,
        workshops: res.data
      });
    })
    .catch((error) => {
      console.log('ERROR DISPATCH TALLERES');
      dispatch({
        type: GET_PROFILE,
        profile: ""
      });
      dispatch({
        type: GET_USER,
        user: "",
        family: ""
      });
      dispatch({
        type: GET_ERRORS,
        errors: error.response.data,
      });
      return window.location = `/error?error=${error.response.status}`
      
    });
}


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


