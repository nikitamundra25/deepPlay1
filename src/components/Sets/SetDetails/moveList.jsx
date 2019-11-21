import React from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup
} from "reactstrap";
import addPlusIc from "../../../assets/img/add_plus.png";
import TransferToModal from "../../Folders/FolderDetails/transferTo";
import InfiniteScroll from "react-infinite-scroll-component";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
import AddTagModal from "./addTagsModal";
import { ConfirmBox } from "helper/SweetAleart";
import { DebounceInput } from "react-debounce-input";
import addTag from "../../../assets/img/set-detail-ic/add-tag.svg";
import transfer from "../../../assets/img/set-detail-ic/transfer.svg";
import remove from "../../../assets/img/set-detail-ic/remove.svg";
import { ListManager } from "react-beautiful-dnd-grid";
import MoveListDetails from "./moveListdetails";

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
        isChanging: false
      },
      backgroundClass: ""
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
  }
  /*
  /*  
  */
  listenScrollEvent = e => {
    if (window.scrollY > 180) {
      this.setState({ backgroundClass: "sticky-header" });
    } else {
      this.setState({ backgroundClass: "" });
    }
  };
  handleVideoHoverLeave = () => {
    this.setState({
      isSelectVideo: false
    });
  };

  componentDidUpdate = prevProps => {
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

    // if (
    //   prevProps.isMoveStarLoading &&
    //   prevProps.isMoveStarLoading.loading !==
    //     this.props.isMoveStarLoading.loading
    // ) {
    //   if (
    //     this.props.movesOfSet &&
    //     this.props.movesOfSet.length &&
    //     !this.props.movesOfSet[this.props.isMoveStarLoading.index].isStarred
    //   ) {
    //     this.setState({
    //       isMarkingStar: {
    //         index: this.props.isMoveStarLoading.index,
    //         isChanging: true
    //       }
    //     });
    //   } else {
    //     this.setState({
    //       isMarkingStar: {
    //         index: this.props.isMoveStarLoading.index,
    //         isChanging: false
    //       }
    //     });
    //   }
    // }
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
    this.setState({
      isVideoChecked: false,
      isVideoModalOpen: false,
      selectedMoves: [],
      selectedMoveIds: []
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
    const starDiv = document.getElementsByClassName("star-mark")[index];
    if (isStarred) {
      listData[index].isStarred = false;
      starDiv.classList.remove("isStarred");
    } else {
      starDiv.classList.add("isStarred");
      listData[index].isStarred = true;
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
      text: "You want to remove this move! "
    });
    if (value) {
      this.props.getMovesOfSetRequest({
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
      text: "You want to transfer this move! "
    });
    if (value) {
      this.props.getMovesOfSetRequest({
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
    if (value) {
      this.setState({
        search: value
      });
      const data = {
        search: value,
        setId: this.props.setIdPathName
      };
      this.props.searchMove(data);
    } else {
      this.props.getMovesOfSetRequest({
        setId: this.props.setIdPathName,
        page: 1,
        isInfiniteScroll: false,
        isMoveList: true
      });
    }
  };

  reorderList = (sourceIndex, destinationIndex) => {
    if (destinationIndex === sourceIndex) {
      return;
    }
    const list = this.props.movesOfSet;
    const items = reorder(list, sourceIndex, destinationIndex);
    const data = {
      setId: this.props.setIdPathName,
      // moveId: draggableId,
      sortIndex: destinationIndex,
      sourceIndex: sourceIndex,
      movesOfSet: items
    };
    this.setState({
      isMarkingStar: {
        index: -1,
        isChanging: false
      }
    });
    this.props.updateSortIndexRequest(data);
  };

  handleTagChange = (newValue, actionMeta) => {
    //const { tagsList } = this.props.moveReducer
    console.log(newValue);
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
    const pageLimit = this.state.page;
    this.setState({
      page: pageLimit + 1
    });
    const pageCount = pageLimit + 1;
    if (this.state.search) {
      this.setState({
        moveofSetList: this.props.searchMoveResult
      });
    } else {
      this.props.getMovesOfSetRequest({
        setId: setIdPathName,
        page: pageCount,
        isInfiniteScroll: true
      });
    }
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

  onDoubleClick = (index, title) => {
    this.setState({
      doubleClick: true,
      doubleClickIndex: index,
      title: title
    });
  };

  handleonBlur = videoData => {
    this.setState({
      doubleClick: false,
      doubleClickIndex: -1,
      title: ""
    });

    if (this.state.title !== null) {
      const data = {
        moveId: videoData._id,
        title: this.state.title,
        description: videoData.description,
        tags: videoData.tags,
        setId: videoData.setId._id,
        moveofSetList: this.props.movesOfSet,
        fromMoveList: true
      };
      this.props.editMove(data);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      modelInfoReducer,
      allSetList,
      setIdPathName,
      isMoveSearchLoading,
      totalMoves,
      tagsList,
      isMoveListLoading,
      movesOfSet
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
      backgroundClass
    } = this.state;
    const location = this.props.location;
    const isStarred = location.search.split("=");
    const serachContent = location.search.split("search");

    return (
      <section className="play-list-collection set-detail-section set-detail-editble">
        <InfiniteScroll
          dataLength={movesOfSet.length} //This is important field to render the next data
          next={() => {
            this.handleLoadmoreRequest(setIdPathName);
          }}
          hasMore={totalMoves !== movesOfSet.length ? true : false}
          loader={<Loader />}
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
            >
              {selectedMoveIds && selectedMoveIds.length ? (
                <div className={` ${backgroundClass}`} id="get-sticky-header">
                  <div className={"selected-moves selected-detail-page"}>
                    <div
                      className={
                        "d-flex justify-content-between align-items-center "
                      }
                    >
                      {/* <div className="content-title">
                      Selected Moves:{" "}
                      {selectedMoveIds && selectedMoveIds.length
                        ? selectedMoveIds.length
                        : 0}
                    </div> */}
                      <div className="content-title ">
                        <span className={"d-flex"}>
                          <ButtonGroup size="lg">
                            <Button
                              onClick={() =>
                                selectedMoveIds.length >= movesOfSet.length
                                  ? this.handleUnselectAll()
                                  : this.handleSelectAll()
                              }
                              className=" "
                              color=" "
                            >
                              <img src={addTag} alt="" className="mr-1" />{" "}
                              {selectedMoveIds.length >= movesOfSet.length
                                ? "Unselect all"
                                : "Select all"}
                            </Button>
                            <Button
                              onClick={() => this.openAddTagsModal()}
                              className=" "
                              color=" "
                            >
                              <img src={addTag} alt="" className="mr-1" /> Add
                              tags
                            </Button>
                            <Button
                              onClick={() => this.openTransferToModal()}
                              className=" "
                              color=" "
                            >
                              <img src={transfer} alt="" className="mr-1" />{" "}
                              Transfer
                            </Button>
                            <Button
                              onClick={() => this.handleMoveDelete()}
                              className=" "
                              color=" "
                            >
                              <img src={remove} alt="" className="mr-1" />{" "}
                              Remove
                            </Button>
                            <Button
                              color=" "
                              className="btn-black"
                              onClick={() =>
                                this.setState({
                                  selectedMoves: [],
                                  selectedMoveIds: [],
                                  isVideoChecked: false,
                                  isVideoModalOpen: true,
                                  isMarkingStar: {
                                    index: -1,
                                    isChanging: false
                                  }
                                })
                              }
                            >
                              <i
                                className="fa fa-times fa-lg"
                                aria-hidden="true"
                              />
                            </Button>
                          </ButtonGroup>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {!isMoveSearchLoading && !isMoveListLoading ? (
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
                          Create Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  {selectedMoveIds && selectedMoveIds.length ? (
                    <div className="select-focus-wrap"></div>
                  ) : null}
                  <div className="edit-view-wrap">
                    {selectedMoveIds && selectedMoveIds.length ? (
                      movesOfSet.map((video, index) => {
                        return (
                          <MoveListDetails
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
                            isSelectVideo={isSelectVideo}
                            videoIndex={videoIndex}
                            isVideoModalOpen={isVideoModalOpen}
                            handleStarred={this.handleStarred}
                            handleVideoCheckBox={this.handleVideoCheckBox}
                            handleVideoModal={this.props.handleVideoModal}
                          />
                        );
                      })
                    ) : (
                      <ListManager
                        items={movesOfSet}
                        direction="horizontal"
                        maxItems={4}
                        render={video => {
                          let index = video.id;
                          return (
                            <MoveListDetails
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
                              isSelectVideo={isSelectVideo}
                              videoIndex={videoIndex}
                              isVideoModalOpen={isVideoModalOpen}
                              handleStarred={this.handleStarred}
                              handleVideoCheckBox={this.handleVideoCheckBox}
                              handleVideoModal={this.props.handleVideoModal}
                              title={title}
                              onDoubleClick={this.onDoubleClick}
                              doubleClickIndex={doubleClickIndex}
                              doubleClick={doubleClick}
                              handleonBlur={this.handleonBlur}
                              handleChange={this.handleChange}
                              reorderList={this.reorderList}
                            />
                          );
                        }}
                        onDragEnd={this.reorderList}
                      />
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
