/**
 * @description The CompactCard is initially designed for Mobile Responsive purposes, due to the compact visual uses.
 * Recommended usage is for when visuals like charts, tables, or images should be dipslayed for mobile (and/or browser).
 *
 * @author Luuk Goedhart
 * @version 0.1
 *
 */

import React, { Component } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";

const geslaagd = "./img/pass.png";
const gezakt = "./img/fail.png";

class CompactCard extends Component {
  state = {
    img: this.props.geslaagd ? geslaagd : gezakt,
  };

  /**
   * Render the component
   */
  render() {
    return (
      <div className="componentwidth">
        <Container className="compact-card">
          <Row>
            <Col>
              <div>
                <img className="card-icon" src={this.state.img} alt="" />{" "}
              </div>
            </Col>
            <Col md={12}>
              <h1>
                {this.props.title === undefined
                  ? "Title of Card"
                  : this.props.title}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                {this.props.children}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CompactCard;
