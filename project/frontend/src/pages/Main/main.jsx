import React, { Component } from "react";
// import "./main.css";
import Header from "@/components/header/index";
import { connect } from "react-redux";
import * as actionCreator from "@/store/actionCreators/profile";
import * as actionCreatorMain from "@/store/actionCreators/main";
import { Form, Avatar, Button, Upload, Icon, message, Modal } from "antd";
import "./main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSend: false,
      showUpload: false,
      fileList: [],
      previewVisible: false,
      previewImage: "",
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.profileInfo).length === 0) {
      this.props.fetchInitData();
    }
  }

  sendTweet = () => {
    this.setState(
      {
        isSend: true,
      },
      () => {
        let photoList = [];
        let saySomething = this.refs.saySomething.value;
        this.state.fileList.forEach((item) => {
          photoList.push(item.response.data);
        });
        this.props.shareMyMood({ saySomething, photoList }, this.callback);
      }
    );
  };

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  toogleUpload = () => {
    let showUpload = !this.state.showUpload;
    this.setState({
      showUpload,
    });
  };

  callback = () => {
    setTimeout(() => {
      message.success("发布成功!");
      this.refs.saySomething.value = "";
      this.setState({
        isSend: false,
        fileList: [],
      });
    }, 1000);
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    let { profileInfo } = this.props;
    let {
      isSend,
      showUpload,
      fileList,
      previewVisible,
      previewImage,
    } = this.state;
    return (
      <div className="mainWrapper">
        <Header content="首页"></Header>

        <div className="tweet">
          <Avatar
            src={profileInfo.headerImg}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          ></Avatar>
          <div className="textarea">
            <textarea ref="saySomething"></textarea>
            {showUpload && (
              <div className="imgList">
                <Upload
                  name="backgroundImg"
                  listType="picture-card"
                  className="avatar-uploader"
                  fileList={fileList}
                  action="http://localhost:9999/users/updateImg"
                  onChange={this.handleChange}
                  onPreview={this.handlePreview}
                >
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </div>
            )}
            <div className="moreTools">
              <a href="javascript:;" onClick={this.toogleUpload}>
                <Icon
                  type="picture"
                  style={{
                    fontSize: "20px",
                    color: "#fff",
                    marginRight: "10px",
                  }}
                ></Icon>
              </a>
              <a href="javascript:;" onClick={this.toogleUpload}>
                <Icon
                  type="video-camera"
                  style={{
                    fontSize: "20px",
                    color: "#fff",
                    marginRight: "10px",
                  }}
                ></Icon>
              </a>
            </div>
          </div>
        </div>

        <Button
          type="primary"
          style={{ width: "100px", marginBottom: "20px" }}
          loading={isSend}
          onClick={this.sendTweet}
        >
          发布
        </Button>
        <div className="welcome">
          <h1>赶快分享你的心情吧!</h1>
        </div>
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
    shareMyMood(payload, callback) {
      let uid = localStorage.getItem("uid");
      dispatch(actionCreatorMain.shareMyMood(uid, payload, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Main));
