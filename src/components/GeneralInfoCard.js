/**
 * @description The GeneralInfoCard component displays some statistics about the network.
 * The component displays the signal strength and the external IP address of the network
 *
 * @author Luuk Goedhart
 * @version 0.1
 *
 */

import React, { Component } from "react";
import RealPasswordStrengthMeter from "./RealPasswordStrengthMeter";

import wirelessInfo from "../output/wirelessInfo.json";
import RealPassword from "../RealPassword";

const WEAK_SIGNAL = 30;
const MEDIUM_SIGNAL = 70;
let passwordObject;
class GeneralInfoCard extends Component {
  constructor(props) {
    super(props);
    this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
    passwordObject = new RealPassword();
    this.state = {
      opened: false,
      points: 0,
    };
    this.changeState = this.changeState.bind(this);
  }
  changeState() {
    this.setState({ opened: !this.state.opened });
  }
  /**
   * @param  {double/int} points
   * @returns signalStrength on a scale of 100
   */
  getPercentage(points) {
    console.log(points);
    return Math.floor((parseInt(points) / 70) * 100);
  }

  /**
   * @param  {double/int} strength
   * @returns className for signalStrength dipslay
   */
  getSignalImage(strength) {
    if (strength <= WEAK_SIGNAL) {
      return "red";
    } else if (strength > MEDIUM_SIGNAL) {
      return "green";
    } else {
      return "yellow";
    }
  }

  handlePasswordChanged() {
    passwordObject.setPassword(document.getElementById("passwordfield").value);
    this.setState({ points: passwordObject.getPoints() });
  }

  getPasswordScore() {
    let password = new RealPassword();
    password.setPassword(wirelessInfo.wireless[0]["password"]);
    return password.getPoints();
  }
  /**
   * Render the component
   */
  render() {
    return (
      <div className="generalInfoCard">
        <h1>General Information</h1>
        <div className="inline">
          <h2>Netwerknaam:</h2>
          <h2>{this.props.ssid}</h2>
        </div>
        <div className="inline">
          <h2>Extern IP adres: </h2>
          <h2>{this.props.externalIP}</h2>
        </div>
        <div className="inline">
          <h3>Apparaten op netwerk: </h3>
          <h3>{this.props.amountOfDevices}</h3>
        </div>

        <div className="displaySignal">
          <h2>Signaalsterkte WiFi</h2>

          <p
            style={{
              color: this.getSignalImage(
                this.getPercentage(this.props.signalStrength)
              ),
              fontSize: 33,
              fontWeight: "bold",
            }}
          >
            {this.getPercentage(this.props.signalStrength)} / 100
          </p>
          <p
            style={{
              color: "grey",
            }}
          >
            <i>
              De locatie van de Wifi-scanner heeft invloed op de signaalsterkte
            </i>
          </p>
        </div>
        <div className="passwordstrength">
          <h4 style={{ color: "white" }}>Wachtwoordsterkte: </h4>

          <RealPasswordStrengthMeter
            percentage={this.getPasswordScore()}
          ></RealPasswordStrengthMeter>
        </div>
        <div style={{ marginTop: 15 }}>
          <a onClick={this.changeState}>
            <p style={{ fontWeight: "bold", textDecorationStyle: "underline" }}>
              <strong>
                Klik hier voor hulp bij het kiezen van een goed wachtwoord
              </strong>
            </p>
          </a>
          {this.state.opened ? (
            <div className="passwordstrength">
              <h4 style={{ color: "white" }}>
                Test de sterkte van een wachtwoord{" "}
              </h4>

              <input
                placeholder="Typ hier iets..."
                type="text"
                id="passwordfield"
                onChange={this.handlePasswordChanged}
              ></input>
              <RealPasswordStrengthMeter
                percentage={this.state.points}
              ></RealPasswordStrengthMeter>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    );
  }
}

export default GeneralInfoCard;
