import React from "react";
import ReactDom from 'react-dom';
import { Provider } from "react-redux";
import store from "../../store/Main";
import App from "./Main";
import './indexMain.css';
ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
