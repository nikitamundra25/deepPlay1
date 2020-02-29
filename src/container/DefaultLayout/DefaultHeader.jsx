import React from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  Nav,
  Row,
  Col,
  InputGroupAddon,
  FormGroup,
  InputGroup
} from "reactstrap";
import Login from "../Auth/Login/index.jsx";
import Signup from "../Auth/Signup/index.jsx";
import FolderModal from "../../components/Folders/createFolderModal";
import profileImageIc from "../../assets/img/profile-ic.png";
import { AppRoutes } from "../../config/AppRoutes";
import { SidebarComponent } from "../../components/Sidebar";
import logoutIcon from "../../assets/img/icons/logout.svg";
import liveChatIcon from "../../assets/img/icons/text.svg";
import suggestionIcon from "../../assets/img/icons/suggestion.svg";
import { AppConfig } from "../../config/Appconfig";
import AllSearchComponent from "../../components/AllSearch";
import CreateSetComponent from "../../components/Sets/createSet";
import searchArrow from "../../assets/img/back-search.png";
import { DebounceInput } from "react-debounce-input";
import WebmSearch from "../../components/comman/WebmSearch";

class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: false,
      path: "",
      search: "",
      open: false,
      showVideo: "",
      liveChatEnabled: false
    };
  }

  componentDidMount = () => {
    const temp = this.props.history.location.pathname;
    document.addEventListener("mousedown", this.handleClickOutside);
    if (localStorage.getItem("token")) {
      this.setState({
        isUserLoggedIn: true,
        path: temp
      });
    } else {
      this.setState({
        isUserLoggedIn: false,
        path: temp
      });
    }
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        search: ""
      });
    }
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  componentDidUpdate = ({ location }) => {
    const temp = this.props.location.pathname;
    if (location !== this.props.location) {
      this.setState({
        isUserLoggedIn: false,
        path: temp
      });
    }
  };
  handleLoginModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        loginModelOpen: !modelDetails.loginModelOpen,
        signupModelOpen: false
      }
    });
  };
  handleSignupModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        signupModelOpen: !modelDetails.signupModelOpen,
        loginModelOpen: false
      }
    });
  };

  deleteMove = data => {
    this.props.deleteMoveRequest(data);
  };

  handleSetModal = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        createSetOpen: !modelDetails.createSetOpen
      }
    });
  };

  handleFolderModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        createFolderModalOpen: !modelDetails.createFolderModalOpen
      }
    });
  };

  openSearch = () => {
    this.setState({
      open: !this.state.open,
      search: ""
    });
  };

  createFolder = data => {
    this.props.onFolderCreation(data);
  };
  createSet = data => {
    this.props.onSetsCreation(data);
  };
  /*  */
  handleChange = e => {
    const { value } = e.target;
    this.setState({
      search: value
    });
    const value1 = value.trimStart();
    if (!value1) {
      return;
    } else {
      this.props.allSearchRequest({ search: value });
    }
  };

  searchAllSet = () => {
    this.props.redirectTo(AppRoutes.SETS.url + `?search=${this.state.search}`);
    this.setState({
      search: ""
    });
  };

  searchAllFolder = () => {
    this.props.redirectTo(
      AppRoutes.FOLDERS.url + `?search=${this.state.search}`
    );
    this.setState({
      search: ""
    });
  };

  searchAllMove = name => {
    if (name !== "null") {
      this.props.redirectTo(
        AppRoutes.MOVE_SEAECH_ALL.url +
          `?search=${name ? name : this.state.search}`
      );
    } else {
      this.props.redirectTo(
        AppRoutes.MOVE_SEAECH_ALL.url + `?search=${this.state.search}`
      );
    }
    this.setState({
      search: ""
    });
  };

  handleVideoModal = moveURL => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    const path = this.state.path.split("/");
    if (
      (path && path.length && path[1] === "set" && path[2] === "details") ||
      (path && path.length && path[1] === "move-search-all")
    ) {
      this.searchAllMove(moveURL ? moveURL.title : null);
    } else {
      this.setState(
        {
          showVideo: moveURL
        },
        () => {
          this.props.modelOperate({
            modelDetails: {
              isVideoModalOpenReq: !modelDetails.isVideoModalOpenReq
            }
          });
          this.props.videoDataFromSearch();
        }
      );
    }
    this.props.videoFullscreenExit();
    this.props.getSetList({ isSetNoLimit: false });
  };

  isStarred = data => {
    this.props.isStarredRequest(data);
  };

  addTagstoMove = data => {
    const moveVideo = data.videoData;
    moveVideo.tags = data.tags;
    moveVideo.description = data.description;
    this.props.addTagsRequest({ data: data, moveVideo: moveVideo });
  };

  editMove = data => {
    if (data.fromMoveList) {
      const moveList = [...data.moveofSetList];
      moveList.map((key, i) => {
        if (data.moveId === key._id) {
          return (moveList[i].title = data.title);
        } else {
          return null;
        }
      });
      this.props.updateMoveRequest({ data: data, moveList: moveList });
    } else {
      const moveVideo = data.videoData;
      moveVideo.title = data.title;
      moveVideo.description = data.description;
      this.props.updateMoveRequest({ data: data, moveVideo: moveVideo });
    }
  };

  liveChatEnable = e => {
    e.preventDefault();
    let tagData = document.getElementsByClassName("fc-widget-normal");

    if (!this.state.liveChatEnabled) {
      tagData[0].classList.add("fc-widget-normal_show");
    } else {
      tagData[0].classList.remove("fc-widget-normal_show");
    }
    this.setState({
      liveChatEnabled: !this.state.liveChatEnabled
    });
  };
  /*  */
  render() {
    const {
      modelInfoReducer,
      loginRequest,
      logoutRequest,
      signupRequest,
      socialLoginRequest,
      loginReducer,
      forgotPasswordRequest,
      profileInfoReducer,
      modelOpenRequest,
      isLoggedIn,
      routePath,
      allSearchReducer,
      shareLinkReducer,
      videoData,
      getTagListRequest,
      allSetList,
      tagsList,
      loadVideoDataRequest,
      isFullScreenMode,
      videoFullscreenReq,
      videoFullscreenExit,
      isVideoFromSearch
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { isShareableUrl } = shareLinkReducer;
    const {
      loginModelOpen,
      signupModelOpen,
      forgotPasswordModalOpen,
      createFolderModalOpen,
      createSetOpen,
      isVideoModalOpenReq
    } = modelDetails;
    const { path, search, open, showVideo, liveChatEnabled } = this.state;
    const { isLoginSuccess } = loginReducer;
    const profiledata =
      profileInfoReducer && profileInfoReducer.profileInfo
        ? profileInfoReducer.profileInfo
        : null;
    const splitedImage =
      profiledata && profiledata.profileImage
        ? profiledata.profileImage.split("/")
        : [];
    const { searchData, isSearchLoading } = allSearchReducer;
    const ProfileImage =
      splitedImage[0] === "uploads"
        ? `${AppConfig.API_ENDPOINT}${
            profiledata ? profiledata.profileImage : ""
          }`
        : profiledata
        ? profiledata.profileImage
        : "";
    const temp = this.state.path.split("/");
    return (
      <>
        <header className="header-global theme-header dashboard-header">
          <div className="theme-container">
            {path !== AppRoutes.FOLDER_SHARED_LINK.url &&
            path !== AppRoutes.SET_SHARED_LINK.url &&
            path !== AppRoutes.ALL_SET_SHARED_LINK.url &&
            path !== "/404" &&
            path !== "/public-access-denied" &&
            !isShareableUrl ? (
              <>
                <Navbar
                  className="navbar-main header-navbar"
                  // expand="lg"
                  id="navbar-main"
                >
                  <div className="header-bar-ic">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </div>
                  <NavbarBrand
                    className="mr-lg-5 pr-lg-1"
                    to={isLoggedIn ? "/dashboard" : "/"}
                    tag={Link}
                  >
                    <h3 className="mb-0 header-title">DeepPlay</h3>
                  </NavbarBrand>
                  {isLoggedIn || isLoginSuccess ? (
                    <Nav className="navbar-nav align-items-center nav-main-section flex-fill creat-option">
                      <div className="nav-inputs-wrap d-flex">
                        <Col className="create-btn-wrap">
                          <UncontrolledDropdown className="header-manu-wrap">
                            <DropdownToggle
                              caret
                              color=" "
                              className="nav-dropdown-btn"
                            >
                              <i className="fas fa-plus-square"></i>
                              <span className="dropdown-text"> Create</span>
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem></DropdownItem>
                            </DropdownMenu>

                            <DropdownMenu>
                              {temp && temp.length && temp[1] !== "move" ? (
                                <DropdownItem
                                  active={routePath === "/move" ? true : false}
                                  onClick={() =>
                                    this.props.redirectTo(AppRoutes.MOVE.url)
                                  }
                                >
                                  Create Move
                                </DropdownItem>
                              ) : (
                                <a
                                  href={"/move"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <DropdownItem
                                    active={
                                      routePath === "/move" ? true : false
                                    }
                                  >
                                    Create Move
                                  </DropdownItem>
                                </a>
                              )}
                              <DropdownItem
                                // active={
                                //   routePath === "/create-set" ? true : false
                                // }
                                onClick={this.handleSetModal}
                              >
                                Create Set
                              </DropdownItem>
                              <DropdownItem onClick={this.handleFolderModel}>
                                {" "}
                                Create Folder
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Col>
                        <Col className="flex-fill header-search-main">
                          <FormGroup className="mb-0 header-search-wrap ">
                            <InputGroup className="">
                              <InputGroupAddon addonType="prepend">
                                <span
                                  className="input-group-text header-input-group-text"
                                  onClick={this.openSearch}
                                >
                                  <i
                                    className="fa fa-search"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </InputGroupAddon>

                              <div
                                className={
                                  open ? "black-search-layer" : "d-none"
                                }
                                onClick={this.openSearch}
                              ></div>

                              <span
                                className={
                                  open
                                    ? "search-input header-search-open "
                                    : "search-input header-search-close"
                                }
                              >
                                <span
                                  onClick={this.openSearch}
                                  className="search-arrow-wrap"
                                >
                                  <img
                                    src={searchArrow}
                                    alt=""
                                    className="w-100"
                                  />
                                </span>
                                <DebounceInput
                                  minLength={1}
                                  value={search}
                                  className={"form-control"}
                                  autoComplete="off"
                                  placeholder="Search for your moves, sets or folders"
                                  debounceTimeout={300}
                                  onChange={event => this.handleChange(event)}
                                />
                              </span>
                              {search ? (
                                <AllSearchComponent
                                  searhClose={this.openSearch}
                                  searchData={searchData}
                                  isSearchLoading={isSearchLoading}
                                  searchAllSet={this.searchAllSet}
                                  setWrapperRef={this.setWrapperRef}
                                  searchAllFolder={this.searchAllFolder}
                                  searchAllMove={this.searchAllMove}
                                  handleMoveSearch={this.handleVideoModal}
                                  handleSearchEmpty={() =>
                                    this.setState({
                                      search: ""
                                    })
                                  }
                                  profiledata={profiledata}
                                  {...this.props}
                                />
                              ) : null}
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </div>
                    </Nav>
                  ) : null}
                  <Nav
                    className="navbar-nav align-items-center nav-main-section user-section user-header-profile"
                    navbar
                  >
                    {!(isLoggedIn || isLoginSuccess) ? (
                      <div className="nav-main-section">
                        <React.Fragment>
                          <span
                            onClick={this.handleLoginModel}
                            className="nav-link-inner--text pr-4 cusror_pointer"
                          >
                            Log in
                          </span>
                          <span
                            onClick={this.handleSignupModel}
                            className="nav-link-inner--text pr-2 cusror_pointer"
                          >
                            Sign up
                          </span>
                        </React.Fragment>
                      </div>
                    ) : (
                      <>
                        <UncontrolledDropdown className="header-manu-wrap  dropdown-with-ic">
                          <DropdownToggle
                            tag="a"
                            className="nav-link user-section"
                            caret
                          >
                            <div className="user-wrap">
                              <div
                                className={
                                  profiledata
                                    ? "user-img round-img"
                                    : "user-img"
                                }
                              >
                                {profiledata && profiledata.profileImage ? (
                                  <div
                                    style={{
                                      backgroundImage:
                                        'url("' + ProfileImage + '")'
                                    }}
                                    className="user-back-img-wrap"
                                  ></div>
                                ) : (
                                  // <img
                                  //   src={

                                  //   }
                                  //   className="w-100 "
                                  //   alt={"img"}
                                  // />
                                  // <img
                                  //   src={profileImage}
                                  //   className="w-100 "
                                  //   alt={"img"}
                                  // />
                                  <div
                                    style={{
                                      backgroundImage:
                                        'url("' + profileImageIc + '")'
                                    }}
                                    className="user-back-img-wrap"
                                  ></div>
                                )}
                              </div>
                              <div className="user-text">
                                {profiledata
                                  ? `${profiledata.firstName}${" "} ${
                                      profiledata.lastName
                                    }`
                                  : ""}
                              </div>
                            </div>
                          </DropdownToggle>
                          <DropdownMenu>
                            {SidebarComponent.map((item, index) => {
                              if (
                                item.name !== "Sets" &&
                                item.name !== "Folders"
                              ) {
                                return (
                                  <DropdownItem
                                    onClick={() =>
                                      this.props.redirectTo(item.url)
                                    }
                                    key={index}
                                    active={
                                      routePath === item.url ? true : false
                                    }
                                  >
                                    <div className="dropdown-img">
                                      <img
                                        src={item.iconUrl}
                                        alt={item.iconUrl}
                                        width="20"
                                      />{" "}
                                    </div>
                                    <div className="dropdown-txt">
                                      {item.name}
                                    </div>
                                  </DropdownItem>
                                );
                              } else {
                                return null;
                              }
                            })}
                            <DropdownItem onClick={e => this.liveChatEnable(e)}>
                              <div className="dropdown-img">
                                <img
                                  src={liveChatIcon}
                                  alt={"liveChat"}
                                  width="20"
                                />{" "}
                              </div>
                              <div className="dropdown-txt">
                                {!liveChatEnabled
                                  ? "Chat with us"
                                  : "Close chat"}
                              </div>
                            </DropdownItem>
                            <DropdownItem>
                              <a href={"https://deepplay.kampsite.co/"} target={"_blank"} className="dropdown-img">
                                <img
                                  src={suggestionIcon}
                                  alt={"liveChat"}
                                  width="20"
                                />{" "}
                                Suggest Feature
                              </a>
                            </DropdownItem>
                            <DropdownItem onClick={e => logoutRequest(e)}>
                              <div className="dropdown-img">
                                <img
                                  src={logoutIcon}
                                  alt={"Logout"}
                                  width="20"
                                />
                              </div>{" "}
                              <div className="dropdown-txt"> Log Out</div>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* <span onClick={e => logoutRequest(e)} className="nav-link-inner--text pr-4">Logout</span> */}
                      </>
                    )}
                  </Nav>
                  <UncontrolledCollapse
                    navbar
                    toggler="#navbar_global"
                    className="justify-content-end"
                  >
                    <div className="navbar-collapse-header">
                      <Row>
                        <Col className="collapse-brand" xs="6">
                          <Link to="/">
                            <img
                              alt="..."
                              src={require("assets/img/brand/argon-react.png")}
                            />
                          </Link>
                        </Col>
                        <Col className="collapse-close" xs="6">
                          <button className="navbar-toggler" id="navbar_global">
                            <span />
                            <span />
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </UncontrolledCollapse>
                </Navbar>
              </>
            ) : (
              <div className="theme-container">
                <Navbar
                  className="navbar-main d-flex navbar-main header-navbar"
                  // expand="lg"
                  id="navbar-main"
                >
                  <NavbarBrand className="m-0" to="/" tag={Link}>
                    <h3 className="mb-0 header-title ">DeepPlay</h3>
                  </NavbarBrand>
                  <div className="nav-main-section">
                    <React.Fragment>
                      <span
                        onClick={this.handleLoginModel}
                        className="nav-link-inner--text pr-4 cusror_pointer"
                      >
                        Log in
                      </span>
                      <span
                        onClick={this.handleSignupModel}
                        className="nav-link-inner--text pr-2 cusror_pointer"
                      >
                        Sign up
                      </span>
                    </React.Fragment>
                  </div>
                </Navbar>
              </div>
            )}
          </div>
        </header>
        <Login
          openLoginModel={loginModelOpen}
          handleLoginModel={this.handleLoginModel}
          loginRequest={loginRequest}
          socialLoginRequest={socialLoginRequest}
          openForgotPasswordModel={forgotPasswordModalOpen}
          modelOpenRequest={modelOpenRequest}
          forgotPasswordRequest={forgotPasswordRequest}
          modelInfoReducer={modelInfoReducer}
          loginReducer={loginReducer}
          handleSignupModal={this.handleSignupModel}
        />
        <Signup
          openSignupModel={signupModelOpen}
          handleSignupModel={this.handleSignupModel}
          signupRequest={signupRequest}
          loginReducer={loginReducer}
          handleLoginModal={this.handleLoginModel}
        />
        <FolderModal
          modal={createFolderModalOpen}
          handleOpen={this.handleFolderModel}
          createFolder={this.createFolder}
        />
        <CreateSetComponent
          modal={createSetOpen}
          handleOpen={this.handleSetModal}
          createSet={this.createSet}
        />
        {showVideo ? (
          <WebmSearch
            isVideoModalOpen={isVideoModalOpenReq}
            handleVideoModal={this.handleVideoModal}
            video={showVideo}
            videoData={videoData}
            showVideo={showVideo ? showVideo : null}
            movesOfSet={[showVideo]}
            deleteMove={this.deleteMove}
            isStarred={this.isStarred}
            getTagListRequest={getTagListRequest}
            addTagstoMove={this.addTagstoMove}
            allSetList={allSetList}
            fromMoveSearch={true}
            tagsList={tagsList}
            editMove={this.editMove}
            loadVideoDataRequest={loadVideoDataRequest}
            transferMove={this.props.transferMove}
            isFullScreenMode={isFullScreenMode}
            videoFullscreenReq={videoFullscreenReq}
            videoFullscreenExit={videoFullscreenExit}
            isVideoFromSearch={isVideoFromSearch}
            {...this.props}
          />
        ) : null}
      </>
    );
  }
}

export default DefaultHeader;
