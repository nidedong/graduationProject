import React, { Component } from "react";
import "./homePage.css";
import { Icon, Form, Input, Button } from "antd";

class HomePage extends Component {
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
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
          <div className="right">
            <div className="quicklyLogin">
              <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your username!" }
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
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
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
                  >
                    登 陆
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div className="loginOrRegister"></div>
          </div>
        </div>

        <div className="footer"></div>
      </div>
    );
  }
}

const WrappedHomePage = Form.create({})(HomePage);
export default WrappedHomePage;
