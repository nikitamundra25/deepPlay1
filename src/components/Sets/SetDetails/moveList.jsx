import React from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup,
} from "reactstrap";
import addPlusIc from "../../../assets/img/add_plus.png";
import TransferToModal from "../../Folders/FolderDetails/transferTo";
import InfiniteScroll from "react-infinite-scroll-component";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
import AddTagModal from "./addTagsModal";
import { ConfirmBox } from "helper/SweetAleart";
import { DebounceInput } from "react-debounce-input";
import MoveListDetails from "./moveListdetails";
import { toast } from "react-toastify";
import qs from "query-string";
import { ReactSortable } from "react-sortablejs";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// core components
class MoveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      videoIndex: -1,
      isVideoChecked: false,
      isSelectVideo: false,
      isVideohovered: false,
      selectedMoves: [],
      selectedMoveIds: [],
      page: 1,
      moveToTransfer: "",
      isVideoModalOpen: true,
      setId: "",
      moveofSetList: "",
      search: "",
      tags: [],
      moveIdToAddTag: "",
      moveIndexToAddTag: -1,
      doubleClickIndex: -1,
      title: " ",
      doubleClick: false,
      isMarkingStar: {
        index: -1,
        isChanging: false,
      },
      backgroundClass: "",
      isLoadImage: false,
      isMoveLoadingCount: false,
      moveLoadingCount: -1,
      errors: "",
      eleHeight: "",
      windowHeight: "",
      stickyHeaderWidth: null,
      sourceIndex: -1,
      destinationIndex: -1,
      isFromSearch: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
  }
  /*
  /*
  */
  fixedSubHeader = () => {
    let offsetElemnt = document.getElementById("get-sticky-header");
    let offsetElemntInner = document.getElementById("get-sticky-inner-header");
    let offsetElemntSubInner = document.getElementById(
      "get-sticky-sub-inner-header"
    );

    if (offsetElemnt) {
      let offsetWidth = offsetElemnt.getBoundingClientRect();
      if (offsetWidth.top + 110 <= 1) {
        // console.log(
        //   offsetWidth.top,
        //   offsetWidth.left,
        //   offsetElemntInner.getBoundingClientRect().left,
        //   offsetElemntInner.offsetWidth,
        //   "offsetWidth---------"
        // );

        this.setState({
          backgroundClass: "sticky-header",
        });

        this.setState(
          {
            stickyHeaderWidth: offsetElemntInner.offsetWidth,
          },
          () => {
            offsetElemntInner.style.left =
              offsetElemntSubInner.getBoundingClientRect().left + "px";
          }
        );
      } else {
        offsetElemntInner.style.left = 50 + "%";
        this.setState({ backgroundClass: "" });
      }
    }
  };
  listenScrollEvent = (e) => {
    this.fixedSubHeader();
  };

  handleVideoHoverLeave = () => {
    this.setState({
      isSelectVideo: false,
      isVideohovered: false,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.movesOfSet.length !== prevProps.movesOfSet.length ||
      (this.state.selectedMoveIds &&
        prevState.selectedMoveIds &&
        this.state.selectedMoveIds.length !==
        prevState.selectedMoveIds.length &&
        this.state.selectedMoveIds === 0)
    ) {
    }
    if (
      prevProps.isMoveStarLoading &&
      prevProps.isMoveStarLoading.loading !==
      this.props.isMoveStarLoading.loading
    ) {
      this.setState({
        isMarkingStar: {
          index: this.props.isMoveStarLoading.index,
          isChanging: true,
        },
      });
    }
    if (prevProps.isSavingWebM !== this.props.isSavingWebM) {
      this.props.movesOfSet.map((key, index) => {
        this.myVideo = document.getElementById(`webm-video-${index}`);
        if (this.myVideo) {
          this.myVideo.load();
        }
        return true;
      });
    }
    if (prevProps.isVideoSelected !== this.props.isVideoSelected) {
      this.scrollClass = document.getElementsByClassName(
        "selected-moves selected-detail-page"
      );
    }
  };
  /*
   */
  handleVideoHover = (index) => {
    this.setState({
      isSelectVideo: true,
      videoIndex: index,
      isVideohovered: true,
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
    this.setState(
      {
        isVideoChecked: true,
        isVideoModalOpen: false,
        selectedMoves,
        selectedMoveIds,
        isMarkingStar: {
          index: -1,
          isChanging: false,
        },
      },
      () => {
        // setTimeout(() => {
        this.fixedSubHeader();
        // }, 500);
      }
    );
  };
  /*
   */
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
      selectedMoveIds,
    });
  };

  handleUnselectAll = () => {
    this.props.videoUnSelectRequest();
    this.setState({
      isVideoChecked: false,
      isVideoModalOpen: true,
      selectedMoves: [],
      selectedMoveIds: [],
      isMarkingStar: -1,
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
      selectedMoveIds = selectedMoveIds.filter((item) => item !== moveId);
    }
    if (!selectedMoveIds.length && selectedMoves && selectedMoves.length) {
      this.setState({
        isVideoChecked: false,
        isVideoModalOpen: true,
      });
    }
    let result = selectedMoveIds.reduce((unique, o) => {
      if (!unique.some((obj) => obj === o && obj === o)) {
        unique.push(o);
      }
      return unique;
    }, []);
    if (result && result.length) {
      this.setState({
        selectedMoves,
        selectedMoveIds: result,
        isMarkingStar: {
          index: -1,
          isChanging: false,
        },
      });
    } else {
      this.handleUnselectAll();
    }
  };
  /*
   */
  handleVideoPlay = (index) => {
    let myVideo = document.getElementById(`webm-video-${index}`);

    if (!this.props.isSortIndexUpdate && myVideo) {
      console.log(myVideo.currentTime);
      if (myVideo.currentTime === 0) {
        myVideo.currentTime = Number(this.props.movesOfSet[index].startTime);
      }
      myVideo.play();
    }
  };
  /*
   */
  handleVideoPause = (index) => {
    let myVideo = document.getElementById(`webm-video-${index}`);
    if (!this.props.isSortIndexUpdate && myVideo) {
      myVideo.pause();
    }
  };

  /*
   */

  handleStarred = (id, isStarred, index) => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const { selectedMoveIds } = this.state;
    let moveofSetList = this.props.movesOfSet;
    let listData = moveofSetList;
    const starDiv = document.getElementsByClassName("star-mark")[index];
    if (isStarred) {
      listData[index].isStarred = false;
      starDiv.classList.remove("isStarred");
    } else {
      // if (!toast.isActive(this.toastId)) {
      //   this.toastId = toast.success("Move marked as starred");
      // }
      starDiv.classList.add("isStarred");
      listData[index].isStarred = true;
    }
    const data = {
      moveId: selectedMoveIds.length ? selectedMoveIds : id,
      isStarred: isStarred ? false : true,
      setId: pathName[3],
      moveofSetList: listData,
      index,
    };
    this.props.isStarred(data);
  };

  handleMoveDelete = async (id) => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const { selectedMoveIds } = this.state;
    const data = {
      moveId: selectedMoveIds.length ? selectedMoveIds : id,
      isDeleted: true,
      setId: pathName[3],
    };
    const { value } = await ConfirmBox({
      text:
        selectedMoveIds.length > 1
          ? "You want to remove moves!"
          : "You want to remove this move!",
    });
    if (value) {
      this.props.getMovesOfSetRequest({
        setId: this.props.setIdPathName,
        page: 1,
        isInfiniteScroll: false,
        isMoveList: true,
      });
      this.setState({
        page: 1,
        selectedMoveIds: [],
        selectedMoves: [],
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
      setId: setId ? setId : this.props.setIdPathName,
    });
    this.props.modelOperate({
      modelDetails: {
        transferToModalOpen: !modelDetails.transferToModalOpen,
      },
    });
  };

  openAddTagsModal = (id, tags, index) => {
    const { modelInfoReducer } = this.props;
    const { selectedMoveIds } = this.state;
    const { modelDetails } = modelInfoReducer;
    this.props.getTagListRequest();
    let temp = [...new Set(selectedMoveIds.map((a) => a))];
    this.setState({
      moveIdToAddTag: temp.length ? temp : id,
      tags: tags ? tags : "",
      moveIndexToAddTag: index,
    });
    this.props.modelOperate({
      modelDetails: {
        addTagModalOpen: !modelDetails.addTagModalOpen,
      },
    });
  };

  handleMoveTransfer = async (data) => {
    const { selectedMoveIds } = this.state;
    const moveData = {
      moveId: selectedMoveIds.length ? selectedMoveIds : data.moveId,
      setId: data.setId,
      previousSetId: data.previousSetId,
    };
    const { value } = await ConfirmBox({
      text:
        selectedMoveIds.length > 1
          ? "You want to transfer moves!"
          : "You want to transfer this move!",
    });
    if (value) {
      this.props.getMovesOfSetRequest({
        setId: this.props.setIdPathName,
        page: 1,
        isInfiniteScroll: false,
        isMoveList: true,
      });
      this.setState({
        page: 1,
        selectedMoveIds: [],
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
      moveofSetList: movesList,
    });
    this.props.redirectTo(`${pathname}?isStared=false`);
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    let parsed = qs.parse(this.props.location.search);
    this.props.changeisMoveData()
    this.setState({
      isFromSearch: true
    });
    if (value) {
      this.setState({
        search: value,
      });
      const data = {
        search: value,
        setId: this.props.setIdPathName,
        isStarred: parsed.isStarred === "true" ? true : false,
      };
      this.props.searchMove(data);
    } else {
      // this.setState({
      //   search: null,
      // });
      const data = {
        search: null,
        setId: this.props.setIdPathName,
        isStarred: parsed.isStarred === "true" ? true : false,
      };
      this.props.searchMove(data);
      // this.props.getMovesOfSetRequest({
      //   setId: this.props.setIdPathName,
      //   page: 1,
      //   isStarred: parsed.isStarred === "true" ? true : false,
      //   isInfiniteScroll: false,
      //   isMoveList: true,
      // });
    }
  };

  reorderList = (sourceIndex, destinationIndex) => {
    if (destinationIndex === sourceIndex) {
      return;
    }
    console.log(sourceIndex, destinationIndex);
    const list = this.props.movesOfSet;
    const items = reorder(list, sourceIndex, destinationIndex);
    let parsed = qs.parse(this.props.location.search);
    const data = {
      setId: this.props.setIdPathName,
      parsed,
      sortIndex: destinationIndex,
      sourceIndex: sourceIndex,
      movesOfSet: items,
    };
    this.setState({
      isMarkingStar: {
        index: -1,
        isChanging: false,
      },
    });
    this.props.updateSortIndexRequest(data);
  };
  reorderListNew = (newOrderedList) => {
    if (this.props.setIdPathName && newOrderedList.length && !this.props.isMoveData) {
      let parsed = qs.parse(this.props.location.search);
      const data = {
        setId: this.props.setIdPathName,
        parsed,
        sortIndex: 0,
        sourceIndex: 1,
        movesOfSet: newOrderedList,
      };
      this.props.updateSortIndexRequest(data);
    }
  };
  handleTagChange = (newValue, actionMeta) => {
    //const { tagsList } = this.props.moveReducer

    if (newValue) {
      this.setState({
        tags: newValue,
      });
    } else {
      this.setState({
        tags: [],
      });
    }
    if (actionMeta.action === "create-option") {
      this.props.addTagsInTagModalRequest({
        tags: newValue[newValue.length - 1],
      });
    }
    console.groupEnd();
  };
  /*
  /*
  */
  handleLoadmoreRequest = (setIdPathName) => {
    const pageLimit = this.state.page;
    this.setState({
      page: pageLimit + 1,
    });
    const pageCount = pageLimit + 1;
    if (this.state.search) {
      this.setState({
        moveofSetList: this.props.searchMoveResult,
      });
    } else {
      this.props.getMovesOfSetRequest({
        setId: setIdPathName,
        page: pageCount,
        isInfiniteScroll: true,
      });
    }
  };

  addTagstoMove = (data) => {
    this.setState({
      selectedMoves: [],
      selectedMoveIds: [],
      isVideoChecked: false,
      isVideoModalOpen: true,
    });
    this.props.addTagstoMove(data);
  };

  onDoubleClick = (index, title) => {
    const highlightText = document.getElementById(`video-title-${index}`);
    // document.getElementById(`video-title-${index}`).focus();
    if (highlightText) {
      highlightText.classList.add("text-selected");
    }
    this.setState({
      doubleClick: true,
      doubleClickIndex: index,
      title: title,
    });
  };

  handleonBlur = (e, videoData, index) => {
    const highlightText = document.getElementById(`video-title-${index}`);
    if (highlightText) {
      highlightText.classList.remove("text-selected");
    }
    this.setState({
      doubleClick: false,
      doubleClickIndex: -1,
      title: "",
    });

    if (videoData) {
      const data = {
        moveId: videoData._id,
        title: this.state.title,
        description: videoData.description,
        tags: videoData.tags,
        setId: videoData.setId._id,
        moveofSetList: this.props.movesOfSet,
        fromMoveList: true,
      };
      this.props.editMove(data);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const error =
      value && value.length > 50
        ? "Title cannot have more than 50 characters"
        : "";
    if (error) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.warn(error);
      }
    } else {
      this.setState({
        [name]: value,
        errors: null,
      });
    }
  };

  render() {
    const {
      modelInfoReducer,
      allSetList,
      setIdPathName,
      isMoveSearchLoading,
      isSortIndexUpdate,
      totalMoves,
      tagsList,
      isMoveListLoading,
      movesOfSet,
      isSavingWebM,
      isIosDevice,
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
      search,
      moveIdToAddTag,
      tags,
      moveIndexToAddTag,
      doubleClickIndex,
      doubleClick,
      title,
      isMarkingStar,
      backgroundClass,
      isLoadImage,
      isMoveLoadingCount,
      moveLoadingCount,
      errors,
      sourceIndex,
      destinationIndex,
      stickyHeaderWidth,
      isVideohovered,
    } = this.state;
    const location = this.props.location;
    const isStarred = location.search.split("=");
    const serachContent = location.search.split("search");
    let starredtVideos = null;
    if (isStarred && isStarred.length && isStarred[1] === "true") {
      starredtVideos = movesOfSet.filter((video) => video.isStarred === true);
    }
    return (
      <section className="play-list-collection set-detail-section set-detail-editble">
        <InfiniteScroll
          dataLength={movesOfSet.length} //This is important field to render the next data
          next={() => {
            this.handleLoadmoreRequest(setIdPathName);
          }}
          hasMore={totalMoves !== movesOfSet.length ? true : false}
          loader={starredtVideos && !starredtVideos.length ? <Loader /> : ""}
        >
          <Row className={"m-0"}>
            <Col md="12" className={"pb-3"}>
              <div className="content-header mt-3 mb-1">
                <span className="content-title ">
                  Moves in this set ({totalMoves || 0})
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
                          onChange={(event) => this.handleInputChange(event)}
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
                  <div
                    className="selected-moves-main"
                    id="get-sticky-sub-inner-header"
                    style={{ width: stickyHeaderWidth }}
                  ></div>
                  <div
                    className={"selected-moves selected-detail-page"}
                    id="get-sticky-inner-header"
                  >
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
                                selectedMoveIds.length >= movesOfSet.length
                                  ? this.handleUnselectAll()
                                  : this.handleSelectAll()
                              }
                              className="custom-checkbox"
                              color=" "
                            >
                              {selectedMoveIds.length >= movesOfSet.length ? (
                                <i className="fas fa-check-square fa-lg mr-1 pr-2"></i>
                              ) : (
                                  <i className="fas fa-square fa-lg mr-1 pr-2"></i>
                                )}
                              {selectedMoveIds.length >= movesOfSet.length
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

              {!isMoveSearchLoading && !isMoveListLoading ? (
                <div className="video-thumbnail-sub-block  video-thumb-edit-view ">
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
                  <div className="edit-view-wrap" id="edit-view-wrap">
                    {selectedMoveIds && selectedMoveIds.length ? (
                      movesOfSet.map((video, index) => {
                        return (
                          <MoveListDetails
                            key={index}
                            index={index}
                            isVideoChecked={isVideoChecked}
                            selectedMoves={selectedMoves}
                            handleShowVideo={this.props.handleShowVideo}
                            handleVideoHover={this.handleVideoHover}
                            handleVideoPause={this.handleVideoPause}
                            handleVideoHoverLeave={this.handleVideoHoverLeave}
                            handleVideoPlay={this.handleVideoPlay}
                            handleMovesSelect={this.handleMovesSelect}
                            isMarkingStar={isMarkingStar}
                            video={video}
                            // isSavingWebM={isSavingWebM}
                            isSortIndexUpdate={isSortIndexUpdate}
                            isSelectVideo={isSelectVideo}
                            videoIndex={videoIndex}
                            onDoubleClick={this.onDoubleClick}
                            sourceIndex={sourceIndex}
                            destinationIndex={destinationIndex}
                            isVideoModalOpen={isVideoModalOpen}
                            handleStarred={this.handleStarred}
                            handleVideoCheckBox={this.handleVideoCheckBox}
                            handleVideoModal={this.props.handleVideoModal}
                            isLoadImage={isLoadImage}
                            isMoveLoadingCount={isMoveLoadingCount}
                            moveLoadingCount={moveLoadingCount}
                            errors={errors}
                            isIosDevice={isIosDevice}
                            title={title}
                            isVideohovered={isVideohovered}
                          />
                        );
                      })
                    ) : (
                        // <ul id="">
                        <>
                          {isStarred &&
                            isStarred.length &&
                            isStarred[1] === "true" &&
                            starredtVideos &&
                            !starredtVideos.length ? null : (
                              <ReactSortable
                                // here they are!
                                group="groupName"
                                animation={300}
                                delayOnTouchStart={true}
                                delay={2}
                                list={movesOfSet.map((v, index) => ({
                                  id: `list-item-${v._id}-${index}`,
                                  ...v,
                                }))}
                                setList={this.reorderListNew}
                                tag="ul"
                                id="sortable"
                                swapThreshold={1}
                                forceFallback
                              >
                                {starredtVideos && starredtVideos.length
                                  ? starredtVideos.map((video, index) => {
                                    return (
                                      <li
                                        key={`list-item-${video._id}-${index}`}
                                        data-index={index}
                                      >
                                        <MoveListDetails
                                          index={index}
                                          isVideoChecked={isVideoChecked}
                                          selectedMoves={selectedMoves}
                                          handleShowVideo={
                                            this.props.handleShowVideo
                                          }
                                          handleVideoHover={this.handleVideoHover}
                                          handleVideoPause={this.handleVideoPause}
                                          handleVideoHoverLeave={
                                            this.handleVideoHoverLeave
                                          }
                                          isStarred={
                                            isStarred ? isStarred[1] : false
                                          }
                                          handleVideoPlay={this.handleVideoPlay}
                                          handleMovesSelect={
                                            this.handleMovesSelect
                                          }
                                          isMarkingStar={isMarkingStar}
                                          video={video}
                                          sourceIndex={sourceIndex}
                                          isSavingWebM={isSavingWebM}
                                          destinationIndex={destinationIndex}
                                          isSortIndexUpdate={isSortIndexUpdate}
                                          isSelectVideo={isSelectVideo}
                                          videoIndex={videoIndex}
                                          isVideoModalOpen={isVideoModalOpen}
                                          handleStarred={this.handleStarred}
                                          handleVideoCheckBox={
                                            this.handleVideoCheckBox
                                          }
                                          handleVideoModal={
                                            this.props.handleVideoModal
                                          }
                                          title={title}
                                          movesOfSet={movesOfSet}
                                          onDoubleClick={this.onDoubleClick}
                                          doubleClickIndex={doubleClickIndex}
                                          doubleClick={doubleClick}
                                          handleonBlur={this.handleonBlur}
                                          handleChange={this.handleChange}
                                          reorderList={this.reorderList}
                                          isLoadImage={isLoadImage}
                                          isVideohovered={isVideohovered}
                                          errors={errors}
                                          isIosDevice={isIosDevice}
                                        />
                                      </li>
                                    );
                                  })
                                  : movesOfSet.map((video, index) => {
                                    return (
                                      <li
                                        key={`list-item-${video._id}-${index}`}
                                        data-index={index}
                                      >
                                        <MoveListDetails
                                          index={index}
                                          isVideoChecked={isVideoChecked}
                                          selectedMoves={selectedMoves}
                                          handleShowVideo={
                                            this.props.handleShowVideo
                                          }
                                          handleVideoHover={this.handleVideoHover}
                                          handleVideoPause={this.handleVideoPause}
                                          handleVideoHoverLeave={
                                            this.handleVideoHoverLeave
                                          }
                                          isStarred={
                                            isStarred ? isStarred[1] : false
                                          }
                                          handleVideoPlay={this.handleVideoPlay}
                                          handleMovesSelect={
                                            this.handleMovesSelect
                                          }
                                          isMarkingStar={isMarkingStar}
                                          video={video}
                                          sourceIndex={sourceIndex}
                                          isSavingWebM={isSavingWebM}
                                          destinationIndex={destinationIndex}
                                          isSortIndexUpdate={isSortIndexUpdate}
                                          isSelectVideo={isSelectVideo}
                                          videoIndex={videoIndex}
                                          isVideoModalOpen={isVideoModalOpen}
                                          handleStarred={this.handleStarred}
                                          handleVideoCheckBox={
                                            this.handleVideoCheckBox
                                          }
                                          handleVideoModal={
                                            this.props.handleVideoModal
                                          }
                                          title={title}
                                          movesOfSet={movesOfSet}
                                          onDoubleClick={this.onDoubleClick}
                                          doubleClickIndex={doubleClickIndex}
                                          doubleClick={doubleClick}
                                          handleonBlur={this.handleonBlur}
                                          handleChange={this.handleChange}
                                          reorderList={this.reorderList}
                                          isLoadImage={isLoadImage}
                                          isVideohovered={isVideohovered}
                                          errors={errors}
                                          isIosDevice={isIosDevice}
                                        />
                                      </li>
                                    );
                                  })}
                              </ReactSortable>
                            )}
                        </>

                        // </ul>
                      )}
                  </div>
                </div>
              ) : (
                  <Col>
                    <Loader />
                  </Col>
                )}
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
            moveofSetList={movesOfSet}
            fromMoveList={true}
          />
        </InfiniteScroll>
      </section>
    );
  }
}

export default MoveList;
