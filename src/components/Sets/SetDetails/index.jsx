import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Col,
  Row,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";
import {
  getSetDetailsRequest,
  modelOpenRequest,
  publicAccessRequest,
  shareableLinkRequest,
  deleteSetRequest,
  getMovesOfSetRequest,
  UpdateSetRequest,
  starredMovesRequest,
  getAllSetRequest,
  deleteMovesRequest,
  transferMovesRequest,
  loadVideoDataRequest,
  searchMoveRequest,
  addTagsRequest,
  getAllFolderRequest,
  ManageSetRequest,
  updateSortIndexRequest,
  updateMoveRequest,
  getTagListRequest,
  addTagsInTagModalRequest
} from "../../../actions";
import SharableLinkModal from "../../comman/shareableLink/SharableLink";
import { AppRoutes } from "../../../config/AppRoutes";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ConfirmBox } from "../../../helper/SweetAleart";
import WebmView from "./WebmView";
import Loader from "../../comman/Loader/Loader";
import CreateSetComponent from "../../Sets/createSet";
import MoveList from "./moveList";
import TransferToModal from "../../Folders/FolderDetails/transferTo";
// core components
class SetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      show: false,
      setIndex: -1,
      isPaste: false,
      showVideo: {},
      setIdPathName: "",
      showVideoIndex: -1,
      moveData: [],
      setToTransfer: "",
      folderId: "",
      moveListItem: []
    };
  }
  componentDidMount = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const isStarred = location.search.split("=");
    this.props.getSetDetailsRequest({ setId: pathName[3] });
    this.props.getMovesOfSetRequest({
      setId: pathName[3],
      page: 1,
      isInfiniteScroll: false,
      isStarred: isStarred[1]
    });
    this.props.getSetList({ isSetNoLimit: false });

    this.setState({
      setIdPathName: pathName[3]
    });
  };
  /*
  /*  
  */
  componentDidUpdate = ({ location, moveReducer }) => {
    const { location: currentLocation } = this.props;
    const { search } = location;
    const { search: currentSearch } = currentLocation;
    const isStarred = currentSearch.split("=");
    if (search !== currentSearch) {
      this.props.getMovesOfSetRequest({
        setId: this.state.setIdPathName,
        page: 1,
        isInfiniteScroll: false,
        isStarred: isStarred[1]
      });
    }
    if (moveReducer.movesOfSet !== this.props.moveReducer.movesOfSet) {
      this.setState({
        moveListItem: this.props.moveReducer.movesOfSet
      });
    }
  };
  onTogglePublicAccess = isPublic => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const data = {
      isFolderId: null,
      isSetId: pathName[3],
      isMoveId: null,
      isPublic: isPublic
    };
    this.props.publicAccess(data);
  };
  /*
   */
  handleSharableLink = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    this.props.shareableLink({
      setId: pathName[3],
      linkOf: "set"
    });
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        sharableLinkModalOpen: !modelDetails.sharableLinkModalOpen
      }
    });
  };
  /*
   */
  handleDeleteSet = async id => {
    const { value } = await ConfirmBox({
      text: "You want to delete this set! "
    });
    if (value) {
      const data = {
        id,
        setDetails: true
      };
      this.props.onDeleteSets(data);
    }
  };
  /*
   */
  handleMoveAdd = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    this.props.redirectTo(AppRoutes.MOVE.url + `?setId=${pathName[3]}`);
  };
  /*
   */
  handleSetModal = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        createSetModalOpen: !modelDetails.createSetModalOpen
      }
    });
  };

  openTransferToModal = (id, folderId) => {
    this.props.allFolders();
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      setToTransfer: id,
      folderId: folderId
    });
    this.props.modelOperate({
      modelDetails: {
        transferToModalOpenReq: !modelDetails.transferToModalOpenReq
      }
    });
  };
  /*
   */
  showPopOver = index => {
    this.setState({
      show: true,
      setIndex: index
    });
  };
  /*
   */
  closePopOver = () => {
    this.setState({
      show: false,
      setIndex: -1
    });
  };
  /*
   */
  updateSet = data => {
    this.props.UpdateSetRequest(data);
  };
  /*
   */
  handleShowVideo = videoIndex => {
    this.setState({
      showVideoIndex: videoIndex
    });
  };
  /*
   */
  handleVideoModal = (moveURL, index) => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState(
      {
        showVideo: moveURL,
        showVideoIndex: index
      },
      () => {
        this.props.modelOperate({
          modelDetails: {
            isVideoModalOpen: !modelDetails.isVideoModalOpen
          }
        });
      }
    );
  };
  /*
   */
  isStarred = data => {
    this.props.isStarredRequest(data);
  };

  deleteMove = data => {
    this.props.deleteMoveRequest(data);
  };

  transferMove = data => {
    this.props.transferMoveRequest(data);
  };

  onEditMove = id => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        isVideoModalOpen: !modelDetails.isVideoModalOpen
      }
    });
    this.props.redirectTo(
      AppRoutes.MOVE_DETAILS.url.replace(":id", id) + `?isEdit=${true}`
    );
  };

  addTagstoMove = data => {
    if (data.fromMoveList) {
      const moveList = [...data.moveofSetList];
      moveList[data.index].tags = data.tags;
      this.props.addTagsRequest({ data: data, moveList: moveList });
    } else {
      const moveVideo = data.videoData;
      moveVideo.tags = data.tags;
      this.props.addTagsRequest({ data: data, moveVideo: moveVideo });
    }
  };

  // Transfer sets to particular folder
  folderToTransfer = async data => {
    const payload = {
      setId: data.setId,
      folderId: data.folderId,
      isFolderAdd: data.isFolderAdd,
      previousFolderid: ""
    };
    const { value } = await ConfirmBox({
      text: "You want to transfer this set!"
    });
    if (value) {
      this.props.manageSets(payload);
    }
  };

  render() {
    const {
      setReducer,
      moveReducer,
      shareLinkReducer,
      modelInfoReducer,
      allSetList,
      modelOperate,
      loadVideoDataRequest,
      getMovesOfSetRequest,
      getAllFolders,
      updateSortIndexRequest
    } = this.props;
    const { setDetails } = setReducer;
    const { modelDetails } = modelInfoReducer;
    const {
      movesOfSet,
      isMoveofSetLoading,
      videoData,
      totalMoves,
      searchMoveResult,
      isMoveSearchLoading,
      isMoveStarLoading,
      tagsList
    } = moveReducer;
    const { userEncryptedInfo } = shareLinkReducer;
    const {
      sharableLinkModalOpen,
      createSetModalOpen,
      isVideoModalOpen,
      transferToModalOpenReq
    } = modelDetails;
    const {
      show,
      setIndex,
      setIdPathName,
      showVideo,
      showVideoIndex,
      setToTransfer,
      folderId,
      moveListItem
    } = this.state;

    return (
      <>
        <div className="set-main-section">
          <div className="content-header">
            <span className="content-title">
              <div className="main-title">
                {setDetails
                  ? setDetails && setDetails.isCopy
                    ? `Copy of ${setDetails.title} ${
                        setDetails.copyIndex > 0
                          ? `(${setDetails.copyIndex})`
                          : ""
                      }`
                    : setDetails.title
                  : "MySets"}
              </div>
              <div className="sub-title">
                Total Move {setDetails ? `${setDetails.moveCount}` : 0}
              </div>
            </span>
            <div>
              <span
                id="move"
                className={"cursor_pointer"}
                onClick={this.handleMoveAdd}
              >
                <i className="fas fa-plus-circle icon-font"></i>
              </span>
              <UncontrolledTooltip placement="top" target="move">
                Add new move
              </UncontrolledTooltip>
              <span
                id="share"
                onClick={this.handleSharableLink}
                className="cursor_pointer ml-4"
              >
                <i className="fas fa-share icon-font"></i>
              </span>
              <UncontrolledTooltip placement="top" target="share">
                Get Shareable Link
              </UncontrolledTooltip>
              <UncontrolledDropdown className="header-dropdown dropdown-without-tip not-header-dropdown">
                <DropdownToggle color={" "} className="mr-0">
                  <span id="edit" className="cursor_pointer ml-4 ">
                    <i className="fas fa-sliders-h icon-font"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.handleSetModal()}>
                    Edit Set
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      this.openTransferToModal(
                        setDetails._id,
                        setDetails.folderId
                      )
                    }
                  >
                    Add to Folder
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.handleDeleteSet(setDetails._id)}
                  >
                    Delete Set
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledTooltip placement="top" target="edit">
                Edit & Delete
              </UncontrolledTooltip>
            </div>
          </div>
          {!isMoveofSetLoading ? (
            <>
              {movesOfSet && movesOfSet.length ? (
                <WebmView
                  movesOfSet={movesOfSet}
                  isVideoModalOpen={isVideoModalOpen}
                  handleVideoModal={this.handleVideoModal}
                  setIdPathName={setIdPathName}
                  video={movesOfSet[movesOfSet.length - 1]}
                  deleteMove={this.deleteMove}
                  allSetList={allSetList}
                  transferMove={this.transferMove}
                  showVideo={showVideo}
                  videoData={videoData}
                  onEditMove={this.onEditMove}
                  showVideoIndex={showVideoIndex}
                  loadVideoDataRequest={loadVideoDataRequest}
                  addTagstoMove={this.addTagstoMove}
                  isStarred={this.isStarred}
                  // addTagsInTagModalRequest={addTagsInTagModalRequest}
                  tagsList={tagsList}
                  editMove={data => this.props.updateMoveRequest(data)}
                  addTagsInTagModalRequest={data =>
                    this.props.addTagsInTagModalRequest(data)
                  }
                  getTagListRequest={() => this.props.getTagListRequest()}
                  {...this.props}
                />
              ) : null}
              <Card className="video-slider-section">
                <div className="step-2">
                  <MoveList
                    show={show}
                    setIndex={setIndex}
                    closePopOver={this.closePopOver}
                    showPopOver={this.showPopOver}
                    moveCount={setDetails ? setDetails.moveCount : 0}
                    isStarred={this.isStarred}
                    deleteMove={this.deleteMove}
                    movesOfSet={moveListItem}
                    handleVideoModal={this.handleVideoModal}
                    allSetList={allSetList}
                    setIdPathName={setIdPathName}
                    handleShowVideo={this.handleShowVideo}
                    transferMove={this.transferMove}
                    handleMoveAdd={this.handleMoveAdd}
                    modelDetails={modelDetails}
                    searchMoveResult={searchMoveResult}
                    totalMoves={totalMoves}
                    modelOperate={modelOperate}
                    addTagstoMove={this.addTagstoMove}
                    isMoveSearchLoading={isMoveSearchLoading}
                    getMovesOfSetRequest={getMovesOfSetRequest}
                    tagsList={tagsList}
                    updateSortIndexRequest={updateSortIndexRequest}
                    searchMove={data => this.props.searchMoveRequest(data)}
                    isMoveStarLoading={isMoveStarLoading}
                    addTagsInTagModalRequest={data =>
                      this.props.addTagsInTagModalRequest(data)
                    }
                    getTagListRequest={() => this.props.getTagListRequest()}
                    {...this.props}
                  />
                </div>
              </Card>
            </>
          ) : (
            <Row>
              <Col md="12">
                <Loader />
              </Col>
            </Row>
          )}
        </div>
        <SharableLinkModal
          modal={sharableLinkModalOpen}
          handleOpen={this.handleSharableLink}
          onTogglePublicAccess={this.onTogglePublicAccess}
          isPublic={setDetails ? setDetails.isPublic : false}
          userEncryptedInfo={userEncryptedInfo ? userEncryptedInfo : ""}
          shareComponent="Sets"
        />
        <CreateSetComponent
          modal={createSetModalOpen}
          handleOpen={this.handleSetModal}
          createSet={this.updateSet}
          editSet="true"
          setDetails={setDetails ? setDetails : null}
        />
        <TransferToModal
          modal={transferToModalOpenReq}
          AllFolders={getAllFolders}
          setToTransfer={setToTransfer}
          handleFolderModel={this.handleFolderModel}
          folderId={folderId}
          handleOpen={this.openTransferToModal}
          handleFolder={this.folderToTransfer}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  allSetList: state.setReducer.allSetList,
  setReducer: state.setReducer,
  moveReducer: state.moveReducer,
  modelInfoReducer: state.modelInfoReducer,
  shareLinkReducer: state.shareLinkReducer,
  getAllFolders: state.getFolderReducer.getAllFolders
});
const mapDispatchToProps = dispatch => ({
  modelOperate: data => dispatch(modelOpenRequest(data)),
  getSetDetailsRequest: data => dispatch(getSetDetailsRequest(data)),
  publicAccess: data => {
    dispatch(publicAccessRequest(data));
  },
  shareableLink: data => {
    dispatch(shareableLinkRequest(data));
  },
  onDeleteSets: data => {
    dispatch(deleteSetRequest(data));
  },
  getMovesOfSetRequest: data => dispatch(getMovesOfSetRequest(data)),
  UpdateSetRequest: data => dispatch(UpdateSetRequest(data)),
  isStarredRequest: data => dispatch(starredMovesRequest(data)),
  deleteMoveRequest: data => dispatch(deleteMovesRequest(data)),
  transferMoveRequest: data => dispatch(transferMovesRequest(data)),
  searchMoveRequest: data => dispatch(searchMoveRequest(data)),
  getSetList: data => {
    dispatch(getAllSetRequest(data));
  },
  addTagsRequest: data => dispatch(addTagsRequest(data)),
  loadVideoDataRequest: data => dispatch(loadVideoDataRequest(data)),
  allFolders: () => {
    dispatch(getAllFolderRequest());
  },
  manageSets: data => {
    dispatch(ManageSetRequest(data));
  },
  updateSortIndexRequest: data => {
    dispatch(updateSortIndexRequest(data));
  },
  updateMoveRequest: data => {
    dispatch(updateMoveRequest(data));
  },
  getTagListRequest: () => {
    dispatch(getTagListRequest());
  },
  addTagsInTagModalRequest: data => {
    dispatch(addTagsInTagModalRequest(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDetails);
