import React, { Component } from "react";
import { Icon, Form, Input, Checkbox, Button } from "antd";
import "./login.css";
class Login extends Component {
  render() {
    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16
      }
    };
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

        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
