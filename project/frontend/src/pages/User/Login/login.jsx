import React, { Component } from "react";
import { Icon, Form, Input, Checkbox, Button } from "antd";
import { loginApi } from "../../../api/user";
import { Link, withRouter } from "react-router-dom";
import "./login.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errMessage: [],
      isSubmit: false,
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { errMessage, isSubmit } = this.state;
    return (
      <div className="loginWrapper">
        <div className="header">
          <Icon
            type="eye"
            theme="filled"
            style={{ color: "#fff", fontSize: "40px" }}
          />
          <span>登陆watcher</span>
        </div>

        <Form onSubmit={this.handelSubmit.bind(this)} className="login-form">
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
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
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
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
            <a className="login-form-forgot" href="javascript:;">
              忘记密码
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isSubmit}
            >
              登陆
            </Button>
            <Link to="/register">现在注册!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }

  componentDidMount() {
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    if (username && password)
      this.props.form.setFieldsValue({ username, password });
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
        errMessage,
      });
    this.setState({
      isSubmit: true,
    });
    let res = await loginApi(value);
    if (res.status === 100) {
      if (value.remember) {
        localStorage.setItem("username", value.username);
        localStorage.setItem("password", value.password);
      }
      setTimeout(() => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("uid", res.data.uid);
        this.props.history.push("/main");
      }, 1000);
    } else {
      this.setState({
        errMessage: res.message,
        isSubmit: false,
      });
    }
  }
}

const WrappedLogin = Form.create({})(Login);

export default withRouter(WrappedLogin);
