import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Button } from "antd";
import "./index.css";

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isLoading: false,
    };
  }

  // 退出功能
  logout = () => {
    this.setState({ isLoading: true }, () => {
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      setTimeout(() => {
        this.props.history.push("/");
      }, 700);
    });
  };

  changeActiveIndex(activeIndex) {
    this.setState({
      activeIndex,
    });
  }
  render() {
    let { activeIndex } = this.state;
    let iconStyle = {
      fontSize: "27px",
      color: "#fff",
    };
    return (
      <div className="asWrapper asWrapper-m">
        <Icon type="eye" style={{ ...iconStyle }} className="logo"></Icon>
        <Link
          to="/main"
          className="oneLink"
          onClick={this.changeActiveIndex.bind(this, 0)}
        >
          <Icon
            type="home"
            style={{
              ...iconStyle,
              color: activeIndex === 0 ? "#0a71b0" : "#fff",
            }}
          ></Icon>
          <span style={{ color: activeIndex === 0 ? "#0a71b0" : "#fff" }}>
            主页
          </span>
        </Link>
        <Link
          to="/main/explore"
          className="oneLink"
          onClick={this.changeActiveIndex.bind(this, 1)}
        >
          <Icon
            type="search"
            style={{
              ...iconStyle,
              color: activeIndex === 1 ? "#0a71b0" : "#fff",
            }}
          ></Icon>
          <span style={{ color: activeIndex === 1 ? "#0a71b0" : "#fff" }}>
            探索
          </span>
        </Link>
        <Link
          to="/main/message"
          className="oneLink"
          onClick={this.changeActiveIndex.bind(this, 2)}
        >
          <Icon
            type="message"
            style={{
              ...iconStyle,
              color: activeIndex === 2 ? "#0a71b0" : "#fff",
            }}
          ></Icon>
          <span style={{ color: activeIndex === 2 ? "#0a71b0" : "#fff" }}>
            消息
          </span>
        </Link>
        <Link
          to="/main/addFriend"
          className="oneLink"
          onClick={this.changeActiveIndex.bind(this, 3)}
        >
          <Icon
            type="message"
            style={{
              ...iconStyle,
              color: activeIndex === 3 ? "#0a71b0" : "#fff",
            }}
          ></Icon>
          <span style={{ color: activeIndex === 3 ? "#0a71b0" : "#fff" }}>
            交友
          </span>
        </Link>
        <Link
          to="/main/profile"
          className="oneLink"
          onClick={this.changeActiveIndex.bind(this, 4)}
        >
          <Icon
            type="user"
            style={{
              ...iconStyle,
              color: activeIndex === 4 ? "#0a71b0" : "#fff",
            }}
          ></Icon>
          <span style={{ color: activeIndex === 4 ? "#0a71b0" : "#fff" }}>
            我的
          </span>
        </Link>

        <Button
          onClick={this.logout}
          type="primary"
          style={{ width: "50%" }}
          loading={this.state.isLoading}
          shape="round"
        >
          退出
        </Button>
      </div>
    );
  }
}

export default withRouter(Aside);
