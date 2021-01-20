/**
 * @description The Output component is rendered when the WiFi-Scanner has finished scanning the netwwork.
 * The output component communicates the results of the scan to the user.
 *
 * @author Luuk Goedhart
 * @version 0.1
 *
 */

import React, { Component, Fragment } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Navbar from "./components/Navbar";

//Import JSON file data
import wirelessInfo from "./output/wirelessInfo.json";
import gatewayDiscover from "./output/gatewaydiscover.json";
import networkDiscover from "./output/networkdiscover.json";

//Import styles
import "./style.css";

//Import classes
import RealPassword from "./RealPassword";
import StringStripper from "./StringStripper";

//Import components
import MacTable from "./components/MacTable";
import ChartsCard from "./components/ChartsCard";
import PortsTable from "./components/PortsTable";
import CompactCard from "./components/CompactCard";
import GeneralInfoCard from "./components/GeneralInfoCard";
import RealPasswordStrengthMeter from "./components/RealPasswordStrengthMeter";
import InfoBox from "./components/InfoBox";

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
  ResponsiveContainer,
} from "recharts";
import { Container, Row, Col, Table } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import OverallScore from "./OverallScore";

const gatewayData = gatewayDiscover["scan"];
const networkData = networkDiscover["scan"];
const wirelessData = wirelessInfo.wireless;

const dataBarChart = [
  { name: "WPA3", Strength: 100 },
  { name: "WPA2", Strength: 75 },
  { name: "WPA", Strength: 40 },
  { name: "WEP", Strength: 15 },
];

const PIECHART_COLORS = ["#0088FE", "#ffffff"];

