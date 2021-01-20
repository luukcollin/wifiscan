import React, { Component } from "react";
import testOutput from "./testOutput";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Redir from "./Redir";
import MyWindowPortal from "./MyWindowPortal";

import TextLoop from "react-text-loop";
import networkDiscover from "./output/networkdiscover.json";
import gatewayDiscover from "./output/gatewaydiscover.json";
import wirelessInfo from "./output/wirelessinfo.json";

import "./style.css";

const ALL_FILES = [networkDiscover, gatewayDiscover, wirelessInfo];

class Laadscherm extends Component {
  state = {
    filesFound: false,
  };

  constructor(props) {
    super(props);
    this.fileIsFilled(networkDiscover);
  }

  repeat() {
    while (!this.jsonOutputIsLoaded()) {
      console.log("Repeat functie");
      this.jsonOutputIsLoaded();
    }
    this.state.filesFound = true;
  }

  fileIsFilled = (file) => {
    if ("initkey" in file) {
      console.log("DIT IS NOG INITFILE");
    }
  };

  jsonOutputIsLoaded() {
    for (var i = 0; i < ALL_FILES.length; i++) {
      var file = ALL_FILES[i];
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
        <div></div>
        <div></div>
        <img src="/img/laadicoon.png"></img>
        <TextLoop>
          <h1> Scans worden momenteel uitgevoerd </h1>
          <h2> Een ogenblik geduld alstublieft </h2>
          <h3> 'Dynamische tekst, scans die worden uitgevoerd' </h3>
        </TextLoop>
      </div>
    );
  }
}

export default Laadscherm;
