import {
  GET_USER,
  GET_PROFILE,
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



