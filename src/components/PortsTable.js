import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const thArray = ["Ports Nr.", "Service", "Approval"];

const icons = ["./img/pass.png", "img/fail.png"];

class PortsTable extends Component {
  state = {
    img: "",
  };

  componentDidMount() {
    this.setImageRandom();
  }
  setImageRandom() {
    this.setState({ img: icons[Math.ceil(Math.random() * icons.length) - 1] });
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Table className="bg-white text-dark" hover>
                <thead>
                  <tr>
                    {thArray.map((prop, key) => {
                      return <th key={key}>{prop}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {this.props.tdArray.map((prop, key) => {
                    return (
                      <tr key={key}>
                        <td>{prop}</td>
                        <td>{this.props.services[key]}</td>
                        <td>
                          <img src={this.state.img} alt="fail"></img>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PortsTable;
