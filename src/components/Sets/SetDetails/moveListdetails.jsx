import React from "react";
import { Input, FormGroup } from "reactstrap";
import starIc from "../../../assets/img/star.svg";
import "./index.scss";
import blankStar from "../../../assets/img/star-line.svg";
import videoLoading from "../../../assets/img/icons/video-poster.svg";
import moveLoader from "../../../assets/img/loder/moveLoad.gif";

class MoveListDetails extends React.Component {
  video;
  constructor(props) {
    super(props);
    this.state = {
      imageLoadedIndex: [],
      hoverStart: false,
      isChange: false
    };
    this.myRef = React.createRef();
  }

  componentDidUpdate = ({ isVideohovered }) => {
    if (isVideohovered !== this.props.isVideohovered) {
      if (this.props.isVideohovered) {
        this.setState({
          hoverStart: true
        });
      } else {
        this.setState({
          hoverStart: false
        });
      }
      this.setState({
        isChange: true
      });
    }
  };

  handleVideoLoading = index => {
    // const { hoverStart, isChange } = this.state
    // const loadClass = document.getElementsByClassName(`video-effect`)
    // if (isChange) {
    //   if (hoverStart && this.props.videoIndex === index) {
    //     loadClass.classList.add("video-data-load")
    //   }
    //   else{
    //     console.log("in Elese");
    //     loadClass.classList.remove("video-data-load")
    //   }
    // }
  };

