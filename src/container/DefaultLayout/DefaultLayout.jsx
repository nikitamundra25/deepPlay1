import React, { Suspense } from "react";
import { connect } from "react-redux";
import DefaultHeader from "./DefaultHeader"
import DefaultFooter from "./DefaultFooter"
import routes from "../../routes";
import { Route, Switch } from "react-router-dom";
import { modelOpenRequest, loginRequest, logoutRequest, signupRequest } from "../../actions/index.jsx"

// core components
class DefaultLayout extends React.Component {

  render() {
    const {
      modelInfoReducer,
      modelOperate,
      loginRequest,
      logoutRequest,
      loginReducer,
      signupRequest } = this.props
    return (
      <>
        <DefaultHeader
          modelInfoReducer={modelInfoReducer}
          modelOpenRequest={modelOperate}
          loginRequest={loginRequest}
          logoutRequest={logoutRequest}
          loginReducer={loginReducer}
          signupRequest={signupRequest}
        />
        <>
          <Suspense fallback={""}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <route.component
                        {...props}
                        {...this.props}
                      />
                    )}
                  />
                ) : null;
              })}
            </Switch>
          </Suspense>
        </>

        <DefaultFooter />
      </>
    );
  }
}

const mapStateToProps = state => ({
  modelInfoReducer: state.modelInfoReducer,
  loginReducer: state.loginReducer
});
const mapDispatchToProps = dispatch => ({
  modelOperate: data => dispatch(modelOpenRequest(data)),
  loginRequest: data => dispatch(loginRequest(data)),
  logoutRequest: data => dispatch(logoutRequest(data)),
  signupRequest: data => dispatch(signupRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
