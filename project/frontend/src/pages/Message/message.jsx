import React, { Component } from "react";
import Header from "@/components/header/index";
import { Button } from "antd";
import "./message.css";
import * as api from "@/api/message";
import { connect } from "react-redux";
import * as actionCreators from "@/store/actionCreators/message";
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      toUid: "",
      uid: sessionStorage.getItem("uid"),
      headerImg: "",
    };
  }

  componentWillMount() {}

  componentWillUnmount() {
    this.props.ws.close();
  }

  async componentDidMount() {
    this.props.connectWebsocket();
    let res = await api.getFriendsList({
      uid: sessionStorage.getItem("uid"),
    });
    let msgObj = {};
    res.friends
      .map((item) => item.uid)
      .forEach((item) => {
        msgObj[item] = this.props.messageList.filter(
          (fitem) => fitem.fromUid === item || fitem.toUid === item
        );
      });
    res.friends.forEach((item) => (item.notReadNum = 0));
    console.log(JSON.parse(JSON.stringify(res.friends)));
    this.setState(
      {
        friends: JSON.parse(JSON.stringify(res.friends)),
        ...msgObj,
      },
      () => {
        this.props.ws.onmessage = (message) => {
          let fromUid = JSON.parse(message.data).message.fromUid;
          let messages = this.state[fromUid];
          let friends = this.state.friends;
          let index = friends.findIndex((item) => item.uid === fromUid);
          if (this.state.toUid !== fromUid) {
            console.log(index);
            console.log(friends);
            friends[index].notReadNum++;
          }
          messages.push(JSON.parse(message.data).message);
          this.setState({
            [fromUid]: JSON.parse(JSON.stringify(messages)),
            friends: JSON.parse(JSON.stringify(friends)),
          });
        };
      }
    );
  }

  setUid(toUid, headerImg) {
    let { uid } = this.state;
    let friends = JSON.parse(JSON.stringify(this.state.friends));
    let index = friends.findIndex((item) => item.uid === toUid);
    friends[index].notReadNum = 0;
    let messages = this.state[toUid];
    this.setState({
      toUid,
      headerImg,
      [toUid]: JSON.parse(JSON.stringify(messages)),
      friends,
    });
  }

  sendMsg() {
    let { uid, toUid } = this.state;
    let message = {
      fromUid: uid,
      toUid,
      message: this.refs.message.value,
      type: "text",
    };
    this.props.ws.send(JSON.stringify(message));
    this.refs.message.value = "";
    let messages = this.state[toUid];
    messages.push(message);
    this.setState({
      [toUid]: messages,
    });
    this.refs.content.scrollTo(0, this.refs.content.scrollHeight + 200);
  }

  render() {
    let { friends, uid, toUid } = this.state;
    return (
      <div className="message">
        <Header content="消息"></Header>

        <div className="content" ref="content">
          {(this.state[toUid] || []).map((item) => (
            <div
              className={`${uid === item.fromUid ? "me" : "other"} `}
              key={item.id}
            >
              <img
                src={
                  uid === item.fromUid
                    ? this.props.profileInfo.headerImg
                    : this.state.headerImg
                }
                alt=""
              />
              <div className="msg">{item.message}</div>
            </div>
          ))}
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
            ref="message"
          ></textarea>
          <Button type="primary" onClick={() => this.sendMsg()}>
            发送
          </Button>
        </div>

        <ul className="friendList">
          {friends.map((item) => (
            <li
              className={`
                friendBox ${item.uid === this.state.toUid ? "active" : ""}
              `}
              onClick={() => this.setUid(item.uid, item.headerImg)}
            >
              <img src={item.headerImg} alt="" />
              <div className="nickname">{item.nickname}</div>
              {item.notReadNum > 0 && (
                <div className="notRead">{item.notReadNum}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messageList: state.messageList.messageList,
    ws: state.ws,
    profileInfo: state.profileInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    connectWebsocket() {
      let uid = sessionStorage.getItem("uid");
      let wsServer = new WebSocket(`ws://localhost:9001`);
      wsServer.onopen = (e) => {
        console.log("消息服务器连接成功！！！！！！！！！！");
        wsServer.send(`connect?${uid}`);
      };
      dispatch(actionCreators.fetchMessageList(uid, wsServer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
