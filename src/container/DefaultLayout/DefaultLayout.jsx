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
  allSearchRequest,
  loadVideoDataRequest,
  deleteMovesRequest,
  starredMovesRequest,
  getTagListRequest,
  addTagsInTagModalRequest,
  updateMoveRequest,
  getAllSetRequest,
  transferMovesRequest,
  addTagsRequest,
  videoFullscreenReq,
  videoFullscreenExit,
  videoDataFromSearch,
  detectBrowserRequest
} from "../../actions/index.jsx";
import { AppRoutes } from "../../config/AppRoutes";
import Loader from "components/comman/Loader/Loader";

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
      pathname !== "/404" &&
      pathname !== "/public-access-denied" &&
      pathname !== "/privacy-policy" &&
      pathname !== "/terms-and-conditions"
    ) {
      this.props.redirectTo("/");
    }

    this.getMobileOperatingSystem();
  }

  getMobileOperatingSystem = () => {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      this.props.detectBrowserRequest();
    }
    return "browser";
  };

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
      allSearchReducer,
      shareLinkReducer,
      moveReducer,
      loadVideoDataRequest,
      deleteMovesRequest,
      starredMovesRequest,
      getTagListRequest,
      addTagsInTagModalRequest,
      updateMoveRequest,
      allSetList,
      getSetList,
      transferMovesRequest,
      addTagsRequest,
      videoFullscreenReq,
      videoFullscreenExit,
      videoDataFromSearch
    } = this.props;
    const {
      videoData,
      tagsList,
      isFullScreenMode,
      isVideoFromSearch
    } = moveReducer;

    let isLoggedIn;

    if (localStorage.getItem("token")) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
    const routePath = this.props.location.pathname;
    let moveSection = routePath.split("s");
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
            shareLinkReducer={shareLinkReducer}
            videoData={videoData}
            isFullScreenMode={isFullScreenMode}
            allSetList={allSetList}
            videoFullscreenReq={videoFullscreenReq}
            videoFullscreenExit={videoFullscreenExit}
            loadVideoDataRequest={loadVideoDataRequest}
            deleteMoveRequest={data => deleteMovesRequest(data)}
            isStarredRequest={data => starredMovesRequest(data)}
            getTagListRequest={() => getTagListRequest()}
            addTagsInTagModalRequest={() => addTagsInTagModalRequest()}
            updateMoveRequest={data => updateMoveRequest(data)}
            getSetList={data => getSetList(data)}
            transferMove={data => transferMovesRequest(data)}
            addTagsRequest={data => addTagsRequest(data)}
            tagsList={tagsList}
            videoDataFromSearch={videoDataFromSearch}
            isVideoFromSearch={isVideoFromSearch}
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
              routePath !== "/404" &&
              routePath !== "/public-access-denied"
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
                routePath !== "/" &&
                routePath !== "/sample-set" &&
                routePath !== "/resetPassword" &&
                routePath !== "/folder/shared/link" &&
                routePath !== "/set/shared/link" &&
                routePath !== "/all/set/shared/link" &&
                routePath !== "/404" &&
                routePath !== "/public-access-denied" &&
                routePath !== "/privacy-policy" &&
                moveSection[0] !== "/move/detail" &&
                routePath !== "/terms-and-conditions" ? (
                  <div className="ct-sidebar app-sidebar">
                    <DefaultSidebar
                      profileInfoReducer={profileInfoReducer}
                      handleSetting={this.handleSetting}
                    />
                  </div>
                ) : null}
                {isLoggedIn &&
                routePath !== "/" &&
                routePath !== "/sample-set" &&
                routePath !== "/resetPassword" &&
                routePath !== "/folder/shared/link" &&
                routePath !== "/set/shared/link" &&
                routePath !== "/all/set/shared/link" &&
                routePath !== "/404" &&
                routePath !== "/privacy-policy" &&
                routePath !== "/terms-and-conditions" &&
                routePath !== "/public-access-denied" ? (
                  <div className={`dashboard-right-wrap ${ moveSection[0] == "/move/detail" ? "without-side detail-wrap" : " "}`}>
                    <div className="dashboard-right-section">
                      <Suspense fallback={<Loader fullLoader={true} />}>
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
                  <Suspense fallback={<Loader fullLoader={true} />}>
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
        routePath !== "/" &&
        routePath !== "/sample-set" &&
        routePath !== "/resetPassword" &&
        routePath !== "/folder/shared/link" &&
        routePath !== "/set/shared/link" &&
        routePath !== "/all/set/shared/link" &&
        routePath !== "/404" ? null : routePath !== "/resetPassword" &&
          routePath !== "/folder/shared/link" &&
          routePath !== "/all/set/shared/link" &&
          routePath !== "/set/shared/link" &&
          routePath !== "/404" &&
          routePath !== "/public-access-denied" ? (
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
  allSearchReducer: state.allSearchReducer,
  shareLinkReducer: state.shareLinkReducer,
  moveReducer: state.moveReducer,
  allSetList: state.setReducer.allSetList
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
  onSetsCreation: data => dispatch(createSetRequest(data)),
  loadVideoDataRequest: data => dispatch(loadVideoDataRequest(data)),
  deleteMoveRequest: data => dispatch(deleteMovesRequest(data)),
  isStarredRequest: data => dispatch(starredMovesRequest(data)),
  getTagListRequest: () => {
    dispatch(getTagListRequest());
  },
  addTagsInTagModalRequest: data => {
    dispatch(addTagsInTagModalRequest(data));
  },
  updateMoveRequest: data => {
    dispatch(updateMoveRequest(data));
  },
  getSetList: data => {
    dispatch(getAllSetRequest(data));
  },
  transferMovesRequest: data => dispatch(transferMovesRequest(data)),
  addTagsRequest: data => dispatch(addTagsRequest(data)),
  videoFullscreenReq: data => {
    dispatch(videoFullscreenReq(data));
  },
  videoFullscreenExit: data => {
    dispatch(videoFullscreenExit(data));
  },
  videoDataFromSearch: data => {
    dispatch(videoDataFromSearch(data));
  },
  detectBrowserRequest: () => {
    dispatch(detectBrowserRequest());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
