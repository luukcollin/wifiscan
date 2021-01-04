import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

const geslaagd = "./img/pass.png";
const gezakt = "./img/fail.png";
class ChartsCard extends Component {
  state = {
    img: this.props.geslaagd ? geslaagd : gezakt,
  };

  renderReadMore() {
    return (
      <div className="stats">
        <a href={this.props.readMoreLinkTo}>Read more...</a>
      </div>
    );
  }

  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={5}>
              <div className="icon-big text-center icon-warning">
                <img
                  className="card-icon"
                  src={this.state.img}
                  alt="Geslaagd"
                ></img>
                {this.props.icon}
              </div>
            </Col>
            <Col xs={5}>
              <div className="numbers">
                <span>{this.props.statsText}</span>
                <p>
                  <i>{this.props.description}</i>
                </p>
              </div>
            </Col>
          </Row>
          <div className="footer">
            <hr className="horizontal-line" />
            {this.props.readMore ? this.renderReadMore() : <br />}
          </div>
        </div>
      </div>
    );
  }
}

export default ChartsCard;
