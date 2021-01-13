import React, { Component } from "react";

import RealPassword from "./RealPassword";

const POINTS_WEP = 0;
const POINTS_WPA = 8;
const POINTS_WPA2 = 15;
const POINTS_WPA3 = 20;

const RECCOMENDED_PASSWORD_SCORE_REQUIREMENT = 100;
const RECCOMENDED_PASSWORD_SCORE = 20;
const MINIMAL_PASSWORD_SCORE_REQUIREMENT = 80;
const MINIMAL_PASSWORD_SCORE = 15;

const CHIPPER_MAX_POINTS = 5;

const MAX_SCORE = [POINTS_WPA3, CHIPPER_MAX_POINTS, RECCOMENDED_PASSWORD_SCORE];

class OverallScore extends Component {
  constructor(encryption, chipper, password) {
    super();
    this.encryption = encryption;
    this.chipper = chipper;
    this.password = password;
  }

  state = {
    encryption: "",
    passwordPoints: "",
  };

  sum(array) {
    let sum = 0;
    for (var i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum;
  }

  getEncryptionPoints() {
    if (this.encryption === "WPA") {
      return POINTS_WPA;
    } else if (this.encryption === "WPA2") {
      return POINTS_WPA2;
    } else if (this.encryption === "WPA3") {
      return POINTS_WPA3;
    } else {
      return POINTS_WEP;
    }
  }

  getChipperPoints() {
    return this.chipper === "AES" ? CHIPPER_MAX_POINTS : 0;
  }

  getPasswordPointspoints() {
    let password = new RealPassword();
    password.setPassword(this.password);
    console.log("punten password: " + password.getPoints());
    if (password.getPoints() >= RECCOMENDED_PASSWORD_SCORE_REQUIREMENT) {
      return RECCOMENDED_PASSWORD_SCORE;
    } else if (password.getPoints() >= MINIMAL_PASSWORD_SCORE_REQUIREMENT) {
      return MINIMAL_PASSWORD_SCORE;
    }
    return 0;
  }

  getScore() {
    return (
      this.getEncryptionPoints() +
      this.getPasswordPointspoints() +
      this.getChipperPoints()
    );
  }

  getScorePercentage() {
    return Math.floor((this.getScore() / this.sum(MAX_SCORE)) * 100);
  }
}

export default OverallScore;
