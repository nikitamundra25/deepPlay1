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
} from "reactstrap";
import Login from "../Auth/Login/index.jsx"
import Signup from "../Auth/Signup/index.jsx";

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
        loginModelOpen: !modelDetails.loginModelOpen
      }
    })
  }
  handleSignupModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        signupModelOpen: !modelDetails.signupModelOpen
      }
    })
  }

  render() {
    const { modelInfoReducer, loginRequest, logoutRequest, signupRequest, socialLoginRequest } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { loginModelOpen, signupModelOpen } = modelDetails;
    const { isUserLoggedIn } = this.state;
    return (
      <>
        <header className="header-global theme-header ">
          <Navbar
            className="navbar-main "
            // expand="lg"
            id="navbar-main"
          >

            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <h3 className="mb-0 header-title">Deep Play</h3>
            </NavbarBrand>
            <Nav className="navbar-nav align-items-center nav-main-section" navbar>
              {
                !isUserLoggedIn ?
                <div className="nav-main-section">
                  <React.Fragment >
                    <span
                      onClick={this.handleLoginModel}
                      className="nav-link-inner--text pr-4 cusror_pointer">Login</span>
                    <span
                      onClick={this.handleSignupModel}
                      className="nav-link-inner--text pr-2 cusror_pointer">Signup</span>
                  </React.Fragment>
                  </div>
                  :
                  <>

                    <UncontrolledDropdown className="header-manu-wrap ">
                      <DropdownToggle tag="a" className="nav-link user-section" caret>
                        <div className="user-wrap">
                          <div className="user-img">
                            <img src="./assets/img/profile-ic.png" className="w-100" />
                          </div>
                          <div className="user-text">
                            John die
                          </div>
                          </div>
            </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem tag="a" href="/blah" active>View Profile</DropdownItem>
                          <DropdownItem tag="a" href="/blah" >Dashboard</DropdownItem>
                          <DropdownItem tag="a" onClick={e => logoutRequest(e)}  >logout</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      {/* <span onClick={e => logoutRequest(e)} className="nav-link-inner--text pr-4">Logout</span> */}
                  </>

                    }
            </Nav>

                  <UncontrolledCollapse navbar toggler="#navbar_global" className="justify-content-end">
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
        </header>
          <Login
            openLoginModel={loginModelOpen}
            handleLoginModel={this.handleLoginModel}
            loginRequest={loginRequest}
            socialLoginRequest={socialLoginRequest}
          />
          <Signup
            openSignupModel={signupModelOpen}
            handleSignupModel={this.handleSignupModel}
            signupRequest={signupRequest}
          />
      </>
        );
      }
    }
    
    export default DefaultHeader;
