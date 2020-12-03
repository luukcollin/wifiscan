import React, { Component } from "react";
import data from "./data.json";

const WEAK_SIGNAL = 30;
const MEDIUM_SIGNAL = 70;
const networkList = data.networks;

class RealNetwork extends Component {
  state = {
    network: null,
    disabled: true,
    showtext: false,
    selected: null,
    networkVisualElements: [],
  };

  render() {
    return (
      <div>
        <div class="help-text">
          <p>Kies het Wi-Fi netwerk om te scannen:</p>
        </div>
        <ul>
          {this.sortedByStrength(networkList).map((network, i) => {
            this.fillNetworkElements(i);
            return (
              <div
                key={i}
                id={"network" + i}
                onClick={() => {
                  this.handleSelected(network, i);
                }}
              >
                <li className="list-item">
                  <h3>
                    {this.getSignalImage(network.strength)} {network.ssid}
                    {"   "}
                    {network.encryption}
                  </h3>
                </li>
              </div>
            );
          })}
        </ul>
        <div class="help-text">
          <p>Typ het wachtwoord voor het gekozen netwerk:</p>
        </div>
        <input disabled={this.state.disabled} type="password" id="password" />
        <button
          disabled={this.state.disabled}
          onClick={() => {
            this.getPassword();
          }}
        ></button>
        <button
          onClick={() => {
            this.getElementsInList();
          }}
        >
          Show log!
        </button>
        {this.renderOutput()}
      </div>
    );
  }

  getElementsInList() {
    console.log(this.state.networkVisualElements);
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

  fillNetworkElements = (i) => {
    if (this.state.networkVisualElements.length < networkList.length) {
      this.setState((state) => {
        state.networkVisualElements.push("network" + i);
      });
    }
  };

  handleDelete = (networkId) => {
    const networks = this.state.counters.filter(
      (network) => network.id !== networkId
    );
    this.setState({ networks: networks });
  };

  doHandleSelected(i) {
    let id = "network" + i;
    // const networks = this.state.networkList.filter(
    //  (network) => network.id !== id
    // );
    this.setState({ selected: document.getElementById(id) });
    this.state.selected.className = "allblack";
  }

  handleSelected(network, i) {
    let id = "network" + i;
    document.getElementById(id).className = "allblack";
    this.setState({ network: network });
    this.setState({ disabled: false });
    console.log(network.ssid);
  }

  getPassword() {
    this.setState({ showtext: true });

    console.log(document.getElementById("password"));
  }

  getSignalImage(strength) {
    if (strength <= WEAK_SIGNAL) {
      return "Weak";
      return "../public/img/strongSignal.png";
    } else if (strength > MEDIUM_SIGNAL) {
      return "Strong";
      return "/../public/img/strongSignal.png";
    } else {
      return "Medium";
      return "/../public/img/strongSignal.png";
    }
  }

  sortedByStrength(list) {
    return list.sort(function (a, b) {
      return b.strength - a.strength;
    });
  }
}

export default RealNetwork;
