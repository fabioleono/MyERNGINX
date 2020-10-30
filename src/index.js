import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./client/components/App";
// import { getWorkshops } from "./client/Redux/actionCreators";
//import {  getUser } from "./client/Redux/actionCreators";

import { store, persistor } from "./client/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./styles/styles.scss";
import "./styles/app.css";

//console.log('env', process.env);

//store.dispatch(getProfile("admin"))
// store.dispatch(getAllUsers())
// store.dispatch(getAllProfiles())
//store.dispatch(getPublic("79744894"))
// store.dispatch(getWorkshops("8300550498", "certificador"));
//store.dispatch(getUser('admin', 'administrador'));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

