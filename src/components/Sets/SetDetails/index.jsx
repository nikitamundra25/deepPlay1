import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Button,
  Col,
  CardHeader,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap";
import {
  getSetDetailsRequest,
  modelOpenRequest,
  publicAccessRequest,
  shareableLinkRequest,
  deleteSetRequest,
  getMovesOfSetRequest,
  UpdateSetRequest
} from "../../../actions";
import SharableLinkModal from "../../comman/shareableLink/SharableLink";
import { AppRoutes } from "../../../config/AppRoutes";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import emptySetIc from "../../../assets/img/empty-sets.png";
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
      showVideoIndex: 0
    };
  }
  componentDidMount = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    console.log("#################", pathName[3]);

    this.props.getSetDetailsRequest({ setId: pathName[3] });
    this.props.getMovesOfSetRequest({ setId: pathName[3] });
  };
  /*
  /*  
  */
  onTogglePublicAccess = isPublic => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const data = {
      isFolderId: null,
      isSetId: pathName[2],
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
      setId: pathName[2],
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
      this.props.onDeleteSets(id);
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
  handleShowVideo = (videoIndex) => {
    this.setState({
      showVideoIndex: videoIndex
    })
  }
  render() {
    const {
      setReducer,
      moveReducer,
      shareLinkReducer,
      modelInfoReducer
    } = this.props;
    const { setDetails } = setReducer;
    const { modelDetails } = modelInfoReducer;
    const { movesOfSet, isMoveofSetLoading } = moveReducer;
    const { userEncryptedInfo } = shareLinkReducer;
    const { sharableLinkModalOpen, createSetModalOpen } = modelDetails;
    const { show, setIndex, showVideoIndex } = this.state;
    
    return (
      <>
        <div className="set-main-section">
          <div className="content-header">
            {setDetails && setDetails.folderId ? (
              <span className="content-title">
                <div className="main-title">
                  {setDetails && setDetails.folderId
                    ? setDetails.folderId.isCopy
                      ? `Copy of ${setDetails.folderId.title}`
                      : setDetails.folderId.title
                    : null}
                  /<span className={"text-light"}>{setDetails.title}</span>
                </div>
              </span>
            ) : (
                <span className="content-title">
                  <div className="main-title">
                    {setDetails ? setDetails.title : "MyFolder"}
                  </div>
                </span>
              )}

            <div>
              <span
                id="move"
                className={"cursor_pointer"}
                onClick={this.handleMoveAdd}
              >
                <i className="fas fa-plus-circle icon-font"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target="move">
                Add new move
              </UncontrolledTooltip>
              <span
                id="share"
                onClick={this.handleSharableLink}
                className="cursor_pointer ml-4"
              >
                <i className="fas fa-share icon-font"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target="share">
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
              <UncontrolledTooltip placement="bottom" target="edit">
                Edit & Delete
              </UncontrolledTooltip>
            </div>
          </div>
          {
            !isMoveofSetLoading ?
              <>
                <Card className="video-slider-section">
                  <div className="step-2">
                    {movesOfSet && movesOfSet.length ? (
                      // movesOfSet.map((video, index) => {
                      <WebmView
                        // key={index}
                        video={movesOfSet[showVideoIndex]}
                      />
                    ) : (
                        <div className="create-set-section w-100 empty-folder-section">
                          <div className="set-content-wrap empty-folder-card">
                            <div className="set-content-block w-100 empty-folder-wrap">
                              <CardHeader className="empty-folder-header text-center">
                                <img src={emptySetIc} alt={"Images"} />
                                <div className="content-header set-header">
                                  <span className="content-title">
                                    {" "}
                                    <h3>You haven't added any move yet!</h3>
                                    <p>No move availabe for this set</p>
                                  </span>
                                </div>
                              </CardHeader>
                              <CardBody className="">
                                <div className="create-set-tile"></div>
                                <div className="text-center">
                                  <Button
                                    color=" "
                                    type="button"
                                    className="btn-black btn "
                                    onClick={this.handleMoveAdd}
                                  >
                                    <i className="fas fa-plus mr-1"></i>
                                    Add a Move
                                </Button>
                                </div>
                              </CardBody>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </Card>
                <MoveList
                  show={show}
                  setIndex={setIndex}
                  closePopOver={this.closePopOver}
                  showPopOver={this.showPopOver}
                  moveCount={setDetails.moveCount}
                  movesOfSet={movesOfSet}
                  handleShowVideo={this.handleShowVideo}
                  {...this.props}
                />
              </> :
              <Col md="12">
                <Loader />
              </Col>
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
  UpdateSetRequest: data => dispatch(UpdateSetRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDetails);