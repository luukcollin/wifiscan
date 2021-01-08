import React, { Component } from "react";

class WifiSignal extends Component {
  state = {};

  getPercentage(points) {
    console.log(points);
    return Math.floor((parseInt(points) / 70) * 100);
  }

  render() {
    return (
      <div>
        <p>Welcome the wifi signal</p>
        <p>{this.getPercentage(this.props.signalStrength)} / 100</p>
      </div>
    );
  }
}

export default WifiSignal;
