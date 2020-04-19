import React, { Component } from "react";
import "./index.css";
import { Spin } from "antd";
import { connect } from "react-redux";
import {
  fetchMyTweets,
  fetchMyLikes,
  fetchMyPictures,
} from "@/store/actionCreators/profile";
class LoadingPage extends Component {
  //props  navTitle:[]
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isLoading: false,
    };
  }

  componentDidMount() {
    switch (this.props.cpnKey) {
      case "profile":
        this.toggleActive("fetchMyTweets", 0, "myTweets");
        break;
    }
  }
  toggleActive(key, index, name) {
    this.setState(
      {
        activeIndex: index,
        isLoading: true,
      },
      () => {
        this.props[key]((data) => {
          console.log(data, "loading");
          setTimeout(() => {
            this.setState({
              [name]: data,
              isLoading: false,
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
    fetchMyTweets(callback) {
      let uid = localStorage.getItem("uid");
      dispatch(fetchMyTweets(uid, callback));
    },
    fetchMyPictures(callback) {
      let uid = localStorage.getItem("uid");
      dispatch(fetchMyPictures(uid, callback));
    },
    fetchMyLikes(callback) {
      let uid = localStorage.getItem("uid");
      dispatch(fetchMyLikes(uid, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
