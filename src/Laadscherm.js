import React, { Component } from "react";
import testOutput from "./testOutput";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Redir from "./Redir";
import MyWindowPortal from "./MyWindowPortal";

import "./style.css";

class Laadscherm extends Component {
  state = {
    filesFound: false,
  };

  constructor(props) {
    super(props);
    this.repeat();
  }

  repeat() {
    while (!this.jsonOutputIsLoaded()) {
      console.log("Repeat functie");
      this.jsonOutputIsLoaded();
    }
    this.state.filesFound = true;
  }

  jsonFileExists = (path) => {
    console.log(path);
    var http = new XMLHttpRequest();
    http.open("HEAD", path, false);
    http.send();
    return http.status != 404;
  };

  jsonOutputIsLoaded() {
    var files = [
      "./img/networkdiscover.json",
      "./img/gatewaydiscover.json",
      "./img/wirelessinfo.json",
    ];
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (!this.jsonFileExists(file)) {
        console.log("work" + i);
        return false;
      }
    }
    return true;
  }

  showMessage() {
    this.state.filesFound ? this.navigate() : this.show();
  }

  show() {
    return <p>Files moeten nog geladen worden!</p>;
  }

  navigate() {
    console.log("Navigate!");
  }

  render() {
    return (
      <div>
        <div>{this.showMessage()}</div>
        <div>{this.navigate()}</div>
        <h1> Scans worden momenteel uitgevoerd </h1>
        <img src="/img/laadicoon.png"></img>
        <h2> Een ogenblik geduld alstublieft </h2>
        <h3> 'Dynamische tekst, scans die worden uitgevoerd' </h3>
      </div>
    );
  }
}

export default Laadscherm;
