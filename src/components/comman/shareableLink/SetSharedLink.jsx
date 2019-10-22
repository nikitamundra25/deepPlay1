import React from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import {
  sharedSetInfoRequest,
  publicUrlMoveDetailsRequest,
  modelOpenRequest,
  loadVideoDataRequest
} from "../../../actions";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { AppRoutes } from "../../../config/AppRoutes";
import qs from "query-string";
import Loader from "../Loader/Loader";
import WebmView from "../../Sets/SetDetails/WebmView";
//import InfiniteScroll from "react-infinite-scroll-component";

// core components
class SetSharedLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveListItem: [],
      isSelectVideo: false,
      videoIndex: -1,
      page: 1,
      isVideoModalOpen: true,
      setId: "",
      showVideoIndex: -1,
      showVideo: {}
    };
  }
  componentDidMount() {
    let parsed = qs.parse(this.props.location.search);
    this.props.encryptedQuery(parsed);
    this.props.publicUrlSetDetails(parsed);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.shareLinkReducer &&
      prevProps.shareLinkReducer.publicUrlmoveDetails !==
        this.props.shareLinkReducer.publicUrlmoveDetails
    ) {
      const setList = this.props.shareLinkReducer.publicUrlmoveDetails;
      this.setState({
        moveListItem: setList
      });
    }
  }
  handleVideoHoverLeave = () => {
    this.setState({
      isSelectVideo: false
    });
  };
  handleVideoPlay = index => {
    let myVideo = document.getElementById(`webm-video-${index}`);
    myVideo.play();
  };
  handleVideoPause = index => {
    let myVideo = document.getElementById(`webm-video-${index}`);
    myVideo.pause();
  };

  handleShowVideo = videoIndex => {
    this.setState({
      showVideoIndex: videoIndex
    });
  };
  handleVideoHover = index => {
    this.setState({
      isSelectVideo: true,
      videoIndex: index
    });
  };

  handleVideoModal = (moveURL, index) => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState(
      {
        showVideo: moveURL,
        showVideoIndex: index
      },
      () => {
        this.props.modelOperate({
          modelDetails: {
            isVideoModalOpen: !modelDetails.isVideoModalOpen
          }
        });
      }
    );
  };
  render() {
    const {
      shareLinkReducer,
      modelInfoReducer,
      loadVideoDataRequest,
      moveReducer
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { isVideoModalOpen } = modelDetails;
    const { videoData } = moveReducer;
    const { moveListItem, showVideo, showVideoIndex,  } = this.state;
    const { decryptedSetDetails, isMoveDetailsLoading } = shareLinkReducer;
    let parsed = qs.parse(this.props.location.search);
    return (
      <div className="dashboard-full-section without-sidebar">
        {parsed.fromFolder ? (
          <div className="p-3">
            <span
              onClick={() => {
                window.history.back();
              }}
              className={"cursor_pointer back-arrow"}
            >
              {" "}
              <i className="fas fa-long-arrow-alt-left" /> Back
            </span>
          </div>
        ) : null}
        <Container>
          <div className="content-header mt-3 mb-3">
            <span className="content-title">
              <div className="main-title">
                {" "}
                {decryptedSetDetails ? decryptedSetDetails.title : "No Title "}
              </div>
              <div className="sub-title">
                {decryptedSetDetails ? decryptedSetDetails.moveCount : 0} Moves
              </div>
            </span>
          </div>

          {!isMoveDetailsLoading ? (
            <>
              {moveListItem && moveListItem.length ? (
                <WebmView
                  movesOfSet={moveListItem}
                  isVideoModalOpen={isVideoModalOpen}
                  handleVideoModal={this.handleVideoModal}
                  video={moveListItem[moveListItem.length - 1]}
                  showVideo={showVideo}
                  videoData={videoData}
                  showVideoIndex={showVideoIndex}
                  loadVideoDataRequest={loadVideoDataRequest}
                  isShareable={true}
                  {...this.props}
                />
              ) : null}

              <section className="play-list-collection set-detail-section">
                {/* <InfiniteScroll
                  dataLength={moveListItem.length} //This is important field to render the next data
                  next={() =>
                    this.props.publicUrlSetDetails({
                      setId: parsed.setId,
                      page: page + 1,
                      isInfiniteScroll: true
                    })
                  }
                  hasMore={
                    decryptedSetDetails.moveCount !== moveListItem.length
                      ? true
                      : false
                  }
                  loader={<h4>Loading...</h4>}
                > */}
                <Row>
                  <Col md="12">
                    <div class="content-header mt-3 mb-2">
                      <span class="content-title">
                        {" "}
                        Moves in this set ({decryptedSetDetails.moveCount || 0})
                      </span>
                    </div>
                  </Col>

                  {moveListItem.map((video, index) => {
                    return (
                      <div
                        onClick={() => this.handleShowVideo(index)}
                        onMouseLeave={() => {
                          this.handleVideoHoverLeave();
                        }}
                        className="play-list-tile cursor_pointer"
                        key={index}
                      >
                        <div
                          className="play-list-block"
                          onMouseOver={() => this.handleVideoHover(index)}
                          onMouseLeave={() => {
                            this.handleVideoPause(index);
                          }}
                        >
                          <div
                            className="play-sub-block"
                            onMouseLeave={() => this.handleVideoPause(index)}
                          >
                            <div
                              onMouseOver={() => this.handleVideoPlay(index)}
                              className="play-list-img blur-img-wrap checked-wrap"
                              onClick={
                                !isVideoModalOpen
                                  ? () => this.handleVideoModal(video, index)
                                  : null
                              }
                            >
                              <video
                                width={"100%"}
                                id={`webm-video-${index}`}
                                muted={true}
                              >
                                <source
                                  src={`${video.moveURL}`}
                                  type="video/webm"
                                />
                              </video>

                              <div
                                className="blur-img"
                                style={{ background: "#000" }}
                              />
                            </div>

                            <div className="play-list-text">
                              <div className="text-capitalize play-list-heading h6 m-0">
                                {video.title || "unnamed"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Row>
                {/* </InfiniteScroll> */}
              </section>
            </>
          ) : (
            <Row>
              <Col sm={12} className="loader-col">
                <Loader />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shareLinkReducer: state.shareLinkReducer,
  modelInfoReducer: state.modelInfoReducer,
  moveReducer: state.moveReducer
});
const mapDispatchToProps = dispatch => ({
  encryptedQuery: data => dispatch(sharedSetInfoRequest(data)),
  publicUrlSetDetails: data => dispatch(publicUrlMoveDetailsRequest(data)),
  modelOperate: data => dispatch(modelOpenRequest(data)),
  loadVideoDataRequest: data => dispatch(loadVideoDataRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetSharedLink);
