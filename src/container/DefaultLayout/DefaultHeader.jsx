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
  InputGroup,
  Input
} from "reactstrap";
import Login from "../Auth/Login/index.jsx";
import Signup from "../Auth/Signup/index.jsx";
import FolderModal from "../../components/Folders/createFolderModal";
import profileImage from "../../assets/img/user-white-ic.svg";

class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: false
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      this.setState({
        isUserLoggedIn: true
      });
    } else {
      this.setState({
        isUserLoggedIn: false
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

  handleFolderModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        createFolderModalOpen: !modelDetails.createFolderModalOpen
      }
    });
  };

  createFolder = data => {
    this.props.onFolderCreation(data);
  };

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
      isLoggedIn
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    const {
      loginModelOpen,
      signupModelOpen,
      forgotPasswordModalOpen
    } = modelDetails;
    const { isUserLoggedIn } = this.state;
    const profiledata =
      profileInfoReducer && profileInfoReducer.profileInfo
        ? profileInfoReducer.profileInfo
        : null;
    return (
      <>
        <header className="header-global theme-header ">
          <div className="theme-container">
            <Navbar
              className="navbar-main "
              // expand="lg"
              id="navbar-main"
            >

              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <h3 className="mb-0 header-title">Deep Play</h3>
              </NavbarBrand>
              {isLoggedIn ? (
                <Nav className="navbar-nav align-items-center nav-main-section flex-fill">
                  <div className="nav-inputs-wrap d-flex">
                    <Col>
                      <UncontrolledDropdown className="header-manu-wrap">
                        <DropdownToggle
                          caret
                          color=" "
                          className="nav-dropdown-btn"
                        >
                          <i className="fas fa-plus-square"></i> &nbsp; Create
                      </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem></DropdownItem>
                        </DropdownMenu>

                        <DropdownMenu>
                          <DropdownItem active>
                            <Link to={"/move"}> Create Move</Link>
                          </DropdownItem>
                          <DropdownItem >
                            <Link to={"/create-set"}>Create Set</Link>
                          </DropdownItem>
                          <DropdownItem onClick={this.handleFolderModel}>
                            {" "}
                            Create Folder
                        </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Col>
                    <Col className="flex-fill">
                      <FormGroup className="mb-0 header-search-wrap">
                        <InputGroup className="">
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                          </InputGroupAddon>
                          <Input placeholder="Search" type="text" />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </div>
                </Nav>
              ) : null}
              <Nav
                className="navbar-nav align-items-center nav-main-section"
                navbar
              >
                {!isUserLoggedIn ? (
                  <div className="nav-main-section">
                    <React.Fragment>
                      <span
                        onClick={this.handleLoginModel}
                        className="nav-link-inner--text pr-4 cusror_pointer"
                      >
                        Login
                    </span>
                      <span
                        onClick={this.handleSignupModel}
                        className="nav-link-inner--text pr-2 cusror_pointer"
                      >
                        Signup
                    </span>
                    </React.Fragment>
                  </div>
                ) : (
                    <>
                      <UncontrolledDropdown className="header-manu-wrap ">
                        <DropdownToggle
                          tag="a"
                          className="nav-link user-section"
                          caret
                        >
                          <div className="user-wrap">
                            <div className="user-img">
                              <img
                                src={profileImage}
                                className="w-100"
                                alt={"img"}
                              />
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
                          <DropdownItem active>
                            <Link to={"/setting"}>View Profile</Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link to={"/dashboard"}>Dashboard</Link>
                          </DropdownItem>
                          <DropdownItem onClick={e => logoutRequest(e)}>
                            Log Out
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
          handleFolderModel={this.handleFolderModel}
          modelInfoReducer={modelInfoReducer}
          modelOperate={modelOpenRequest}
          createFolder={this.createFolder}
        />
      </>
    );
  }
}

export default DefaultHeader;
