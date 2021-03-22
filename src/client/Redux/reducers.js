import {
  GET_USER,
  GET_PROFILE,
  GET_ALL_WORKSHOPS,
} from "./actions";

export const userReducer = (state={}, action) => {
  if (action.type === GET_USER) {
    return {
      ...state,
      user: action.user,
      family: action.family,
      master: action.master,
      flag: action.flag,
    };
  } 
  return state
}

export const profileReducer = (state={}, action) => {
  if(action.type===GET_PROFILE){
    return {
      ...state,
      profile: action.profile
    }
  }
  return state
}

export const workshopReducer = (state = {}, action) => {
  if (action.type === GET_ALL_WORKSHOPS) {
    return {
      ...state,
      workshops: action.workshops
    }
  }
  return state;
};


