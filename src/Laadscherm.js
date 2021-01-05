import React, { Component } from "react";
import testOutput from "./testOutput";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./style.css";
class Laadscherm extends Component {
  state = {};

  jsonFileExists(path) {
    console.log(path);
    try {
      return require(`${path}`);
    } catch (error) {
      return false;
    }
  }

  jsonOutputIsLoaded() {
    //var to = setTimeout(this.jsonOutputIsLoaded, 5000);
    var files = [
      "./output/networkdiscover.json",
      "./output/gatewaydiscover.json",
      "./output/wirelessinfo.json",
    ];
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (!this.jsonFileExists(file)) {
        return false;
      }
    }
    return true;
  }

  redirect() {
    var to = setTimeout(this.jsonOutputIsLoaded, 500);
    return this.jsonOutputIsLoaded() ? (
      <p>Alle files zijn aanwezig</p>
    ) : (
      <p>Geen files geen files</p>
    );
  }

  navigate() {
    <Router>
      <Route path="./testOutput" component={testOutput} />
    </Router>;
  }

  render() {
    return (
      <div>
        <div>{this.redirect()}</div>

        <h1> Scans worden momenteel uitgevoerd </h1>
        <img src="/img/laadicoon.png"></img>
        <h2> Een ogenblik geduld alstublieft </h2>
        <h3> 'Dynamische tekst, scans die worden uitgevoerd' </h3>
      </div>
    );
  }
}

export default Laadscherm;
