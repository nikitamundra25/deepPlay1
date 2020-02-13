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
    const vid = document.getElementById("video-trimmer");
    const { max: oldMax, min: oldMin } = oldTimer || {};
    const { max, min, isVideoSleek } = timer || {};

    if (this.video && (min !== oldMin || max !== oldMax)) {
      if (isVideoSleek) {
        if (max === oldMax) {
          this.video.currentTime = min;
        } else {
          this.video.currentTime = max;
        }
      } else {
        if (!timer.to) {
          this.video.currentTime = min;
        } else {
          this.video.currentTime = max;
        }
      }

      vid.ontimeupdate = () => {
        if (vid.currentTime.toFixed(2) >= max) {
          if (this.props.isPlaying && this.props.isChange) {
            vid.currentTime = min;
          }
        }
      };
    }

    if (prevMoveData !== newMoveData) {
      this.video.load();
    }

    vid.onseeking = () => {
      if (parseInt(vid.currentTime) < parseInt(timer.min)) {
        // if (this.props.isChange) {
        vid.currentTime = timer.min;
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

  /**
   *
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
      tagsList
    } = this.props;
    const { moveDetails } = moveReducer;
    const { allSetList, recentSetAdded } = setReducer;

    const { /* isBufferingVideo */ videoCanPlay } = this.state;
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
              {/* {isBufferingVideo === true ? (
                <div className="video-spinner z-">
                  <img src={videoLoading} alt="" />
                </div>
              ) : null} */}
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
                  controls
                  // onContextMenu={e => e.preventDefault()}
                  // disablepictureinpicture="true"
                  // controlsList="nodownload"
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
