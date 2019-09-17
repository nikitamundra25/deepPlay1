import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";

// core components
class HomePage extends React.Component {
  render() {
    return (
      <Container>
        <section className="home-video-section mt-5">
          <Row className="mb-5">
            <Col md="6" className="d-flex flex-column justify-content-between ">
              <div className="banner-text">
                <h3 className="banner-heading">Deconstruct Movements to Accelerate Learning</h3>
                <p className="banner-content mt-4 mt-0">Break down complex budles of movements into tiny bits to speed up your or your students' learning Watch the video to learn more</p>
              </div>
              <div className="text-center">
                <Button className="fill-btn btn w-75 m-auto h3">Get Stated</Button>
              </div>
            </Col>
            <Col md="6">
              {/* <iframe width="560" title={"Dance"} height="315" src="https://www.youtube.com/embed/nrDtcsyd-U4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              <div className="d-flex video-add-banner justify-content-center align-items-center">
                <span className="play-ic-wrap">
                  <i class="fa fa-play" aria-hidden="true"></i>
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
                <div className="h4 font-dark-bold">Create your own set to learn or teach</div>
                <Button className="fill-btn btn mt-4"> Create Now</Button>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="play-list-block">
                <div className="play-list-img">
                  <img src="https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png?1509471214" />
                </div>
                <div className="play-list-text">
                  <div className="play-list-number">
                    25 Moves
              </div>
                  <div className="play-list-heading h5 ">
                    Salsa Footwork
              </div>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="play-list-block">
                <div className="play-list-img">
                  <img src="https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png?1509471214" />
                </div>
                <div className="play-list-text">
                  <div className="play-list-number">
                    25 Moves
              </div>
                  <div className="play-list-heading h5 ">
                    Salsa Footwork
              </div>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="play-list-block">
                <div className="play-list-img">
                  <img src="https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png?1509471214" />
                </div>
                <div className="play-list-text">
                  <div className="play-list-number">
                    25 Moves
              </div>
                  <div className="play-list-heading h5 ">
                    Salsa Footwork
              </div>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="play-list-block">
                <div className="play-list-img">
                  <img src="https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png?1509471214" />
                </div>
                <div className="play-list-text">
                  <div className="play-list-number">
                    25 Moves
              </div>
                  <div className="play-list-heading h5 ">
                    Salsa Footwork
              </div>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="play-list-block">
                <div className="play-list-img">
                  <img src="https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png?1509471214" />
                </div>
                <div className="play-list-text">
                  <div className="play-list-number">
                    25 Moves
              </div>
                  <div className="play-list-heading h5 ">
                    Salsa Footwork
              </div>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="play-list-block">
                <div className="play-list-img">
                  <img src="https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png?1509471214" />
                </div>
                <div className="play-list-text">
                  <div className="play-list-number">
                    25 Moves
              </div>
                  <div className="play-list-heading h5 ">
                    Salsa Footwork
              </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>
        <section className="home-message-section">
          <Row className="mb-5">
            <Col md="12" className="mb-5 text-center">
              <h6 className="h2 text-center font-weight-bold theme-heading mb-5">
              Store and learn all your movements in one place
              </h6>
              <Button className="fill-btn btn home-message-btn">Get Started</Button>
            </Col>
            </Row>
            </section>
      </Container>
        );
      }
    }
    
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
        export default connect(
          mapStateToProps,
          mapDispatchToProps
        )(HomePage);
