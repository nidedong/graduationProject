import React, { Component } from "react";
import "./index.css";
import { Spin } from "antd";
import { connect } from "react-redux";
import Zmage from "react-zmage";
import {
  fetchMyTweets,
  fetchMyLikes,
  fetchMyPictures,
  fetchAllTweets,
} from "@/store/actionCreators/profile";
import Tweet from "@/components/Tweets/index";
class LoadingPage extends Component {
  //props  navTitle:[]
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isLoading: false,
      el: "",
      uid: this.props.uid ? this.props.uid : sessionStorage.getItem("uid"),
    };
  }

  componentDidMount() {
    switch (this.props.cpnKey) {
      case "profile":
        this.toggleActive("fetchMyTweets", 0, "myTweets");
        break;
      case "explore":
        this.toggleActive("fetchAllTweets", 0, "exploreData");
        break;
    }
  }

  setNewState = (key, newState) => {
    this.setState({
      [key]: newState,
    });
  };
  toggleActive(key, index, name) {
    this.setState(
      {
        activeIndex: index,
        isLoading: true,
      },
      () => {
        this.props[key](this.state.uid, (data) => {
          setTimeout(() => {
            let el;
            if (data.length === 0) {
              el = (
                <h2
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    marginTop: "100px",
                  }}
                >
                  暂无数据
                </h2>
              );
            }
            this.setState({
              [name]: data,
              isLoading: false,
              el,
            });
          }, 500);
        });
      }
    );
  }
  render() {
    let { activeIndex, isLoading } = this.state;
    return (
      <div className="loadingPageWrapper">
        <div className="navTitle">
          {this.props.navTitle.map((item, index) => (
            <a
              href="javascript:;"
              className={`oneTitle ${activeIndex === index ? "active" : ""}`}
              onClick={() => this.toggleActive(item.key, index, item.name)}
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="content">
          {(this.state[this.props.navTitle[activeIndex].name] || []).length ===
          0
            ? this.state.el
            : (activeIndex === 0 &&
                (
                  this.state[this.props.navTitle[activeIndex].name] || []
                ).map((item) => (
                  <Tweet
                    info={item}
                    setNewState={this.setNewState}
                    name={this.props.navTitle[activeIndex].name}
                    oldState={this.state[this.props.navTitle[activeIndex].name]}
                  ></Tweet>
                ))) ||
              (activeIndex === 1 &&
                (this.state[this.props.navTitle[activeIndex].name] || []).map(
                  (item) => (
                    <div className="imgWrapper">
                      <Zmage
                        src={item}
                        style={{ width: "100%", height: "100%" }}
                      ></Zmage>
                    </div>
                  )
                )) ||
              (activeIndex === 2 &&
                (
                  this.state[this.props.navTitle[activeIndex].name] || []
                ).map((item) => (
                  <Tweet
                    info={item}
                    setNewState={this.setNewState}
                    name={this.props.navTitle[activeIndex].name}
                    oldState={this.state[this.props.navTitle[activeIndex].name]}
                  ></Tweet>
                )))}
        </div>
        <div className="loadingWrapper">
          <Spin spinning={isLoading}></Spin>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingInfo: state.loadingInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 我的
    fetchMyTweets(uid, callback) {
      dispatch(fetchMyTweets(uid, callback));
    },
    fetchMyPictures(uid, callback) {
      dispatch(fetchMyPictures(uid, callback));
    },
    fetchMyLikes(uid, callback) {
      dispatch(fetchMyLikes(uid, callback));
    },
    fetchAllTweets(uid, callback) {
      dispatch(fetchAllTweets(uid, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
