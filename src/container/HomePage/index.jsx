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
  changeHeaderRequest,
} from "../../actions";
import "./index.scss";
// import Login from "../Auth/Login"
// import ForgotPassword from "../Auth/ForgotPassword";
// import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const image = [
  {
    id: 1,
    title: "Basketball_ 5 Basic Moves",
    image:
      "https://gameonfamily.com/wp-content/uploads/2017/02/Depositphotos_59344433_original-1030x687.jpg",
  },
  {
    id: 2,
    title: "Martial Arts_ MMA Takedowns",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-bsnudco08r3igtj44duecnr7m4-20171203011026.Medi.jpeg",
  },
  {
    id: 3,
    title: "Choreography_ Boogaloo Tutorial",
    image:
      "https://res.cloudinary.com/danceninspire/image/upload/q_auto:eco/v1506580764/tags/animation/introduction_1.jpg",
  },
  {
    id: 4,
    title: "Guitar_ Hallelujah Tutorial (Easy Version)",
    image: "https://i.ytimg.com/vi/BoOGNuJsEzU/maxresdefault.jpg",
  },
  {
    id: 5,
    title: "Painting_ Styling Hacks",
    image:
      "https://cdn.junglecreations.com/wp/junglecms/2019/02/fcea106e-wordpress-template.jpg",
  },
  {
    id: 6,
    title: "Soccer_ Moves to Trick Opponents",
    image:
      "https://rawfutbol.com/wp-content/uploads/2019/08/Epic-Soccer-Training.jpg",
  },
  {
    id: 7,
    title: "Massage Basics_ Reflexology 101",
    image: "https://content.artofmanliness.com/uploads/2018/07/massage.jpg",
  },
];
// core components
class HomePage extends React.Component {
  componentDidMount = () => {
    const path = this.props.location.pathname;
    if (path === "/") {
      this.props.changeHeaderRequest();
    }
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");
    script1.src = "https://fast.wistia.com/embed/medias/agvixojmsq.jsonp";
    script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script1.async = true;
    script2.async = true;

    document.body.appendChild(script2);
    document.body.appendChild(script1);
  };
  constructor(props) {
    super(props);
    this.state = {
      onPlaying: false,
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
        signupModelOpen: false,
      },
    });
  };
  /*
   */
  handleForgotPasswordModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        forgotPasswordModalOpen: !modelDetails.forgotPasswordModalOpen,
      },
    });
  };

  handleSetModal = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        createSetOpen: !modelDetails.createSetOpen,
      },
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
      <>
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
                <div className="wistia_responsive_padding home-video w-100">
                  <div className="wistia_responsive_wrapper video-wrapper">
                    <div className="wistia_embed wistia_async_agvixojmsq videoFoam=true video-meta-data">
                      <div class="wistia_swatch image-overview">
                        <img
                          src="https://fast.wistia.com/embed/medias/agvixojmsq/swatch"
                          alt=""
                          aria-hidden="true"
                          onload="this.parentNode.style.opacity=1;"
                        />
                      </div>
                    </div>
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
                          this.props.redirectTo(
                            AppRoutes.SAMPLE_SET.url + `?title=${images.title}`
                          )
                        }
                      >
                        <div className="play-list-img blur-img-wrap">
                          <img src={images.image} alt={""} />
                          <div
                            className="blur-img"
                            style={{
                              backgroundImage: 'url("' + images.image + '")',
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  modelInfoReducer: state.modelInfoReducer,
  loginReducer: state.loginReducer,
  moveReducer: state.moveReducer,
});
const mapDispatchToProps = (dispatch) => ({
  modelOpenRequest: (data) => dispatch(modelOpenRequest(data)),
  loginRequest: (data) => dispatch(loginRequest(data)),
  forgotPasswordRequest: (data) => dispatch(forgotPasswordRequest(data)),
  socialLoginRequest: (data) => dispatch(socialLoginRequest(data)),
  changeHeaderRequest: () => dispatch(changeHeaderRequest()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
