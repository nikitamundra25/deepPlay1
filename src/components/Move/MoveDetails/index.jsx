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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip,
  FormFeedback,
  CardHeader
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
  createSetRequest,
  noIAmDoneRequest,
  YoutubeUpdateMoveRequest
} from "../../../actions";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
// import { logger } from "helper/Logger";
import { completeVideoEditing } from "actions/Moves";
import closeBtn from "../../../assets/img/close-img.png";
import MoveSuccessModal from "./moveSuccessModal";
import qs from "query-string";
import { AppRoutes } from "../../../config/AppRoutes";
import CreateSetComponent from "../../Sets/createSet";
import { toast } from "react-toastify";

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
      videoFrames: [],
      isUpdateDescription: false,
      timer: {
        min: 0,
        max: 15
      },
      videoMaxDuration: 1,
      setMoveCount: 0,
      isEdit: false,
      descError: "",
      isVideoFinished: false,
      selectedSetId: "",
      errorTitle: "",
      createNew: false,
      videoError: false,
      isPlaying: false,
      currentTime: 0,
      totalOutput: 15,
      isChange: true,
      maxLengthError:"Move can't be allow more than 15 sec."
    };
    this.videoDetails = React.createRef();
  }

  componentDidMount = () => {
    const location = this.props.location.pathname;
    const moveId = location.split("/");
    this.props.getMoveDetailsRequest({ moveId: moveId[3] });
    this.props.getAllSetRequest({ isSetNoLimit: false });
    this.props.getTagListRequest();

    /*    const { recentSetAdded } = this.props.setReducer;
    console.log("recentSetAdded", recentSetAdded); */

    // if (recentSetAdded) {
    //   this.setState({
    //     selectSetOptions: {
    //       label: recentSetAdded.title,
    //       value: recentSetAdded._id
    //     }
    //   });
    // }
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
    this.video = document.getElementById("video-trimmer");

    if (prevDescriptionModal !== modelDetails.isDescriptionModalOpen) {
      if (this.state.description) {
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
          setId,
          moveURL,
          isMoveDone
        } = this.props.moveReducer.moveDetails;

        if (
          moveURL ||
          isMoveDone ||
          this.props.moveReducer.moveDetails === "" ||
          this.props.moveReducer.moveDetails.isMoveProcessing
        ) {
          window.history.back();
          if (!toast.isActive(this.toastId)) {
            this.toastId = toast.warn(
              "The move for this id has already been created."
            );
          }
        }
        const { allSetList } = this.props.setReducer;
        let selectOption;
        if (allSetList && allSetList.length) {
          // eslint-disable-next-line
          allSetList.map(data => {
            if (setId) {
              if (setId === data._id) {
                selectOption = {
                  label:
                    data && data.isCopy
                      ? `${data.title} ${
                          data.copyCount > 0 ? `(${data.copyCount})` : ""
                        }`
                      : data.title,
                  value: data._id
                };
              }
              this.setState({
                selectedSetId: setId
              });
            }
          });
        }
        this.setState({
          title,
          description,
          tags,
          timer: { min: 0.1, max: 15.1 },
          selectSetOptions: selectOption
            ? selectOption
            : {
                label: "Type to select sets",
                value: ""
              }
        });
      }
      if (this.video) {
        this.video.addEventListener("timeupdate", () => {
          const currentVideoTime = parseFloat(
            this.video ? this.video.currentTime : 0
          ).toFixed(2);
          this.setState({
            currentTime: currentVideoTime
          });
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
    this.audio = document.getElementById("audio-trimmer");
    if (this.video) {
      this.video.onpause = () => {
        this.setState({
          isPlaying: false
        });
        this.audio.pause();
      };
      this.video.onplay = () => {
        this.setState({
          isPlaying: true
        });
        this.audio.play();
      };
    }
  };
  /**
   *
   */
  onTimerChange = timer => {
    const time = this.state.timer;
    let myVideo = document.getElementById("video-trimmer");
    let myAudio = document.getElementById("audio-trimmer");
    this.setState({
      timer
    });

    this.handleTotalOutput(timer);

    if (timer.isVideoSleek) {
      if (timer.min === time.min && timer.max !== time.max) {
        myVideo.currentTime = timer.max;
        myAudio.currentTime = timer.max;
      } else if (timer.max === time.max && timer.min !== time.min) {
        myVideo.currentTime = timer.min;
        myAudio.currentTime = timer.min;
      } else {
        if (timer.min < time.min) {
          myVideo.currentTime = timer.min;
          myAudio.currentTime = timer.min;
        } else {
          myVideo.currentTime = timer.max;
          myAudio.currentTime = timer.max;
        }
      }
    }
    this.setState({
      currentTime: myVideo.currentTime
    });
  };

  handleTotalOutput = time => {
    let difference = 0;
    difference = time.max - time.min;
    this.setState({
      totalOutput: difference
    });

    if (difference.toFixed(2) > 15) {
      this.setState({
        maxLengthError: "Move can't be allow more than 15 sec."
      });
    } else if (difference === 1) {
      this.setState({
        maxLengthError: "Move can't be allow less than 1 sec."
      });
    } else {
      this.setState({
        maxLengthError: ""
      });
    }
  };

  /**
   *
   */
  completeEditing = e => {
    e.preventDefault();
    const { moveReducer } = this.props;
    const { moveDetails } = moveReducer;
    let parsed = qs.parse(this.props.location.search);
    const { _id: moveId, videoThumbnail, isYoutubeUrl } = moveDetails;
    const {
      timer,
      title,
      description,
      setMoveCount,
      maxLengthError
    } = this.state;
    const { tags, setId } = this.videoDetails.current.getDetails();
    if (!setId) {
      this.setState({
        errors: {
          setId: "Please select set from list"
        }
      });
      return;
    }
    if (maxLengthError) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(maxLengthError);
      }
      return;
    }
    this.setState({
      isVideoFinished: true,
      createNew: false
    });

    // eslint-disable-next-line
    {
      !isYoutubeUrl
        ? this.props.completeVideoEditing({
            timer: {
              min: parseInt(timer.min),
              max: parseInt(timer.max)
            },
            moveId,
            tags,
            setId,
            title: title,
            description: description,
            videoThumbnail: videoThumbnail,
            isEdit: parsed.isEdit ? true : false,
            setMoveCount
          })
        : this.props.completeYouTubeVideoEditing({
            timer: {
              min: parseInt(timer.min),
              max: parseInt(timer.max)
            },
            moveId,
            tags,
            setId,
            title: title,
            description: description,
            isEdit: parsed.isEdit ? true : false,
            setMoveCount
          });
    }
    this.handleMoveSuccessModal();
  };

  handleVideoPause = () => {
    let myVideo = document.getElementById("video-trimmer");
    let myVideoAudio = document.getElementById("audio-trimmer");
    if (myVideo) {
      this.setState({
        isPlaying: false
      });
      myVideo.pause();
      myVideoAudio.pause();
    }
  };

  handleVideoPlay = () => {
    this.video = document.getElementById("video-trimmer");
    this.audio = document.getElementById("audio-trimmer");
    if (this.video) {
      this.setState({
        isPlaying: true
      });
      this.video.play();
      this.audio.play();
    }
  };

  handlePlayPause = () => {
    if (this.state.isPlaying) {
      this.handleVideoPause();
    } else {
      this.handleVideoPlay();
    }
  };

  handleChangeComplete = (value, time) => {
    const { isChange } = this.state;
    const vid = document.getElementById("video-trimmer");
    const audio = document.getElementById("audio-trimmer");
    if (!isChange) {
      vid.currentTime = time.min;
      audio.currentTime = time.min;
      this.setState({
        isChange: true
      });
    }
  };

  handleSingleInputRange = (value, time) => {
    this.setState({
      currentTime: value
    });
    const { videoMaxDuration } = this.state;
    const vid = document.getElementById("video-trimmer");
    const audio = document.getElementById("audio-trimmer");
    const { min, max } = time;
    if (parseInt(min) <= parseInt(value) && parseInt(max) >= parseInt(value)) {
      this.handleVideoPause();
      vid.currentTime = value;
      audio.currentTime = value;
      this.setState({
        // currentTime:
        //   value === parseInt(videoMaxDuration) ? videoMaxDuration : value,
        isChange: true
      });
    } else {
      vid.currentTime = value;
      audio.currentTime = value;
      this.setState({
        isChange: false
        // currentTime: value
      });
      this.handleVideoPlay();
    }
    if (value === parseInt(videoMaxDuration)) {
      this.handleVideoPlay();
    }
  };

  /*
   */
  handleMouseLeave = time => {
    const { min, max } = time;
    const vid = document.getElementById("video-trimmer");
    const audio = document.getElementById("audio-trimmer");
    if (vid) {
      if (vid.currentTime.toFixed(2) > min && vid.currentTime < max) {
      } else {
        vid.currentTime = min;
        audio.currentTime = min;
        this.setState({
          currentTime: min,
          isChange: true
        });
      }
    }
  };
  /**
   *
   */
  handleMoveSuccessModal = data => {
    this.handleVideoPause();
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
    const { moveReducer } = this.props;
    const { moveDetails } = moveReducer;
    const {
      frames,
      videoMetaData,
      videoName,
      sourceUrl,
      isYoutubeUrl,
      videoThumbnail
    } = moveDetails;
    // this.handleMoveSuccessModal();
    this.setState({
      title: "",
      tags: [],
      description: "",
      timer: {
        min: 0,
        max: 15
      },
      errorTitle: "",
      selectSetOptions: "",
      createNew: true,
      totalOutput: 15
    });
    this.props.createAnotherMoveRequest({
      moveUrl: moveDetails.videoUrl,
      frames: frames && frames.length ? frames : [],
      videoMetaData: videoMetaData ? videoMetaData : null,
      videoThumbnail,
      sourceUrl,
      isYoutubeUrl,
      videoName: videoName
    });
  };
  /**
   *
   */
  handleTagChange = (newValue, actionMeta) => {
    // const { tagsList } = this.props.moveReducer
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
      value && value.length > 250
        ? "Description cannot have more than 250 characters"
        : "";
    this.setState({
      [name]: value,
      descError: error ? error : null
    });
  };

  handleChangeTitle = e => {
    const { name, value } = e.target;
    const error =
      value && value.length > 50
        ? "Title cannot have more than 50 characters"
        : "";
    if (error) {
      this.setState({
        errorTitle: error ? error : null
      });
    } else {
      this.setState({
        [name]: value.replace(/  +/g, " ").trimStart(),
        errorTitle: null
      });
    }
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
  redirectToSetDetails = name => {
    this.props.modelOperate({
      modelDetails: {
        isMoveSuccessModal: false
      }
    });
    const setId = this.state.selectSetOptions
      ? this.state.selectSetOptions.value
      : null;
    this.props.noIAmDoneRequest(name);
    this.props.redirectTo(AppRoutes.SET_DETAILS.url.replace(":id", setId));
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
        setMoveCount: e.moveCount,
        selectedSetId: e.value,
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

  /**
   *
   */

  playbackFailed = e => {
    // video playback failed - show a message saying why
    this.setState({
      videoError: true
    });
  };

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
    const {
      moveDetails,
      isSavingWebM,
      tagsList,
      moveUrlDetails,
      isCreatingAnotherMove
      // isIosDevice,
    } = moveReducer;
    const { isYoutubeUrl } = moveDetails || {};
    const {
      timer,
      title,
      description,
      tags,
      selectSetOptions,
      isUpdateDescription,
      videoMaxDuration,
      errorTitle,
      descError,
      videoError,
      isPlaying,
      currentTime,
      totalOutput,
      errors,
      isChange,
      maxLengthError
    } = this.state;

    return (
      <>
        <div className="create-set-section create-videos-section step-2 ">
          <Card className="w-100 p-0">
            <CardHeader className="mb-3 ">
              <Row>
                <Col lg={4} className="trime-back-btn">
                  <span
                    className="cursor_pointer back-arrow create-move-back"
                    onClick={() => {
                      window.history.back();
                    }}
                  >
                    {" "}
                    <i className="fas fa-long-arrow-alt-left"></i> Back
                  </span>
                </Col>
                <Col lg={8} className="trime-name-input">
                  <FormGroup className="flex-fill flex-column video-title-wrap">
                    <div className=" w-100">
                      <InputGroup className={"move-title-wrap"}>
                        <Input
                          id="title"
                          placeholder="Enter your title (optional)"
                          onChange={e => this.handleChangeTitle(e)}
                          type="text"
                          className={
                            errorTitle ? "is-invalid move-title" : "move-title"
                          }
                          name="title"
                          value={title ? title : ""}
                        />
                        <FormFeedback>
                          {" "}
                          {errorTitle ? errorTitle : null}{" "}
                        </FormFeedback>
                        <InputGroupAddon
                          addonType="prepend"
                          className="discription-btn-wrap"
                        >
                          <div onClick={this.handleDesriptionModal}>
                            <InputGroupText
                              id="description"
                              className={"discription-btn cursor_pointer"}
                            >
                              <i className="fas fas fa-info " />
                              <UncontrolledTooltip
                                placement="top"
                                target="description"
                              >
                                {description
                                  ? "Update Description"
                                  : "Add description"}
                              </UncontrolledTooltip>
                            </InputGroupText>
                          </div>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="trimming-body">
              {!isSavingWebM ? <div></div> : null}
              <>
                <Row className={" "}>
                  {moveDetails && moveDetails.videoUrl ? (
                    <>
                      <VideoView
                        ref={this.videoDetails}
                        moveReducer={moveReducer}
                        handleChange={this.handleChangeTitle}
                        handleDesriptionModal={this.handleDesriptionModal}
                        description={description}
                        timer={timer}
                        errors={errors}
                        setReducer={setReducer}
                        storeVideoFrames={this.storeVideoFrames}
                        isYoutubeUrl={isYoutubeUrl}
                        videoDuration={data =>
                          this.setState({
                            videoDuration: data.timeDuration,
                            videoMaxDuration: data.videoMaxDuration,
                            totalOutput: data.videoMaxDuration
                          })
                        }
                        videoError={videoError}
                        onBlur={this.onBlur}
                        handleTagChange={this.handleTagChange}
                        getAllSetRequest={getAllSetRequest}
                        tagsList={tagsList}
                        playbackFailed={this.playbackFailed}
                        totalOutput={totalOutput}
                        selectSetOptions={selectSetOptions}
                        tags={tags}
                        isPlaying={isPlaying}
                        handleInputChange={this.handleInputChange}
                        setId={moveDetails ? moveDetails.setId : null}
                        isChange={isChange}
                      />
                      <VideoDetails
                        handlePlayPause={this.handlePlayPause}
                        handleVideoPause={this.handleVideoPause}
                        handleVideoPlay={this.handleVideoPlay}
                        isPlaying={isPlaying}
                        videoMaxDuration={videoMaxDuration}
                        currentTime={currentTime}
                        handleSingleInputRange={this.handleSingleInputRange}
                        onTimerChange={this.onTimerChange}
                        totalOutput={totalOutput}
                        handleTotalOutput={this.handleTotalOutput}
                        JumpTimeIntervals={this.JumpTimeIntervals}
                        videoError={videoError}
                        completeEditing={this.completeEditing}
                        handleChangeComplete={this.handleChangeComplete}
                        maxLengthError={maxLengthError}
                        handleMouseLeave={this.handleMouseLeave}
                      />
                    </>
                  ) : (
                    <Col sm={12} className="loader-col video-loader-wrap">
                      <Loader fullLoader={true} />
                    </Col>
                  )}
                </Row>
              </>
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
                {isUpdateDescription ? "Update description" : "Add Description"}
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
                  value={description || ""}
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
            isYoutubeUrl={isYoutubeUrl}
            moveDetails={moveDetails}
            timer={timer}
            createAnother={this.createAnother}
            isCreatingAnotherMove={isCreatingAnotherMove}
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
  },
  noIAmDoneRequest: data => dispatch(noIAmDoneRequest(data)),
  completeYouTubeVideoEditing: data => dispatch(YoutubeUpdateMoveRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MoveDetails));
