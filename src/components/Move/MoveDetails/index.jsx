import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  FormGroup,
  FormFeedback
} from "reactstrap";
import VideoView from "./videoView";
import VideoDetails from "./videoDetails";
import {
  getMoveDetailsRequest,
  getAllSetRequest,
  modelOpenRequest,
  addNewTagToList,
  createAnotherMoveRequest,
  removeVideoLocalServerRequest,
  addTagsInTagModalRequest,
  getTagListRequest,
  createSetRequest
} from "../../../actions";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
import VideoLoader from "components/comman/Loader/videoLoader";
import FrameDetails from "./FrameDetails";
import { logger } from "helper/Logger";
import { completeVideoEditing } from "actions/Moves";
import closeBtn from "../../../assets/img/close-img.png";
import MoveSuccessModal from "./moveSuccessModal";
import qs from "query-string";
import { AppRoutes } from "../../../config/AppRoutes";
import CreateSetComponent from "../../Sets/createSet";

// core components
class MoveDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: {},
      isPaste: false,
      tags: [],
      videoDuration: [],
      selectSetOptions: null,
      title: "",
      description: "",
      isUpdateDescription: false,
      timer: {
        min: 0,
        max: 15
      },
      videoMaxDuration: 0,
      isEdit: false,
      descError: ""
    };
    this.videoDetails = React.createRef();
  }

  componentDidMount = () => {
    const location = this.props.location.pathname;
    const moveId = location.split("/");
    this.props.getMoveDetailsRequest({ moveId: moveId[3] });
    this.props.getAllSetRequest({ isSetNoLimit: false });
    this.props.getTagListRequest();
    const { recentSetAdded } = this.props.setReducer;
    if (recentSetAdded) {
      this.setState({
        selectSetOptions: {
          label: recentSetAdded.title,
          value: recentSetAdded._id
        }
      });
    }
    let parsed = qs.parse(this.props.location.search);
    this.setState({
      isEdit: parsed.isEdit
    });
  };

  componentDidUpdate = ({
    modelInfoReducer,
    location,
    moveReducer,
    setReducer
  }) => {
    const path = this.props.location.pathname;
    const moveId = path.split("/");
    const prevQuery = location.pathname.split("/");
    const currQuery = this.props.location.pathname.split("/");
    const prevmodelDetails = modelInfoReducer.modelDetails;
    const prevDescriptionModal = prevmodelDetails.isDescriptionModalOpen;
    const newModelInfoReducer = this.props.modelInfoReducer;
    const { modelDetails } = newModelInfoReducer;
    if (prevDescriptionModal !== modelDetails.isDescriptionModalOpen) {
      if (this.state.description !== null) {
        this.setState({
          isUpdateDescription: true
        });
      } else {
        this.setState({
          isUpdateDescription: false
        });
      }
    }
    if (prevQuery && currQuery && prevQuery[3] && currQuery[3]) {
      if (prevQuery[3] !== currQuery[3]) {
        this.props.getMoveDetailsRequest({ moveId: moveId[3] });
        // this.setState({
        //   selectSetOptions: "",
        //   tags: ""
        // });
      }
    }

    if (moveReducer.moveDetails !== this.props.moveReducer.moveDetails) {
      if (this.props.moveReducer.moveDetails) {
        const {
          title,
          description,
          tags,
          setId
        } = this.props.moveReducer.moveDetails;
        const { allSetList } = this.props.setReducer;
        let selectOption;
        if (allSetList && allSetList.length) {
          // eslint-disable-next-line
          allSetList.map(data => {
            if (setId) {
              if (setId === data._id) {
                selectOption = {
                  label: data.title,
                  value: data._id
                };
              }
            }
          });
        }
        this.setState({
          title,
          description,
          tags,
          selectSetOptions: selectOption
            ? selectOption
            : {
                label: "Type to select sets",
                value: ""
              }
        });
      }
    }
    if (
      this.props.setReducer &&
      this.props.setReducer.recentSetAdded !== setReducer.recentSetAdded
    ) {
      const { recentSetAdded } = this.props.setReducer;
      this.setState({
        selectSetOptions: {
          label: recentSetAdded.title,
          value: recentSetAdded._id
        }
      });
    }
  };
  /**
   *
   */
  onTimerChange = timer => {
    this.setState({
      timer
    });
  };
  /**
   *
   */
  completeEditing = e => {
    e.preventDefault();
    const { moveReducer } = this.props;
    const { moveDetails, isSavingWebM } = moveReducer;
    let parsed = qs.parse(this.props.location.search);
    logger(isSavingWebM);
    const { _id: moveId, frames } = moveDetails;
    const { timer, title, description } = this.state;
    const { tags, setId } = this.videoDetails.current.getDetails();
    if (!setId) {
      this.setState({
        errors: {
          setId: "Please select set from list"
        }
      });
      return;
    }
    logger(this.state, moveId);
    this.props.completeVideoEditing({
      timer,
      moveId,
      tags,
      setId,
      title: title,
      description: description,
      frames:frames && frames.length?frames[3]?frames[3]:frames[1]:[],
      isEdit: parsed.isEdit ? true : false
    });
  };
  /**
   *
   */
  handleMoveSuccessModal = data => {
    const { modelInfoReducer } = this.props;
    // this.props.createAnotherMoveRequest({ moveUrl: data });
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        isMoveSuccessModal: !modelDetails.isMoveSuccessModal
      }
    });
  };

  createAnother = data => {
    this.handleMoveSuccessModal();
    this.props.createAnotherMoveRequest({ moveUrl: data });
  };
  /**
   *
   */
  handleTagChange = (newValue, actionMeta) => {
    //const { tagsList } = this.props.moveReducer
    console.log(newValue, "kite", actionMeta);
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

  handleChange = e => {
    const { name, value } = e.target;
    const error =
      value && value.length === 500
        ? "Description cannot have more than 500 characters"
        : "";
    this.setState({
      [name]: value,
      descError: error ? error : null
    });
  };
  /**
   *
   */
  handleDesriptionModal = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        isDescriptionModalOpen: !modelDetails.isDescriptionModalOpen
      }
    });
  };
  /**
   *
   */
  redirectToSetDetails = () => {
    this.props.redirectTo(
      AppRoutes.SET_DETAILS.url.replace(":id", this.state.setId)
    );
  };
  /**
   *
   */
  cancelDescription = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        isDescriptionModalOpen: !modelDetails.isDescriptionModalOpen
      }
    });
    this.setState({
      description: ""
    });
  };

  handleInputChange = e => {
    if (e && e.value && e.label !== "+ Create New Set") {
      this.setState({
        selectSetOptions: {
          label: e.label,
          value: e.value
        },
        errors: ""
      });
    } else if (e && e.label === "+ Create New Set") {
      this.handleSetModal();
    } else {
      this.setState({
        selectSetOptions: null,
        errors: ""
      });
      this.props.getAllSetRequest({ isSetNoLimit: false });
    }
  };

  onBlur = () => {
    this.props.getAllSetRequest({ isSetNoLimit: false });
  };

  handleSetModal = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        createSetModalOpen: !modelDetails.createSetModalOpen
      }
    });
    this.props.getAllSetRequest({ isSetNoLimit: false });
  };

  onCreateSet = data => {
    this.props.onSetsCreation(data);
  };

  handleSetDetails = id => {
    const { moveReducer } = this.props;
    const { moveUrlDetails } = moveReducer;
    this.props.removeVideoLocalServerRequest({
      videoOriginalFile: moveUrlDetails.videoOriginalFile,
      videoFileMain: moveUrlDetails.videoFileMain,
      setId: id
    });
  };
  /**
   *
   */
  render() {
    const {
      setReducer,
      moveReducer,
      modelInfoReducer,
      getAllSetRequest
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    const {
      isDescriptionModalOpen,
      isMoveSuccessModal,
      createSetModalOpen
    } = modelDetails;
    const { moveDetails, isSavingWebM, tagsList, moveUrlDetails } = moveReducer;
    const { frames, videoMetaData } = moveDetails || {};
    const {
      timer,
      title,
      description,
      tags,
      errors,
      selectSetOptions,
      isUpdateDescription,
      videoDuration,
      videoMaxDuration,
      isEdit,
      descError
    } = this.state;
  
    return (
      <>
        <div className="create-set-section step-2 ">
          <Card className="w-100">
            <CardBody className="p-0">
              {!isSavingWebM ? <div></div> : null}
              {isSavingWebM ? (
                <div>
                  <VideoLoader fullLoader={true} />
                </div>
              ) : (
                <>
                  <Row className={"mt-3"}>
                    {moveDetails && moveDetails.videoUrl ? (
                      <>
                        <VideoView
                          moveReducer={moveReducer}
                          handleChange={this.handleChange}
                          handleDesriptionModal={this.handleDesriptionModal}
                          description={description}
                          timer={timer}
                          title={title}
                          isEdit={isEdit}
                          videoDuration={data =>
                            this.setState({
                              videoDuration: data.timeDuration,
                              videoMaxDuration: data.videoMaxDuration
                            })
                          }
                        />
                        <VideoDetails
                          setReducer={setReducer}
                          isDescriptionModalOpen={isDescriptionModalOpen}
                          selectSetOptions={selectSetOptions}
                          handleChange={this.handleChange}
                          handleInputChange={this.handleInputChange}
                          errors={errors}
                          handleTagChange={this.handleTagChange}
                          tags={tags}
                          setId={moveDetails ? moveDetails.setId : null}
                          getAllSetRequest={getAllSetRequest}
                          tagsList={tagsList}
                          onBlur={this.onBlur}
                          ref={this.videoDetails}
                        />
                      </>
                    ) : (
                      <Col sm={12} className="loader-col video-loader-wrap">
                        <Loader fullLoader={true} />
                      </Col>
                    )}
                  </Row>
                  <FrameDetails
                    videoDuration={videoDuration || []}
                    videoMaxDuration={videoMaxDuration || 0}
                    frames={frames || []}
                    videoMetaData={videoMetaData || {}}
                    onTimerChange={this.onTimerChange}
                    completeEditing={this.completeEditing}
                  />
                </>
              )}
            </CardBody>
          </Card>
        </div>
        <div>
          <Modal
            className="modal-dialog-centered custom-model-wrap"
            isOpen={isDescriptionModalOpen}
            toggle={
              isUpdateDescription
                ? this.handleDesriptionModal
                : this.cancelDescription
            }
          >
            <ModalHeader>
              <span className="custom-title" id="exampleModalLabel">
                Description
              </span>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={
                  isUpdateDescription
                    ? this.handleDesriptionModal
                    : this.cancelDescription
                }
              >
                <span aria-hidden="true">
                  <img src={closeBtn} alt="close-ic" />
                </span>
              </button>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  type="textarea"
                  placeholder="Enter a description (optional)"
                  name="description"
                  className={
                    descError ? "form-control is-invalid" : "form-control"
                  }
                  maxLength={"500"}
                  onChange={this.handleChange}
                  value={description}
                  rows={3}
                />
                <FormFeedback>{descError ? descError : null}</FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                onClick={this.handleDesriptionModal}
                color=" "
                className="btn btn-black"
              >
                {isUpdateDescription ? "Update description" : "Add Description"}
              </Button>
              <Button
                type="button"
                onClick={
                  isUpdateDescription
                    ? this.handleDesriptionModal
                    : this.cancelDescription
                }
                color=" "
                className="btn btn-line-black"
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <MoveSuccessModal
            isMoveSuccessModal={isMoveSuccessModal}
            handleMoveSuccessModal={this.handleMoveSuccessModal}
            redirectToSetDetails={this.redirectToSetDetails}
            handleSetDetails={this.handleSetDetails}
            moveUrlDetails={moveUrlDetails}
            createAnother={this.createAnother}
          />
          <CreateSetComponent
            modal={createSetModalOpen}
            handleOpen={this.handleSetModal}
            createSet={this.onCreateSet}
            fromMoveDetailsPage={true}
            setDetails=""
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  setReducer: state.setReducer,
  moveReducer: state.moveReducer,
  modelInfoReducer: state.modelInfoReducer
});
const mapDispatchToProps = dispatch => ({
  getMoveDetailsRequest: data => dispatch(getMoveDetailsRequest(data)),
  getAllSetRequest: data => dispatch(getAllSetRequest(data)),
  completeVideoEditing: data => dispatch(completeVideoEditing(data)),
  modelOperate: data => dispatch(modelOpenRequest(data)),
  addNewTagToList: data => dispatch(addNewTagToList(data)),
  createAnotherMoveRequest: data => dispatch(createAnotherMoveRequest(data)),
  removeVideoLocalServerRequest: data =>
    dispatch(removeVideoLocalServerRequest(data)),
  addTagsInTagModalRequest: data => dispatch(addTagsInTagModalRequest(data)),
  getTagListRequest: () => dispatch(getTagListRequest()),
  onSetsCreation: data => {
    dispatch(createSetRequest(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MoveDetails));
