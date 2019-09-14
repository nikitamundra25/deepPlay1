import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { redirectTo } from "../actions/index";
import "../App.scss";
// Pages
const DefaultLayout = React.lazy(() => import("../container/DefaultLayout/DefaultLayout"));

const Routes = [
  {
    exact: false,
    path: "/",
    name: "Home",
    //component: !localStorage.getItem("token") ? HomePage : DefaultLayout
    component: DefaultLayout
  }
];

class AppRoutes extends Component {
  componentDidMount() { }
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
