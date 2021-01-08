import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

class MacTable extends Component {
  state = {};
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Table className="bg-white text-dark" hover>
                <thead>
                  <tr>
                    {this.props.thArray.map((prop, key) => {
                      return <th key={key}>{prop}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {this.props.ips.map((prop, key) => {
                    return (
                      <tr key={key}>
                        <td>{prop}</td>
                        <td>
                          {this.props.macs[key] === undefined ? (
                            <i>Unknown</i>
                          ) : (
                            this.props.macs[key]
                          )}
                        </td>

                        <td>
                          {this.props.vendors[key] === undefined ? (
                            <i>Unknown</i>
                          ) : (
                            this.props.vendors[key]
                          )}
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

export default MacTable;
