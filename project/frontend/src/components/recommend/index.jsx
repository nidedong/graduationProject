import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import * as api from "@/api/explore";
class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  async componentDidMount() {
    let res = await api.getRecommend();
    this.setState({
      list: res.recommend,
    });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="recommend">
        {list.map((item) => (
          <div class="recommentWrapper">
            <Link to={`/main/viewOthers/${item.uid}`}>
              <img src={item.headerImg} className="img"></img>
            </Link>
            <div className="dsc">
              <div className="info">
                <span className="main_font mg-r-10">{item.nickname}</span>
                <span className="dsc_font">{item.birthday}</span>
              </div>
              <p className="word main_font">嘻嘻</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Recommend;
