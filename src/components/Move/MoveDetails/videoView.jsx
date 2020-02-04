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
// import videosIc from "../../../assets/img/videos-ic.svg";

import "./index.scss";
import { AppRoutes } from "config/AppRoutes";
import { ConfirmBox } from "helper/SweetAleart";

const timeArr = [
  { min: 5, max: 11.700000000000001 },
  { min: 69.7, max: 77 }
];

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
    // this.JumpTimeIntervals(timeArr);
  }
  /**
   *
   */
  componentDidUpdate({ timer: oldTimer, moveReducer }) {
    const prevMoveData = moveReducer.isCreatingAnotherMove;
    const newMoveData = this.props.moveReducer
      ? this.props.moveReducer.isCreatingAnotherMove
      : null;
    const { timer, TimeArray } = this.props;
    const vid = document.getElementById("video-trimmer");
    const { max: oldMax, min: oldMin } = oldTimer || {};
    const { max, min } = timer || {};
    if (this.video && (min !== oldMin || max !== oldMax)) {
      this.video.currentTime = max;
      // console.log("timeArr", timeArr);

      // this.JumpTimeIntervals(TimeArray);

      vid.ontimeupdate = () => {
        if (Math.round(vid.currentTime) > parseInt(max)) {
          vid.currentTime = min;
        }
      };
    }

    if (prevMoveData !== newMoveData) {
      this.video.load();
    }
    // this.video.load();

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
  JumpTimeIntervals = timeArr => {
    console.log("timeArr", timeArr);

    if (timeArr && timeArr.length) {
      var currentSegment = 0; // Segment being played
      var endTime = timeArr[currentSegment]["max"];
      console.log("endTime", endTime);

      var videoPlayer = document.getElementById("video-trimmer");
      videoPlayer.currentTime = timeArr[currentSegment]["min"];
      videoPlayer.play(); // Starts playing the video from startTime
      videoPlayer.addEventListener(
        "timeupdate",
        function() {
          console.log(
            "videoPlayer.currentTime >= endTime",
            videoPlayer.currentTime >= endTime
          );

          if (videoPlayer.currentTime >= endTime) {
            // Segment completed
            console.log(
              "currrsegment",
              currentSegment,
              "timeArr.length",
              timeArr.length
            );
            console.log("timeArrtimeArr", timeArr);

            currentSegment++;
            console.log("currentSegment", currentSegment < timeArr.length);
            if (currentSegment < timeArr.length) {
              // Not the last segment in the array
              videoPlayer.currentTime = timeArr[currentSegment]["min"];
              endTime = timeArr[currentSegment]["max"];
            } else {
              console.log("hereee");

              // Last segment in the array is over
              videoPlayer.pause();
            }
          }
        },
        false
      );
    }
  };

  /**
   *
   */
  render() {
    const {
      moveReducer,
      description,
      isEdit,
      isYoutubeUrl,
      playbackFailed,
      videoError,
      selectSetOptions,
      setReducer,
      tags,
      errors,
      tagsList
    } = this.props;
    defaultSetoptions = [];
    const { moveDetails } = moveReducer;
    const { allSetList, recentSetAdded } = setReducer;

    const { isBufferingVideo, videoCanPlay } = this.state;
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
    return (
      <>
        <Col lg={4}>
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

                <video
                  width={"100%"}
                  // autoPlay
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
                  controls
                  onContextMenu={e => e.preventDefault()}
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
              </div>
              <FormGroup className="flex-fill flex-column mt-3 input-w">
                {/* add tag-input-wrap class for tagInput design  */}
                <Label className="mt-2">
                  Add tags and press enter to separate
                </Label>
                <div className="w-100 tag-input-wrap search-select-wrap">
                  {/* <TagsInput
                value={tags}
                className={"form-control"}
                maxTags={"5"}
                onChange={this.props.handleTagChange}
              /> */}
                  <CreatableSelect
                    classNamePrefix="react_select"
                    isMulti
                    onChange={this.props.handleTagChange}
                    value={tags}
                    options={tagsList}
                    // options={colourOptions}
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
                      {errors &&
                      errors.setId &&
                      selectSetOptions &&
                      selectSetOptions.value === ""
                        ? errors.setId
                        : null}
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
