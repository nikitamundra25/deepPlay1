import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { redirectTo } from "../actions/index.jsx";
import {AppRoutes as routesData}  from "../config/AppRoutes";
import "../App.scss";
// Pages
const DefaultLayout = React.lazy(() =>
import("../container/DefaultLayout/DefaultLayout")
);
const Login = React.lazy(() => import("../container/Auth/Login"));
const Signup = React.lazy(() => import("../container/Auth/Signup"));

const Routes = [
  {
    exact: false,
    path: "/",
    name: "Home",
    component: DefaultLayout
  },
  {
    path: routesData.LOGIN.url,
    exact: routesData.LOGIN.exact,
    name: routesData.LOGIN.name,
    component: Login
  },
  {
    path: routesData.SIGNUP.url,
    exact: routesData.SIGNUP.exact,
    name: routesData.SIGNUP.name,
    component: Signup
  },
 
];

class AppRoutes extends Component {
  componentDidMount() {}
  render() {
    return (
      <>
        <Switch>
          {Routes.map((route, index) => {
            return (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                name={route.name}
                render={props => <route.component {...props} {...this.props} />}
              />
            );
          })}
        </Switch>
      </>
    );
  }
}
const mapStateToProps = state => ({
  appState: state.mainReducer
});
const mapDispatchToProps = dispatch => {
  return {
    redirectTo: path => {
      dispatch(redirectTo({ path }));
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppRoutes)
);
