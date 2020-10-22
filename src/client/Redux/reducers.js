import { GET_ALL_PUBLICS, GET_ALL_USERS, GET_ALL_WORKSHOPS, GET_PROFILE, GET_PUBLIC, GET_USER } from "./actions";

export const profileReducer = (state={}, action) => {
  
  if(action.type===GET_PROFILE){
    return {
      ...state,
      profile: action.profile,
      user: action.user
    }
    
  }
  
  return state
}
export const publicReducer = (state = {}, action) => {
  if (action.type === GET_ALL_PUBLICS) {
    return {
      ...state,
      infos: action.infos,
    };
  }
  if (action.type === GET_PUBLIC) {
    return {
      ...state,
      info: action.info,
      consumer: action.consumer,
    };
  }

  return state;
};

export const workshopReducer = (state = {}, action) => {
  if(action.type===GET_ALL_WORKSHOPS){
    return  action.workshops
    
  }
  return state;
};

// TEST
export const userReducer = (state = {}, action) => {
  if (action.type === GET_ALL_USERS) {
    return {
      ...state,
      users: action.users,
    };
  }
  if (action.type === GET_USER) {
    return {
      ...state,
      user: action.user,
    };
  }

  return state;
};
