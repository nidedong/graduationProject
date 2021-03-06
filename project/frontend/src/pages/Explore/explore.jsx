import React, { Component } from "react";
// import "./main.css";
import { Icon } from "antd";
import Header from "@/components/header/index";
import LoadingPage from "@/components/loadingPage/index";
import Recommend from "@/components/recommend/index";
import "./explore.css";
class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navTitle: [
        {
          title: <Icon type="redo" />,
          key: "fetchAllTweets",
          name: "exploreData",
        },
      ],
    };
  }
  render() {
    const { navTitle } = this.state;
    return (
      <div className="explore">
        <Header content="探索"></Header>

        <LoadingPage navTitle={navTitle} cpnKey="explore"></LoadingPage>
        <Recommend></Recommend>
      </div>
    );
  }
}

export default Explore;
