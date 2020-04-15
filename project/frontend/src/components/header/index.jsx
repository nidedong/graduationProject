import React, { Component } from "react";
import "./index.css";
import { Icon } from "antd";
class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="headerWrapper ">
        <h1>{this.props.content}</h1>
        <Icon type="star" style={{ color: "#0a71b0" }}></Icon>
      </div>
    );
  }
}

export default Header;
