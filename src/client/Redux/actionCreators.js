import axios from "axios";
import { GET_ALL_PROFILES, GET_ALL_PUBLICS, GET_ALL_USERS, GET_PROFILE, GET_PUBLIC, GET_USER } from "./actions";
const url = process.env.REACT_APP_API_URL

export const getAllProfiles = () => dispatch => {
  axios.get(`${url}/CertiGNV`).then((res) => {
    return dispatch({
      type: GET_ALL_PROFILES,
      profiles: res.data,
    });
  });
}

export const getProfile = (user) => (dispatch) => {
  axios.get(`${url}/CertiGNV/${user}`).then((res) => {
    console.log("data dispatch", res.data);
    return dispatch({
      type: GET_PROFILE,
      profile: res.data,
      user: user
    });
  });
};

export const getAllPublics = () => (dispatch) => {
  axios.get(`${url}/Info`).then((res) => {
    return dispatch({
      type: GET_ALL_PUBLICS,
      infos: res.data,
    });
  });
};

export const getPublic = (consumer) => (dispatch) => {
  axios.get(`${url}/Info/${consumer}`).then((res) => {
    console.log("data dispatch", res.data);
    return dispatch({
      type: GET_PUBLIC,
      info: res.data,
      consumer: consumer,
    });
  });
};



export const getAllUsers = () => (dispatch) => {
  axios.get(`${url}/Users`)
  .then(res => {
    return dispatch({
      type: GET_ALL_USERS,
      users: res.data
    })
  })
};

export const getUser = (user) => (dispatch) => {
  axios.get(`${url}/Users/${user}`).then((res) => {
    return dispatch({
      type: GET_USER,
      user: res.data,
    });
  });
};
