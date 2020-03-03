import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
class MainLayout extends Component {
  render() {
    const token = localStorage.getItem("token");
    console.log(token);
    const { routes } = this.props;
    const cpnRed = !token ? (
      <Route path="/main">
        <Redirect to="/"></Redirect>
      </Route>
    ) : (
      ""
    );
    return (
      <Switch>
        {cpnRed}
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
    );
  }
}

export default MainLayout;
