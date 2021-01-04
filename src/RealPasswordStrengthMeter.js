import React, { Component } from "react";

const STRONG = 80;
const WEAK = 40;

class RealPasswordStrengthMeter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      color: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.percentage !== prevState.percentage) {
      return { percentage: nextProps.percentage };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.percentage !== this.props.percentage) {
      //Perform some operation here
      // this.setState({ percentage: prevProps.percentage });
      this.setColor();
    }
  }

  setColor() {
    let style;
    if (this.state.percentage >= STRONG) {
      style = "filler-green";
    } else if (this.state.percentage <= WEAK) {
      style = "filler-red";
    } else {
      style = "filler-orange";
    }
    this.setState({ color: style });
    return style;
  }

  render() {
    return (
      <Bar percentage={this.state.percentage} color={this.state.color}></Bar>
    );
  }
}

const Bar = (props) => {
  return (
    <div className="bar">
      {" "}
      <Filler percentage={props.percentage} color={props.color} />{" "}
    </div>
  );
};
const Filler = (props) => {
  return (
    <div
      className={`${props.color}`}
      style={{
        width: `${props.percentage}%`,
      }}
    />
  );
};

export default RealPasswordStrengthMeter;
