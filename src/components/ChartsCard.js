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
        <a href={this.props.readMore}>Read more...</a>
      </div>
    );
  }

  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={2}>
              <div className="icon-big text-center icon-warning">
                <img
                  className="card-icon"
                  src={this.state.img}
                  alt="Geslaagd"
                ></img>
                {this.props.icon}
              </div>
            </Col>
            <Col>
              <div className="numbers">
                <h2 className="cardTitle">{this.props.title}</h2>
                {this.props.description}
                {this.props.children}
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
