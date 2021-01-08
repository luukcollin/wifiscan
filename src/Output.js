import React, { Component, Fragment } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Navbar from "./components/Navbar";

import wirelessInfo from "./output/wirelessInfo.json";
import gatewayDiscover from "./output/gatewaydiscover.json";
import networkDiscover from "./output/networkdiscover.json";

import "./style.css";

import RealPassword from "./RealPassword";
import StringStripper from "./StringStripper";

import MacTable from "./components/MacTable";
import ChartsCard from "./components/ChartsCard";
import PortsTable from "./components/PortsTable";
import CompactCard from "./components/CompactCard";
import WifiSignal from "./components/WifiSignal";
import RealPasswordStrengthMeter from "./components/RealPasswordStrengthMeter";

import {
  PieChart,
  Pie,
  Cell,
  Label,
  XAxis,
  YAxis,
  BarChart,
  StackedBarChart,
  Legend,
  Bar,
} from "recharts";
import { Container, Row, Col, Table } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";

const gatewayData = gatewayDiscover["scan"];
const networkData = networkDiscover;
const wirelessInformation = wirelessInfo.wireless;
const data = [
  { name: "Security Level", value: 75 },
  { name: "100-Security Level", value: 25 },
];
const dataBarChart = [
  { name: "WPA3", Strength: 100, Aes: 25 },
  { name: "WPA2", Strength: 75, Aes: 25 },
  { name: "WPA(1)", Strength: 40, Aes: 25 },
  { name: "WEP", Strength: 15, Aes: 25 },
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
      externalIp: "",
    },
    routerInfo: {
      name: "",
      os: "",
      accuracy: "",
    },
    networkInfo: {
      ip4: [],
      macs: [],
      vendors: [],
    },
  };

  fetchJSON() {
    let stringStripper = new StringStripper();

    this.state.routerInfo.name = gatewayData.osmatch[0].name;
    this.state.routerInfo.os = gatewayData.osmatch[0].osclass.vendor;
    this.state.routerInfo.accuracy = gatewayData.osmatch[0].accuracy;
    console.log("Router os: " + this.state.routerInfo.os);
    console.log("Name of router: " + this.state.routerInfo.name);
    console.log("Accuracy: " + this.state.routerInfo.accuracy + "%");

    this.state.wirelessInfo.authentication = stringStripper.stripFrom(
      wirelessInformation[0].authenticatie,
      ":",
      4
    );
    console.log(
      "Chipper:" +
        stringStripper.stripFrom(wirelessInformation[0].pairwiseChipper, ":")
    );
    this.state.wirelessInfo.pairwiseChipper =
      stringStripper
        .stripFrom(wirelessInformation[0].pairwiseChipper, ":")
        .trim() === "CCMP"
        ? "AES"
        : stringStripper.stripFrom(wirelessInformation[0].pairwiseChipper, ":");

    this.state.wirelessInfo.strength = stringStripper.stripFrom(
      stringStripper.stripTill(wirelessInformation[0].signalstrength, "/"),
      "="
    );
    this.state.wirelessInfo.externalIp = wirelessInformation[0].externalIP;
    console.log(
      "Authenticatie: " +
        stringStripper.stripFrom(this.state.wirelessInfo.authentication, ":")
    );
    console.log("Pairwise Chipper: " + this.state.wirelessInfo.pairwiseChipper);
    console.log("Strength: " + this.state.wirelessInfo.strength);
    console.log("External Ip: " + this.state.wirelessInfo.externalIp);

    console.log(this.state.os);
    wirelessInformation.map(
      (item, i) => (
        (this.state.wirelessInfo.ssid = item.ssid),
        (this.state.wirelessInfo.protection = stringStripper.stripFrom(
          item.protocol,
          "/",
          4
        )),
        this.setState({ ssid: item.ssid })
      )
    );

    let ips = [];
    let macs = [];
    let vendors = [];
    console.log(
      "Sneaky: " + networkData["scan"]["192.168.68.1"]["addresses"]["ipv4"]
    );

    var keys = Object.keys(networkData);
    var amountOfHosts = Object.keys(networkData["scan"]).length;
    var tagData = Object.keys(networkData["scan"]);
    for (var i = 0; i < amountOfHosts; i++) {
      ips.push(tagData[i]);
      macs.push(networkData["scan"][ips[i]]["addresses"]["mac"]);
      vendors.push(networkData["scan"][ips[i]].vendor[macs[i]]);
    }

    console.log("Amount of hosts: " + amountOfHosts);
    console.log("Ip4s: " + ips);
    console.log("Macs: " + macs);

    this.state.networkInfo.ip4 = ips;
    this.state.networkInfo.macs = macs;
    this.state.networkInfo.vendors = vendors;
    console.log("Vendors: " + vendors);
    console.log("Vendors state: " + this.state.networkInfo.vendors);
    let ports = [];
    let services = [];

    gatewayData.ports.map((item, i) => ports.push(item.portid));
    gatewayData.ports.map((item, i) => services.push(item.service.name));
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
                        <CompactCard>
                          <WifiSignal
                            signalStrength={this.state.wirelessInfo.strength}
                          ></WifiSignal>
                        </CompactCard>
                      </Col>

                      <Col>
                        <CompactCard geslaagd={false}>
                          <Table className="compact-card-component">
                            <thead>
                              <PortsTable
                                thArray={["Port Nr", "Status", "Approval"]}
                                tdArray={this.state.openPorts}
                                services={this.state.services}
                              ></PortsTable>
                            </thead>
                          </Table>
                        </CompactCard>
                        <CompactCard geslaagd={true}>
                          <Table className="compact-card-component">
                            <thead>
                              <MacTable
                                thArray={[
                                  "IP4 Adress",
                                  "Mac Adress",
                                  "Vendors",
                                ]}
                                ips={this.state.networkInfo.ip4}
                                macs={this.state.networkInfo.macs}
                                vendors={this.state.networkInfo.vendors}
                              ></MacTable>
                            </thead>
                          </Table>
                        </CompactCard>
                        <CompactCard geslaagd={true}>
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
                            <Bar stackId="a" dataKey="Aes">
                              {dataBarChart.map((entry, index) => (
                                <Cell
                                  fill={
                                    entry.name ===
                                    this.state.wirelessInfo.protection
                                      ? "#ffffff"
                                      : "#000000"
                                  }
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </CompactCard>

                        <div className="allgreen"></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="biplaneColumn">
                        <Table className="bg-white text-dark">
                          <thead>
                            <tr>
                              <th>SSID</th>
                              <th>Protection</th>
                              <th>Authentication</th>
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
                        <Table className="bg-white text-dark">
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
