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
  forgotPasswordRequest,
  profileRequest,
  createFolderRequest
} from "../../actions/index.jsx";

// core components
class DefaultLayout extends React.Component {
  componentDidMount() {
    const pathname = this.props.location.pathname;
    const token = localStorage.getItem("token");
    if (token) {
      this.props.getProfile();
    }
    if (
      !token &&
      pathname !== "/resetPassword" &&
      pathname !== "/folder/shared/link" &&
      pathname !== "/set/shared/link" &&
      pathname !== "/404"
    ) {
      this.props.redirectTo("/");
    }
  }

  onFolderCreation = data => {
    this.props.onFolderCreation(data);
  };
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
      forgotPasswordRequest,
      profileInfoReducer
    } = this.props;
    let isLoggedIn;

    if (localStorage.getItem("token")) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
    const routePath = this.props.location.pathname;
    return (
      <>
        {routePath !== "/resetPassword" ? (
          <DefaultHeader
            modelInfoReducer={modelInfoReducer}
            modelOpenRequest={modelOperate}
            loginRequest={loginRequest}
            logoutRequest={logoutRequest}
            loginReducer={loginReducer}
            signupRequest={signupRequest}
            profileInfoReducer={profileInfoReducer}
            socialLoginRequest={socialLoginRequest}
            forgotPasswordRequest={forgotPasswordRequest}
            onFolderCreation={this.onFolderCreation}
            routePath={routePath}
            isLoggedIn={isLoggedIn}
            {...this.props}
          />
        ) : null}
        <>
          <div
            className={
              routePath !== "/" &&
              routePath !== "/resetPassword" &&
              routePath !== "/folder/shared/link" &&
              routePath !== "/set/shared/link" &&
              routePath !== "/404"
                ? "dashboard-full-section"
                : ""
            }
          >
            <div
              className={`${
                routePath !== "/" ? "dashboard-container-wrap " : " "
              }`}
            >
              <div
                className={`theme-container ${
                  routePath !== "/" ? "dashboard-container " : "home-container"
                }`}
              >
                {isLoggedIn &&
                (routePath !== "/" &&
                  routePath !== "/resetPassword" &&
                  routePath !== "/folder/shared/link" &&
                  routePath !== "/set/shared/link" &&
                  routePath !== "/404") ? (
                  <div className="ct-sidebar app-sidebar">
                    <DefaultSidebar profileInfoReducer={profileInfoReducer} />
                  </div>
                ) : null}
                {isLoggedIn &&
                (routePath !== "/" &&
                  routePath !== "/resetPassword" &&
                  routePath !== "/folder/shared/link" &&
                  routePath !== "/set/shared/link" &&
                  routePath !== "/404") ? (
                  <div className="dashboard-right-wrap">
                    <div className="dashboard-right-section">
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
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </>
        {isLoggedIn &&
        (routePath !== "/" &&
          routePath !== "/resetPassword" &&
          routePath !== "/folder/shared/link" &&
          routePath !== "/set/shared/link" &&
          routePath !== "/404") ? null : routePath !== "/resetPassword" &&
          routePath !== "/folder/shared/link" &&
          routePath !== "/set/shared/link" &&
          routePath !== "/404" ? (
          <DefaultFooter />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  modelInfoReducer: state.modelInfoReducer,
  loginReducer: state.loginReducer,
  profileInfoReducer: state.profileInfoReducer
});
const mapDispatchToProps = dispatch => ({
  modelOperate: data => dispatch(modelOpenRequest(data)),
  loginRequest: data => dispatch(loginRequest(data)),
  logoutRequest: data => dispatch(logoutRequest(data)),
  signupRequest: data => dispatch(signupRequest(data)),
  socialLoginRequest: data => dispatch(socialLoginRequest(data)),
  forgotPasswordRequest: data => dispatch(forgotPasswordRequest(data)),
  getProfile: () => dispatch(profileRequest()),
  onFolderCreation: data => {
    dispatch(createFolderRequest(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
