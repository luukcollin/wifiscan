import React, { Component } from "react";

import "./style.css";
import data from "./data.json";
const WEAK_SIGNAL = 30;
const MEDIUM_SIGNAL = 70;

const networkList = data.networks;
let networkVisualElements = [];

class RealNetwork extends Component {
  state = {
    network: null,
    disabled: true,
    showtext: false,
    selected: null,
  };

  componentDidMount() {
    console.log(networkList[3]);
    this.readElements();
  }

  readElements() {
    var i;
    for (i = 0; i < networkList.length; i++) {
      networkVisualElements.push("network" + i);
    }
  }

  handleSelected(network, i) {
    this.setState({ network: network });
    this.setState({ disabled: false });
    let id = "network" + i;
    console.log(id);
    console.log(document.getElementById(id));
    if (
      this.state.selected != null &&
      this.state.selected !== document.getElementById(id)
    ) {
      this.state.selected.className = "non-selected";
    }
    this.setState({ selected: document.getElementById(id) });
    this.state.selected = document.getElementById(id); //should be using this.setState(...)
    this.state.selected.className = "selected";
  }

  renderOutput() {
    if (this.state.showtext) {
      return (
        <p>
          {this.state.network.ssid} wordt gescant. Het wachtwoord:{" "}
          {document.getElementById("password").value}
        </p>
      );
    }
  }

  showPassword() {
    this.setState({ showtext: true });
  }

  getSignalImage(strength) {
    if (strength <= WEAK_SIGNAL) {
      return "/img/weakSignal.png";
    } else if (strength > MEDIUM_SIGNAL) {
      return "/img/strongSignal.png";
    } else {
      return "/img/mediumSignal.png";
    }
  }

  sortedByStrength(list) {
    return list.sort(function (a, b) {
      return b.strength - a.strength;
    });
  }

  render() {
    return (
      <div>
        <div class="help-text">
          <p>Kies het Wi-Fi netwerk om te scannen:</p>
        </div>
        <h1>{networkList["juicy"]}</h1>
        <ul>
          {this.sortedByStrength(networkList).map((network, i) => {
            return (
              <div
                key={i}
                id={"network" + i}
                onClick={() => {
                  this.handleSelected(network, i);
                }}
              >
                <li className="list-item">
                  <div className="network-item">
                    <h4>
                      <img
                        className="wifi-icon"
                        src={this.getSignalImage(network.strength)}
                      />
                      {network.ssid}
                      {"   "}
                      {network.encryption}
                    </h4>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
        <div class="help-text">
          <p>Typ het wachtwoord voor het gekozen netwerk:</p>
        </div>
        <div>
          <input disabled={this.state.disabled} type="password" id="password" />
          <button
            className="scan-button"
            disabled={this.state.disabled}
            onClick={() => {
              this.showPassword();
            }}
          >
            Scan!
          </button>
        </div>
        {this.renderOutput()}
      </div>
    );
  }
}

export default RealNetwork;
