import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./client/components/App";
import { getPublic } from "./client/Redux/actionCreators";
//import {  getProfile, getAllProfiles, getAllUsers } from "./client/Redux/actionCreators";

import store  from "./client/Redux/store";
import "./styles/styles.scss";

console.log('env', process.env);

//store.dispatch(getProfile("admin"))
// store.dispatch(getAllUsers())
// store.dispatch(getAllProfiles())
store.dispatch(getPublic("79744894"))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

