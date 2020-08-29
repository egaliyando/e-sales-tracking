import React from "react";
import ReactDOM from "react-dom";
import "./assets/style/main.css";
import "assets/style/font.css";
import "react-datepicker/dist/react-datepicker.css";
import "assets/style/neumorphism.css";
// import App from "./App";n

import AppRoute from "./router/AppRoute";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoute />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
