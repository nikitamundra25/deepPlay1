import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Card,
  CardBody,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  FormGroup
} from "reactstrap";
import VideoView from "./videoView";
import VideoDetails from "./videoDetails";
import {
  getMoveDetailsRequest,
  getAllSetRequest,
  modelOpenRequest,
  addNewTagToList,
  createAnotherMoveRequest
} from "../../../actions";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
import FrameDetails from "./FrameDetails";
import { logger } from "helper/Logger";
import { completeVideoEditing } from "actions/Moves";
import closeBtn from "../../../assets/img/close-img.png";
import MoveSuccessModal from "./moveSuccessModal";
import qs from "query-string";
import { AppRoutes } from "../../../config/AppRoutes";

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
      selectSetOptions: {
        label: "Type to select sets",
        value: ""
      },
      title: "",
      description: "",
      isUpdateDescription: false,
      timer: {
        min: 0,
        max: 15
      },
      videoMaxDuration: 0
    };
    this.videoDetails = React.createRef();
  }

  componentDidMount = () => {
    const location = this.props.location.pathname;
    const moveId = location.split("/");
    this.props.getMoveDetailsRequest({ moveId: moveId[3] });
    this.props.getAllSetRequest({ isSetNoLimit: false });
    const { recentSetAdded } = this.props.setReducer;
    if (recentSetAdded !== "") {
      this.setState({
        selectSetOptions: {
          label: recentSetAdded.title,
          value: recentSetAdded._id
        }
      });
    }
  };

  componentDidUpdate = ({ modelInfoReducer, location, moveReducer }) => {
    const path = this.props.location.pathname;
    const moveId = path.split("/");
    const prevQuery = location.pathname.split("/");
    const currQuery = this.props.location.pathname.split("/");
    const prevmodelDetails = modelInfoReducer.modelDetails;
    const prevDescriptionModal = prevmodelDetails.isDescriptionModalOpen;
    const newModelInfoReducer = this.props.modelInfoReducer;
    const { modelDetails } = newModelInfoReducer;
    if (
      prevDescriptionModal !== modelDetails.isDescriptionModalOpen &&
      this.state.description !== ""
    ) {
      this.setState({
        isUpdateDescription: true
      });
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
               (selectOption = {
                label: data.title,
                value: data._id
              });
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
    console.log("parsed", parsed);

    logger(isSavingWebM);
    const { _id: moveId } = moveDetails;
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
    this.props.createAnotherMoveRequest({ moveUrl: data });
  };
  /**
   *
   */
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
    // if (actionMeta.action === 'create-option') {
    //   const tags = tagsList.push(newValue)
    //   this.props.addNewTagToList(tags)
    // }
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
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
    if (e && e.value) {
      this.setState({
        selectSetOptions: {
          label: e.label,
          value: e.value
        }
      });
    } else {
      this.setState({
        selectSetOptions: {
          label: "Type to select sets",
          value: ""
        }
      });
    }
  };

  handleSetDetails = id => {
    this.props.redirectTo(AppRoutes.SET_DETAILS.url.replace(":id", id));
  };
  /**
   *
   */
  render() {
    const { setReducer, moveReducer, modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { isDescriptionModalOpen, isMoveSuccessModal } = modelDetails;
    const { moveDetails, isSavingWebM, tagsList, moveUrlDetails } = moveReducer;
    const {
      timer,
      title,
      description,
      tags,
      errors,
      selectSetOptions,
      isUpdateDescription,
      videoDuration,
      videoMaxDuration
    } = this.state;

    return (
      <>
        <div className="create-set-section step-2 ">
          <Card className="w-100">
            <CardBody className="p-0">
              <div>
                <span
                  onClick={() => {
                    this.props.redirectTo("/move");
                  }}
                  className={"cursor_pointer back-arrow"}
                >
                  {" "}
                  <i className="fas fa-long-arrow-alt-left" /> Back
                </span>
              </div>
              {isSavingWebM ? (
                <Loader />
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
                          tagsList={tagsList}
                          ref={this.videoDetails}
                        />
                      </>
                    ) : (
                    <div className="video-loader-wrap">
                      <Loader innerLoader={true} />
                      </div>
                    )}
                  </Row>
                  <FrameDetails
                    videoDuration={videoDuration || []}
                    videoMaxDuration={videoMaxDuration || 0}
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
                onClick={this.cancelDescription}
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
                  className={"form-control"}
                  maxLength={"250"}
                  onChange={this.handleChange}
                  value={description}
                  rows={3}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                onClick={this.handleDesriptionModal}
                color=" "
                className="btn btn-black"
                disabled={!description}
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
  createAnotherMoveRequest: data => dispatch(createAnotherMoveRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MoveDetails));
