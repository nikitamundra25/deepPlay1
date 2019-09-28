import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { redirectTo } from "../actions/index.jsx";
import {AppRoutes as routesData}  from "../config/AppRoutes";
// import "../App.scss";
// Pages
const DefaultLayout = React.lazy(() =>
import("../container/DefaultLayout/DefaultLayout")
);
const ResetPassword = React.lazy(() => import("../container/Auth/ResetPassword"));
const Page404 = React.lazy(() => import("../components/Page404"));

const Routes = [
  {
    exact: false,
    path: "/",
    name: "Home",
    component: DefaultLayout
  },
  {
    exact: true,
    path: routesData.RESET_PASSWORD.url,
    name: routesData.RESET_PASSWORD.name,
    component: ResetPassword
  },
  {
    exact: true,
    path: "/404",
    name: "Page 404",
    component: Page404
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
