import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./mainLayout.css";
import Aside from "@/components/aside/index";
class MainLayout extends Component {
  render() {
    const token = sessionStorage.getItem("token");
    const { routes } = this.props;
    const cpnRed = !token ? (
      <Route path="/main">
        <Redirect to="/"></Redirect>
      </Route>
    ) : (
      ""
    );
    console.log(routes, "reoutes");
    return (
      <div className="overallLayout">
        <div className="left">
          <Aside></Aside>
        </div>
        <div className="middle">
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
        </div>
        <div className="right"></div>
      </div>
    );
  }
}

export default MainLayout;
