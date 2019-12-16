import React from "react";
import { Input } from "reactstrap";
import starIc from "../../../assets/img/star.svg";
import "./index.scss";
import blankStar from "../../../assets/img/star-line.svg";
import videoLoading from "../../../assets/img/icons/video-poster.svg";
import moveLoader from "../../../assets/img/loder/moveLoad.gif";
import VideoIndexLoader from "../../../assets/img/loder/indexLoader.svg";

class MoveListDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoadedIndex: [],
      hoverStart: false,
      isChange: false
    };
  }
  componentDidUpdate = ({ isVideohovered }) => {
    if (isVideohovered !== this.props.isVideohovered) {
      if (this.props.isVideohovered) {
        this.setState({
          hoverStart: true
        })
      } else {
        this.setState({
          hoverStart: false
        })
      }
      this.setState({
        isChange: true
      })
    }
  }

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
      isMarkingStar,
      isVideoModalOpen,
      handleMovesSelect,
      isSelectVideo,
      videoIndex,
      handleVideoCheckBox,
      handleStarred,
      doubleClick,
      doubleClickIndex,
      onDoubleClick,
      handleonBlur,
      // isLoadImage,
      sourceIndex,
      destinationIndex,
      isSortIndexUpdate,
      isSavingWebM
      // isIosDevice
    } = this.props;

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
                <div
                  className={
                    isMarkingStar.isChanging && isMarkingStar.index === index
                      ? "star-mark isStarred"
                      : "star-mark"
                  }
                >
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
                  {isSortIndexUpdate &&
                    (sourceIndex === index || destinationIndex === index) ? (
                      <div className="video-effect loading-img">
                        <img src={VideoIndexLoader} alt="" />
                      </div>
                    ) : (
                      <div className={"video-effect"}>
                        <video
                          width={"100%"}
                          preload="auto"
                          id={`webm-video-${index}`}
                          poster={
                            video.isMoveProcessing && isSavingWebM
                              ? moveLoader
                              : video.videoThumbnail
                                ? video.videoThumbnail
                                : videoLoading
                          }
                          muted={true}
                          draggable="true"
                          onContextMenu={e => e.preventDefault()}
                          loop
                          playsInline
                          onLoadStartCapture={() => {
                            this.handleVideoLoading(index);
                          }}
                        >
                          <source src={`${video.moveURL}`} type="video/webm" />
                        </video>
                      </div>
                    )}
                </>
                <div
                  className="blur-img"
                // style={{ background: "#000" }}
                />
              </div>
              <div className="play-list-text">
                <div
                  suppressContentEditableWarning={true}
                  id="max-title-length"
                  className="text-capitalize play-list-heading h6 m-0"
                  contentEditable={
                    doubleClick && doubleClickIndex === index ? "true" : "false"
                  }
                  onDoubleClick={
                    !video.isMoveProcessing
                      ? () => onDoubleClick(index, video.title)
                      : null
                  }
                  tabindex="0"
                  onBlur={
                    doubleClick ? e => handleonBlur(e, video, index) : null
                  }
                  onKeyPress={
                    doubleClick
                      ? e => this.handleKeyPress(e, video, index)
                      : null
                  }
                >
                  {/* {doubleClick && doubleClickIndex === index ? (
                    <>
                      <FormGroup>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Enter a title"
                          name="title"
                          onChange={handleChange}
                          value={title}
                          onBlur={() => handleonBlur(video, index)}
                        />
                      </FormGroup>
                      {errors ? errors : null}
                    </>
                  ) : (
                    video.title || "unnamed"
                  )} */}
                  {video.title || "unnamed"}
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
