import React from "react";
import { connect } from "react-redux";
import { AppRoutes } from "../../config/AppRoutes";
import { Row, Col, Button, Container } from "reactstrap";
import {
  modelOpenRequest,
  loginRequest,
  socialLoginRequest,
  forgotPasswordRequest,
  changeHeaderRequest
} from "../../actions";
// import Login from "../Auth/Login"
// import ForgotPassword from "../Auth/ForgotPassword";
// import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const image = [
  {
    id: 1,
    title: "Rumba",
    image:
      "https://www.rushlake-media.com/wp-content/uploads/2018/11/victor-Anastacia-1080p.jpg"
  },
  {
    id: 2,
    title: "Zumba",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmW2LRpRoa11a0iFmo5cbyagU92VXVAtLqZt1Y4sT0dQ1jMfUeUQ"
  },
  {
    id: 3,
    title: "Tango",
    image:
      "https://static.wixstatic.com/media/727c8f_9d251f742b3c44538dbf2f2c7552192d~mv2_d_1600_1200_s_2.jpg"
  },
  {
    id: 4,
    title: "Ballroom Dancing",
    image: "https://vistapointe.net/images/ballroom-dancing-wallpaper-5.jpg"
  },
  {
    id: 5,
    title: "Flamenco",
    image: "http://www.ritmoflamenco.ca/wp-content/uploads/flamencomusic.jpg"
  }
];
// core components
class HomePage extends React.Component {
  componentDidMount = () => {
    console.log("Currldfhfghocation", this.props.location);
    const path = this.props.location.pathname;
    if (path === "/") {
      this.props.changeHeaderRequest();
    }
  };

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

  handleSetModal = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        createSetOpen: !modelDetails.createSetOpen
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
    return (
      <Container>
        <section className="home-video-section">
          <Row className="">
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
                  className="fill-btn btn w-75 m-auto white-color get-stated-btn"
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

              {/* no videos */}
              {/* <div className="d-flex video-add-banner justify-content-center align-items-center">
                <span className="play-ic-wrap">
                  <i className="fa fa-play" aria-hidden="true"></i>
                </span>
              </div> */}

              {/* videos */}
              <div className="videos-wrap d-flex justify-content-center align-items-center">
                <video width="100%" id="webm-video-0">
                  <source
                    src="https://s3.amazonaws.com/hope.bucket/moves/1571752097935_deep-play.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </Col>
          </Row>
        </section>
        <section className="play-list-collection home-page-play-list">
          <Row className="mb-5">
            <Col md="12" className="mb-5">
              <h6 className="h3 text-center theme-heading">
                Explore Sample Sets
              </h6>
            </Col>
            <Col md="4">
              <div className="play-list-block  d-flex h-100">
                <div className="add-play-list-block d-flex  justify-content-center align-items-center text-center flex-column">
                  <div className="h4 font-dark-bold">
                    Create your own set to learn or teach
                  </div>
                  <Button
                    color={" "}
                    className="fill-btn btn mt-4"
                    onClick={
                      isLoggedIn
                        ? this.handleSetModal
                        : this.handleLoginModalOpen
                    }
                  >
                    {" "}
                    Create Now
                  </Button>
                </div>
              </div>
            </Col>
            {image.map((images, index) => {
              return (
                <Col md="4" key={index}>
                  <div className="play-list-block ">
                    <div
                      className="play-sub-block cursor_pointer"
                      onClick={() =>
                        this.props.redirectTo(AppRoutes.SAMPLE_SET.url)
                      }
                    >
                      <div className="play-list-img blur-img-wrap">
                        <img src={images.image} alt={""} />
                        <div
                          className="blur-img"
                          style={{
                            backgroundImage: 'url("' + images.image + '")'
                          }}
                        ></div>
                      </div>

                      <div className="play-list-text">
                        <div className="play-list-heading h6 ">
                          {images.title}
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
                Store and learn all your movements in one place!
              </h6>
              <Button
                color={" "}
                className="fill-btn btn home-message-btn"
                onClick={
                  isLoggedIn
                    ? this.handleDashboardOpen
                    : this.handleLoginModalOpen
                }
              >
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
  socialLoginRequest: data => dispatch(socialLoginRequest(data)),
  changeHeaderRequest: () => dispatch(changeHeaderRequest())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
