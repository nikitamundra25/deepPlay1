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
  createFolderRequest,
  createSetRequest,
  allSearchRequest
} from "../../actions/index.jsx";
import { AppRoutes } from "../../config/AppRoutes";

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
      pathname !== "/sample-set" &&
      pathname !== "/folder/shared/link" &&
      pathname !== "/set/shared/link" &&
      pathname !== "/all/set/shared/link" &&
      pathname !== "/404"
    ) {
      this.props.redirectTo("/");
    }
  }

  onFolderCreation = data => {
    this.props.onFolderCreation(data);
  };
  onSetsCreation = data => {
    this.props.onSetsCreation(data);
  };
  handleSetting = () => {
    this.props.redirectTo(AppRoutes.SETTINGS.url);
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
      profileInfoReducer,
      allSearchRequest,
      allSearchReducer
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
            onSetsCreation={this.onSetsCreation}
            routePath={routePath}
            isLoggedIn={isLoggedIn}
            allSearchRequest={allSearchRequest}
            allSearchReducer={allSearchReducer}
            {...this.props}
          />
        ) : null}
        <>
          <div
            className={
              routePath !== "/" &&
              routePath !== "/sample-set" &&
              routePath !== "/resetPassword" &&
              routePath !== "/folder/shared/link" &&
              routePath !== "/set/shared/link" &&
              routePath !== "/all/set/shared/link" &&
              routePath !== "/404"
                ? "dashboard-full-section"
                : ""
            }
          >
            <div
              className={`${
                routePath !== "/" && routePath !== "/sample-set"
                  ? "dashboard-container-wrap "
                  : " "
              }`}
            >
              <div
                className={`theme-container ${
                  routePath !== "/" && routePath !== "/sample-set"
                    ? "dashboard-container "
                    : "home-container"
                }`}
              >
                {isLoggedIn &&
                (routePath !== "/" &&
                  routePath !== "/sample-set" &&
                  routePath !== "/resetPassword" &&
                  routePath !== "/folder/shared/link" &&
                  routePath !== "/set/shared/link" &&
                  routePath !== "/all/set/shared/link" &&
                  routePath !== "/404") ? (
                  <div className="ct-sidebar app-sidebar">
                    <DefaultSidebar
                      profileInfoReducer={profileInfoReducer}
                      handleSetting={this.handleSetting}
                    />
                  </div>
                ) : null}
                {isLoggedIn &&
                (routePath !== "/" &&
                  routePath !== "/sample-set" &&
                  routePath !== "/resetPassword" &&
                  routePath !== "/folder/shared/link" &&
                  routePath !== "/set/shared/link" &&
                  routePath !== "/all/set/shared/link" &&
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
          routePath !== "/sample-set" &&
          routePath !== "/resetPassword" &&
          routePath !== "/folder/shared/link" &&
          routePath !== "/set/shared/link" &&
          routePath !== "/all/set/shared/link" &&
          routePath !== "/404") ? null : routePath !== "/resetPassword" &&
          routePath !== "/folder/shared/link" &&
          routePath !== "/all/set/shared/link" &&
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
  profileInfoReducer: state.profileInfoReducer,
  allSearchReducer: state.allSearchReducer
});
const mapDispatchToProps = dispatch => ({
  modelOperate: data => dispatch(modelOpenRequest(data)),
  loginRequest: data => dispatch(loginRequest(data)),
  logoutRequest: data => dispatch(logoutRequest(data)),
  signupRequest: data => dispatch(signupRequest(data)),
  socialLoginRequest: data => dispatch(socialLoginRequest(data)),
  forgotPasswordRequest: data => dispatch(forgotPasswordRequest(data)),
  getProfile: () => dispatch(profileRequest()),
  onFolderCreation: data => dispatch(createFolderRequest(data)),
  allSearchRequest: data => dispatch(allSearchRequest(data)),
  onSetsCreation: data => dispatch(createSetRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
