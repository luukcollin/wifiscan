import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import testOutput from "./testOutput";

import { BrowserRouter, Route } from "react-router-dom";
import Redir from "./Redir";
import MyWindowPortal from "./MyWindowPortal";

import reportWebVitals from "./reportWebVitals";
import RealNetwork from "./RealNetwork";
import Laadscherm from "./Laadscherm";

class index extends Component {
  state = {};
  render() {
    return (
      (
        <div>
          <Laadscherm />
          <RealNetwork />
        </div>
      ),
      document.getElementById("root")
    );
  }
}

export default index;

// <BrowserRouter>
//      <Route exact path="/" component={Redir} />
//    </BrowserRouter>
//    ;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
