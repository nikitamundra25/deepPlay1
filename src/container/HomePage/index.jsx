import React from "react";
import { connect } from "react-redux";
import { AppRoutes } from "../../config/AppRoutes";
import { Row, Col, Button, Container } from "reactstrap";
import pauseIc from "../../assets/img/icons/pause.svg";
import playIc from "../../assets/img/icons/play.svg";
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
    title: "Basketball_ 5 Basic Moves",
    image:
      "https://gameonfamily.com/wp-content/uploads/2017/02/Depositphotos_59344433_original-1030x687.jpg"
  },
  {
    id: 2,
    title: "Martial Arts_ MMA Takedowns",
    image:
      "https://blackbeltmag.com/uploads/century-photo-tyler-weaver-kick.jpg"
  },
  {
    id: 3,
    title: "Choreography_ Boogaloo Tutorial",
    image:
      "https://res.cloudinary.com/danceninspire/image/upload/q_auto:eco/v1506580764/tags/animation/introduction_1.jpg"
  },
  {
    id: 4,
    title: "Guitar_ Hallelujah Tutorial (Easy Version)",
    image: "https://i.ytimg.com/vi/BoOGNuJsEzU/maxresdefault.jpg"
  },
  {
    id: 5,
    title: "Painting_ Styling Hacks",
    image: "https://cdn.junglecreations.com/wp/junglecms/2019/02/fcea106e-wordpress-template.jpg"
  },
  {
    id: 6,
    title: "Soccer_ Moves to Trick Opponents",
    image:
      "https://lh3.googleusercontent.com/proxy/HqqsKNWWYuwsN4SqAJXzpDAz-ymdQgmOPQOz_60QxLTInabbm6T87QYuSYa1qzk30z9Z5GJUW0HOooOeoXFbaN-2prhSfAcXrCS2KZav0smoW_24DZWm1dgKmDDIkQ"
  }
];
// core components
class HomePage extends React.Component {
  componentDidMount = () => {
    const path = this.props.location.pathname;
    if (path === "/") {
      this.props.changeHeaderRequest();
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      onPlaying: false
    };
  }

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
  videoPlayHandler = () => {
    const videoPlay = document.getElementById("webm-video-0");
    this.setState({ onPlaying: !this.state.onPlaying });
    if (this.state.onPlaying === true) {
      videoPlay.pause();
    } else {
      videoPlay.play();
    }
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
            <Col
              lg="5"
              md="6"
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <div className="banner-text text-right">
                <h3 className="banner-heading">
                  Deconstruct Movements to Accelerate Learning
                </h3>
                <p className="banner-content mt-4 mt-0">
                  Break down complex bundles of movements into tiny bits to
                  speed up your or your students' learning. Watch the video to
                  learn more.
                </p>
              </div>
              <div className="text-right w-100">
                <Button
                  color={" "}
                  className="fill-btn btn w-75 m-auto white-color get-stated-btn"
                  onClick={
                    isLoggedIn
                      ? this.handleDashboardOpen
                      : this.handleLoginModalOpen
                  }
                >
                  Get Started
                </Button>
              </div>
            </Col>
            <Col
              lg="7"
              md="6"
              className="d-flex justify-content-center align-items-center"
            >
              {/* <iframe width="560" title={"Dance"} height="315" src="https://www.youtube.com/embed/nrDtcsyd-U4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

              {/* no videos */}
              {/* <div className="d-flex video-add-banner justify-content-center align-items-center">
                <span className="play-ic-wrap">
                  <i className="fa fa-play" aria-hidden="true"></i>
                </span>
              </div> */}

              {/* videos */}
              <div className="videos-wrap d-flex justify-content-center align-items-center">
                <div className="d-flex video-add-banner with-home-videos justify-content-center align-items-center position-relative">
                  {this.state.onPlaying ? (
                    <span
                      onClick={this.videoPlayHandler}
                      className="play-ic-wrap pause-wrap"
                    >
                      <img src={pauseIc} alt={"img"} />
                    </span>
                  ) : (
                      <span
                        onClick={this.videoPlayHandler}
                        className="play-ic-wrap"
                      >
                        <img src={playIc} alt={"img"} />
                      </span>
                    )}

                  <video width="100%" id="webm-video-0" playsinline>
                    <source
                      src="https://drive.google.com/file/d/1huyUvkXmZ0symwN5PbZbNyBzG0X0c0Oq/view?usp=sharing"
                      type="video/webm"
                    />
                  </video>
                </div>
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
            <Col md="4" lg="3">
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
                <Col md="4" lg="3" key={index}>
                  <div className="play-list-block ">
                    <div
                      className="play-sub-block cursor_pointer"
                      onClick={() =>
                        this.props.redirectTo(AppRoutes.SAMPLE_SET.url + `?title=${images.title}`)
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
          <Row className="mb-3">
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
