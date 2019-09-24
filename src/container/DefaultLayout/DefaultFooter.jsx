import React from "react";

import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class DefaultFooter extends React.Component {
  render() {
    return (
      <>
        <footer className="footer" style={{ clear: "both" }}>
          <Container>
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className=" copyright">
                  © {new Date().getFullYear()} <b>DEEP PLAY</b>
                </div>
              </Col>
              <Col md="6">
                <Nav className=" nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="/"
                      target="_blank"
                    >
                      Term and Condition
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/"
                      target="_blank"
                    >
                      About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/"
                      target="_blank"
                    >
                      Contact Us
                    </NavLink>
                  </NavItem>
               
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default DefaultFooter;
