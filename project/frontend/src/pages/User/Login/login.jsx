import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <div>
          账号：
          <input type="text" />
        </div>
        <div>
          密码：
          <input type="password" />
        </div>
      </div>
    );
  }
}

export default Login;
