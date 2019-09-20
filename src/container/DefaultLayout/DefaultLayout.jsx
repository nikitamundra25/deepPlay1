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
  socialLoginRequest
} from "../../actions/index.jsx";

// core components
class DefaultLayout extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (!token) {
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
      socialLoginRequest
    } = this.props;
    const isLoggedIn = localStorage.getItem("token")
    const routePath = this.props.location.pathname
    return (
      <>
        <DefaultHeader
          modelInfoReducer={modelInfoReducer}
          modelOpenRequest={modelOperate}
          loginRequest={loginRequest}
          logoutRequest={logoutRequest}
          loginReducer={loginReducer}
          signupRequest={signupRequest}
          socialLoginRequest={socialLoginRequest}
        />
        <>
        
            <div className="dashboard-full-section">
          <div className={`theme-container ${routePath !== "/"? "dashboard-container":"home-container"}`}>
              {isLoggedIn && routePath !== "/" ?
                <div className="ct-sidebar app-sidebar">
                  <DefaultSidebar /></div> : null}
              
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
              </div>
            </div>
          
        </>
        {isLoggedIn && routePath !== "/" ?
          null : <DefaultFooter />}

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
  socialLoginRequest: data => dispatch(socialLoginRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
