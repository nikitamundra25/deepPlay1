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
import { AppConfig } from "../../config/Appconfig";
import AllSearchComponent from "../../components/AllSearch";
import CreateSetComponent from "../../components/Sets/createSet";
import searchArrow from "../../assets/img/back-search.png";
import { DebounceInput } from "react-debounce-input";
import WebmView from "../../components/Sets/SetDetails/WebmView";

class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: false,
      path: "",
      search: "",
      open: false,
      showVideo: ""
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
  searchAllMove = () => {
    this.props.redirectTo(
      AppRoutes.MOVE_SEAECH_ALL.url + `?search=${this.state.search}`
    );
    this.setState({
      search: ""
    });
  };

  handleVideoModal = moveURL => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
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
    this.props.videoFullscreenExit();
    this.props.getSetList({ isSetNoLimit: false });
  };

  isStarred = data => {
    this.props.isStarredRequest(data);
  };

  addTagstoMove = data => {
    const moveVideo = data.videoData;
    moveVideo.tags = data.tags;
    this.props.addTagsRequest({ data: data, moveVideo: moveVideo });
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
    const { path, search, open, showVideo } = this.state;
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
                  <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
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
                              <span className="dropdown-text">
                                {" "}
                                &nbsp; Create
                              </span>
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem></DropdownItem>
                            </DropdownMenu>

                            <DropdownMenu>
                              <DropdownItem
                                active={routePath === "/move" ? true : false}
                                onClick={() =>
                                  this.props.redirectTo(AppRoutes.MOVE.url)
                                }
                              >
                                Create Move
                              </DropdownItem>
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
                                  minLength={2}
                                  value={search}
                                  className={"form-control"}
                                  autoComplete="off"
                                  placeholder="Search for set, folder, Move and More"
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
                    className="navbar-nav align-items-center nav-main-section user-section"
                    navbar
                  >
                    {!(isLoggedIn || isLoginSuccess) ? (
                      <div className="nav-main-section">
                        <React.Fragment>
                          <span
                            onClick={this.handleLoginModel}
                            className="nav-link-inner--text pr-4 cusror_pointer"
                          >
                            Sign in
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
                              return (
                                <DropdownItem
                                  onClick={() =>
                                    this.props.redirectTo(item.url)
                                  }
                                  key={index}
                                  active={routePath === item.url ? true : false}
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
                            })}

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
                        Sign in
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
        {showVideo && showVideo.length ? (
          <WebmView
            isVideoModalOpen={isVideoModalOpenReq}
            handleVideoModal={this.handleVideoModal}
            video={showVideo}
            videoData={videoData}
            showVideo={showVideo && showVideo.length ? showVideo[0] : null}
            movesOfSet={[showVideo]}
            deleteMove={this.deleteMove}
            isStarred={this.isStarred}
            getTagListRequest={getTagListRequest}
            addTagstoMove={this.addTagstoMove}
            allSetList={allSetList}
            fromMoveSearch={true}
            tagsList={tagsList}
            editMove={data => this.props.updateMoveRequest(data)}
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
