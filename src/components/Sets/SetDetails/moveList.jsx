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
import InfiniteScroll from 'react-infinite-scroll-component';
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
import blankStar from "../../../assets/img/star-line.svg";
import AddTagModal from "./addTagsModal";

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
      page: 1,
      moveToTransfer: "",
      isVideoModalOpen: true,
      setId: "",
      moveofSetList: this.props.movesOfSet,
      search: "",
      moveIdToAddTag: ""
    };
  }
  handleVideoHoverLeave = () => {
    this.setState({
      isSelectVideo: false
    });
  };
  /*
   */
  componentDidUpdate = prevProps => {
    if (prevProps.searchMoveResult !== this.props.searchMoveResult) {
      if (this.state.search) {
        this.setState({
          moveofSetList: this.props.searchMoveResult
        });
      } else {
        this.setState({
          moveofSetList: this.props.movesOfSet
        });
      }
    }
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
    let checked;
    if (e && e.target && valueCheck === null) {
      checked = !e.target.checked;
    } else {
      checked = valueCheck;
    }
    const selectedMoves = [...this.state.selectedMoves];
    selectedMoves[index] = checked;

    let selectedMoveIds = [...this.state.selectedMoveIds];
    if (checked === true) {
      selectedMoveIds.push(moveId);
    } else {
      selectedMoveIds = selectedMoveIds.filter(item => item !== moveId);
    }
    if (!selectedMoveIds.length && selectedMoves && selectedMoves.length) {
      this.setState({
        isVideoChecked: false,
        isVideoModalOpen: true,
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

  openTransferToModal = (id, setId) => {
    const { modelInfoReducer } = this.props;
    const { selectedMoveIds } = this.state;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      moveToTransfer: selectedMoveIds.length ? selectedMoveIds : id,
      setId: setId ? setId : this.props.setIdPathName
    });
    this.props.modelOperate({
      modelDetails: {
        transferToModalOpen: !modelDetails.transferToModalOpen
      }
    });
  };

  openAddTagsModal = id => {
    const { modelInfoReducer } = this.props;
    const { selectedMoveIds } = this.state;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      moveIdToAddTag: selectedMoveIds.length ? selectedMoveIds : id
    });
    this.props.modelOperate({
      modelDetails: {
        addTagModalOpen: !modelDetails.addTagModalOpen
      }
    });
  };

  handleMoveTransfer = data => {
    const { selectedMoveIds } = this.state;
    const moveData = {
      moveId: selectedMoveIds.length ? selectedMoveIds : data.moveId,
      setId: data.setId,
      previousSetId: data.previousSetId
    };
    this.props.transferMove(moveData);
  };

  handleShowStarred = () => {
    const { location } = this.props;
    const { pathname } = location;
    this.props.redirectTo(`${pathname}?isStarred=true`);
  };

  handleShowAll = () => {
    const { location } = this.props;
    const { pathname } = location;
    const movesList = this.props.movesOfSet;
    this.setState({
      moveofSetList: movesList
    });
    this.props.redirectTo(`${pathname}?isStared=false`);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    const data = {
      search: value,
      setId: this.props.setIdPathName
    };
    this.props.searchMove(data);
  };

  render() {
    const {
      show,
      setIndex,
      moveCount,
      modelInfoReducer,
      allSetList,
      setIdPathName,
      isMoveSearchLoading,
      totalMoves
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { transferToModalOpen, addTagModalOpen } = modelDetails;
    const {
      isVideoChecked,
      isSelectVideo,
      videoIndex,
      selectedMoves,
      selectedMoveIds,
      setId,
      moveToTransfer,
      isVideoModalOpen,
      page,
      moveofSetList,
      search,
      moveIdToAddTag
    } = this.state;
    const location = this.props.location;
    const isStarred = location.search.split("=")
    return (
      <section className="play-list-collection set-detail-section">
        <InfiniteScroll
          dataLength={moveofSetList.length} //This is important field to render the next data
          next={() =>
            this.props.getMovesOfSetRequest({ setId: setIdPathName, page: page + 1, isInfiniteScroll: true })
          }
          hasMore={totalMoves !== moveofSetList.length ? true : false}
          loader={<h4>Loading...</h4>}
        >
          <Row className={"m-0"}>
            <Col md="12" className={"pb-3"}>
              <div className="content-header mt-3 mb-1">
                <span className="content-title">
                  Moves in this set ({moveCount || 0})
              </span>

                <div className="set-detail-right-section">
                  <ButtonGroup size="sm" className="mr-2">
                    <Button
                      className={isStarred[0] ? isStarred[1] === "false" ? "active" : "" : "active"}
                      color=" "
                      onClick={this.handleShowAll}
                    >
                      All
                  </Button>
                    <Button
                      className={isStarred[1] === "true" ? "active" : ""}
                      color=" " onClick={this.handleShowStarred}>
                      Starred
                  </Button>
                  </ButtonGroup>
                  <FormGroup className="mb-0 header-search-wrap ">
                    <InputGroup className="">
                      <Input
                        placeholder="Type to filter moves"
                        type="text"
                        autoComplete="off"
                        value={search}
                        name="search"
                        onChange={this.handleInputChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </div>
              </div>
              {selectedMoveIds && selectedMoveIds.length ? (
                <div className={"selected-moves selected-detail-page"}>
                  <div className={"d-flex justify-content-between"}>
                    <div className="content-title">
                      Selected Moves:{" "}
                      {selectedMoveIds && selectedMoveIds.length
                        ? selectedMoveIds.length
                        : 0}
                    </div>
                    <div className="content-title ">
                      <span className={"d-flex"}>
                        <ButtonGroup size="sm">
                          <Button
                            onClick={() => this.handleStarred()}
                            className=" "
                            color=" ">
                            Mark star
                          </Button>
                          <Button
                            onClick={() => this.openAddTagsModal()}
                            className=" "
                            color=" ">
                            Add tags
                            </Button>
                          <Button
                            onClick={() => this.openTransferToModal()}
                            className=" "
                            color=" ">
                            Transfer
                          </Button>
                          <Button
                            onClick={() => this.handleMoveDelete()}
                            className=" "
                            color=" ">
                            Remove
                          </Button>

                        </ButtonGroup>
                        <Button color=" "
                          className="btn-black ml-2 move-close-btn"
                          onClick={() =>
                            this.setState({
                              selectedMoves: [],
                              selectedMoveIds: [],
                              isVideoChecked: false,
                              isVideoModalOpen: true
                            })
                          }
                        >
                          <i className="fa fa-times" aria-hidden="true" />
                        </Button>
                      </span>

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
                    onClick={this.props.handleMoveAdd}
                    color={" "}
                    className="fill-btn btn mt-4"
                  >
                    {" "}
                    Create Now
                </Button>
                </div>
              </div>
            </div>
            {
              !isMoveSearchLoading ?
                moveofSetList.map((video, index) => {
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
                              isVideoChecked && !isVideoModalOpen
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
                                  onClick={() => {
                                    this.setState({
                                      isVideoModalOpen: false
                                    }, () =>
                                      this.handleVideoCheckBox(true, index, video._id)
                                    );
                                  }
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
                                  <img src={blankStar} alt={"star"} />
                                )}
                            </div>
                            <div className={"video-effect"}

                              onClick={
                                !isVideoChecked && isVideoModalOpen ?
                                  () => this.props.handleVideoModal(video, index) :
                                  null
                              }>
                              <video
                                width={"100%"}
                                id={`webm-video-${index}`}
                                muted={true}
                              >
                                <source src={`${video.moveURL}`} type="video/webm" />
                              </video>
                            </div>
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
                                    {video.isStarred ? "Unstar" : "Mark star"}
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      this.openAddTagsModal(video._id)
                                    }
                                    color=" ">
                                    Add tags
                                  </Button>
                                  <Button
                                    color=" "
                                    onClick={() =>
                                      this.openTransferToModal(video._id, video.setId, page)
                                    }
                                  >
                                    Transfer
                              </Button>
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
                }) :
                <Loader />

            }
            {}
          </Row>
          <TransferToModal
            modal={transferToModalOpen}
            AllFolders={allSetList}
            moveToTransfer={moveToTransfer}
            handleFolderModel={this.handleFolderModel}
            folderId={setId}
            transferMove={true}
            handleOpen={this.openTransferToModal}
            handleMove={this.handleMoveTransfer}
          />
          <AddTagModal
            modal={addTagModalOpen}
            handleOpen={this.openAddTagsModal}
            moveIdToAddTag={moveIdToAddTag}
            addTagstoMove={data => this.props.addTagstoMove(data)}
          />
        </InfiniteScroll>
      </section >
    );
  }
}

export default MoveList;