import React from "react";
import { Input, FormGroup } from "reactstrap";
import starIc from "../../../assets/img/star.svg";
import "./index.scss";
import blankStar from "../../../assets/img/star-line.svg";
import videoLoading from "../../../assets/img/icons/video-poster.svg";
import moveLoader from "../../../assets/img/loder/moveLoad.gif";

class MoveListDetails extends React.Component {
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

  // onFocus = (e, index) => {
  //   document.getElementById(`video-title-${index}`).focus();
  //   if (document.selection) {
  //     // IE
  //     var range = document.body.createTextRange();
  //     range.moveToElementText(document.getElementById(`video-title-${index}`));
  //     range.select();
  //   } else if (window.getSelection) {
  //     var range = document.createRange();
  //     range.selectNode(document.getElementById(`video-title-${index}`));
  //     window.getSelection().removeAllRanges();
  //     window.getSelection().addRange(range);
  //   }
  // };

  render() {
    const {
      index,
      isVideoChecked,
      selectedMoves,
      video,
      handleVideoHoverLeave,
      handleVideoHover,
      handleVideoPause,
      handleVideoPlay,
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
          onClick={
            !video.isMoveProcessing
              ? () => this.props.handleShowVideo(index)
              : null
          }
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
              onMouseOver={() => handleVideoHover(index)}
              onMouseLeave={() => {
                handleVideoPause(index);
              }}
            >
              <div
                onMouseOver={() => handleVideoPlay(index)}
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
                    !video.isMoveProcessing
                      ? !isVideoChecked && isVideoModalOpen
                        ? () => this.props.handleVideoModal(video, index)
                        : null
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
                        this.setState({
                          videoCanPlay: false
                        });
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
                      <source src={`${video.moveURL}`} type="video/webm" />
                    </video>
                  </div>
                </>
                <div className="blur-img" />
              </div>
              <div className="play-list-text">
                {/* <div
                  ref={this.myRef}
                  tabIndex="0"
                  suppressContentEditableWarning={true}
                  id={`video-title-${index}`}
                  className={
                    video.title !== "Unnamed" && video.title
                      ? "text-capitalize play-list-heading h6 m-0 "
                      : "text-capitalize play-list-heading h6 m-0 text-untitled"
                  }
                  contentEditable={
                    doubleClick && doubleClickIndex === index ? true : false
                  }
                  onDoubleClick={
                    !isVideoChecked
                      ? !video.isMoveProcessing
                        ? () => this.onDoubleClick(index, video.title)
                        : null
                      : null
                  }
                  onPaste={doubleClick ? this.onpaste : null}
                  onInput={this.inputText}
                  onBlur={
                    doubleClick ? e => handleonBlur(e, video, index) : null
                  }
                  onKeyPress={
                    doubleClick
                      ? e => this.handleKeyPress(e, video, index)
                      : null
                  }
                >
                  {(isSortIndexUpdate &&
                    doubleClick &&
                    doubleClickIndex === index) ||
                  video.title
                    ? video.title
                    : "unnamed"}
                </div> */}
                <div
                  className={
                    video.title
                      ? "text-capitalize play-list-heading h6 m-0"
                      : "text-capitalize play-list-heading h6 m-0 text-untitled"
                  }
                  onDoubleClick={
                    !isVideoChecked
                      ? !video.isMoveProcessing
                        ? () => onDoubleClick(index, video.title)
                        : null
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
