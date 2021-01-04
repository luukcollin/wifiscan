import React, { Component, Fragment } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Navbar from "./components/Navbar";
import wirelessInfo from "./wirelessInfo.json";
import nmapOutput from "./gatewaydiscover.json";
import "./style.css";
import { BrowserView, MobileView } from "react-device-detect";
import RealPassword from "./RealPassword";
import ChartsCard from "./components/ChartsCard";
import PortsTable from "./components/PortsTable";

import {
  PieChart,
  Pie,
  Cell,
  Label,
  XAxis,
  YAxis,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import { Container, Row, Col, Table } from "react-bootstrap";
import RealPasswordStrengthMeter from "./RealPasswordStrengthMeter";

const nmapData = nmapOutput["scan"];
const wirelessInformation = wirelessInfo.wireless;
const data = [
  { name: "Security Level", value: 75 },
  { name: "100-Security Level", value: 25 },
];
const dataBarChart = [
  { name: "WPA3", Strength: 100 },
  { name: "WPA2", Strength: 75 },
  { name: "WPA(1)", Strength: 40 },
  { name: "WEP", Strength: 15 },
];

const PIECHART_COLORS = ["#0088FE", "#ffffff"];
const datetime = new Date();
let passwordObject;
class Output extends Component {
  constructor(props) {
    super(props);
    this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
    passwordObject = new RealPassword();
    this.fetchJSON();
  }
  state = {
    points: 0,

    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "100%",
          },
        },
      },
      labels: ["Cricket"],

      openPorts: [],

      services: [],

      sheet: "",
    },
    wirelessInfo: {
      ssid: "",
      protection: "",
      authentication: "",
      pairwiseChipper: "",
      strength: "",
    },
    routerInfo: {
      name: "",
      os: "",
      accuracy: "",
    },
  };

  fetchJSON() {
    this.state.routerInfo.name = nmapData.osmatch[0].name;
    this.state.routerInfo.os = nmapData.osmatch[0].osclass.vendor;
    this.state.routerInfo.accuracy = nmapData.osmatch[0].accuracy;
    console.log("Router os: " + this.state.routerInfo.os);
    console.log("Name of router: " + this.state.routerInfo.name);
    console.log("Accuracy: " + this.state.routerInfo.accuracy + "%");

    this.state.wirelessInfo.authentication =
      wirelessInformation[0].authenticatie;
    this.state.wirelessInfo.pairwiseChipper =
      wirelessInformation[0].pairwiseChipper;
    this.state.wirelessInfo.strength = wirelessInformation[0].signalStrength;
    console.log("Authenticatie: " + this.state.wirelessInfo.authentication);
    console.log("Pairwise Chipper: " + this.state.wirelessInfo.pairwiseChipper);
    console.log("Strength: " + this.state.wirelessInfo.strength);

    console.log(this.state.os);
    wirelessInformation.map(
      (item, i) => (
        (this.state.wirelessInfo.ssid = item.ssid),
        (this.state.wirelessInfo.protection = item.protocol),
        this.setState({ ssid: item.ssid })
      )
    );

    let ports = [];
    let services = [];

    nmapData.ports.map((item, i) => ports.push(item.portid));
    nmapData.ports.map((item, i) => services.push(item.service.name));
    this.state.openPorts = ports;
    this.state.services = services;
  }

  componentDidMount() {
    this.renderPorts();
  }

  handleString(input, altMessage) {
    if (input.length == 0) {
      return altMessage;
    }
    return input;
  }

  renderPorts() {
    let i = 0;
    let sheet = "";
    for (i < this.state.openPorts.length; i++; ) {
      sheet += <p>ports: {this.state.openPorts[i]}</p>;
    }

    this.setState({ sheet: sheet });
    return sheet;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  handlePasswordChanged() {
    passwordObject.setPassword(document.getElementById("passwordfield").value);
    this.setState({ points: passwordObject.getPoints() });
  }

  touch() {
    console.log("touch!");
  }

  renderRowItems() {}

  render() {
    return (
      <div>
        <MobileView>{this.renderMobile()}</MobileView>
        <BrowserView>{this.renderBrowser()}</BrowserView>
      </div>
    );
  }

  renderMobile() {
    return <div className="container"></div>;
  }

  renderBrowser() {
    return (
      <div className="layout">
        <div class="sidemenu">
          <Navbar></Navbar>
        </div>
        <div className="container">
          <header>
            <p>Scan resultaat van {datetime.toLocaleString()}</p>
            <img src="./img/cw-logo.png" alt="Cyberwerf Logo"></img>
            <h1>Output Results</h1>
          </header>

          <div>
            <Fragment>
              <BrowserView>
                <div className="row">
                  <Container fluid>
                    <Row>
                      <Col>
                        <h2>
                          Overall Score of {this.state.wirelessInfo.ssid}{" "}
                        </h2>

                        <PieChart
                          width={400}
                          height={200}
                          onMouseEnter={this.onPieEnter}
                        >
                          <Pie
                            data={data}
                            cx={200}
                            cy={100}
                            startAngle={-270}
                            endAngle={90}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            blendStroke={true}
                          >
                            <Label
                              fontSize={100}
                              value="75%"
                              position="center"
                            />
                            {data.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  PIECHART_COLORS[
                                    index % PIECHART_COLORS.length
                                  ]
                                }
                              />
                            ))}
                          </Pie>
                        </PieChart>
                        <div className="allblue"></div>
                      </Col>

                      <Col>
                        <h2>
                          Encryption (Yours:{" "}
                          {this.state.wirelessInfo.protection}
                          ):{" "}
                        </h2>
                        <BarChart
                          width={600}
                          height={300}
                          data={dataBarChart}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="name" />

                          <Legend />
                          <Bar stackId="a" dataKey="Strength">
                            {dataBarChart.map((entry, index) => (
                              <Cell
                                fill={
                                  entry.name ===
                                  this.state.wirelessInfo.protection
                                    ? "#11ccee"
                                    : "#3311ff"
                                }
                              />
                            ))}
                          </Bar>
                        </BarChart>
                        <div className="allgreen"></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="ports">
                          <PortsTable
                            thArray={["port nr", "status"]}
                            tdArray={this.state.openPorts}
                            services={this.state.services}
                          ></PortsTable>
                        </div>
                      </Col>

                      <Col className="biplaneColumn">
                        <Table hover>
                          <thead>
                            <tr>
                              <th>SSID</th>
                              <th>Protection</th>
                              <th>authentication</th>
                              <th>Pairwise Chipper</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="overflow">
                                  {this.state.wirelessInfo.ssid}
                                </div>
                              </td>
                              <td>
                                <div className="overflow">
                                  {this.state.wirelessInfo.protection}
                                </div>
                              </td>
                              <td>
                                <div className="overflow">
                                  {this.state.wirelessInfo.authentication}
                                </div>
                              </td>
                              <td>
                                <div className="overflow">
                                  {this.state.wirelessInfo.pairwiseChipper}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <Table hover>
                          <thead>
                            <tr>
                              <th>Router Name</th>
                              <th>Operating System</th>
                              <th>Accuracy</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="overflow">
                                  {this.state.routerInfo.name}
                                </div>
                              </td>
                              <td>
                                <div className="overflow">
                                  {this.state.routerInfo.os}
                                </div>
                              </td>
                              <td>
                                <div className="overflow">
                                  {this.state.routerInfo.accuracy + "%"}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <div className="passwordstrengthmeter">
                          <h4>Password Strength Meter: </h4>

                          <input
                            placeholder="How strong is your password?"
                            type="text"
                            id="passwordfield"
                            onChange={this.handlePasswordChanged}
                          ></input>
                          <RealPasswordStrengthMeter
                            percentage={this.state.points}
                          ></RealPasswordStrengthMeter>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ChartsCard
                          geslaagd={true}
                          statsText="Item title 1"
                          description="Some information about the item"
                          readMore={false}
                        />
                      </Col>
                      <Col>
                        <ChartsCard
                          geslaagd={false}
                          statsText="Item title 2"
                          description="Some information about the item"
                          readMore={true}
                          readMoreLinkTo={"https://google.com"}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ChartsCard
                          geslaagd={false}
                          statsText="Item title 3"
                          description="Some information about the item"
                          readMore={true}
                          readMoreLinkTo={"https://google.com"}
                        />
                      </Col>
                      <Col>
                        <ChartsCard
                          geslaagd={true}
                          statsText="Item title 4"
                          description="Some information about the item"
                        />
                      </Col>
                    </Row>

                    <Row></Row>
                  </Container>

                  <div className="row"></div>
                </div>
                <div></div>
              </BrowserView>
            </Fragment>
            <div className="meterwrapper"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Output;
