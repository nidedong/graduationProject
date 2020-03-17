import React, { Component } from "react";
import "./register.css";
import { Icon, Button, Form, Input, DatePicker, Modal } from "antd";
import { registerApi } from "@/api/user";
import { withRouter } from "react-router-dom";
let outThis;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      thisStepHasFinished: true,
      submitInfo: {},
      validateInfo: {},
      isSubmit: false,
      showModal: false
    };
  }
  render() {
    let { getFieldDecorator } = this.props.form;
    let {
      thisStepHasFinished,
      stepIndex,
      validateInfo,
      isSubmit,
      showModal
    } = this.state;
    return (
      <div className="wrapper">
        <div className="box">
          {stepIndex === 0 ? (
            <div className="header-stepOne">
              <Icon
                type="eye"
                theme="filled"
                style={{ color: "#fff", fontSize: "26px" }}
              />
              <div class="btnWrapper">
                <Button
                  type="primary"
                  disabled={thisStepHasFinished}
                  onClick={this.toggleStepIndex.bind(this)}
                >
                  下一步
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="header-stepTwo"
              onClick={this.toggleStepIndex.bind(this)}
            >
              <Icon
                type="arrow-left"
                style={{
                  color: "#43b1f4",
                  fontSize: "26px"
                }}
              ></Icon>
            </div>
          )}

          <strong>创建你的账号</strong>
          <Form labelAlign="left">
            {stepIndex === 0 ? (
              <div className="stepOne">
                <Form.Item label="姓名">
                  {getFieldDecorator(
                    "name",
                    {}
                  )(
                    <Input
                      placeholder="请输入姓名"
                      size="large"
                      maxLength="15"
                    ></Input>
                  )}
                </Form.Item>
                <Form.Item
                  label="电话号码"
                  validateStatus={validateInfo.phone ? "error" : ""}
                  help={validateInfo.phone}
                >
                  {getFieldDecorator("phone", {
                    len: 11
                  })(
                    <Input
                      placeholder="请输入电话号码"
                      size="large"
                      maxLength="11"
                    ></Input>
                  )}
                </Form.Item>
                <Form.Item label="出生日期">
                  {getFieldDecorator(
                    "birthday",
                    {}
                  )(<DatePicker placeholder="请输入出生日期"></DatePicker>)}
                  <p class="tip">
                    这里不公开显示。请确认你的年龄以获得适当的体验。
                  </p>
                </Form.Item>
              </div>
            ) : (
              <div className="stepTow">
                <Form.Item
                  label="账号"
                  validateStatus={validateInfo.username ? "error" : ""}
                  help={validateInfo.username}
                >
                  {getFieldDecorator(
                    "username",
                    {}
                  )(
                    <Input
                      placeholder="请输入账号"
                      size="large"
                      maxLength="15"
                    ></Input>
                  )}
                </Form.Item>
                <Form.Item
                  label="密码"
                  validateStatus={validateInfo.password ? "error" : ""}
                  help={validateInfo.password}
                >
                  {getFieldDecorator(
                    "password",
                    {}
                  )(
                    <Input.Password
                      placeholder="请输入密码"
                      size="large"
                      type="password"
                      visibilityToggle
                      maxLength="15"
                    ></Input.Password>
                  )}
                </Form.Item>
                <Form.Item
                  label="确认密码"
                  validateStatus={validateInfo.checkPassword ? "error" : ""}
                  help={validateInfo.checkPassword}
                >
                  {getFieldDecorator(
                    "checkPassword",
                    {}
                  )(
                    <Input.Password
                      placeholder="请输入密码"
                      size="large"
                      type="password"
                      visibilityToggle
                      maxLength="15"
                    ></Input.Password>
                  )}
                </Form.Item>
                <Button
                  type="primary"
                  onClick={this.handleSubmit.bind(this)}
                  loading={isSubmit}
                >
                  注册
                </Button>
              </div>
            )}
          </Form>
        </div>
      </div>
    );
  }

  handleSubmit() {
    this.setState(
      {
        validateInfo: {},
        isSubmit: true
      },
      async () => {
        let { form, history } = this.props;
        let { submitInfo, validateInfo } = this.state;
        let stepTwoInfo = form.getFieldsValue();
        //校验
        !stepTwoInfo.username && (validateInfo.username = "用户名不能为空");
        !stepTwoInfo.password && (validateInfo.password = "密码不能为空");
        !stepTwoInfo.checkPassword &&
          (validateInfo.checkPassword = "确认密码不能为空");
        stepTwoInfo.password &&
          stepTwoInfo.checkPassword &&
          stepTwoInfo.checkPassword !== stepTwoInfo.password &&
          (validateInfo.checkPassword = "两次输入密码不一样");
        if (Object.keys(validateInfo).length > 0)
          return this.setState({
            validateInfo,
            isSubmit: false
          });
        //验证成功后
        // 拼接数据
        Object.assign(submitInfo, stepTwoInfo);
        let registerApiRes = await registerApi(submitInfo);
        if (registerApiRes.status == 200) {
          validateInfo.username = "用户名已存在";
          setTimeout(() => {
            this.setState({
              isSubmit: false,
              validateInfo
            });
          }, 800);
        } else {
          //注册成功出现模态框，点击跳转去的登陆
          setTimeout(() => {
            Modal.success({
              title: "账号注册成功",
              content: (
                <div>
                  <h2>您的账号为: {registerApiRes.username}</h2>
                  <p>点击确认前往登陆</p>
                </div>
              ),
              onOk() {
                history.push("/login");
              }
            });
          }, 800);
        }
      }
    );
  }

  //改变步数
  toggleStepIndex() {
    let { form } = this.props;
    let { submitInfo, stepIndex, validateInfo } = this.state;
    let stepInfo = form.getFieldsValue();
    if (stepIndex === 0) {
      let reg = /\d{11}/;
      if (!reg.test(stepInfo.phone)) {
        validateInfo.phone = "电话号码格式有误!";
        return this.setState({
          validateInfo
        });
      }
      submitInfo = Object.assign({}, submitInfo, stepInfo);
    } else {
      submitInfo = Object.assign({}, submitInfo, stepInfo);
    }

    this.setState(
      {
        validateInfo: {},
        submitInfo,
        stepIndex: stepIndex === 0 ? 1 : 0
      },
      () => {
        stepIndex === 1
          ? form.setFieldsValue({
              name: submitInfo.name,
              phone: submitInfo.phone,
              birthday: submitInfo.birthday
            })
          : form.setFieldsValue({
              username: submitInfo.username,
              password: submitInfo.password,
              checkPassword: submitInfo.checkPassword
            });
      }
    );
  }

  componentDidMount() {
    outThis = this;
  }
}

const WrapperedRegister = Form.create({
  onValuesChange(props, changeValues, allValues) {
    //若表单数据都填写完成则提交高亮下一步按钮

    outThis.setState({
      thisStepHasFinished:
        allValues.name && allValues.phone && allValues.birthday ? false : true
    });
  }
})(Register);

export default withRouter(WrapperedRegister);