const background = "/img/CWbackground.png";
let passwordObject;
class Output extends Component {
  constructor(props) {
    super(props);

    passwordObject = new RealPassword();
    this.fetchJSON();
  }
  state = {
    points: 0,
    overallScorePercentage: 0,
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
      signalStrength: "",
      externalIP: "",
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

  /*
   * Read the data that is inside of the JSON files. JSON files are initialized at the start of Output.js
   */
  fetchJSON() {
    let stringStripper = new StringStripper();

    //Fetch wireless network information
    let wirelessInfo = wirelessData[0];
    this.state.wirelessInfo.signalStrength = stringStripper.stripFrom(
      stringStripper.stripTill(wirelessInfo.signalstrength, "/"),
      "="
    );
    this.state.wirelessInfo.externalIP = wirelessInfo.externalIP;
    console.log(
      "Authenticatie: " +
        stringStripper.stripFrom(this.state.wirelessInfo.authentication, ":")
    );

    //Fetch wireless network information based on security configs
    this.state.wirelessInfo.authentication = stringStripper
      .stripFrom(wirelessInfo.authenticatie, ":", 4)
      .trim();
    console.log(
      "Chipper:" + stringStripper.stripFrom(wirelessInfo.pairwiseChipper, ":")
    );
    this.state.wirelessInfo.pairwiseChipper =
      stringStripper.stripFrom(wirelessInfo.pairwiseChipper, ":").trim() ===
      "CCMP"
        ? "AES"
        : stringStripper.stripFrom(wirelessInfo.pairwiseChipper.trim(), ":");

    console.log("Pairwise Chipper: " + this.state.wirelessInfo.pairwiseChipper);
    console.log("Strength: " + this.state.wirelessInfo.signalStrength);
    console.log("External Ip: " + this.state.wirelessInfo.externalIP);

    console.log(this.state.os);
    this.state.wirelessInfo.ssid = wirelessInfo.ssid;
    this.state.wirelessInfo.protection = stringStripper
      .stripFrom(wirelessInfo.protocol, "/", 4)
      .trim();

    //Fetch router information
    let osData = gatewayData.osmatch[0];
    this.state.routerInfo.name = osData.name;
    this.state.routerInfo.os = osData.osclass.vendor;
    this.state.routerInfo.accuracy = osData.accuracy;

    console.log("Router os: " + this.state.routerInfo.os);
    console.log("Name of router: " + this.state.routerInfo.name);
    console.log("Accuracy: " + this.state.routerInfo.accuracy + "%");

    //Fetch ip and mac addresses table data
    let ips = [];
    let macs = [];
    let vendors = [];

    var amountOfHosts = Object.keys(networkData).length;
    var tagData = Object.keys(networkData);
    for (var i = 0; i < amountOfHosts; i++) {
      ips.push(tagData[i]);
      macs.push(networkData[ips[i]]["addresses"]["mac"]);
      vendors.push(networkData[ips[i]].vendor[macs[i]]);
    }

    console.log("Amount of hosts: " + amountOfHosts);
    console.log("Ip4s: " + ips);
    console.log("Macs: " + macs);

    this.state.networkInfo.ip4 = ips;
    this.state.networkInfo.macs = macs;
    this.state.networkInfo.vendors = vendors;
    console.log("Vendors: " + vendors);
    console.log("Vendors state: " + this.state.networkInfo.vendors);

    //Fetch ports and services table data
    let ports = [];
    let services = [];
    gatewayData.ports.map((item, i) => ports.push(item.portid));
    gatewayData.ports.map((item, i) => services.push(item.service.name));
    this.state.openPorts = ports;
    this.state.services = services;
    console.log("protection::::: " + this.state.wirelessInfo.protection);
  }

  calculateOverallScore() {
    let scoreCalculator = new OverallScore(
      this.state.wirelessInfo.protection,
      this.state.wirelessInfo.pairwiseChipper,
      wirelessInfo.wireless[0].password
    );
    this.state.overallScorePercentage = scoreCalculator.getScorePercentage();

    return scoreCalculator.getScorePercentage();
  }

  getPieChartData() {
    let data = [
      { name: "Security Level", value: this.state.overallScorePercentage },
      {
        name: "100-Security Level",
        value: 100 - this.state.overallScorePercentage,
      },
    ];
    return data;
  }

  componentDidMount() {
    this.renderPorts();
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

  render() {
    return <div>{this.renderBrowser()}</div>;
  }

  renderBrowser() {
    return (
      <div className="layout">
        <div class="sidemenu">
          <Navbar></Navbar>
        </div>
        <div className="container">
          <header>
            <p>
              Scan resultaat van{" "}
              {networkDiscover["nmap"]["scanstats"]["timestr"]}
            </p>
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
                        <div className="generalInfoCard">
                          <div
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            <h2>Overall Security Score: </h2>

                            <PieChart
                              width={800}
                              height={400}
                              onMouseEnter={this.onPieEnter}
                            >
                              <Pie
                                data={this.getPieChartData()}
                                cx={400}
                                cy={200}
                                startAngle={-270}
                                endAngle={90}
                                innerRadius={120}
                                outerRadius={180}
                                fill="#8884d8"
                                dataKey="value"
                                blendStroke={true}
                              >
                                <Label
                                  fontSize={100}
                                  value={this.calculateOverallScore() + "%"}
                                  position="center"
                                  font={100}
                                  style={{
                                    fontSize: "5rem",
                                    fontStyle: "strong",
                                  }}
                                />

                                {this.getPieChartData().map((entry, index) => (
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
                          </div>
                        </div>
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
                        <CompactCard geslaagd={false} title="Open poorten">
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
                        <CompactCard
                          geslaagd={true}
                          title="Apparaten op netwerk"
                        >
                          <div className={"overflow-table"}>
                            <Table
                              className="compact-card-component"
                              onClick={this.state.handleDeviceTableClick}
                            >
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
                          </div>
                        </CompactCard>
                      </Col>

                      <Col>
                        <GeneralInfoCard
                          signalStrength={
                            this.state.wirelessInfo.signalStrength
                          }
                          externalIP={this.state.wirelessInfo.externalIP}
                          ssid={this.state.wirelessInfo.ssid}
                          amountOfDevices={this.state.networkInfo.macs.length}
                        />
                        <CompactCard
                          geslaagd={
                            this.state.wirelessInfo.protection === "WPA2" ||
                            this.state.wirelessInfo.protection === "WPA3"
                          }
                          title="Wachtwoordencryptie"
                        >
                          <ResponsiveContainer width="100%" height={600}>
                            <BarChart
                              data={dataBarChart}
                              layout="vertical"
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <XAxis type="number" style={{ fontSize: 22 }} />
                              <YAxis
                                type="category"
                                style={{ fontSize: 22 }}
                                dataKey="name"
                              />

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
                          </ResponsiveContainer>
                          <InfoBox title="Toelichting">
                            <p>
                              Uw netwerk maakt gebruik van{" "}
                              {this.state.wirelessInfo.protection} encryptie.
                              WPA2 en WPA3 zijn de meest veilige soorten van
                              encryptie. Gebruik van WPA en WEP wordt op basis
                              van beveiligingsrisico's sterk afgeraden.{" "}
                            </p>
                          </InfoBox>
                          <ChartsCard
                            title="Pairwise Chipper"
                            geslaagd={
                              this.state.wirelessInfo.pairwiseChipper === "AES"
                            }
                            readMore={
                              "https://nl.phhsnews.com/wi-fi-security-should-you-use-wpa2-aes-wpa2-tkip-or-both4760"
                            }
                          >
                            <h3>
                              Authenticatie:{" "}
                              {this.state.wirelessInfo.authentication}
                            </h3>

                            <h3>
                              Chipper: {this.state.wirelessInfo.pairwiseChipper}
                            </h3>
                            <Row>
                              <Col xs={10}>
                                <h4>Opmerking: </h4>
                              </Col>
                              <Col xs={10}>
                                <InfoBox title="">
                                  <p>
                                    Chipper moet altijd geconfigureerd zijn als
                                    AES/CCMP in verband met beveiligingsrisico's
                                    (AES = CCMP)
                                  </p>
                                </InfoBox>
                              </Col>
                            </Row>
                          </ChartsCard>
                        </CompactCard>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="biplaneColumn"></Col>
                    </Row>
                  </Container>
                </div>
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
