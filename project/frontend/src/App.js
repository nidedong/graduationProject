import React, { Component } from "react";
import HomePage from "./pages/User/HomePage/homePage";

import { Button } from "antd";
class App extends Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <HomePage></HomePage>
        {/* <Button loading classNmae="primary">
          登陆
        </Button> */}
      </div>
    );
  }
}

export default App;
