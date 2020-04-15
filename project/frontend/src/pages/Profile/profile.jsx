import React, { Component } from "react";
import "./profile.css";
import Header from "@/components/header/index";
import { Icon, Button, Modal, Form, Input, Upload } from "antd";
import { connect } from "react-redux";
import * as actionCreator from "@/store/actionCreators/profile";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  // 数据初始化
  componentDidMount() {
    this.props.fetchInitData();
  }

  toogleModalStatus() {
    let visible = !this.state.visible;
    this.setState({
      visible,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    let profileInfo = this.props.profileInfo;
    let { getFieldDecorator } = this.props.form;
    let { imageUrl } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div class="profileWrapper">
        <Header content="我的"></Header>
        <div className="backgroundImg">
          <img src="" alt="" />
          <div className="headerPicWrapper">
            <img src="" alt="" />
          </div>
        </div>

        {/* 设置 */}
        <div className="settingProfile">
          <Button onClick={() => this.toogleModalStatus()}>设置我的</Button>
        </div>

        <div className="showInfo">
          <div className="nickName special">{profileInfo.nickName}</div>
          <div className="username pl5 lh">
            <Icon type="smile" style={{ "margin-right": "10px" }}></Icon>
            <span>{profileInfo.username}</span>
          </div>
          <div className="phone pl5 lh">
            <Icon type="phone" style={{ "margin-right": "10px" }}></Icon>
            <span>{profileInfo.phone}</span>
          </div>
          <div className="birthday pl5 lh">
            <Icon type="schedule" style={{ "margin-right": "10px" }}></Icon>
            <span>{profileInfo.birthday}</span>
          </div>
          <div className="follow lh">
            <div className="following">
              <span className="special">{profileInfo.following}</span>关注
            </div>
            <div className="followers">
              <span className="special">{profileInfo.followers}</span>关注我的
            </div>
          </div>
        </div>

        {/* 模态框 */}
        <Modal
          visible={this.state.visible}
          title="设置我的信息"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ backgroundColor: "#15202b" }}
          cancelText="取消"
          okText="确定"
          width="800px"
        >
          <Form {...formItemLayout}>
            <Form.Item label="昵称">
              {getFieldDecorator("nickName", {
                rules: [{ required: true, message: "请输入你的昵称!" }],
              })(<Input placeholder="昵称" />)}
            </Form.Item>
            <Form.Item label="电话号码">
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: "请输入你的电话号码!" }],
              })(<Input placeholder="电话号码" />)}
            </Form.Item>
            <Form.Item label="生日">
              {getFieldDecorator("birthday", {
                rules: [{ required: true, message: "请输入你的生日!" }],
              })(<Input placeholder="生日" />)}
            </Form.Item>
            <Form.Item label="背景图片">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                // onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item label="头像">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                // onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileInfo: state.profileInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitData() {
      let uid = localStorage.getItem("uid");
      dispatch(actionCreator.fetchInitData(uid));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Profile));
