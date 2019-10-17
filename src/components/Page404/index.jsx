import React, { Component } from 'react';
import { Button, Col, Container, Card, Row } from 'reactstrap';
import "./index.scss";
import imgNotfound from "../../assets/img/404.svg"
class Page404Component extends Component {
  render() {
    const token = localStorage.getItem("token");
    let isLoggedIn = false;
    if (token) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
    return (
      <div className="app flex-row align-items-center not-found-page">
        <Container>
        <Card className="home-video-section my-4 py-5">
          <Row className="">
         
            <Col md="6">
              {/* <iframe width="560" title={"Dance"} height="315" src="https://www.youtube.com/embed/nrDtcsyd-U4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              <div className="d-flex video-add-banner justify-content-center align-items-center">
             <img src={imgNotfound} alt={""} className="w-100"/>
              </div>
            </Col>
            <Col md="6" className="d-flex flex-column justify-content-between ">
              <div className="banner-text">
                <h1 className="banner-heading">
                Oops !
                </h1>
                <p className="banner-subheading mt-4 mt-0 h3 font-weight-bold">
                We Can't find the what you are Looking for....
                </p>
                <p className="banner-content  mt-0 ">
                We couldn’t find the page you were looking for. Maybe our FAQ or Community can help?
                </p>
              </div>
              <div className="text-left">
                <Button
                  color={" "}
                  className="fill-btn btn w-75 m-auto white-color get-stated-btn"
                  onClick={
                    isLoggedIn
                      ? this.handleDashboardOpen
                      : this.handleLoginModalOpen
                  }
                >
           Back To Home page
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
        </Container>
      </div>
    );
  }
}

export default Page404Component;
