import React, { Component, Fragment } from "react";

import wirelessInfo from "./wirelessInfo.json";
import nmapOutput from "./nmapOutput.json";
import { BrowserView, MobileView } from "react-device-detect";
import RealPassword from "./RealPassword";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import RealPasswordStrengthMeter from "./RealPasswordStrengthMeter";

const nmapData = nmapOutput["192.168.68.1"];
const wirelessInformation = wirelessInfo.wireless;
const data = [
  { name: "Security Level", value: 75 },
  { name: "100-Security Level", value: 25 },
];
const dataBarChart = [
  { name: "WPA3", points: 100 },
  { name: "WPA2", points: 75 },
  { name: "WPA(1)", points: 40 },
  { name: "WEP", points: 15 },
];

const COLORS = ["#0088FE", "#ffffff"];
let passwordObject;
class Output extends Component {
  constructor(props) {
    super(props);
    this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
    passwordObject = new RealPassword();
    this.fetchJSON();
  }
  state = {
    pw: "",
    points: 0,
    series: [70],
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
      ssid: "",
      protection: "",
      openPorts: [],
      services: [],
      sheet: "",
    },
  };

  fetchJSON() {
    wirelessInformation.map(
      (item, i) => (
        (this.state.ssid = item.ssid),
        (this.state.protection = item.protocol),
        this.setState({ ssid: item.ssid })
      )
    );
    let ports = [];
    let services = [];

    nmapData.ports.map((item, i) => ports.push(item.portid));
    nmapData.ports.map((item, i) => services.push(item.service.name));
    this.state.openPorts = ports;
    this.state.services = services;
    console.log(this.state.openPorts);
    console.log(this.state.services);
  }

  componentDidMount() {
    console.log(this.state.openPorts);
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

  getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  handlePasswordChanged() {
    passwordObject.setPassword(document.getElementById("passwordfield").value);
    this.setState({ points: passwordObject.getPoints() });
  }

  render() {
    return (
      <div>
        <header className="">
          <h1>Output Results</h1>
        </header>
        <div className="components-view">
          <div className="upper-section">
            <Fragment>
              <BrowserView>
                <div className="upper-section">
                  <h2>Overall Score of {this.state.ssid} </h2>

                  <PieChart
                    width={400}
                    height={200}
                    onMouseEnter={this.onPieEnter}
                  >
                    <Pie
                      data={data}
                      cx={210}
                      cy={100}
                      startAngle={-270}
                      endAngle={90}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      blendStroke={true}
                    >
                      <Label fontSize={100} value="75%" position="center" />
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>

                <div className="upper-section">
                  <h2>Encryption (Yours: {this.state.protection}): </h2>

                  <div>
                    <BarChart
                      width={600}
                      height={300}
                      data={dataBarChart}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="points" fill="#8884d8" />
                    </BarChart>
                  </div>
                </div>
              </BrowserView>
              <MobileView>
                <div className="upper-section-mobile">
                  <h2>Overall Score: </h2>
                  <PieChart
                    width={100}
                    height={50}
                    onMouseEnter={this.onPieEnter}
                  >
                    <Pie
                      data={data}
                      cx={50}
                      cy={25}
                      startAngle={-270}
                      endAngle={90}
                      innerRadius={10}
                      outerRadius={20}
                      fill="#8884d8"
                      dataKey="value"
                      blendStroke={true}
                    >
                      <Label fontSize={100} value="75%" position="center" />
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                <div className="upper-section">
                  <h2>Encryption: </h2>

                  <div>
                    <BarChart
                      width={200}
                      height={100}
                      data={dataBarChart}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="points" fill="#8884d8" />
                    </BarChart>
                  </div>
                </div>
              </MobileView>
            </Fragment>
          </div>
          <div className="meterwrapper">
            <h3>Password Strength Meter: </h3>
            <div className="passwordstrengthmeter">
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
            <div className="ports">
              <h2>Open Ports: </h2>
              <div class="ports-list">
                <ul>
                  {this.state.openPorts.map((value, index) => {
                    return <li key={index}>{value}</li>;
                  })}
                </ul>
                <ul>
                  {this.state.services.map((value, index) => {
                    return <li key={index}>{value}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Output;
