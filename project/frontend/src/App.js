import React, { Component } from "react";

// import Main from "@/pages/Main/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "@/routes/router";
console.log(routes);
import { Button } from "antd";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map((item, index) => (
            <Route
              path={item.path}
              render={() => (
                <item.component routes={item.children}></item.component>
              )}
              exact={item.exact}
              key={index}
            ></Route>
          ))}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
