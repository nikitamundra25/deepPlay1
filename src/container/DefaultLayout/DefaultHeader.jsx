import React from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button
} from "reactstrap";

class DefaultHeader extends React.Component {

  render() {
    return (
      <>
        <header className="header-global theme-header">
          <Navbar
            className="navbar-main "
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <h3 className="mb-0 header-title">Deep Play</h3>
              </NavbarBrand>
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
                <Nav className="navbar-nav-hover align-items-lg-center " navbar>
                  <Link to="/login" className="light-btn btn">
                    Log In
                  </Link>
                  {" "}
                  <Link to="/signup" className="fill-btn btn mr-0">
                  Sign Up
                  </Link>
                  <Link to={"/signup"}>
                  </Link>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
    
      </>
    );
  }
}

export default DefaultHeader;
