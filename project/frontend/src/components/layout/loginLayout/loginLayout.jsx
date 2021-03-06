import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
class LoginLayout extends Component {
  render() {
    const { routes } = this.props;
    console.log(routes);
    return (
      <Switch>
        {/* <Redirect from="/" to="/home" exact></Redirect> */}
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

export default LoginLayout;
