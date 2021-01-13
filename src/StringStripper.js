/**
 * @description StringStripper is made for extracting and formatting JSON data easily.
 * Usage is to extract pieces of json data by passing some requirements.
 * @author Luuk Goedhart
 * @version 0.1
 *
 */

import React, { Component } from "react";

class StringStripper extends Component {
  state = {};

  /**
   * strip text between start and end
   * @param  {string} text
   * @param  {int/char} start
   * @param  {int/char} end
   */
  strip(text, start, end) {
    return text.substr(start, end);
  }
  /**
   * strip text from index or char
   * @param  {string} text
   * @param  {char/int} start
   * @param  {int} length=0
   */
  stripFrom(text, start, length = 0) {
    return text.substr(
      text.indexOf(start) + 1,
      length === 0 ? text.length : length
    );
  }
  /**
   * strip text till index or char
   * @param  {string} text
   * @param  {char/int} till
   * @param  {int} from=0
   */
  stripTill(text, till, from = 0) {
    return text.substr(from, text.indexOf(till));
  }
}

export default StringStripper;
