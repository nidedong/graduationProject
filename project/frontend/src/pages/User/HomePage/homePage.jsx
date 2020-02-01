import React, { Component } from "react";
import "./homePage.css";
import { Icon, Form, Input, Button } from "antd";
// import { connect } from "react-redux";
import { loginApi } from "../../../api/user";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: "",
      isSubmit: false
    };
  }
  componentDidMount() {
    // this.props.form.validateFields();
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const usernameError =
      (isFieldTouched("username") && getFieldError("username")) ||
      this.state.errMessage;
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
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
                  validateStatus={usernameError ? "error" : ""}
                  help={this.state.errMessage}
                >
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "用户名不能为空!" },
                      { min: 3, message: "用户名最少为3位" },
                      { max: 6, message: "用户名最多为6位" }
                    ]
                  })(
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
                  validateStatus={passwordError ? "error" : ""}
                  help={passwordError || ""}
                >
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "密码不能为空!" },
                      { min: 3, message: "密码最少为3位" },
                      { max: 6, message: "密码最多为6位" }
                    ]
                  })(
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
                    // disabled={hasErrors(getFieldsError())}
                    disabled={this.hasErrors(getFieldsError())}
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
              <Button type="primary" size="large" className="raduis_20">
                注册
              </Button>
              <Button className="raduis_20">登陆</Button>
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

  //登录按钮能否点击
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  async handelSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmit: true
    });
    let value = this.props.form.getFieldsValue();
    let res = await loginApi(value);
    if (res.status === 100) {
      console.log("登陆成功");
    } else {
      this.setState({
        errMessage: res.message,
        isSubmit: false
      });
    }
  }
}

const WrappedHomePage = Form.create({})(HomePage);
export default WrappedHomePage;
