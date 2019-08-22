import React from "react";
import ReactDom from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/Main";
import App from "./apps/Main";
import './apps/indexMain.css';
ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
