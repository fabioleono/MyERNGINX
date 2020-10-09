import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { profileReducer, userReducer, workshopReducer, publicReducer } from "./reducers";

export default createStore(
  combineReducers({profileReducer, userReducer, workshopReducer, publicReducer}),
  composeWithDevTools(applyMiddleware(thunk))
)

