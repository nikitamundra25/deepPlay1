import React from "react";
import { connect } from "react-redux";
import { Container, Col, Row, Card, CardHeader, Button } from "reactstrap";
import {
  sharedSetInfoRequest,
  publicUrlMoveDetailsRequest,
  modelOpenRequest,
  loadVideoDataRequest,
  videoFullscreenReq,
  videoFullscreenExit
} from "../../../actions";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { AppRoutes } from "../../../config/AppRoutes";
import qs from "query-string";
import Loader from "../Loader/Loader";
import WebmView from "../../Sets/SetDetails/WebmView";
import emptySetIc from "../../../assets/img/play-list-ic.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import imgNotfound from "../../../assets/img/icons/lock.svg";
import { Link } from "react-router-dom";

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
    this.props.videoFullscreenExit();
  };

  handleLoadmoreRequest = setIdPathName => {
    let parsed = qs.parse(this.props.location.search);
    const pageLimit = this.state.page;
    this.setState({
      page: pageLimit + 1
    });
    const pageCount = pageLimit + 1;
    this.props.publicUrlSetDetails({
      setId: setIdPathName,
      userId: parsed.userId,
      page: pageCount,
      isInfiniteScroll: true
    });
  };

  render() {
    const {
      shareLinkReducer,
      modelInfoReducer,
      loadVideoDataRequest,
      moveReducer,
      videoFullscreenReq,
      videoFullscreenExit
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { isVideoModalOpen } = modelDetails;
    const { videoData, isFullScreenMode } = moveReducer;
    const { moveListItem, showVideo, showVideoIndex } = this.state;
    const {
      decryptedSetDetails,
      isMoveDetailsLoading,
      accessDenied
    } = shareLinkReducer;
    let parsed = qs.parse(this.props.location.search);
    const token = localStorage.getItem("token");
    let isLoggedIn = false;
    if (token) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
    return (
      <div className="dashboard-full-section without-sidebar">
        {!accessDenied ? (
          <>
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
                    {decryptedSetDetails
                      ? decryptedSetDetails && decryptedSetDetails.isCopy
                        ? `Copy of ${decryptedSetDetails.title} ${
                            decryptedSetDetails.copyIndex > 0
                              ? `(${decryptedSetDetails.copyIndex})`
                              : ""
                          }`
                        : decryptedSetDetails.title
                      : "MySets"}
                  </div>
                  <div className="sub-title">
                    {decryptedSetDetails ? decryptedSetDetails.description : ""}
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
                      isFullScreenMode={isFullScreenMode}
                      videoFullscreenReq={videoFullscreenReq}
                      videoFullscreenExit={videoFullscreenExit}
                      isShareable={true}
                      {...this.props}
                    />
                  ) : null}
                  <section className="play-list-collection set-detail-section">
                    <InfiniteScroll
                      dataLength={moveListItem.length} //This is important field to render the next data
                      next={() => {
                        this.handleLoadmoreRequest(parsed.setId);
                      }}
                      hasMore={
                        decryptedSetDetails.moveCount !== moveListItem.length
                          ? true
                          : false
                      }
                      loader={<Loader />}
                    >
                      <Row>
                        <Col md="12">
                          <div class="content-header mt-3 mb-2">
                            <span class="content-title">
                              {" "}
                              Moves in this set (
                              {decryptedSetDetails.moveCount || 0})
                            </span>
                          </div>
                        </Col>
                        {moveListItem.length ? (
                          moveListItem.map((video, index) => {
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
                                  onMouseOver={() =>
                                    this.handleVideoHover(index)
                                  }
                                  onMouseLeave={() => {
                                    this.handleVideoPause(index);
                                  }}
                                >
                                  <div
                                    className="play-sub-block"
                                    onMouseLeave={() =>
                                      this.handleVideoPause(index)
                                    }
                                  >
                                    <div
                                      onMouseOver={() =>
                                        this.handleVideoPlay(index)
                                      }
                                      className="play-list-img blur-img-wrap checked-wrap"
                                      onClick={
                                        !isVideoModalOpen
                                          ? () =>
                                              this.handleVideoModal(
                                                video,
                                                index
                                              )
                                          : null
                                      }
                                    >
                                      <video
                                        width={"100%"}
                                        id={`webm-video-${index}`}
                                        muted={true}
                                        onContextMenu={e => e.preventDefault()}
                                        poster={video.videoThumbnail}
                                        preload="auto"
                                      >
                                        <source
                                          src={`${video.moveURL}`}
                                          loop
                                          type="video/webm"
                                        />
                                      </video>

                                      <div
                                        className="blur-img"
                                        // style={{ background: "" }}
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
                          })
                        ) : (
                          <div className="create-set-section w-100 empty-folder-section sjp">
                            <Card className="set-content-wrap empty-folder-card">
                              <div className="set-content-block w-100 empty-folder-wrap">
                                <CardHeader className="empty-folder-header">
                                  <img src={emptySetIc} alt={"Folder"} />
                                  <div className="content-header set-header">
                                    <span className="content-title">
                                      {" "}
                                      <h3>No moves available for this set.</h3>
                                    </span>
                                  </div>
                                </CardHeader>
                              </div>
                            </Card>
                          </div>
                        )}
                      </Row>
                    </InfiniteScroll>
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
          </>
        ) : (
          <div className="app flex-row pt-5">
            <Container>
              <Card className="home-video-section my-4 py-5">
                <Row className="">
                  <Col md="6">
                    {/* <iframe width="560" title={"Dance"} height="315" src="https://www.youtube.com/embed/nrDtcsyd-U4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    <div className="d-flex video-add-banner justify-content-center align-items-center">
                      <img
                        src={imgNotfound}
                        alt={""}
                        className="w-100"
                        width="200"
                        height="250"
                      />
                    </div>
                  </Col>
                  <Col
                    md="6"
                    className="d-flex flex-column justify-content-between "
                  >
                    <div className="banner-text">
                      <h1 className="banner-heading">Oops !</h1>
                      <p className="banner-subheading mt-4 mt-0 h3 font-weight-bold">
                        Access denied...
                      </p>
                      <p className="banner-content  mt-0 ">
                        You didn't have permission to access this page. Maybe
                        our FAQ or Community can help?
                      </p>
                    </div>
                    <div className="text-left">
                      <Link to={"/"}>
                        <Button
                          className="fill-btn btn w-75 m-auto white-color get-stated-btn"
                          onClick={
                            isLoggedIn
                              ? this.handleDashboardOpen
                              : this.handleLoginModalOpen
                          }
                        >
                          Back To Home page
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Container>
          </div>
        )}
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
  loadVideoDataRequest: data => dispatch(loadVideoDataRequest(data)),
  videoFullscreenReq: data => {
    dispatch(videoFullscreenReq(data));
  },
  videoFullscreenExit: data => {
    dispatch(videoFullscreenExit(data));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(SetSharedLink);
