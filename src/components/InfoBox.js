import React, { Component } from "react";

class InfoBox extends Component {
  state = {};
  render() {
    return (
      <div style={{ marginTop: 10, marginBottom: 20 }}>
        <h2>
          {this.props.title === undefined ? "Some Info" : this.props.title}
        </h2>
        <div className="textarea">{this.props.children}</div>
      </div>
    );
  }
}

export default InfoBox;
