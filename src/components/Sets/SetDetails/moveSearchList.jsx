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
import videoLoading from "../../../assets/img/icons/video-poster.png";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
import blankStar from "../../../assets/img/star-line.svg";
import AddTagModal from "./addTagsModal";
import { ConfirmBox } from "helper/SweetAleart";
import { DebounceInput } from "react-debounce-input";
// import addTag from "../../../assets/img/set-detail-ic/add-tag.svg";
// import transfer from "../../../assets/img/set-detail-ic/transfer.svg";
// import remove from "../../../assets/img/set-detail-ic/remove.svg";
import { toast } from "react-toastify";

// core components
class MoveSearchList extends React.Component {
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
      tags: [],
      moveIdToAddTag: "",
      moveIndexToAddTag: -1,
      isMarkingStar: {
        index: -1,
        isChanging: false
      },
      errors: "",
      eleHeight: "",
      windowHeight: "",
      backgroundClass: "",
      doubleClick: "",
      doubleClickIndex: "",
      title: ""
    };
  }
  handleVideoHoverLeave = () => {
    this.setState({
      isSelectVideo: false
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
    const height = document.getElementById("video-thumbnail-block")
      .clientHeight;
    const windowHeight = window.innerHeight;
    this.setState({
      eleHeight: height,
      windowHeight
    });
  }

  listenScrollEvent = e => {
    if (window.scrollY > 180) {
      this.setState({ backgroundClass: "sticky-header" });
    } else {
      this.setState({ backgroundClass: "" });
    }
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
    if (prevProps.movesOfSet !== this.props.movesOfSet) {
      this.setState({
        moveofSetList: this.props.movesOfSet
      });
    }
    if (
      prevProps.isMoveStarLoading &&
      prevProps.isMoveStarLoading.loading !==
        this.props.isMoveStarLoading.loading
    ) {
      this.setState({
        isMarkingStar: {
          index: this.props.isMoveStarLoading.index,
          isChanging: true
        }
      });
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
    this.props.videoSelectRequest();
    this.setState({
      isVideoChecked: true,
      isVideoModalOpen: false,
      selectedMoves,
      selectedMoveIds,
      isMarkingStar: {
        index: -1,
        isChanging: false
      }
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
        isVideoModalOpen: true
      });
    }
    this.setState({
      selectedMoves,
      selectedMoveIds,
      isMarkingStar: {
        index: -1,
        isChanging: false
      }
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
  handleStarred = (id, isStarred, index) => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const { selectedMoveIds } = this.state;
    let moveofSetList = this.props.movesOfSet;
    let listData = moveofSetList;
    // const starDiv = document.getElementsByClassName("star-mark")[index];
    if (isStarred) {
      listData[index].isStarred = false;
      // starDiv.classList.remove("isStarred");
    } else {
      // starDiv.classList.add("isStarred");
      listData[index].isStarred = true;
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.success("Move marked as starred");
      }
    }
    const data = {
      moveId: selectedMoveIds.length ? selectedMoveIds : id,
      isStarred: isStarred ? false : true,
      setId: pathName[3],
      moveofSetList: listData,
      index
    };
    this.props.isStarred(data);
  };

  handleMoveDelete = async id => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const { selectedMoveIds } = this.state;
    const data = {
      moveId: selectedMoveIds.length ? selectedMoveIds : id,
      isDeleted: true,
      setId: pathName[3]
    };
    const { value } = await ConfirmBox({
      text:
        selectedMoveIds.length > 1
          ? "You want to remove moves! "
          : "You want to remove this move! "
    });
    if (value) {
      this.props.getMoveBySearchRequest({
        setId: this.props.setIdPathName,
        page: 1,
        isInfiniteScroll: false,
        isMoveList: true
      });
      this.setState({
        page: 1,
        selectedMoveIds: [],
        selectedMoves: []
      });
      this.props.deleteMove(data);
    }
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

  openAddTagsModal = (id, tags, index) => {
    const { modelInfoReducer } = this.props;
    const { selectedMoveIds } = this.state;
    const { modelDetails } = modelInfoReducer;
    this.props.getTagListRequest();
    let temp = [...new Set(selectedMoveIds.map(a => a))];
    this.setState({
      moveIdToAddTag: temp.length ? temp : id,
      tags: tags ? tags : "",
      moveIndexToAddTag: index
    });
    this.props.modelOperate({
      modelDetails: {
        addTagModalOpen: !modelDetails.addTagModalOpen
      }
    });
  };

  handleMoveTransfer = async data => {
    const { selectedMoveIds } = this.state;
    const moveData = {
      moveId: selectedMoveIds.length ? selectedMoveIds : data.moveId,
      setId: data.setId,
      previousSetId: data.previousSetId
    };
    const { value } = await ConfirmBox({
      text:
        selectedMoveIds.length > 1
          ? "You want to transfer moves! "
          : "You want to transfer this move! "
    });
    if (value) {
      this.props.getMoveBySearchRequest({
        setId: this.props.setIdPathName,
        page: 1,
        isInfiniteScroll: false,
        isMoveList: true
      });
      this.setState({
        page: 1,
        selectedMoveIds: []
      });
      this.props.transferMove(moveData);
    }
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
    const { value } = e.target;
    this.setState({
      search: value
    });
    const data = {
      search: value,
      setId: this.props.setIdPathName
    };
    this.props.searchMove(data);
  };

  addTagstoMove = data => {
    this.setState({
      selectedMoves: [],
      selectedMoveIds: [],
      isVideoChecked: false,
      isVideoModalOpen: true
    });
    this.props.addTagstoMove(data);
  };

  handleTagChange = (newValue, actionMeta) => {
    //const { tagsList } = this.props.moveReducer
    if (newValue) {
      this.setState({
        tags: newValue
      });
    } else {
      this.setState({
        tags: []
      });
    }
    if (actionMeta.action === "create-option") {
      this.props.addTagsInTagModalRequest({
        tags: newValue[newValue.length - 1]
      });
    }
    console.groupEnd();
  };
  /*
  /*  
  */
  handleLoadmoreRequest = setIdPathName => {
    const location = this.props.location;
    const path = location.search.split("=");
    const pageLimit = this.state.page;
    this.setState({
      page: pageLimit + 1
    });
    const pageCount = pageLimit + 1;
    this.props.getMoveBySearchRequest({
      search: path[1],
      page: pageCount,
      isInfiniteScroll: true
    });
  };

  handleSelectAll = () => {
    const moveList = this.props.movesOfSet;
    const selectedMoves = [...this.state.selectedMoves];
    let selectedMoveIds = [...this.state.selectedMoveIds];
    if (moveList && moveList.length) {
      moveList.map((list, index) => {
        selectedMoveIds.push(list._id);
        selectedMoves[index] = true;
        return true;
      });
    }
    this.setState({
      isVideoChecked: true,
      isVideoModalOpen: false,
      selectedMoves,
      selectedMoveIds
    });
  };

  handleUnselectAll = () => {
    this.props.videoUnSelectRequest();
    this.setState({
      isVideoChecked: false,
      isVideoModalOpen: true,
      selectedMoves: [],
      selectedMoveIds: []
    });
  };

  onDoubleClick = (index, title) => {
    const highlightText = document.getElementById(`video-title-${index}`);
    if (highlightText) {
      highlightText.classList.add("text-selected");
    }
    this.setState({
      doubleClick: true,
      doubleClickIndex: index,
      title: title
    });
  };

  handleKeyPress = (e, videoData, index) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.handleonBlur(e, videoData, index);
    } else {
      return;
    }
  };

  handleonBlur = (e, videoData, index) => {
    const highlightText = document.getElementById(`video-title-${index}`);
    if (highlightText) {
      highlightText.classList.remove("text-selected");
    }
    const value = e.target.textContent;
    const error =
      value && value.length > 50
        ? "Title cannot have more than 50 characters"
        : "";
    if (error) {
      toast.error("Title cannot have more than 50 characters");
      return;
    } else {
      this.setState({
        doubleClick: false,
        doubleClickIndex: -1,
        title: ""
      });

      if (this.state.title !== null || this.state.errors !== null) {
        const data = {
          moveId: videoData._id,
          title: value,
          description: videoData.description,
          tags: videoData.tags,
          setId: videoData.setId._id,
          moveofSetList: this.props.movesOfSet,
          fromMoveList: true
        };
        this.props.editMove(data);
      }
    }
  };

  render() {
    const {
      modelInfoReducer,
      allSetList,
      setIdPathName,
      isMoveSearchLoading,
      totalMoves,
      tagsList
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
      backgroundClass,
      doubleClick,
      doubleClickIndex,
      moveToTransfer,
      isVideoModalOpen,
      moveofSetList,
      search,
      moveIdToAddTag,
      tags,
      moveIndexToAddTag
    } = this.state;
    const location = this.props.location;
    const isStarred = location.search.split("=");
    const serachContent = location.search.split("search");

    return (
      <section className="play-list-collection set-detail-section set-detail-editble">
        <InfiniteScroll
          dataLength={moveofSetList && moveofSetList.length} //This is important field to render the next data
          next={() => {
            this.handleLoadmoreRequest(setIdPathName);
          }}
          hasMore={
            moveofSetList
              ? totalMoves !== moveofSetList.length
                ? true
                : false
              : false
          }
          loader={<Loader />}
        >
          <Row className={"m-0"}>
            <Col md="12" className={"pb-3"}>
              <div className="content-header mt-3 mb-1">
                <span className="content-title ">
                  Total Moves ({(moveofSetList && moveofSetList.length) || 0})
                </span>
                {serachContent && serachContent[1] ? null : (
                  <div className="set-detail-right-section">
                    <ButtonGroup size="sm" className="mr-2">
                      <Button
                        className={
                          isStarred[0]
                            ? isStarred[1] === "false"
                              ? "active"
                              : ""
                            : "active"
                        }
                        color=" "
                        onClick={this.handleShowAll}
                      >
                        All
                      </Button>
                      <Button
                        className={
                          isStarred[1] === "true" ? "active stared-active" : ""
                        }
                        color=" "
                        onClick={this.handleShowStarred}
                      >
                        Starred
                      </Button>
                    </ButtonGroup>
                    <FormGroup className="mb-0 header-search-wrap ">
                      <InputGroup className="">
                        <DebounceInput
                          minLength={1}
                          value={search}
                          className={"form-control"}
                          autoComplete="off"
                          placeholder="Type to filter moves"
                          debounceTimeout={300}
                          onChange={event => this.handleInputChange(event)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </div>
                )}
              </div>
            </Col>
            <div
              className={`video-thumbnail-block  ${
                selectedMoveIds && selectedMoveIds.length
                  ? "select-focus-event"
                  : null
              } `}
              id="video-thumbnail-block"
            >
              {selectedMoveIds && selectedMoveIds.length ? (
                <div className={` ${backgroundClass}`} id="get-sticky-header">
                  <div className={"selected-moves selected-detail-page"}>
                    <div
                      className={
                        "d-flex justify-content-between align-items-center "
                      }
                    >
                      <div className="content-title ">
                        <span className={"d-flex"}>
                          <ButtonGroup size="lg">
                            <Button
                              onClick={() =>
                                selectedMoveIds.length >= moveofSetList.length
                                  ? this.handleUnselectAll()
                                  : this.handleSelectAll()
                              }
                              className=" "
                              color=" "
                            >
                              {selectedMoveIds.length >=
                              moveofSetList.length ? (
                                <i className="fas fa-square fa-lg mr-1 pr-2"></i>
                              ) : (
                                <i className="fas fa-check-square fa-lg mr-1 pr-2"></i>
                              )}

                              {selectedMoveIds.length >= moveofSetList.length
                                ? "Unselect all"
                                : "Select all"}
                            </Button>
                            <Button
                              onClick={() => this.openAddTagsModal()}
                              className=" "
                              color=" "
                            >
                              <i className="fas fa-tags fa-lg mr-1 pr-2"></i>{" "}
                              Add tags
                            </Button>
                            <Button
                              onClick={() => this.openTransferToModal()}
                              className=" "
                              color=" "
                            >
                              <i className="fas fa-file-export fa-lg mr-1 pr-2"></i>
                              Transfer
                            </Button>
                            <Button
                              onClick={() => this.handleMoveDelete()}
                              className=" "
                              color=" "
                            >
                              <i className="fas fa-trash fa-lg mr-1 pr-2"></i>
                              Remove
                            </Button>
                            <Button
                              color=" "
                              className="btn-black"
                              onClick={() => this.handleUnselectAll()}
                            >
                              <i className="fas fa-times fa-lg"></i>
                            </Button>
                          </ButtonGroup>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <>
                <div className="video-thumbnail-sub-block  video-thumb-edit-view">
                  <div className="play-list-tile create-move-element">
                    <div
                      className="play-list-block  d-flex h-100 cursor_pointer"
                      onClick={this.props.handleMoveAdd}
                    >
                      <div className="add-play-list-block d-flex w-100 justify-content-center align-items-center text-center flex-column">
                        <div className="h5 font-dark-bold add-img">
                          <img src={addPlusIc} alt="" />
                        </div>
                        <Button color={" "} className="fill-btn btn mt-4">
                          Create New Move
                        </Button>
                      </div>
                    </div>
                  </div>

                  {selectedMoveIds && selectedMoveIds.length ? (
                    <div className="select-focus-wrap"></div>
                  ) : null}

                  <div className="edit-view-wrap 2">
                    {!isMoveSearchLoading ? (
                      moveofSetList && moveofSetList.length ? (
                        moveofSetList.map((video, index) => {
                          return (
                            <div
                              className={"play-list-tile-select cursor_pointer"}
                              key={index}
                            >
                              <div
                                onClick={() =>
                                  this.props.handleShowVideo(index)
                                }
                                onMouseLeave={() => {
                                  this.handleVideoHoverLeave();
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
                                    onMouseOver={() =>
                                      this.handleVideoHover(index)
                                    }
                                    onMouseLeave={() => {
                                      this.handleVideoPause(index);
                                    }}
                                  >
                                    <div
                                      onMouseOver={() =>
                                        this.handleVideoPlay(index)
                                      }
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
                                      <div
                                        className="video-move-layer"
                                        onClick={
                                          !video.isMoveProcessing
                                            ? !isVideoChecked &&
                                              isVideoModalOpen
                                              ? () =>
                                                  this.props.handleVideoModal(
                                                    video,
                                                    index
                                                  )
                                              : null
                                            : null
                                        }
                                      ></div>
                                      <div className={"star-mark"}>
                                        {video.isStarred ? (
                                          <img
                                            src={blankStar}
                                            alt={"star"}
                                            className="w-100"
                                          />
                                        ) : (
                                          <img
                                            className="w-100"
                                            src={blankStar}
                                            alt={"star"}
                                          />
                                        )}
                                      </div>

                                      {isVideoChecked ? (
                                        <span className="plus-ic-wrap custom-control custom-checkbox">
                                          <Input
                                            className="custom-control-input"
                                            id={`selected-video-${index}`}
                                            onChange={e =>
                                              this.handleMovesSelect(
                                                null,
                                                e,
                                                index,
                                                video._id
                                              )
                                            }
                                            type="checkbox"
                                            checked={
                                              selectedMoves[index]
                                                ? true
                                                : false
                                            }
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
                                                this.handleVideoCheckBox(
                                                  true,
                                                  index,
                                                  video._id
                                                )
                                              }
                                              className="plus-ic-wrap custom-control custom-checkbox"
                                            >
                                              <Input
                                                className="custom-control-input"
                                                id={`selected-video-${index}`}
                                                onChange={e =>
                                                  this.handleMovesSelect(
                                                    null,
                                                    e,
                                                    index,
                                                    video._id
                                                  )
                                                }
                                                type="checkbox"
                                                checked={
                                                  selectedMoves[index]
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <label
                                                className="custom-control-label"
                                                htmlFor={`selected-video-${index}`}
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}

                                      <div className={"video-effect"}>
                                        <video
                                          width={"100%"}
                                          id={`webm-video-${index}`}
                                          muted={true}
                                          draggable="true"
                                          poster={
                                            video.videoThumbnail
                                              ? video.videoThumbnail
                                              : videoLoading
                                          }
                                          playsInline
                                          loop
                                          onContextMenu={e =>
                                            e.preventDefault()
                                          }
                                        >
                                          <source
                                            src={`${video.moveURL}`}
                                            type="video/webm"
                                          />
                                        </video>
                                      </div>
                                      <div
                                        className="blur-img"
                                        // style={{ background: "#000" }}
                                      />
                                    </div>
                                    <div className="play-list-text">
                                      <div
                                        suppressContentEditableWarning={true}
                                        className={
                                          video.title !== "Unnamed" &&
                                          video.title
                                            ? "text-capitalize play-list-heading h6 m-0"
                                            : "text-capitalize play-list-heading h6 m-0 text-untitled"
                                        }
                                        id={`video-title-${index}`}
                                        tabIndex="0"
                                        contentEditable={
                                          doubleClick &&
                                          doubleClickIndex === index
                                            ? "true"
                                            : "false"
                                        }
                                        onDoubleClick={() =>
                                          this.onDoubleClick(index, video.title)
                                        }
                                        onBlur={
                                          doubleClick
                                            ? e =>
                                                this.handleonBlur(
                                                  e,
                                                  video,
                                                  index
                                                )
                                            : null
                                        }
                                        onKeyPress={
                                          doubleClick
                                            ? e =>
                                                this.handleKeyPress(
                                                  e,
                                                  video,
                                                  index
                                                )
                                            : null
                                        }
                                      >
                                        {(doubleClick &&
                                          doubleClickIndex === index) ||
                                        video.title
                                          ? video.title
                                          : "unnamed"}
                                      </div>
                                      <div
                                        className="star-wrap"
                                        onClick={() =>
                                          this.handleStarred(
                                            video._id,
                                            video.isStarred,
                                            index
                                          )
                                        }
                                      >
                                        {video.isStarred ? (
                                          <img
                                            src={starIc}
                                            alt={"star"}
                                            className="w-100"
                                          />
                                        ) : (
                                          <img
                                            className="w-100"
                                            src={blankStar}
                                            alt={"star"}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : null
                    ) : (
                      <Loader />
                    )}
                  </div>
                </div>
              </>
            </div>
          </Row>
          <TransferToModal
            modal={transferToModalOpen}
            AllFolders={allSetList}
            moveToTransfer={moveToTransfer}
            handleFolderModel={this.handleFolderModel}
            folderId={setIdPathName ? setIdPathName : setId}
            transferMove={true}
            handleOpen={this.openTransferToModal}
            handleMove={this.handleMoveTransfer}
          />
          <AddTagModal
            modal={addTagModalOpen}
            handleOpen={this.openAddTagsModal}
            moveIdToAddTag={moveIdToAddTag}
            tagsList={tagsList}
            tags={tags}
            addTagstoMove={this.addTagstoMove}
            handleTagChange={this.handleTagChange}
            moveIndexToAddTag={moveIndexToAddTag}
            moveofSetList={moveofSetList}
            fromMoveList={true}
          />
        </InfiniteScroll>
      </section>
    );
  }
}

export default MoveSearchList;
