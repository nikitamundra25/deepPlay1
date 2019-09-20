import React, { Suspense } from "react";
import { connect } from "react-redux";
import DefaultHeader from "./DefaultHeader";
import DefaultFooter from "./DefaultFooter";
import routes from "../../routes";
import { Route, Switch } from "react-router-dom";
import DefaultSidebar from "./DefaultSidebar";
import {
  modelOpenRequest,
  loginRequest,
  logoutRequest,
  signupRequest,
  socialLoginRequest,
  forgotPasswordRequest
} from "../../actions/index.jsx";

// core components
class DefaultLayout extends React.Component {
  componentDidMount() {
    const pathname = this.props.location.pathname
    const token = localStorage.getItem("token")
    if (!token && pathname !== "/resetPassword") {
      this.props.redirectTo("/")
    }
  }
  /*
  /*  
  */
  render() {
    const {
      modelInfoReducer,
      modelOperate,
      loginRequest,
      logoutRequest,
      loginReducer,
      signupRequest,
      socialLoginRequest,
      forgotPasswordRequest
    } = this.props;
    let isLoggedIn
    if (localStorage.getItem("token")) {
      isLoggedIn = true 
    }else{
      isLoggedIn = false
    }
   const routePath = this.props.location.pathname
    return (
      <>
        {
          (routePath !== "/resetPassword") ?
            <DefaultHeader
              modelInfoReducer={modelInfoReducer}
              modelOpenRequest={modelOperate}
              loginRequest={loginRequest}
              logoutRequest={logoutRequest}
              loginReducer={loginReducer}
              signupRequest={signupRequest}
              socialLoginRequest={socialLoginRequest}
              forgotPasswordRequest={forgotPasswordRequest}
            /> : null
        }
        <>
          <div className={"theme-container"}>
            <div className={routePath !== "/resetPassword" ? "dashboard-full-section" : ""}>
              {isLoggedIn && (routePath !== "/" && routePath !== "/resetPassword") ?
                <div className="ct-sidebar app-sidebar">
                  <DefaultSidebar /></div> : null}
              {
                isLoggedIn && (routePath !== "/" && routePath !== "/resetPassword") ?
                  <div className={"dashboard-right-wrap"}>
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
                                <route.component {...props} {...this.props} />
                              )}
                            />
                          ) : null;
                        })}
                      </Switch>
                    </Suspense>
                  </div> :
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
                              <route.component {...props} {...this.props} />
                            )}
                          />
                        ) : null;
                      })}
                    </Switch>
                  </Suspense>
              }
            </div>
          </div>
        </>
        {isLoggedIn && (routePath !== "/" && routePath !== "/resetPassword") ?
          null :
          routePath !== "/resetPassword" ?
            <DefaultFooter /> : null
        }

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
  signupRequest: data => dispatch(signupRequest(data)),
  socialLoginRequest: data => dispatch(socialLoginRequest(data)),
  forgotPasswordRequest: data => dispatch(forgotPasswordRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
