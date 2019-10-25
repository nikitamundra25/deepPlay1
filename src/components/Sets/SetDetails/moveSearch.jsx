import React from "react";
import { connect } from "react-redux";
import { Card, Col, Row } from "reactstrap";
import {
  getMoveBySearchRequest,
  modelOpenRequest,
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
  updateMoveRequest
} from "../../../actions";
import SharableLinkModal from "../../comman/shareableLink/SharableLink";
import { AppRoutes } from "../../../config/AppRoutes";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ConfirmBox } from "../../../helper/SweetAleart";
import WebmView from "./WebmView";
import Loader from "../../comman/Loader/Loader";
import MoveList from "./moveList";
import TransferToModal from "../../Folders/FolderDetails/transferTo";
// core components
class MoveSearchComponent extends React.Component {
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
    this.props.getMoveBySearchRequest({
      search: isStarred[1],
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
  handleMoveAdd = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    this.props.redirectTo(AppRoutes.MOVE.url + `?setId=${pathName[3]}`);
  };
  /*
   */
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
    const location = this.props.location;
    const isSearch = location.search.split("=");
    const moveData = {
      moveId: data.moveId,
      isStarred: data.isStarred,
      isSearch: isSearch.length ? isSearch[1] : false,
      isVideoModalOpen: true
    };
    this.props.isStarredRequest(moveData);
  };

  deleteMove = data => {
    const location = this.props.location;
    const isSearch = location.search.split("=");
    const data1 = {
      moveId: data.moveId,
      isDeleted: data.isDeleted,
      isSearch: isSearch.length ? isSearch[1] : false
    };
    this.props.deleteMoveRequest(data1);
  };

  transferMove = data => {
    const location = this.props.location;
    const isSearch = location.search.split("=");
    const data1 = {
      moveId: data.moveId,
      setId: data.setId,
      previousSetId: data.previousSetId,
      isSearch: isSearch.length ? isSearch[1] : false
    };
    this.props.transferMoveRequest(data1);
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
    this.props.addTagsRequest(data);
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
    const { modelDetails } = modelInfoReducer;
    const {
      movesOfSet,
      isMoveofSetLoading,
      videoData,
      totalMoves,
      searchMoveResult,
      isMoveSearchLoading
    } = moveReducer;
    const { userEncryptedInfo } = shareLinkReducer;
    const {
      sharableLinkModalOpen,
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
                  editMove={data => this.props.updateMoveRequest(data)}
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
                    moveCount={0}
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
                    updateSortIndexRequest={updateSortIndexRequest}
                    searchMove={data => this.props.searchMoveRequest(data)}
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
          isPublic={false}
          userEncryptedInfo={userEncryptedInfo ? userEncryptedInfo : ""}
          shareComponent="Sets"
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
  getMoveBySearchRequest: data => dispatch(getMoveBySearchRequest(data)),
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
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveSearchComponent);
