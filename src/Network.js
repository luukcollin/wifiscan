import React, { Component } from "react";
import data from "./data.json";
import { List } from "antd";
import FlatList from "flatlist-react";
import InfiniteScroll from "react-infinite-scroller";
import "./style.css";

const WEAK_SIGNAL = 30;
const MEDIUM_SIGNAL = 70;
const networkList = data.networks;

class Network extends Component {
  // listy: [this.network1, this.network2, this.network3],
  // listy2: ['hello', 'world', 'amazing']

  state = {
    ssid: "",
    encryption: "",
    strength: 0,
  };

  render() {
    let listItemStyle = "list-item-clicked";

    return (
      /// <ul>{this.networks.listy2.map(network => <li>{network}</li>)}</ul>
      <div>
        <InfiniteScroll
          pageStart={0}
          hasMore={true || false}
          useWindow={false}
          loader={<div key={0}>Loading ...</div>}
        ></InfiniteScroll>
        <ul>
          {
            <List
              dataSource={networkList}
              renderItem={this.renderNetwork}
            ></List>
            /* <FlatList
            list={networkList}
            renderItem={this.renderNetwork}
            renderWhenEmpty={() => <div>List is empty!</div>}
            sortBy={["strength", { key: "strength", descending: false }]}
            scroll={true}
            sortDescending
            renderOnScroll
          /> */
          }
          {this.sortedByStrength(networkList).map((network, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  this.onLick(network);
                }}
                className={this.listItemStyle}
              >
                <li>
                  <h3>
                    {network.strength} {network.ssid} {network.encryption}
                  </h3>
                </li>
              </div>
            );
          })}
        </ul>
        <input type="password" id="password" />
        <button onClick={this.getPassword}>Scan!</button>
      </div>
    );
  }

  renderNetwork = (network, i) => {
    return (
      <div className={this.listItemStyle}>
        <li key={i}>
          {this.getSignalImage(network.strength)}
          <b>{network.ssid}</b> (<span>{network.encryption}</span>)
        </li>
      </div>
    );
  };

  getPassword() {
    console.log("azebi");
    console.log(document.getElementById("password"));
  }

  sortedByStrength(list) {
    return list.sort(function (a, b) {
      return b.strength - a.strength;
    });
  }

  onLick(network) {
    console.log(network.ssid);
  }

  renderItem(key, index) {
    return <div key={key}>{networkList[index].ssid}</div>;
  }

  getSignalImage(strength) {
    if (strength <= WEAK_SIGNAL) {
      return "Weak";
      return "../public/img/strongSignal.png";
    } else if (strength > MEDIUM_SIGNAL) {
      return "Strong";
      return "/../public/img/strongSignal.png";
    } else {
      return "Medium";
      return "/../public/img/strongSignal.png";
    }
  }
}

export default Network;
