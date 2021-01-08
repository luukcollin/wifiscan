import React, { Component } from "react";

class StringStripper extends Component {
  state = {};

  strip(text, start, end) {
    return text.substr(start, end);
  }

  stripFrom(text, start, length = 0) {
    return text.substr(
      text.indexOf(start) + 1,
      length === 0 ? text.length : length
    );
  }

  stripTill(text, till, from = 0) {
    return text.substr(from, text.indexOf(till));
  }
}

export default StringStripper;
