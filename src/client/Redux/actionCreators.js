import axios from "axios";
import { GET_ALL_PUBLICS, GET_ALL_USERS, GET_ALL_WORKSHOPS, GET_PROFILE, GET_PUBLIC, GET_USER } from "./actions";
const url = process.env.REACT_APP_API_URL

export const getProfile = (user) => (dispatch) => {
  axios.get(`${url}/certificador/${user}`).then((res) => {
    console.log("data dispatch", res.data);
    return dispatch({
      type: GET_PROFILE,
      profile: res.data,
      user: user
    });
  });
};
export const getWorkshops = (master, family) => (dispatch) => {
  if(!family) return window.location = '/' // recargan el browser desde /talleres
  axios.get(`${url}/${family}/talleres/${master}`).then((res) => {
    console.log('Talleres ', res.data);
    return dispatch({
      type: GET_ALL_WORKSHOPS,
      workshops: res.data
    })
    
  })
}


export const getAllPublics = () => (dispatch) => {
  axios.get(`${url}/infopublica`).then((res) => {
    return dispatch({
      type: GET_ALL_PUBLICS,
      infos: res.data,
    });
  });
};

export const getPublic = (consumer) => (dispatch) => {
  axios.get(`${url}/infopublica/${consumer}`).then((res) => {
    console.log("data dispatch", res.data);
    return dispatch({
      type: GET_PUBLIC,
      info: res.data,
      consumer: consumer,
    });
  });
};



export const getAllUsers = () => (dispatch) => {
  axios.get(`${url}/users`)
  .then(res => {
    return dispatch({
      type: GET_ALL_USERS,
      users: res.data
    })
  })
};

export const getUser = (user) => (dispatch) => {
  axios.get(`${url}/users/${user}`).then((res) => {
    return dispatch({
      type: GET_USER,
      user: res.data,
    });
  });
};
