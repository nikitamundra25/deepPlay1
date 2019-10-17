import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Col,
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
  loadVideoDataRequest
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
      moveData: []
    };
  }
  componentDidMount = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const { moveReducer } = this.props
    const { movesOfSet } = moveReducer;
    this.props.getSetDetailsRequest({ setId: pathName[3] });
    this.props.getMovesOfSetRequest({ setId: pathName[3], moveData: movesOfSet, page: 1, isInfiniteScroll: false });
    this.props.getSetList({ isSetNoLimit: false });
    this.setState({
      setIdPathName: pathName[3]
    });
  };
  /*
  /*  
  */
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
    this.setState({
      showVideo: moveURL,
      showVideoIndex: index
    }, () => {
      this.props.modelOperate({
        modelDetails: {
          isVideoModalOpen: !modelDetails.isVideoModalOpen
        }
      });
    })
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
    this.props.redirectTo(
      AppRoutes.MOVE_DETAILS.url.replace(":id", id) + `?isEdit=${true}`
    );
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
      getMovesOfSetRequest
    } = this.props;
    const { setDetails } = setReducer;
    const { modelDetails } = modelInfoReducer;
    const { movesOfSet, isMoveofSetLoading, videoData, totalMoves } = moveReducer;
    const { userEncryptedInfo } = shareLinkReducer;
    const { sharableLinkModalOpen, createSetModalOpen, isVideoModalOpen } = modelDetails;
    const { show, setIndex, setIdPathName, showVideo, showVideoIndex } = this.state;

    return (
      <>
        <div className="set-main-section">
          <div className="content-header">
            <span className="content-title">
              <div className="main-title">
                {setDetails ? setDetails.title : "MyFolder"}
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
              <UncontrolledDropdown
                className="header-dropdown "
                direction="bottom"
              >
                <DropdownToggle color={" "} caret>
                  <span id="edit" className="cursor_pointer ml-4">
                    <i className="fas fa-sliders-h icon-font"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.handleSetModal()}>
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.handleDeleteSet(setDetails._id)}
                  >
                    Delete
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
              {movesOfSet && movesOfSet.length ?
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
                  {...this.props}
                /> : null
              }
              <Card className="video-slider-section">
                <div className="step-2">
                  <MoveList
                    show={show}
                    setIndex={setIndex}
                    closePopOver={this.closePopOver}
                    showPopOver={this.showPopOver}
                    moveCount={setDetails.moveCount}
                    isStarred={this.isStarred}
                    deleteMove={this.deleteMove}
                    movesOfSet={movesOfSet}
                    handleVideoModal={this.handleVideoModal}
                    allSetList={allSetList}
                    setIdPathName={setIdPathName}
                    handleShowVideo={this.handleShowVideo}
                    transferMove={this.transferMove}
                    handleMoveAdd={this.handleMoveAdd}
                    modelDetails={modelDetails}
                    totalMoves={totalMoves}
                    modelOperate={modelOperate}
                    getMovesOfSetRequest={getMovesOfSetRequest}
                    {...this.props}
                  />
                </div>
              </Card>
            </>
          ) : (
              <Col md="12">
                <Loader />
              </Col>
            )
          }
        </div>
        <SharableLinkModal
          modal={sharableLinkModalOpen}
          handleOpen={this.handleSharableLink}
          onTogglePublicAccess={this.onTogglePublicAccess}
          isPublic={setDetails ? setDetails.isPublic : ""}
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
      </>
    );
  }
}

const mapStateToProps = state => ({
  allSetList: state.setReducer.allSetList,
  setReducer: state.setReducer,
  moveReducer: state.moveReducer,
  modelInfoReducer: state.modelInfoReducer,
  shareLinkReducer: state.shareLinkReducer
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
  getSetList: data => {
    dispatch(getAllSetRequest(data));
  },
  loadVideoDataRequest: data => dispatch(loadVideoDataRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDetails);
