import React from "react";
import { Input } from "reactstrap";
import starIc from "../../../assets/img/star.svg";
import "./index.scss";
import blankStar from "../../../assets/img/star-line.svg";
import videoLoading from "../../../assets/img/icons/videoLoading.svg";
import { ListManager } from "react-beautiful-dnd-grid";

class MoveListDetails extends React.Component {
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
      handleStarred
    } = this.props;

    return (
      <div
        className={
          isVideoChecked
            ? "play-list-tile-select cursor_pointer"
            : "play-list-tile cursor_pointer"
        }
      >
        <div
          onClick={() => this.props.handleShowVideo(index)}
          onMouseLeave={() => {
            handleVideoHoverLeave();
          }}
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
                  isVideoChecked && !isVideoModalOpen
                    ? () =>
                        handleMovesSelect(
                          !selectedMoves[index],
                          null,
                          index,
                          video._id
                        )
                    : null
                }
                className={
                  isVideoChecked && selectedMoves[index]
                    ? `play-list-img blur-img-wrap checked-wrap video-select`
                    : `play-list-img blur-img-wrap checked-wrap`
                }
              >
                <div
                  className={
                    isMarkingStar.isChanging && isMarkingStar.index === index
                      ? "star-mark isStarred"
                      : "star-mark"
                  }
                >
                  {video.isStarred ? (
                    <img src={starIc} alt={"star"} className="w-100" />
                  ) : (
                    <img className="w-100" src={blankStar} alt={"star"} />
                  )}
                </div>

                {isVideoChecked ? (
                  <span className="plus-ic-wrap custom-control custom-checkbox">
                    <Input
                      className="custom-control-input"
                      id={`selected-video-${index}`}
                      onChange={e =>
                        handleMovesSelect(null, e, index, video._id)
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
                        // onClick={() => {
                        //   this.setState(
                        //     {
                        //       isVideoModalOpen: false
                        //     },
                        //     () =>
                        //       this.handleVideoCheckBox(true, index, video._id)
                        //   );
                        // }}
                        onClick={() =>
                          handleVideoCheckBox(true, index, video._id)
                        }
                        className="plus-ic-wrap custom-control custom-checkbox"
                      >
                        <Input
                          className="custom-control-input"
                          id={`selected-video-${index}`}
                          onChange={e =>
                            handleMovesSelect(null, e, index, video._id)
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
                <ListManager
                  items={[video]}
                  direction="horizontal"
                  maxItems={4}
                  render={video => {
                    let index = video.id;
                    return (
                      <div
                        className={"video-effect"}
                        onClick={
                          !isVideoChecked && isVideoModalOpen
                            ? () => this.props.handleVideoModal(video, index)
                            : null
                        }
                      >
                        <video
                          width={"100%"}
                          id={`webm-video-${index}`}
                          poster={videoLoading}
                          muted={true}
                          loop
                        >
                          <source src={`${video.moveURL}`} type="video/webm" />
                        </video>
                      </div>
                    );
                  }}
                  
                />
                <div
                  className="blur-img"
                  // style={{ background: "#000" }}
                />
              </div>
              <div
                // onMouseLeave={() => this.props.closePopOver(index, show)}
                // onDoubleClick={() =>
                //   this.onDoubleClick(
                //     index,
                //     video.title
                //   )
                // }
                className="play-list-text"
              >
                <div className="text-capitalize play-list-heading h6 m-0">
                  {/* {doubleClick &&
                              doubleClickIndex === index ? (
                                <FormGroup>
                                  <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter a title"
                                    name="title"
                                    onChange={
                                      this.handleChange
                                    }
                                    value={title}
                                    onBlur={() =>
                                      this.handleonBlur(
                                        video,
                                        index
                                      )
                                    }
                                  />
                                </FormGroup>
                              ) : (
                                video.title || "unnamed"
                              )} */}

                  {video.title || "unnamed"}
                </div>
                <div
                  className="star-wrap"
                  onClick={() =>
                    handleStarred(video._id, video.isStarred, index)
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
