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
import FrameDetails from "./FrameDetails";
// import { logger } from "helper/Logger";
import { completeVideoEditing } from "actions/Moves";
import closeBtn from "../../../assets/img/close-img.png";
import MoveSuccessModal from "./moveSuccessModal";
import qs from "query-string";
import { AppRoutes } from "../../../config/AppRoutes";
import CreateSetComponent from "../../Sets/createSet";
import { toast } from "react-toastify";
import YouTubeFrameDetails from "./FrameDetailsForYoutube";

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
      videoMaxDuration: 0,
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
      TimeArray: []
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

    if (
      moveReducer.moveDetails !== this.props.moveReducer.moveDetails &&
      !this.props.moveReducer.creatingAnother.isCreateAnother
    ) {
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

    if (this.video) {
      this.video.addEventListener("pause", () => {
        this.setState({
          isPlaying: false
        });
      });
      this.video.addEventListener("play", () => {
        this.setState({
          isPlaying: true
        });
      });
    }
  };
  /**
   *
   */
  onTimerChange = (timer, trimTime) => {
    let videoPlayer = document.getElementById("video-trimmer");
    this.setState({
      timer
    });
    this.handleTotalOutput(trimTime);
  };

  handleTotalOutput = trimTime => {
    console.log("trimTime", trimTime);
    const time = trimTime;
    let sum = 0;
    let difference = 0;
    if (time && time.length) {
      time.map(key => {
        difference = key.max - key.min;
        sum = sum + difference;
      });
    }

    this.setState(
      {
        totalOutput: sum,
        TimeArray: trimTime
      }
      // () => this.JumpTimeIntervals(this.state.TimeArray)
    );
  };

  /**
   *
   */
  completeEditing = e => {
    e.preventDefault();
    const { moveReducer } = this.props;
    const { moveDetails, creatingAnother } = moveReducer;
    const { isCreateAnother, newMoveId } = creatingAnother;
    let parsed = qs.parse(this.props.location.search);
    const { _id: moveId, frames, isYoutubeUrl } = moveDetails;
    const { timer, title, description, setMoveCount } = this.state;
    const { tags, setId } = this.videoDetails.current.getDetails();
    if (!setId) {
      this.setState({
        errors: {
          setId: "Please select set from list"
        }
      });
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
            frames:
              frames && frames.length
                ? frames[5]
                  ? frames[5]
                  : frames[0]
                : [],
            isEdit: parsed.isEdit ? true : false,
            setMoveCount
          })
        : this.props.completeYouTubeVideoEditing({
            timer: {
              min: parseInt(timer.min),
              max: parseInt(timer.max)
            },
            moveId: !isCreateAnother ? moveId : newMoveId,
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
    if (myVideo) {
      this.setState({
        isPlaying: false
      });
      myVideo.pause();
    }
  };

  handleVideoPlay = () => {
    this.video = document.getElementById("video-trimmer");
    if (this.video) {
      this.setState({
        isPlaying: true
      });
      this.video.play();
    }
  };

  handlePlayPause = () => {
    if (this.state.isPlaying) {
      this.handleVideoPause();
    } else {
      this.handleVideoPlay();
    }
  };

  /* Jump timeInterval to various cuts start
/*  */
  JumpTimeIntervals = timeArr => {
    if (timeArr && timeArr.length) {
      var currentSegment = 0; // Segment being played
      var endTime = timeArr[currentSegment]["max"];
      var videoPlayer = document.getElementById("video-trimmer");
      videoPlayer.currentTime = timeArr[currentSegment]["min"];
      videoPlayer.play(); // Starts playing the video from startTime
      videoPlayer.addEventListener(
        "timeupdate",
        function() {
          if (videoPlayer.currentTime >= endTime) {
            // Segment completed
            currentSegment++;
            if (currentSegment < timeArr.length) {
              // Not the last segment in the array
              videoPlayer.currentTime = timeArr[currentSegment]["min"];
              endTime = timeArr[currentSegment]["max"];
            } else {
              // Last segment in the array is over
              videoPlayer.pause();
            }
          }
        },
        false
      );
    }
  };
  /* Jump timeInterval to various cuts ends
/*  */

  handleSingleInputRange = value => {
    const { videoMaxDuration } = this.state;
    this.handleVideoPause();
    const vid = document.getElementById("video-trimmer");
    vid.currentTime = value;
    this.setState({
      currentTime:
        value === parseInt(videoMaxDuration) ? videoMaxDuration : value
    });
    if (value === parseInt(videoMaxDuration)) {
      this.handleVideoPlay();
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
      createNew: true
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
        [name]: value,
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

  storeVideoFrames = frames => {
    let temp = [];
    frames.slice(0, 20).map(key => {
      return (temp = [...temp, key]);
    });
    this.setState({
      videoFrames: temp
    });
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
      isCreatingAnotherMove,
      isIosDevice,
      creatingAnother
    } = moveReducer;
    const { frames, videoMetaData, isYoutubeUrl } = moveDetails || {};
    const { isCreateAnother } = creatingAnother;

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
      errorTitle,
      descError,
      videoFrames,
      createNew,
      videoError,
      isPlaying,
      currentTime,
      totalOutput,
      TimeArray
    } = this.state;

    return (
      <>
        <div className="create-set-section create-videos-section step-2 ">
          <Card className="w-100 p-0">
            <CardHeader className="mb-3 ">
              <span className="cursor_pointer back-arrow create-move-back">
                {" "}
                <i class="fas fa-long-arrow-alt-left"></i> Back
              </span>
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
            </CardHeader>
            <CardBody className="trimming-body">
              {!isSavingWebM ? <div></div> : null}
              <>
                <Row className={" "}>
                  {moveDetails && moveDetails.videoUrl ? (
                    <>
                      <VideoView
                        moveReducer={moveReducer}
                        handleChange={this.handleChangeTitle}
                        handleDesriptionModal={this.handleDesriptionModal}
                        description={description}
                        timer={timer}
                        setReducer={setReducer}
                        storeVideoFrames={this.storeVideoFrames}
                        isCreateAnother={isCreateAnother}
                        isYoutubeUrl={isYoutubeUrl}
                        videoDuration={data =>
                          this.setState({
                            videoDuration: data.timeDuration,
                            videoMaxDuration: data.videoMaxDuration
                          })
                        }
                        videoError={videoError}
                        handleTagChange={this.handleTagChange}
                        getAllSetRequest={getAllSetRequest}
                        tagsList={tagsList}
                        playbackFailed={this.playbackFailed}
                        TimeArray={TimeArray}
                        totalOutput={totalOutput}
                        tags={tags}
                        handleInputChange={this.handleInputChange}
                        setId={moveDetails ? moveDetails.setId : null}
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
                        handlePlayPause={this.handlePlayPause}
                        isPlaying={isPlaying}
                        videoMaxDuration={videoMaxDuration}
                        currentTime={currentTime}
                        handleSingleInputRange={this.handleSingleInputRange}
                        onTimerChange={this.onTimerChange}
                        totalOutput={totalOutput}
                        handleTotalOutput={this.handleTotalOutput}
                        JumpTimeIntervals={this.JumpTimeIntervals}
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
