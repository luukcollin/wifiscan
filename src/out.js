import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import reportWebVitals from "../../src/reportWebVitals";
import RealNetwork from "../../src/RealNetwork";
import Laadscherm from "../../src/Laadscherm";
import Redir from "../../src/Redir";
ReactDOM.render(
  <React.StrictMode>
    <Redir />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
