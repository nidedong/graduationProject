import React, { Component } from "react";
import "./index.css";
import Zmage from "react-zmage";
import { Icon } from "antd";
import * as api from "@/api/explore";
class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: true,
    };
  }
  componentDidMount() {
    console.log(this.props);
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
  render() {
    let {
      headerImg,
      nickname,
      time,
      saySomething,
      photoList,
      id,
      likes,
      comments,
    } = this.props.info;
    console.log(likes);
    likes = likes ? (Array.isArray(likes) ? likes : JSON.parse(likes)) : [];
    let isLike =
      likes.findIndex((item) => item === sessionStorage.getItem("uid")) !== -1;
    return (
      <div className="tweets">
        <img src={this.props.info.headerImg}></img>

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
          <a href="javascritp:;">
            <Icon
              type="message"
              style={{ color: "#8e8c88", fontSize: "19px" }}
            />
            <span>2</span>
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
        </div>
      </div>
    );
  }
}

export default Tweet;
