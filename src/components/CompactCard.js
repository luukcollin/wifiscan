import React, { Component } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import PortsTable from "./PortsTable";

const geslaagd = "./img/pass.png";
const gezakt = "./img/fail.png";

class CompactCard extends Component {
  state = {
    img: this.props.geslaagd ? geslaagd : gezakt,
  };
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
              <h1>Title of compact card</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>{this.props.children}</div>
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <h3>Some info about compact card</h3>
            </Col>
          </Row>
          <Row>
            <div className="textarea">
              <p>
                Terrible information about not getting the right configurations
                of your router. I'm personally so sorry for your settings, but
                luckily... there is some good news!
              </p>
              <p>
                Look here for your good news. It has come, the new start of a
                much better world.
              </p>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CompactCard;
