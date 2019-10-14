import React from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Input
} from "reactstrap";
import addPlusIc from "../../../assets/img/add_plus.png";
import starIc from "../../../assets/img/star.svg";
import { AppConfig } from "config/Appconfig";
import { AppRoutes } from "config/AppRoutes";
import "./index.scss";

// core components
class MoveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      videoIndex: -1,
      isVideoChecked: false,
      isSelectVideo: false,
      selectedMoves: [],
      selectedMoveIds: [],
      page: 1
    };
  }
  handleVideoHoverLeave = () => {
    this.setState({
      isSelectVideo: false
    })
  }
  /* 
  */
  handleVideoHover = (index) => {
    this.setState({
      isSelectVideo: true,
      videoIndex: index
    })
  }
  /* 
  */
  handleVideoCheckBox = (checked, index, moveId) => {
    const selectedMoves = [...this.state.selectedMoves]
    selectedMoves[index] = checked
    let selectedMoveIds = [...this.state.selectedMoveIds]
    selectedMoveIds.push(moveId)
    this.setState({
      isVideoChecked: true,
      selectedMoves,
      selectedMoveIds
    })
  }
  /* 
  */
  handleMovesSelect = (valueCheck, e, index, moveId) => {
    let checked
    if (e && e.target) {
      checked = !e.target.checked
    } else {
      checked = valueCheck
    }
    const selectedMoves = [...this.state.selectedMoves]
    selectedMoves[index] = checked
    let selectedMoveIds = [...this.state.selectedMoveIds]
    if (checked === true) {
      selectedMoveIds.push(moveId)
    } else {
      selectedMoveIds = selectedMoveIds.filter(item => item !== moveId)
    }
    if (!selectedMoveIds.length && selectedMoves && selectedMoves.length) {
      this.setState({
        isVideoChecked: false
      })
    }
    this.setState({
      selectedMoves,
      selectedMoveIds
    })
  }
  /* 
   */
  handleVideoPlay = (index) => {
    let myVideo = document.getElementById(`webm-video-${index}`);
    myVideo.play();
  }
  /* 
  */
  handleVideoPause = (index) => {
    let myVideo = document.getElementById(`webm-video-${index}`);
    myVideo.pause();
  }
  /* 
  */
  render() {
    const { show, setIndex, moveCount, movesOfSet } = this.props
    const { isVideoChecked, isSelectVideo, videoIndex, selectedMoves, selectedMoveIds } = this.state
    return (
      <section className="play-list-collection set-detail-section">
        <Row>
          <Col md="12" className={"pb-3"}>
            <div class="content-header mt-3 mb-1">
              <span class="content-title">Moves in this set ({moveCount || 0})</span>
            </div>
            {
              selectedMoveIds && selectedMoveIds.length ?
                <div className={"selected-moves"}>
                  <div className={"d-flex justify-content-between"}>
                    <div class="content-title">
                      Selected Moves: {selectedMoveIds && selectedMoveIds.length ? selectedMoveIds.length : 0}
                    </div>
                    <div class="content-title pr-2">
                      <span className={"mr-2"}>
                        <ButtonGroup
                          size="sm">
                          <Button>Copy</Button>
                          <Button>Transfer</Button>
                          <Button>Remove</Button>
                        </ButtonGroup>
                      </span>
                      <span
                        onClick={() => this.setState({
                          selectedMoves: [],
                          selectedMoveIds: [],
                          isVideoChecked: false
                        })}
                        className={"cursor_pointer"}>
                        <i class="fa fa-times" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div> :
                null
            }
          </Col>
          <div className="play-list-tile" >
            <div className="play-list-block  d-flex h-100 ">
              <div className="add-play-list-block d-flex w-100 justify-content-center align-items-center text-center flex-column">
                <div className="h5 font-dark-bold add-img">
                  <img src={addPlusIc} alt="" />
                </div>
                <Button
                  onClick={() => this.props.redirectTo(AppRoutes.MOVE.url)}
                  color={" "}
                  className="fill-btn btn mt-4">
                  {" "}
                  Create Now
                </Button>
              </div>
            </div>
          </div>
          {movesOfSet.map((video, index) => {
            return (
              <div
                onClick={() => this.props.handleShowVideo(index)}
                onMouseLeave={() => {
                  this.handleVideoHoverLeave();
                }}
                className="play-list-tile cursor_pointer"
                key={index}>
                <div className="play-list-block">
                  <div
                    className="play-sub-block"
                    onMouseOver={() => this.handleVideoHover(index)}
                    onMouseLeave={() => {
                      this.handleVideoPause(index);
                    }}>
                    <div
                      onMouseOver={() => this.handleVideoPlay(index)}
                      onClick={isVideoChecked ? () => this.handleMovesSelect(!selectedMoves[index], null, index, video._id) : null}
                      className={isVideoChecked && selectedMoves[index] ? `play-list-img blur-img-wrap checked-wrap video-select` : `play-list-img blur-img-wrap checked-wrap`}>
                      {
                        !isVideoChecked && isSelectVideo && (videoIndex === index) ?
                          <span onClick={() => this.handleVideoCheckBox(true, index, video._id)} className="plus-ic-wrap">
                            <i className="text-white fa fa-plus-circle" aria-hidden="true" />
                          </span> :
                          null
                      }
                      {
                        isVideoChecked ?
                          <span className="plus-ic-wrap custom-control custom-checkbox">
                            <Input
                              className="custom-control-input"
                              id={`selected-video-${index}`}
                              onChange={(e) => this.handleMovesSelect(null, e, index, video._id)}
                              type="checkbox"
                              checked={selectedMoves[index] ? true : false}

                            />
                            <label className="custom-control-label" htmlFor={`selected-video-${index}`} />
                          </span> :
                          null
                      }
                      <div className="star-wrap">
                        <img src={starIc} alt={"star"} />
                      </div>
                      <video width={"100%"} id={`webm-video-${index}`} muted={false}>
                        <source
                          src={`${AppConfig.IMAGE_ENDPOINT}${video.moveURL}`}
                          type="video/webm"
                        />
                      </video>
                      <div
                        className="blur-img"
                        style={{ background: "#000" }}
                      />
                    </div>

                    <div onMouseLeave={() => this.props.closePopOver(index, show)} className="play-list-text">
                      <div className="text-capitalize play-list-heading h6 m-0">
                        {video.title || "unnamed"}
                      </div>
                      <div
                        onMouseOver={() =>
                          this.props.showPopOver(index, show)
                        }
                        className={"tooltip-btn-wrap right-btn-tip"}
                      >
                        <span className="cursor_pointer">
                          {" "}
                          <i className="fas fa-ellipsis-v setting-icon "></i>
                        </span>
                        {show && setIndex === index ? (
                          <ButtonGroup
                            onMouseOver={() =>
                              this.props.showPopOver(index, show)
                            }
                            size="sm">
                            <Button>
                              Copy
                            </Button>
                            <Button>Transfer</Button>
                            <Button>Remove</Button>
                          </ButtonGroup>) :
                          null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Row>
      </section >
    );
  }
}

export default MoveList;
