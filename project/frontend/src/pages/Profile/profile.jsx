import React, { Component } from "react";
import "./profile.css";
import Header from "@/components/header/index";
import { Icon, Button, Modal, Form, Input, Upload, message } from "antd";
import { connect } from "react-redux";
import * as actionCreator from "@/store/actionCreators/profile";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading_avatar: false,
      loading_bgi: false,
    };
  }
  // 数据初始化
  componentDidMount() {
    // this.props.fetchInitData();
  }

  toogleModalStatus() {
    let { setFieldsValue } = this.props.form;
    let { profileInfo } = this.props;
    setFieldsValue({
      nickname: profileInfo.nickname,
      birthday: profileInfo.birthday,
      phone: profileInfo.phone,
    });
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    let { getFieldsValue } = this.props.form;
    let fields = getFieldsValue(["nickname", "birthday", "phone"]);
    let { headerImg, backgroundImg } = this.state;
    let postParams = { headerImg, backgroundImg, ...fields };
    !headerImg && delete postParams.headerImg;
    !backgroundImg && delete postParams.backgroundImg;
    postParams = Object.assign({}, this.props.profileInfo, postParams);
    // 上传修改的信息
    this.props.putData(postParams);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  // 限制用户上传文件格式、大小
  beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  // 头像改变
  handleChange_avatar = (info, e) => {
    if (info.file.status === "uploading") {
      this.setState({ loading_avatar: true });
      return;
    }
    if (info.file.status === "done") {
      this.getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          avatarUrl: imageUrl,
          headerImg: info.file.response.data,
          loading: false,
        });
      });
    }
  };
  handleChange_bgi = (info, e) => {
    if (info.file.status === "uploading") {
      this.setState({ loading_bgi: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          bgiUrl: imageUrl,
          backgroundImg: info.file.response.data,
          loading: false,
        })
      );
    }
  };

  render() {
    let profileInfo = this.props.profileInfo;
    let { getFieldDecorator } = this.props.form;
    let { avatarUrl, bgiUrl } = this.state;
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

    return (
      <div class="profileWrapper">
        <Header content="我的"></Header>
        <div className="backgroundImg">
          <img
            src={profileInfo.backgroundImg}
            alt=""
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
          <div className="headerPicWrapper">
            <img
              src={profileInfo.headerImg}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* 设置 */}
        <div className="settingProfile">
          <Button onClick={() => this.toogleModalStatus()}>设置我的</Button>
        </div>

        <div className="showInfo">
          <div className="nickName special">{profileInfo.nickname}</div>
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
              {getFieldDecorator("nickname", {
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
              })(<Input placeholder="生日" type="date" />)}
            </Form.Item>
            <Form.Item label="背景图片">
              <Upload
                name="backgroundImg"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:9999/users/updateImg"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange_bgi}
              >
                {bgiUrl ? (
                  <img
                    src={bgiUrl}
                    alt="backgroundImg"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>
                    <Icon type={this.state.loading_bgi ? "loading" : "plus"} />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item label="头像">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:9999/users/updateImg"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange_avatar}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  <div>
                    <Icon
                      type={this.state.loading_avatar ? "loading" : "plus"}
                    />
                    <div className="ant-upload-text">Upload</div>
                  </div>
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

    putData(params) {
      let uid = localStorage.getItem("uid");
      dispatch(actionCreator.putData(uid, params));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Profile));
