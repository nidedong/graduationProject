import React, { Component } from "react";
import "./register.css";
import { Icon, Button, Form, Input, DatePicker } from "antd";
let outThis;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      thisStepHasFinished: true
    };
  }
  render() {
    let { getFieldDecorator } = this.props.form;
    let { thisStepHasFinished, stepIndex } = this.state;
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
          <Form onSubmit={this.handleSubmit.bind(this)} labelAlign="left">
            <div className="stepOne">
              <Form.Item label="姓名">
                {getFieldDecorator(
                  "name",
                  {}
                )(<Input placeholder="请输入姓名" size="large"></Input>)}
              </Form.Item>
              <Form.Item label="电话号码">
                {getFieldDecorator(
                  "phone",
                  {}
                )(<Input placeholder="请输入电话号码" size="large"></Input>)}
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
          </Form>
        </div>
      </div>
    );
  }

  handleSubmit() {
    console.log("提交信息");
  }

  //改变步数
  toggleStepIndex() {
    let stepIndex = this.state.stepIndex;

    this.setState({
      stepIndex: this.state.stepIndex === 0 ? 1 : 0
    });
  }

  componentDidMount() {
    outThis = this;
  }
}
console.log(Register.setState);
const WrapperedRegister = Form.create({
  onValuesChange(props, changeValues, allValues) {
    //若表单数据都填写完成则提交高亮下一步按钮
    if (allValues.name && allValues.phone && allValues.birthday) {
      outThis.setState({
        thisStepHasFinished: false
      });
    }
  }
})(Register);

export default WrapperedRegister;
