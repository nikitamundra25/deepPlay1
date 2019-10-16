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
    });
  };
  /*
   */
  handleVideoHover = index => {
    this.setState({
      isSelectVideo: true,
      videoIndex: index
    });
  };
  /*
   */
  handleVideoCheckBox = (checked, index, moveId) => {
    const selectedMoves = [...this.state.selectedMoves];
    selectedMoves[index] = checked;
    let selectedMoveIds = [...this.state.selectedMoveIds];
    selectedMoveIds.push(moveId);
    this.setState({
      isVideoChecked: true,
      selectedMoves,
      selectedMoveIds
    });
  };
  /*
   */
  handleMovesSelect = (valueCheck, e, index, moveId) => {
    let checked
    if (e && e.target && valueCheck === null) {
      console.log(">>>>>>>", e.target.checked);
      checked = !e.target.checked
    } else {
      console.log("<<<<<<<<<<", valueCheck);
      checked = valueCheck
    }
    const selectedMoves = [...this.state.selectedMoves];
    selectedMoves[index] = checked;

    let selectedMoveIds = [...this.state.selectedMoveIds];
    if (checked === true) {
      selectedMoveIds.push(moveId)
    } else {
      selectedMoveIds = selectedMoveIds.filter(item => item !== moveId);
    }
    if (!selectedMoveIds.length && selectedMoves && selectedMoves.length) {
      this.setState({
        isVideoChecked: false
      });
    }
    this.setState({
      selectedMoves,
      selectedMoveIds
    });
  };
  /*
   */
  handleVideoPlay = index => {
    let myVideo = document.getElementById(`webm-video-${index}`);
    myVideo.play();
  };
  /*
   */
  handleVideoPause = index => {
    let myVideo = document.getElementById(`webm-video-${index}`);
    myVideo.pause();
  };
  /*
   */
  handleStarred = (id, isStarred) => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const { selectedMoveIds } = this.state;
    const data = {
      moveId: selectedMoveIds.length ? selectedMoveIds : id,
      isStarred: isStarred ? false : true,
      setId: pathName[3]
    };
    this.props.isStarred(data);
  };

  handleMoveDelete = id => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const { selectedMoveIds } = this.state;
    const data = {
      moveId: selectedMoveIds.length ? selectedMoveIds : id,
      isDeleted: true,
      setId: pathName[3]
    };
    this.props.deleteMove(data);
  };

  render() {
    const { show, setIndex, moveCount, movesOfSet } = this.props;
    const {
      isVideoChecked,
      isSelectVideo,
      videoIndex,
      selectedMoves,
      selectedMoveIds
    } = this.state;

    return (
      <section className="play-list-collection set-detail-section">
        <Row>


          <Col md="12" className={"pb-3"}>
            <div class="content-header mt-3 mb-1">
              <span class="content-title">
                Moves in this set ({moveCount || 0})
              </span>

              <div className="set-detail-right-section">
                <ButtonGroup size="sm" className="mr-2">
                  <Button
                    // onClick={() => this.OnCreateSetCopy(list)}
                    // className="active"
                    color=" "
                  >
                    All
                  </Button>
                  <Button color=" ">Starred</Button>
                </ButtonGroup>
                <FormGroup className="mb-0 header-search-wrap ">
                  <InputGroup className="">
                    <Input
                      placeholder="Type to filter moves"
                      type="text"
                      autoComplete="off"
                    />
                  </InputGroup>
                </FormGroup>
              </div>
            </div>
            {selectedMoveIds && selectedMoveIds.length ? (
              <div className={"selected-moves my-3"}>
                <div className={"d-flex justify-content-between"}>
                  <div class="content-title">
                    Selected Moves:{" "}
                    {selectedMoveIds && selectedMoveIds.length
                      ? selectedMoveIds.length
                      : 0}
                  </div>
                  <div class="content-title pr-2 set-detail-btn-wrap">
                    <div className={"mr-2 "}>
                      <ButtonGroup size="sm">
                        <Button color=" ">Copy</Button>
                        <Button color=" ">Transfer</Button>
                        <Button color=" ">Remove</Button>
                        <Button color=" "
                        className="btn-line-black"
                         onClick={() =>
                          this.setState({
                            selectedMoves: [],
                            selectedMoveIds: [],
                            isVideoChecked: false
                          })
                        }
                        >
                     
                      <i class="fa fa-times" aria-hidden="true" />
                 
                        </Button>
                      </ButtonGroup>
                    </div>
                    
                  </div>
                </div>
              </div>
            ) : null}
          </Col>
          <div className="play-list-tile">
            <div className="play-list-block  d-flex h-100 ">
              <div className="add-play-list-block d-flex w-100 justify-content-center align-items-center text-center flex-column">
                <div className="h5 font-dark-bold add-img">
                  <img src={addPlusIc} alt="" />
                </div>
                <Button
                  onClick={() => this.props.redirectTo(AppRoutes.MOVE.url)}
                  color={" "}
                  className="fill-btn btn mt-4"
                >
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
                key={index}
              >
                <div className="play-list-block">
                  <div
                    className="play-sub-block"
                    onMouseOver={() => this.handleVideoHover(index)}
                    onMouseLeave={() => {
                      this.handleVideoPause(index);
                    }}
                  >
                    <div
                      onMouseOver={() => this.handleVideoPlay(index)}
                      onClick={
                        isVideoChecked
                          ? () =>
                              this.handleMovesSelect(
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
                      {!isVideoChecked &&
                      isSelectVideo &&
                      videoIndex === index ? (
                        <span
                          onClick={() =>
                            this.handleVideoCheckBox(true, index, video._id)
                          }
                          className="plus-ic-wrap"
                        >
                          <i
                            className="text-white fa fa-plus-circle"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                      {isVideoChecked ? (
                        <span className="plus-ic-wrap custom-control custom-checkbox">
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
                      <div className="star-wrap">
                        {video.isStarred ? (
                          <img src={starIc} alt={"star"} />
                        ) : (
                          ""
                        )}
                      </div>
                      <video
                        width={"100%"}
                        id={`webm-video-${index}`}
                        muted={false}
                      >
                        <source
                          src={`${video.moveURL}`}
                          type="video/webm"
                        />
                      </video>
                      <div
                        className="blur-img"
                        style={{ background: "#000" }}
                      />
                    </div>

                    <div
                      onMouseLeave={() => this.props.closePopOver(index, show)}
                      className="play-list-text"
                    >
                      <div className="text-capitalize play-list-heading h6 m-0">
                        {video.title || "unnamed"}
                      </div>
                      <div
                        onMouseOver={() => this.props.showPopOver(index, show)}
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
                            size="sm"
                          >
                            <Button
                              color=" "
                              onClick={() =>
                                this.handleStarred(video._id, video.isStarred)
                              }
                            >
                              {video.isStarred ? "UnStar" : "Star"}
                            </Button>
                            <Button color=" ">Transfer</Button>
                            <Button
                              color=" "
                              onClick={() => this.handleMoveDelete(video._id)}
                            >
                              Remove
                            </Button>
                          </ButtonGroup>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Row>
      </section>
    );
  }
}

export default MoveList;
