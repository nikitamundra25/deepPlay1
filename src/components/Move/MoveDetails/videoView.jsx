import React from "react";
import {
  Col,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip,
  FormFeedback,
  Button
} from "reactstrap";
import { AppConfig } from "../../../config/Appconfig";
import videoLoading from "../../../assets/img/loder/loader.svg";
// import videosIc from "../../../assets/img/videos-ic.svg";

import "./index.scss";
import { AppRoutes } from "config/AppRoutes";
import { ConfirmBox } from "helper/SweetAleart";

// core components
class VideoView extends React.Component {
  video;
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false,
      isBufferingVideo: false,
      videoCanPlay: false,
      videoData: false,
      videoError: false
    };
  }
  /**
   *
   */
  componentDidMount() {
    this.video = document.getElementById("video-trimmer");
    if (this.video) {
      this.setState({
        videoData: true
      });
    }
    var promise = this.video.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          // Start whatever you need to do only after playback
          // has begun.
        })
        .catch(async error => {
          if (error.name === "NotAllowedError") {
            await ConfirmBox({
              text: "",
              title: "You need to enable autoPlay on this browser.",
              showCancelButton: false,
              confirmButtonText: "Ok"
            });
          } else {
            //Handle if we got different error
          }
        });
    }
    // this.video.addEventListener("timeupdate", () => {
    //   console.log("kkkkkkk");

    //   const { timer } = this.props;
    //   const { min, max } = timer || {};
    //   const { currentTime } = this.video;
    //   if (parseInt(currentTime) >= max) {
    //     this.video.pause();
    //     setTimeout(() => {
    //       this.video.currentTime = min;
    //       this.video.play();
    //     }, 500);
    //   }
    // });
    let timeDuration = [];

    this.video.onloadeddata = () => {
      const { duration } = this.video;
      for (let index = 0; index < duration; index = index + duration / 20) {
        timeDuration.push(index);
      }
      const data = {
        timeDuration: timeDuration,
        videoMaxDuration: duration
      };
      this.props.storeVideoFrames(timeDuration);

      this.props.videoDuration(data);
    };
  }
  /**
   *
   */
  componentDidUpdate({ timer: oldTimer, moveReducer }) {
    const prevMoveData = moveReducer.isCreatingAnotherMove;
    const newMoveData = this.props.moveReducer
      ? this.props.moveReducer.isCreatingAnotherMove
      : null;
    const { timer } = this.props;
    const { max: oldMax, min: oldMin } = oldTimer || {};
    const { max, min } = timer || {};
    if (this.video && (min !== oldMin || max !== oldMax)) {
      this.reverse();
      this.video.currentTime = min;
    }
    if (prevMoveData !== newMoveData) {
      this.video.load();
    }
    // this.video.load();
    const vid = document.getElementById("video-trimmer");
    // var promise = vid.play();
    // if (promise !== undefined) {
    //   promise
    //     .then(_ => {
    //       // Autoplay started!
    //     })
    //     .catch(error => {
    //       // Show something in the UI that the video is muted
    //       console.log("not supported");
    //       alert("Please need to enable autoPlay on this browser.")
    //     });
    // }
    vid.onwaiting = () => {
      this.setState({
        isBufferingVideo: true
      });
    };
    vid.oncanplay = () => {
      this.setState({
        isBufferingVideo: false
      });
    };
  }
  /**
   *
   */
  reverse = () => {
    // button function for rewind

    const video = document.getElementById("video-trimmer");
    let intervalRewind;
    intervalRewind = setInterval(function() {
      video.playbackRate = 1.0;
      if (video.currentTime === 0) {
        clearInterval(intervalRewind);
        video.pause();
      } else {
        video.currentTime += -0.1;
      }
    }, 30);
    return;
  };

  /**
   *
   */
  render() {
    const {
      moveReducer,
      description,
      title,
      isEdit,
      errorTitle,
      isYoutubeUrl,
      playbackFailed,
      videoError
    } = this.props;
    const { moveDetails } = moveReducer;
    const { isBufferingVideo, videoCanPlay } = this.state;

    return (
      <>
        <Col lg={"6"}>
          <FormGroup className="flex-fill flex-column video-title-wrap">
            <div className=" w-100">
              <InputGroup className={"move-title-wrap"}>
                <Input
                  id="title"
                  placeholder="Enter your title (optional)"
                  onChange={e => this.props.handleChange(e)}
                  type="text"
                  className={
                    errorTitle ? "is-invalid move-title" : "move-title"
                  }
                  name="title"
                  value={title ? title : ""}
                />
                <FormFeedback> {errorTitle ? errorTitle : null} </FormFeedback>
                <InputGroupAddon
                  addonType="prepend"
                  className="discription-btn-wrap"
                >
                  <div onClick={this.props.handleDesriptionModal}>
                    <InputGroupText
                      id="description"
                      className={"discription-btn cursor_pointer"}
                    >
                      <i className="fas fas fa-info " />
                      <UncontrolledTooltip placement="top" target="description">
                        {description ? "Update Description" : "Add description"}
                      </UncontrolledTooltip>
                    </InputGroupText>
                  </div>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </FormGroup>
          {moveDetails && moveDetails.videoUrl ? (
            <div className={"video-player"}>
              {isBufferingVideo === true ? (
                <div className="video-spinner z-">
                  <img src={videoLoading} alt="" />
                </div>
              ) : null}
              <div className="video-player-inner-wrap">
                {!videoError ? (
                  !videoCanPlay ? (
                    <div className="video-spinner z-">
                      <img src={videoLoading} alt="" />
                    </div>
                  ) : null
                ) : (
                  <>
                    <span className="video-spinner">
                      <div className="h2">Access Denied</div>
                      <br />
                      You don't have authorisation to view this video.
                      <br />
                      <div>Try with another one!</div>
                      <br />
                      <Button
                        color={"default"}
                        className={"btn-line-black btn "}
                        onClick={() => {
                          this.props.redirectTo(AppRoutes.MOVE.url);
                        }}
                      >
                        Create Another Move
                      </Button>
                    </span>
                  </>
                )}
                {!isEdit ? (
                  <video
                    width={"100%"}
                    autoPlay
                    loop
                    onCanPlay={() => {
                      this.setState({
                        videoCanPlay: true
                      });
                    }}
                    id={"video-trimmer"}
                    muted={false}
                    playsInline
                    onError={e => playbackFailed(e)}
                    onContextMenu={e => e.preventDefault()}
                    disablepictureinpicture="true"
                    controlsList="nodownload"
                  >
                    <source
                      src={
                        !isYoutubeUrl
                          ? `${AppConfig.API_ENDPOINT}${moveDetails.videoUrl}`
                          : moveDetails.videoUrl
                      }
                    />
                  </video>
                ) : (
                  <video
                    width={"100%"}
                    autoPlay
                    loop
                    id={"video-trimmer"}
                    muted={false}
                    playsinline
                    onContextMenu={e => e.preventDefault()}
                  >
                    <source src={`${moveDetails.moveURL}`} />
                  </video>
                )}
              </div>
            </div>
          ) : (
            <span>No video available for trimming</span>
          )}
        </Col>
      </>
    );
  }
}

export default VideoView;
