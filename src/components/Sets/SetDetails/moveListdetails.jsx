import React from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup,
  Input
} from "reactstrap";
import addPlusIc from "../../../assets/img/add_plus.png";
import starIc from "../../../assets/img/star.svg";
import TransferToModal from "../../Folders/FolderDetails/transferTo";
import InfiniteScroll from "react-infinite-scroll-component";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
import blankStar from "../../../assets/img/star-line.svg";
import addTag from "../../../assets/img/set-detail-ic/add-tag.svg";
import transfer from "../../../assets/img/set-detail-ic/transfer.svg";
import remove from "../../../assets/img/set-detail-ic/remove.svg";

class MoveListDetails extends React.Component {
  render() {
    const {
      index,
      isVideoChecked,
      selectedMoves,
      handleVideoHover,
      handleVideoPause,
      handleVideoHoverLeave,
      handleVideoPlay,
      handleMovesSelect,
      isMarkingStar,
      video,
      isSelectVideo,
      videoIndex
    } = this.props;
    return (
      <div className="play-list-tile cursor_pointer">
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
                        onClick={() => {
                          this.setState(
                            {
                              isVideoModalOpen: false
                            },
                            () =>
                              this.handleVideoCheckBox(true, index, video._id)
                          );
                        }}
                        className="plus-ic-wrap custom-control custom-checkbox"
                      >
                        <Input
                          className="custom-control-input"
                          id={`selected-video-${index}`}
                          onChange={e =>
                            this.handleMovesSelect(null, e, index, video._id)
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
                    muted={true}
                    loop
                  >
                    <source src={`${video.moveURL}`} type="video/webm" />
                  </video>
                </div>
                <div
                  className="blur-img"
                  // style={{ background: "#000" }}
                />
              </div>
              <div
                onMouseLeave={() => this.props.closePopOver(index, show)}
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
                    this.handleStarred(video._id, video.isStarred, index)
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
