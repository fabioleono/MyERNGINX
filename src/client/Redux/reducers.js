import {
  GET_USER,
  GET_PROFILE,
  GET_ALL_WORKSHOPS,
  GET_ERRORS,
} from "./actions";

export const userReducer = (state={}, action) => {
  if(action.type===GET_USER){
    return {
      ...state,
      user: action.user,
      family: action.family,
    }
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

export const errorReducer = (state = {}, action) => {
  if (action.type === GET_ERRORS) {
    return {
      ...state,
      errors: action.errors,
    };
  }
  return state;
};

export const workshopReducer = (state = {}, action) => {
  if (action.type === GET_ALL_WORKSHOPS) {
    return action.workshops;
  }
  return state;
};

// export const sessionReducer = (state = {}, action) => {
//   if (action.type === SET_SESSION) {
//     return action.session;
//   }
//   return state;
// };


// export const publicReducer = (state = {}, action) => {
//   if (action.type === GET_ALL_PUBLICS) {
//     return {
//       ...state,
//       infos: action.infos,
//     };
//   }
//   if (action.type === GET_PUBLIC) {
//     return {
//       ...state,
//       info: action.info,
//       consumer: action.consumer,
//     };
//   }

//   return state;
// };



// TEST

