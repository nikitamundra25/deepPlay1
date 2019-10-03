import React from "react";
import { connect } from "react-redux";
import { AppRoutes } from "../../config/AppRoutes";
import { Row, Col, Button, Container } from "reactstrap";
import {
  modelOpenRequest,
  loginRequest,
  socialLoginRequest,
  forgotPasswordRequest
} from "../../actions";
// import Login from "../Auth/Login"
// import ForgotPassword from "../Auth/ForgotPassword";
// import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const homePageImage = [
  "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg",
  "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
  "https://i.pinimg.com/originals/26/94/93/269493fbeb10e31ad3867248e3f68b94.jpg"
];
// core components
class HomePage extends React.Component {
  handleDashboardOpen = () => {
    this.props.redirectTo(AppRoutes.DASHBOARD.url);
  };
  /*
   */
  handleLoginModalOpen = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        loginModelOpen: !modelDetails.loginModelOpen,
        signupModelOpen: false
      }
    });
  };
  /*
   */
  handleForgotPasswordModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        forgotPasswordModalOpen: !modelDetails.forgotPasswordModalOpen
      }
    });
  };
  /*
   */
  render() {
    const token = localStorage.getItem("token");
    let isLoggedIn = false;
    if (token) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
    // const { modelInfoReducer, socialLoginRequest, loginRequest, forgotPasswordRequest, loginReducer } = this.props
    // const { modelDetails } = modelInfoReducer;
    // const {
    //   loginModelOpen,
    //   forgotPasswordModalOpen
    // } = modelDetails;
    return (
      <Container>
        <section className="home-video-section mt-5">
          <Row className="mb-5">
            <Col md="6" className="d-flex flex-column justify-content-between ">
              <div className="banner-text">
                <h3 className="banner-heading">
                  Deconstruct Movements to Accelerate Learning
                </h3>
                <p className="banner-content mt-4 mt-0">
                  Break down complex budles of movements into tiny bits to speed
                  up your or your students' learning Watch the video to learn
                  more
                </p>
              </div>
              <div className="text-center">
                <Button
                color={" "}
                  className="fill-btn btn w-75 m-auto h3"
                  onClick={
                    isLoggedIn
                      ? this.handleDashboardOpen
                      : this.handleLoginModalOpen
                  }
                >
                  Get Stated
                </Button>
              </div>
            </Col>
            <Col md="6">
              {/* <iframe width="560" title={"Dance"} height="315" src="https://www.youtube.com/embed/nrDtcsyd-U4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              <div className="d-flex video-add-banner justify-content-center align-items-center">
                <span className="play-ic-wrap">
                  <i className="fa fa-play" aria-hidden="true"></i>
                </span>
              </div>
            </Col>
          </Row>
        </section>
        <section className="play-list-collection ">
          <Row className="mb-5">
            <Col md="12" className="mb-5">
              <h6 className="h3 text-center theme-heading">
                Explore Sample Sets
              </h6>
            </Col>
            <Col md="4">
              <div className="play-list-block  d-flex h-100">
                <div className="add-play-list-block d-flex  justify-content-center align-items-center text-center flex-column">
                  <div className="h5 font-dark-bold">
                    Create your own set to learn or teach
                  </div>
                  <Button color={" "} className="fill-btn btn mt-4"> Create Now</Button>
                </div>
              </div>
            </Col>
            {homePageImage.map((images, index) => {
              return (
                <Col md="4" key={index}>
                  <div className="play-list-block ">
                  <div className="play-sub-block ">
                    <div
                      className="play-list-img blur-img-wrap"
                    >
                     <img src={images} />
                     <div
                      className="blur-img"
                      style={{ backgroundImage: 'url("' + images + '")' }}
                    >
                     
                    </div>
                    </div>
                   
                    <div className="play-list-text">
                      <div className="play-list-number">25 Moves</div>
                      <div className="play-list-heading h6 ">
                        Salsa Footwork
                      </div>
                    </div>
                  </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </section>
        <section className="home-message-section">
          <Row className="mb-5">
            <Col md="12" className="mb-5 text-center">
              <h6 className="h3 text-center theme-heading font-weight-bold mb-5">
                Store and learn all your movements in one place
              </h6>
              <Button     color={" "} className="fill-btn btn home-message-btn">
                Get Started
              </Button>
            </Col>
          </Row>
        </section>
        {/* <Login
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
        /> */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  modelInfoReducer: state.modelInfoReducer,
  loginReducer: state.loginReducer
});
const mapDispatchToProps = dispatch => ({
  modelOpenRequest: data => dispatch(modelOpenRequest(data)),
  loginRequest: data => dispatch(loginRequest(data)),
  forgotPasswordRequest: data => dispatch(forgotPasswordRequest(data)),
  socialLoginRequest: data => dispatch(socialLoginRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
