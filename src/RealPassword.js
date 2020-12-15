import React, { Component } from "react";

const MAX_POINTS = 100;
const CONTAINS_ALPHANUMERIC = 3;
const CONTAINS_SPECIAL_CHAR = 1;
const CONTAINS_NUMBER = 1;

class RealPassword extends Component {
  state = {
    password: "",
  };

  setPassword(password) {
    this.setState({ password: password });
    this.state.password = password;
  }

  hasRequiredLength() {
    return this.state.password.length >= 8;
  }

  hasAlpha() {
    return /[a-z]/.test(this.state.password);
  }

  hasCapitalAlpha() {
    return /[A-Z]/.test(this.state.password);
  }

  hasSpecialChar() {
    return /\W|_/g.test(this.state.password);
  }
  hasNumber() {
    return /\d/.test(this.state.password);
  }

  countPointsNumber() {
    return this.hasNumber() ? CONTAINS_NUMBER : 0;
  }

  countPointsSpecialChar() {
    return this.hasSpecialChar() ? CONTAINS_SPECIAL_CHAR : 0;
  }

  countPointsAlphanumeric() {
    return this.hasAlpha() ? CONTAINS_ALPHANUMERIC : 0;
  }

  getPoints() {
    return (this.countPointsSpecialChar() +
      this.countPointsAlphanumeric() +
      this.countPointsNumber()) *
      Math.pow(this.state.password.length, 1.3) >
      MAX_POINTS
      ? MAX_POINTS
      : (this.countPointsSpecialChar() +
          this.countPointsAlphanumeric() +
          this.countPointsNumber()) *
          Math.pow(this.state.password.length, 1.3);
  }
}

export default RealPassword;
