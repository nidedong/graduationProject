import React, { Component } from "react";
import "./index.css";
import Zmage from "react-zmage";
import {
  Icon,
  Modal,
  Comment,
  Avatar,
  Form,
  Button,
  message,
  Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import * as api from "@/api/explore";
import { connect } from "react-redux";
let Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <textarea
        rows={4}
        onChange={onChange}
        value={value}
        style={{ width: "100%", borderRadius: "10px" }}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={() => onSubmit()}
        type="primary"
      >
        评论
      </Button>
    </Form.Item>
  </div>
);

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: true,
      visible: false,
      value: "",
      submitting: false,
    };
  }
  componentDidMount() {
    console.log(this.props);
    // console.log(CommentEditor);
  }

  async toogleLikeStatus(status) {
    let {
      info: { likes, id },
      oldState,
      setNewState,
      name,
    } = this.props;
    likes =
      (typeof likes === "string" && likes.length === 0) || !likes
        ? []
        : Array.isArray(likes)
        ? likes
        : JSON.parse(likes);
    let uid = sessionStorage.getItem("uid");
    status
      ? likes.splice(
          likes.findIndex((item) => (item = uid)),
          1
        )
      : likes.push(uid);
    await api.likeItApi({ likes, id, uid, status });
    let index = oldState.findIndex((item) => item.id === id);
    oldState[index].likes = likes;
    setNewState(name, JSON.parse(JSON.stringify(oldState)));
  }

  handleOk = () => {
    console.log("ok");
  };

  confirmLoading = () => {
    console.log("loading");
  };

  toggleVisible = () => {
    let { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  handleSubmit = () => {
    let { id, comments } = this.props.info;
    let { oldState, setNewState, name, profileInfo } = this.props;
    let value = this.state.value;
    if (value.length === 0)
      return message.warning({ content: "评论不能为空!" });
    this.setState(
      {
        submitting: true,
        value: "",
      },
      async () => {
        await api.comment({
          id,
          value,
          uid: sessionStorage.getItem("uid"),
          avatar: profileInfo.headerImg,
          nickname: profileInfo.nickname,
        });
        let commentObj = {
          value,
          uid: sessionStorage.getItem("uid"),
          avatar: profileInfo.headerImg,
          nickname: profileInfo.nickname,
        };
        comments =
          typeof comments === "string" ? JSON.parse(comments) : comments || [];
        comments.unshift(commentObj);
        let index = oldState.findIndex((item) => item.id === id);
        oldState[index].comments = comments;

        setNewState(name, JSON.parse(JSON.stringify(oldState)));
        setTimeout(() => {
          this.setState({
            submitting: false,
          });
        }, 700);
      }
    );
  };

  deleteTweet = async () => {
    let {
      info: { likes, id },
      oldState,
      setNewState,
      name,
    } = this.props;
    await api.deleteTweet({ id });
    message.success({ content: "删除成功!" });
    let index = oldState.findIndex((item) => item.id === id);
    oldState.splice(index, 1);
    setNewState(name, JSON.parse(JSON.stringify(oldState)));
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    let {
      headerImg,
      nickname,
      time,
      saySomething,
      photoList,
      id,
      comments,
      likes,
      uid,
    } = this.props.info;
    let myUid = sessionStorage.getItem("uid");
    let { visible, submitting, value } = this.state;
    comments = typeof comments === "string" ? JSON.parse(comments) : comments;
    likes = likes ? (Array.isArray(likes) ? likes : JSON.parse(likes)) : [];
    let isLike =
      likes.findIndex((item) => item === sessionStorage.getItem("uid")) !== -1;

    return (
      <div className="tweets">
        <Link to={`/main/viewOthers/${uid}`}>
          <img src={this.props.info.headerImg} className="img"></img>
        </Link>

        <div className="dsc">
          <div className="info">
            <span className="main_font mg-r-10">{nickname}</span>
            <span className="dsc_font">{time}</span>
          </div>
          <p className="word main_font">{saySomething}</p>
        </div>

        <div
          className={`${JSON.parse(photoList).length > 0 ? "imageList" : ""}`}
        >
          {(JSON.parse(photoList) || []).map((item) => (
            <Zmage
              className={`imgStyle-${(JSON.parse(photoList) || []).length}`}
              src={item}
            ></Zmage>
          ))}
        </div>

        <div className="more">
          <a href="javascritp:;" onClick={() => this.toggleVisible()}>
            <Icon
              type="message"
              style={{ color: "#8e8c88", fontSize: "19px" }}
            />
            <span
              style={{
                display: (comments || []).length === 0 ? "none" : "inline",
              }}
            >
              {(comments || []).length}
            </span>
          </a>
          <a href="javascritp:;" onClick={() => this.toogleLikeStatus(isLike)}>
            <Icon
              type="heart"
              style={{
                color: isLike ? "red" : "#8e8c88",
                fontSize: "19px",
                transition: "all 1.5s",
              }}
              theme={isLike ? "filled" : "outlined"}
            />
            <span>{likes.length > 0 ? likes.length : ""}</span>
          </a>

          {myUid === uid && this.props.name === "myTweets" && (
            <Popconfirm
              title="你确定要删除吗?"
              onConfirm={() => this.deleteTweet()}
              okText="Yes"
              cancelText="No"
            >
              <a href="javascritp:;">
                <Icon
                  type="delete"
                  style={{ color: "#8e8c88", fontSize: "19px" }}
                />
              </a>
            </Popconfirm>
          )}
        </div>

        <Modal
          title="评论"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.toggleVisible}
          width={700}
          className="modal"
        >
          <div>
            <Comment
              avatar={
                <Avatar src={this.props.profileInfo.headerImg} alt="Han Solo" />
              }
              content={
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </div>
          {(comments || []).map((item) => (
            <Comment
              author={<a>{item.nickname}</a>}
              avatar={<Avatar src={item.avatar} alt="Han Solo" />}
              content={<p>{item.value}</p>}
            ></Comment>
          ))}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileInfo: state.profileInfo,
  };
};

export default connect(mapStateToProps, null)(Tweet);
