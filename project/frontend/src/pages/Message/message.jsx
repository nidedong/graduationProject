import React, { Component } from "react";
import Header from "@/components/header/index";
import { Button } from "antd";
import "./message.css";
import * as api from "@/api/message";
import { connect } from "react-redux";
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    console.log(this.props);
    this.props.ws.send("你好啊");

    let res = await api.getFriendsList({
      uid: sessionStorage.getItem("uid"),
    });
    this.setState({
      friends: res.friends,
    });
  }
  render() {
    let { friends } = this.state;
    return (
      <div className="message">
        <Header content="消息"></Header>

        <div className="content">
          <div className="me">
            <img src="" alt="" />
            <div className="msg">
              今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉
            </div>
          </div>
          <div className="other">
            <img src="" alt="" />
            <div className="msg">
              今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉今晚不睡觉
            </div>
          </div>
        </div>

        <div className="editor">
          <textarea
            name="message"
            rows="6"
            style={{
              width: "100%",
              borderRadius: "5px",
              lineHeight: "20px",
              resize: "none",
            }}
          ></textarea>
          <Button type="primary">发送</Button>
        </div>

        <ul className="friendList">
          {friends.map((item) => (
            <li className="friendBox">
              <img src={item.headerImg} alt="" />
              <div className="nickname">{item.nickname}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    mssageList: state.messageList,
    ws: state.ws,
  };
};

export default connect(mapStateToProps, null)(Message);
