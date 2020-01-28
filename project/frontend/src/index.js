import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index";
const app = (
  <Provider store={store}>
    <App></App>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
