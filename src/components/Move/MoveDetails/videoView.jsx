import React from "react";
import {
  Col,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip,
  FormFeedback
} from "reactstrap";
import { AppConfig } from "../../../config/Appconfig";
import videoLoading from "../../../assets/img/loder/loader.svg";
// import videosIc from "../../../assets/img/videos-ic.svg";

import "./index.scss";

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
      videoData: false
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

    this.video.addEventListener("timeupdate", () => {
      const { timer } = this.props;
      const { min, max } = timer || {};
      const { currentTime } = this.video;
      if (parseInt(currentTime) >= max) {
        this.video.pause();
        setTimeout(() => {
          this.video.currentTime = min;
          this.video.play();
        }, 500);
      }
    });
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
      this.video.currentTime = min;
    }
    if (prevMoveData !== newMoveData) {
      this.video.load();
    }
    // this.video.load();
    const vid = document.getElementById("video-trimmer");
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

  playbackFailed = e => {
    console.log("e.target.error", e.target);
    // video playback failed - show a message saying why
    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
        console.log("You aborted the video playback.");
        break;
      case e.target.error.MEDIA_ERR_NETWORK:
        console.log(
          "A network error caused the video download to fail part-way."
        );
        break;
      case e.target.error.MEDIA_ERR_DECODE:
        console.log(
          "The video playback was aborted due to a corruption problem or because the video used features your browser did not support."
        );
        break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        console.log(
          "The video could not be loaded, either because the server or network failed or because the format is not supported."
        );
        break;
      default:
        console.log("An unknown error occurred.");
        break;
    }
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
      isYoutubeUrl
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
                {!videoCanPlay ? (
                  <div className="video-spinner z-">
                    <img src={videoLoading} alt="" />
                  </div>
                ) : null}
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
                    onContextMenu={e => e.preventDefault()}
                    onError={e => this.playbackFailed(e)}
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