  handleKeyPress = (e, videoData, index) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.props.handleonBlur(e, videoData, index);
    } else {
      return;
    }
  };

  onpaste = e => {
    e.preventDefault();
    if (window.clipboardData) {
      let content = window.clipboardData.getData("Text");
      if (window.getSelection) {
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);
        selRange.deleteContents();
        selRange.insertNode(document.createTextNode(content));
      }
    } else if (e.clipboardData) {
      let content = (e.originalEvent || e).clipboardData.getData("text/plain");
      document.execCommand("insertText", false, content);
    }
  };
  onHover = (video, index) => {
    if (this.video) {
      this.video.play();
    }
    this.props.handleVideoHover(index);
  };
  initializeVideoPlayer = (video, index) => {
    this.video = document.getElementById(`webm-video-${index}`);
    if (video.isYoutubeUrl) {
      this.video.currentTime = Number(video.startTime);
      this.video.addEventListener("timeupdate", () => {
        if (Number(video.endTime) - this.video.currentTime < 0.3) {
          this.video.currentTime = Number(video.startTime);
        }
      });
    }
    this.setState({
      videoCanPlay: false
    });
  };
  render() {
    const {
      index,
      isVideoChecked,
      selectedMoves,
      video,
      handleVideoHoverLeave,
      handleVideoPause,
      onDoubleClick,
      isVideoModalOpen,
      handleMovesSelect,
      isSelectVideo,
      videoIndex,
      handleVideoCheckBox,
      handleStarred,
      doubleClick,
      doubleClickIndex,
      handleonBlur,
      handleChange,
      isSavingWebM,
      // movesOfSet,
      title
    } = this.props;
    let processingData = false;
    let videoProcessing;
    if (isSavingWebM && isSavingWebM.length) {
      videoProcessing = isSavingWebM.filter(function(user) {
        return user.id === video._id;
      });
    }

    if (videoProcessing && videoProcessing.length) {
      processingData = true;
    } else {
      processingData = false;
    }
    // get video details
    const { isMoveProcessing } = video;
    return (
      <div
        className={
          isVideoChecked
            ? "play-list-tile-select cursor_pointer"
            : "play-list-tile cursor_pointer"
        }
        key={index}
      >
        <div
          onClick={() => this.props.handleShowVideo(index)}
          onMouseLeave={
            !video.isMoveProcessing
              ? () => {
                  handleVideoHoverLeave();
                }
              : null
          }
          key={index}
        >
          <div className="play-list-block">
            <div
              className={`play-sub-block ${
                isVideoChecked && selectedMoves[index]
                  ? "video-full-selection"
                  : ""
              }`}
              onMouseOver={() => this.onHover(video, index)}
              onMouseLeave={() => {
                handleVideoPause(index);
              }}
            >
              <div
                onClick={
                  !video.isMoveProcessing
                    ? isVideoChecked && !isVideoModalOpen
                      ? () =>
                          handleMovesSelect(
                            !selectedMoves[index],
                            null,
                            index,
                            video._id
                          )
                      : null
                    : null
                }
                className={
                  isVideoChecked && selectedMoves[index]
                    ? `play-list-img blur-img-wrap checked-wrap video-select`
                    : `play-list-img blur-img-wrap checked-wrap`
                }
              >
                <div
                  className="video-move-layer"
                  onClick={
                    !isVideoChecked && isVideoModalOpen
                      ? () => this.props.handleVideoModal(video, index)
                      : null
                  }
                ></div>
                <div className={"star-mark"}>
                  {video.isStarred ? (
                    <img src={starIc} alt={"star"} className="w-100" />
                  ) : null}
                </div>

                {isVideoChecked ? (
                  <span className="plus-ic-wrap custom-control custom-checkbox">
                    <Input
                      className="custom-control-input"
                      id={`selected-video-${index}`}
                      onChange={
                        !video.isMoveProcessing
                          ? e => handleMovesSelect(null, e, index, video._id)
                          : null
                      }
                      type="checkbox"
                      checked={selectedMoves[index] ? true : false}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={`selected-video-${index}`}
                    />
                  </span>
                ) : (
                  <>
                    {" "}
                    {!isVideoChecked &&
                    isSelectVideo &&
                    videoIndex === index ? (
                      <span
                        onClick={() =>
                          handleVideoCheckBox(true, index, video._id)
                        }
                        className="plus-ic-wrap custom-control custom-checkbox"
                      >
                        <Input
                          className="custom-control-input"
                          id={`selected-video-${index}`}
                          onChange={
                            !video.isMoveProcessing
                              ? e =>
                                  handleMovesSelect(null, e, index, video._id)
                              : null
                          }
                          type="checkbox"
                          checked={selectedMoves[index] ? true : false}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`selected-video-${index}`}
                        />
                      </span>
                    ) : null}
                  </>
                )}

                <>
                  <div className={"video-effect"}>
                    <video
                      width={"100%"}
                      preload="auto"
                      id={`webm-video-${index}`}
                      poster={
                        processingData
                          ? moveLoader
                          : video.videoThumbnail
                          ? video.videoThumbnail
                          : videoLoading
                      }
                      muted={true}
                      onLoadedData={() => {
                        this.initializeVideoPlayer(video, index);
                      }}
                      draggable="true"
                      onContextMenu={e => e.preventDefault()}
                      loop
                      playsInline
                      onLoadStartCapture={() => {
                        this.handleVideoLoading(index);
                      }}
                      key={video._id}
                    >
                      <source
                        src={`${
                          isMoveProcessing ? video.videoUrl : video.moveURL
                        }`}
                        type="video/webm"
                      />
                    </video>
                  </div>
                </>
                <div className="blur-img" />
              </div>
              <div className="play-list-text">
                <div
                  className={
                    video.title !== "Unnamed" && video.title
                      ? "text-capitalize play-list-heading h6 m-0"
                      : "text-capitalize play-list-heading h6 m-0 text-untitled"
                  }
                  onDoubleClick={
                    !isVideoChecked
                      ?  () => onDoubleClick(index, video.title)
                        : null
                  }
                >
                  {doubleClick && doubleClickIndex === index ? (
                    <FormGroup className="title-edit-text">
                      <Input
                        id="title"
                        autoFocus
                        type="text"
                        placeholder="Enter a title"
                        name="title"
                        onChange={handleChange}
                        value={title}
                        onBlur={e => handleonBlur(e, video, index)}
                        onKeyPress={
                          doubleClick
                            ? e => this.handleKeyPress(e, video, index)
                            : null
                        }
                      />
                    </FormGroup>
                  ) : (
                    video.title || "unnamed"
                  )}
                  {/* {video.title || "unnamed"} */}
                </div>
                <div
                  className="star-wrap"
                  onClick={
                    !video.isMoveProcessing
                      ? () => handleStarred(video._id, video.isStarred, index)
                      : null
                  }
                >
                  {video.isStarred ? (
                    <img src={starIc} alt={"star"} className="w-100" />
                  ) : (
                    <img className="w-100" src={blankStar} alt={"star"} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MoveListDetails;
