import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import qs from "query-string";
import {
  Basketball,
  MartialArts,
  Choreography,
  Guitar,
  Painting,
  Soccer,
  Massage,
} from "../../config/Constants";
import {
  modelOpenRequest,
  loadVideoDataRequest,
  videoFullscreenReq,
  videoFullscreenExit,
} from "../../actions";
import WebmView from "components/Sets/SetDetails/WebmView";

class SampleSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleSet: Basketball,
      showVideoIndex: -1,
      videoIndex: -1,
      showVideo: {},
    };
  }

  componentDidMount = () => {
    let parsed = qs.parse(this.props.location.search);
    if (parsed.title === "Basketball_ 5 Basic Moves") {
      this.setState({
        sampleSet: Basketball,
      });
    } else if (parsed.title === "Martial Arts_ MMA Takedowns") {
      this.setState({
        sampleSet: MartialArts,
      });
    } else if (parsed.title === "Choreography_ Boogaloo Tutorial") {
      this.setState({
        sampleSet: Choreography,
      });
    } else if (parsed.title === "Guitar_ Hallelujah Tutorial (Easy Version)") {
      this.setState({
        sampleSet: Guitar,
      });
    } else if (parsed.title === "Painting_ Styling Hacks") {
      this.setState({
        sampleSet: Painting,
      });
    } else if (parsed.title === "Soccer_ Moves to Trick Opponents") {
      this.setState({
        sampleSet: Soccer,
      });
    } else if (parsed.title === "Massage Basics_ Reflexology 101") {
      this.setState({
        sampleSet: Massage,
      });
    }
  };
  videoPlayHandler = (indexNumber) => {
    const videoPlay = document.getElementById("webm-video-" + indexNumber);
    videoPlay.play();
    videoPlay.volume = 0.2;
  };
  videoPlayPause = (indexNumber) => {
    const videoPlay = document.getElementById("webm-video-" + indexNumber);
    videoPlay.pause();
  };

  handleVideoModal = (data, index) => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState(
      {
        showVideo: {
          moveURL: data.video,
          isMoveProcessing: false,
          title: data.title,
          startTime: data.startTime,
          endTime: data.endTime
        },
        showVideoIndex: index,
      },
      () => {
        this.props.modelOperate({
          modelDetails: {
            isVideoModalOpen: !modelDetails.isVideoModalOpen,
          },
        });
      }
    );
    this.props.videoFullscreenExit();
  };

  render() {
    const { modelInfoReducer, moveReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { isVideoModalOpen } = modelDetails;
    const { videoData, isFullScreenMode } = moveReducer;
    const { showVideo, showVideoIndex } = this.state;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>", showVideo);

    return (
      <Container>
        <section className="play-list-collection set-detail-section">
          <Row>
            <Col md="12 p-3">
              <div className="content-header">
                <span className="content-title">
                  <div className="h4 theme-heading main-title">
                    Dance Cheoreography for Uptown Funk
                  </div>
                  <div className="sub-title">5 moves</div>
                </span>
              </div>
            </Col>

            {this.state.sampleSet && this.state.sampleSet.length
              ? this.state.sampleSet.map((video, index) => (
                  <Col
                    md="4"
                    key={index}
                    // onClick={() => this.handleShowVideo(index)}
                    // onMouseLeave={() => {
                    //   this.handleVideoHoverLeave();
                    // }}
                  >
                    <div
                      className="play-list-block "
                      // onMouseOver={() => this.handleVideoHover(index)}
                      // onMouseLeave={() => {
                      //   this.handleVideoPause(index);
                      // }}
                    >
                      <div
                        className="play-sub-block "
                        // onMouseLeave={() => this.handleVideoPause(index)}
                      >
                        <div
                          className="play-list-img blur-img-wrap checked-wrap"
                          onClick={
                            !isVideoModalOpen
                              ? () => this.handleVideoModal(video, index)
                              : null
                          }
                          // onMouseOver={() => this.handleVideoPlay(index)}
                        >
                          <video
                            width={"100%"}
                            id={`webm-video-${index}`}
                            muted={true}
                            onMouseEnter={() => {
                              this.videoPlayHandler(index);
                            }}
                            onMouseLeave={() => {
                              this.videoPlayPause(index);
                            }}
                          >
                            <source src={video.video} type="video/mp4" />
                          </video>
                        </div>
                        <div className="play-list-text">
                          <div className="play-list-heading h6 ">
                            {video.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))
              : null}
          </Row>
        </section>
        {this.state.sampleSet && this.state.sampleSet.length ? (
          <WebmView
            movesOfSet={this.state.sampleSet}
            isVideoModalOpen={isVideoModalOpen}
            handleVideoModal={this.handleVideoModal}
            video={this.state.sampleSet[this.state.sampleSet.length - 1]}
            showVideo={showVideo}
            videoData={videoData}
            showVideoIndex={showVideoIndex}
            loadVideoDataRequest={loadVideoDataRequest}
            isFullScreenMode={isFullScreenMode}
            videoFullscreenReq={videoFullscreenReq}
            videoFullscreenExit={videoFullscreenExit}
            isShareable={true}
            isHomePage={true}
            {...this.props}
          />
        ) : null}
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  modelInfoReducer: state.modelInfoReducer,
  moveReducer: state.moveReducer,
});
const mapDispatchToProps = (dispatch) => ({
  modelOpenRequest: (data) => dispatch(modelOpenRequest(data)),
  modelOperate: (data) => dispatch(modelOpenRequest(data)),
  loadVideoDataRequest: (data) => dispatch(loadVideoDataRequest(data)),
  videoFullscreenReq: (data) => {
    dispatch(videoFullscreenReq(data));
  },
  videoFullscreenExit: (data) => {
    dispatch(videoFullscreenExit(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SampleSet);
