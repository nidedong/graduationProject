import React, { Component } from "react";
import "./homePage.css";
import { Icon, Form, Input, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
// import { connect } from "react-redux";
import { loginApi } from "../../../api/user";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: [],
      isSubmit: false
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errMessage } = this.state;
    return (
      <div className="wrapper">
        <div className="main">
          <div className="left">
            <Icon
              type="eye"
              theme="filled"
              style={{ color: "#43b1f4", fontSize: "500px" }}
            />
            <div className="text">
              <div>
                <Icon type="search" style={{ fontSize: "30px" }}></Icon>
                <span>关注你的兴趣所在</span>
              </div>
              <div>
                <Icon type="team" style={{ fontSize: "30px" }}></Icon>
                <span>听听大家在谈论什么</span>
              </div>
              <div>
                <Icon type="aliwangwang" style={{ fontSize: "30px" }}></Icon>
                <span>加入对话</span>
              </div>
            </div>
          </div>
          <div className="right relative">
            <div className="quicklyLogin">
              <Form layout="inline" onSubmit={this.handelSubmit.bind(this)}>
                <Form.Item
                  validateStatus={errMessage[0] ? "error" : ""}
                  help={errMessage[0] || ""}
                >
                  {getFieldDecorator(
                    "username",
                    {}
                  )(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="用户名"
                    />
                  )}
                </Form.Item>
                <Form.Item
                  validateStatus={errMessage[1] ? "error" : ""}
                  help={errMessage[1] || ""}
                >
                  {getFieldDecorator(
                    "password",
                    {}
                  )(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="密码"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="raduis_20"
                    loading={this.state.isSubmit}
                  >
                    登陆
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div className="loginOrRegister">
              <Icon
                type="eye"
                style={{ color: "#ffffff", fontSize: "40px" }}
              ></Icon>
              <span className="title">查看世界上正在发生什么</span>
              <span className="font_bold">立即加入watcher。</span>
              <Link to="/register">
                <Button type="primary" size="large" className="raduis_20">
                  注册
                </Button>
              </Link>
              <Link to="/login">
                <Button className="raduis_20">登陆</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="footer">
          <a href="javascript:;">毕业设计</a>
          <a href="javascript:;">计科11603董碧波</a>
          <a href="javascript:;">©2020 Watcher Inc.</a>
        </div>
      </div>
    );
  }

  async handelSubmit(e) {
    e.preventDefault();
    let value = this.props.form.getFieldsValue();
    //验证
    let errMessage = [];
    if (!value.username) errMessage[0] = "用户名不能为空";
    if (!value.password) errMessage[1] = "密码不能为空";
    if (value.username && value.username.length < 3)
      errMessage[0] = "用户名不能小于三位";
    if (value.password && value.password.length < 3)
      errMessage[1] = "用户名不能小于三位";
    if (value.username && value.username.length > 10)
      errMessage[0] = "用户名不能大于十位";
    if (value.password && value.password.length > 10)
      errMessage[1] = "密码不能大于十位";
    if (errMessage.length > 0)
      return this.setState({
        errMessage
      });
    this.setState({
      isSubmit: true
    });
    let res = await loginApi(value);
    if (res.status === 100) {
      setTimeout(() => {
        localStorage.setItem("token", res.token);
        this.props.history.push("/main");
      }, 1000);
    } else {
      this.setState({
        errMessage: res.message,
        isSubmit: false
      });
    }
  }
}

const WrappedHomePage = Form.create({})(HomePage);
export default withRouter(WrappedHomePage);
