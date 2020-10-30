import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist"; // imports from redux-persist
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer, profileReducer, workshopReducer} from "./reducers";
//import rootReducer from "./reducers"; // Root reducer

const persistConfig = {
  // configuration object for redux-persist
  key: "nIeTzScHe",
  storage, // define which storage to use
  whitelist: ["profileReducer", "userReducer"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    profileReducer,
    userReducer,
    workshopReducer
  })
); // create a persisted reducer

// export default createStore(
//   combineReducers({profileReducer, userReducer, workshopReducer, publicReducer}),
//   composeWithDevTools(applyMiddleware(thunk))
// )
const store = createStore(
  persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
  composeWithDevTools(applyMiddleware(thunk)) // add any middlewares here
);

const persistor = persistStore(store); // used to create the persisted store

export { store, persistor };
