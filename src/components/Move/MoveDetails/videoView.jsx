import React from "react";
import {
  Col,
  FormGroup,
  Label,
  FormFeedback,
  InputGroup,
  Button
} from "reactstrap";
import CreatableSelect from "react-select/creatable";
import "react-tagsinput/react-tagsinput.css";
import AsyncSelect from "react-select/async";
import { AppConfig } from "../../../config/Appconfig";
import videoLoading from "../../../assets/img/loder/loader.svg";
import { AppRoutes } from "config/AppRoutes";
import InputRange from "react-input-range";
import "./index.scss";
import { SecondsToMMSS } from "helper/Time";

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
      videoError: false,
      isMuted: false,
      audioSpeed: 1,
      currentTime: 0,
      videoDuration: {},
      doubleClick: false,
      error: "",
      isMouseMove: false,
      mouseOnControls: false
    };
  }
  /**
   *
   */
  getDetails = () => {
    const { tags, selectSetOptions } = this.props;
    return {
      tags,
      setId: selectSetOptions ? selectSetOptions.value : null
    };
  };

  loadSets = (input, callback) => {
    if (input.length > 1) {
      this.props.getAllSetRequest({
        search: input,
        callback,
        isSetNoLimit: false
      });
    } else {
      this.props.getAllSetRequest({ isSetNoLimit: false });
    }
  };

  componentDidMount() {
    this.video = document.getElementById("video-trimmer");
    this.audio = document.getElementById("audio-trimmer");
    if (this.video) {
      this.setState({
        videoData: true
      });
    }
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
      this.props.videoDuration(data);
      this.setState({
        videoDuration: data
      });
    };
  }
  /**
   *
   */
  onVolumeChange = value => {
    this.audio = document.getElementById("audio-trimmer");
    this.setState({
      audioSpeed: value,
      isMuted: value === 0
    });
    this.audio.volume = value;
  };

  toggleMute = () => {
    const { isMuted } = this.state;
    this.audio = document.getElementById("audio-trimmer");
    if (isMuted === false) {
      this.audio.muted = true;
    } else {
      this.audio.muted = false;
    }
    this.setState({
      isMuted: !isMuted
    });
  };

  handleVideoFullScreen = () => {
    this.customVideo = document.getElementById("custom_video_control");
    if (!this.props.isPlaying) {
      this.props.handlePlayPause();
    }
    if (this.customVideo.mozRequestFullScreen) {
      this.customVideo.mozRequestFullScreen();
    } else if (this.customVideo.webkitRequestFullScreen) {
      this.customVideo.webkitRequestFullScreen();
      this.props.videoFullscreenReq();
      this.setState({
        isFullScreenMode: true
      });
    } else if (this.customVideo.webkitEnterFullscreen) {
      this.customVideo.webkitEnterFullscreen();
      this.props.videoFullscreenReq();
      this.setState({
        isFullScreenMode: true
      });
    }
  };

  handleVideoResizeScreen = () => {
    this.customVideo = document.getElementById("custom_video_control");
    if (!this.props.isPlaying) {
      this.props.handlePlayPause();
    }
    if (this.customVideo) {
      if (this.customVideo.mozRequestFullScreen) {
        document.mozCancelFullScreen();
      } else if (this.customVideo.webkitExitFullscreen) {
        document.exitFullscreen();
        this.setState({
          isFullScreenMode: false
        });
      } else {
        document.exitFullscreen();
        this.setState({
          isFullScreenMode: false
        });
      }
    }
  };

  labelValueChange = value => {
    this.video = document.getElementById("video-trimmer");
    this.audio = document.getElementById("audio-trimmer");
    this.video.currentTime = value;
    this.audio.currentTime = value;
    this.setState({
      currentTime: parseFloat(value)
    });
  };
  /**
   *
   */
  componentDidUpdate({ timer: oldTimer, moveReducer, isFullScreenMode }) {
    const prevMoveData = moveReducer.isCreatingAnotherMove;
    const newMoveData = this.props.moveReducer
      ? this.props.moveReducer.isCreatingAnotherMove
      : null;
    const { timer } = this.props;
    const vid = document.getElementById("video-trimmer");
    const audio = document.getElementById("audio-trimmer");
    const { max: oldMax, min: oldMin } = oldTimer || {};
    const { max, min, isVideoSleek } = timer || {};
    // this.audio.currentTime = this.video.currentTime;
    if (this.video && (min !== oldMin || max !== oldMax)) {
      this.updateSlider();
      if (isVideoSleek) {
        // if (min === oldMin && max !== oldMax) {
        //   this.video.currentTime = max;
        // } else if (max === oldMax && min !== oldMin) {
        //   this.video.currentTime = min;
        // } else {
        //   if (min < oldMin) {
        //     this.video.currentTime = min;
        //   } else {
        //     this.video.currentTime = max;
        //   }
        // }
        // if (max === oldMax || min < oldMin) {
        //   this.video.currentTime = min;
        // } else {
        //   this.video.currentTime = max;
        // }
      } else {
        if (!timer.to) {
          this.video.currentTime = min;
          console.log("This audio min", min);
          this.audio.currentTime = min;
        } else {
          this.video.currentTime = max;
          this.audio.currentTime = max;
        }
      }
      vid.ontimeupdate = () => {
        if (vid.currentTime.toFixed(2) >= max) {
          if (this.props.isPlaying && this.props.isChange) {
            vid.currentTime = min;
            audio.currentTime = min;
          }
        }
        this.setState({
          currentTime: vid.currentTime
        });
      };
    }

    if (isFullScreenMode !== this.props.isFullScreenMode) {
      if (this.video) {
        this.audio.controls = false;
        this.video.controls = false;
      }
    }
    if (prevMoveData !== newMoveData) {
      this.video.load();
    }

    vid.onseeking = () => {
      if (parseInt(vid.currentTime) < parseInt(timer.min)) {
        // if (this.props.isChange) {
        vid.currentTime = timer.min;
        audio.currentTime = timer.min;
        // }
      }
    };
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
  updateSlider() {
    const containerEle = document.getElementById("video-controls");
    if (containerEle) {
      try {
        const { childNodes } = containerEle;
        for (let i = 0; i < childNodes.length; i++) {
          const child = childNodes[i];
          if (child.classList.contains("input-range")) {
            for (let k = 0; k < child.childNodes.length; k++) {
              const newChild = child.childNodes[k];

              if (newChild.classList.contains("input-range__track")) {
                const leftContainer = document.getElementById(
                  "block-container-left"
                );
                const rightContainer = document.getElementById(
                  "block-container-right"
                );
                const leftCount = document.getElementsByClassName(
                  "input-range__label--min"
                );
                const rightCount = document.getElementsByClassName(
                  "input-range__label--max"
                );
                // get width for left and right container
                const leftWidth = newChild.childNodes[1].style.left;
                const rightWidth = newChild.childNodes[2].style.left;
                // const siderWidth = newChild.childNodes[0].style.width;
                const actualRightWidth = 100 - parseFloat(rightWidth);
                // set properties
                leftContainer.style.width = leftWidth;
                leftContainer.style.left = 0;
                rightContainer.style.width = `${actualRightWidth}%`;
                rightContainer.style.left = rightWidth;
                leftCount[0].style.left = leftWidth;
                rightCount[0].style.left = rightWidth;
              }
            }
          }
        }
      } catch (error) {
        // logger(error);
      }
    }
  }
  /**
   *
   */
  onmousemove = e => {
    this.setState({
      isMouseMove: true
    });
    setTimeout(() => {
      this.setState({
        isMouseMove: false
      });
    }, 2000);
  };

  onMouseOver = () => {
    this.setState({
      mouseOnControls: true
    });
  };

  /*
   */
  /*
   */
  render() {
    const {
      moveReducer,
      isYoutubeUrl,
      playbackFailed,
      videoError,
      selectSetOptions,
      setReducer,
      tags,
      errors,
      tagsList,
      isPlaying,
      handlePlayPause
    } = this.props;
    const { moveDetails } = moveReducer;
    const { allSetList, recentSetAdded } = setReducer;

    const {
      /* isBufferingVideo */ videoCanPlay,
      audioSpeed,
      isMuted,
      videoDuration,
      currentTime,
      isMouseMove
    } = this.state;
    let recentAddedSet,
      defaultSetoptions = [];
    if (allSetList && allSetList.length) {
      allSetList.map(data => {
        const defaultSetoptionsValue = {
          label:
            data && data.isCopy
              ? `${data.title} ${
                  data.copyCount > 0 ? `(${data.copyCount})` : ""
                }`
              : data.title,
          value: data._id,
          moveCount: data.moveCount
        };

        defaultSetoptions.push(defaultSetoptionsValue);
        return true;
      });
      const addNewOption = {
        label: "+ Create New Set",
        value: ""
      };
      defaultSetoptions.push(addNewOption);
    } else {
      const addNewOption = {
        label: "+ Create New Set",
        value: ""
      };
      defaultSetoptions.push(addNewOption);
    }
    if (recentSetAdded && recentSetAdded.value) {
      recentAddedSet = {
        label: recentSetAdded.title,
        value: recentSetAdded._id
      };
    }
    let isFullScreenMode1 =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (isFullScreenMode1) {
      let control = document.getElementsByClassName("controls");
      if (control[0] && !isMouseMove && !this.state.mouseOnControls) {
        control[0].classList.add("hide-controls");
      } else {
        control[0].classList.remove("hide-controls");
      }
    } else {
      let control = document.getElementsByClassName("controls");
      if (control && control[0]) {
        control[0].classList.remove("hide-controls");
      }
    }
    return (
      <>
        <Col lg={4} className="trim-video-view">
          {moveDetails && moveDetails.videoUrl ? (
            <div className={"video-player"}>
              {/* {isBufferingVideo === true ? (
                <div className="video-spinner z-">
                  <img src={videoLoading} alt="" />
                </div>
              ) : null} */}
              <div
                className="video-player-inner-wrap custom-video-player"
                id="custom_video_control"
                onMouseMove={isFullScreenMode1 ? this.onmousemove : null}
              >
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
                  onClick={handlePlayPause}
                  playsInline
                  onError={e => playbackFailed(e)}
                  // onContextMenu={e => e.preventDefault()}
                  disablepictureinpicture="true"
                  controlsList="nodownload"
                  preload={"auto"}
                >
                  <source
                    src={
                      !isYoutubeUrl
                        ? `${AppConfig.API_ENDPOINT}${moveDetails.videoUrl}`
                        : moveDetails.videoUrl
                    }
                  />
                </video>
                <div>
                  <div
                    className={"controls"}
                    onMouseOver={isFullScreenMode1 ? this.onMouseOver : null}
                    onMouseLeave={
                      isFullScreenMode1
                        ? () =>
                            this.setState({
                              mouseOnControls: false
                            })
                        : null
                    }
                  >
                    <div className="control-background-wrap"></div>
                    <InputRange
                      draggableTrack={false}
                      maxValue={videoDuration.videoMaxDuration}
                      minValue={0}
                      step={0.01}
                      formatLabel={value => ``}
                      value={currentTime}
                      onChange={this.labelValueChange}
                    />
                    <div className={"controls-wrap"}>
                      <div className={"control-left-block"}>
                        <div className="play-paus-wrap control-tile cursor_pointer">
                          {isPlaying ? (
                            <span
                              onClick={handlePlayPause}
                              className={"cursor_pointer"}
                            >
                              <i className={"fa fa-pause cursor_pointer"} onClick={handlePlayPause}></i>
                            </span>
                          ) : (
                            <span
                              onClick={handlePlayPause}
                              className={"cursor_pointer"}
                            >
                              <i className={"fa fa-play cursor_pointer"} onClick={handlePlayPause}></i>
                            </span>
                          )}
                        </div>
                        <div className="video-time-wrap control-tile">
                          {SecondsToMMSS(parseInt(currentTime))} /{" "}
                          {SecondsToMMSS(
                            parseInt(
                              videoDuration ? videoDuration.videoMaxDuration : 0
                            )
                          )}
                        </div>
                        <div
                          onClick={this.toggleMute}
                          className="volume-up-down  control-tile cursor_pointer"
                        >
                          <span
                            onClick={this.toggleMute}
                            className="cursor_pointer"
                          >
                            {isMuted ? (
                              <i className="fas fa-volume-mute"></i>
                            ) : audioSpeed ? (
                              audioSpeed > 0.6 ? (
                                <i className="fas fa-volume-up"></i>
                              ) : (
                                <i className="fas fa-volume-down"></i>
                              )
                            ) : (
                              <i className="fas fa-volume-mute"></i>
                            )}
                          </span>
                        </div>
                        <div className="volume-range cursor_pointer control-tile">
                          <div
                            style={{
                              width: 100
                            }}
                          >
                            <InputRange
                              draggableTrack={false}
                              maxValue={1}
                              minValue={0}
                              step={0.1}
                              formatLabel={value => ``}
                              value={audioSpeed}
                              onChange={this.onVolumeChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="control-right-block">
                        {!isFullScreenMode1 ? (
                          <span
                            onClick={() => this.handleVideoFullScreen()}
                            className="control-tile cursor_pointer"
                          >
                            <i className="fas fa-expand" />
                          </span>
                        ) : (
                          <span
                            onClick={() => this.handleVideoResizeScreen()}
                            className="control-tile cursor_pointer"
                          >
                            <i
                              className="fa fa-arrows-alt"
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <audio id={"audio-trimmer"} className={"d-none"} controls autoPlay loop>
                  <source src={moveDetails.audioUrl} type="audio/ogg" />
                </audio>
              </div>
              <FormGroup className="flex-fill flex-column mt-3 input-w">
                {/* add tag-input-wrap class for tagInput design  */}
                <Label className="mt-2">
                  Add tags and press enter to separate
                </Label>
                <div className="w-100 tag-input-wrap search-select-wrap">
                  <CreatableSelect
                    classNamePrefix="react_select"
                    isMulti
                    onChange={this.props.handleTagChange}
                    value={tags}
                    options={tagsList}
                  />
                </div>
              </FormGroup>
              <FormGroup className="flex-fill flex-column mt-3">
                {/* add search-select class for search select design  */}
                <Label className="mt-2">
                  Select sets <span className="text-danger">*</span>
                </Label>
                <InputGroup>
                  <div className="w-100 search-select-wrap">
                    <AsyncSelect
                      classNamePrefix="react_select"
                      loadOptions={this.loadSets}
                      isClearable={
                        selectSetOptions && selectSetOptions.value
                          ? true
                          : false
                      }
                      defaultOptions={defaultSetoptions}
                      onBlur={this.props.onBlur}
                      placeholder="Type to select sets"
                      className={
                        errors && errors.setId
                          ? "is-invalid form-control search-input-wrap"
                          : ""
                      }
                      onChange={e => this.props.handleInputChange(e)}
                      value={
                        recentAddedSet &&
                        recentAddedSet.label &&
                        recentAddedSet.value
                          ? recentAddedSet
                          : selectSetOptions
                      }
                    />
                    <FormFeedback>
                      {errors && errors.setId ? errors.setId : null}
                    </FormFeedback>
                  </div>
                </InputGroup>
              </FormGroup>
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
