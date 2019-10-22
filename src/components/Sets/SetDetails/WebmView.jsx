import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { logger } from "helper/Logger";
import InputRange from "react-input-range";
import { SecondsToHHMMSS } from "helper/Time";
import TransferToModal from "../../Folders/FolderDetails/transferTo";
import Loader from "../../comman/Loader/Loader";
import closeBtn from "../../../assets/img/close-img.png";
import ViewInfoModal from "./viewInfoModal";
import AddTagModal from "./addTagsModal";
import EditMoveModal from "./editMoveModal";

class WebmView extends Component {
  video;
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentTime: 0,
      exactCurrentTime: 0,
      audioSpeed: 5,
      isMuted: false,
      playBackSpeed: 1,
      moveToTransfer: "",
      setId: "",
      videoData: {},
      videoIndex: -1,
      isVideoLoading: false,
      videoDuration: {},
      videoDimentions: {},
      moveIdToAddTags: "",
      moveIdToEdit: ""
    };
  }
  /**
   *
   */
  componentDidUpdate = ({ isVideoModalOpen, videoData }) => {
    if (isVideoModalOpen !== this.props.isVideoModalOpen) {
      this.props.loadVideoDataRequest(this.props.showVideo);
      this.setState({
        videoIndex: this.props.showVideoIndex
      });
    }
    if (videoData !== this.props.videoData) {
      this.video = document.getElementById("webm-video");
      this.video.addEventListener("timeupdate", () => {
        const currentVideoTime = parseFloat(this.video.currentTime).toFixed(2);
        this.setState({
          currentTime: currentVideoTime
        });
      });
      this.video.addEventListener("ended", () => {
        this.setState({
          isPlaying: false
        });
      });
      this.video.load();
      let timeDuration = [];
      this.video.onloadeddata = () => {
        const { duration, videoHeight, videoWidth } = this.video;
        for (let index = 0; index < duration; index = index + duration / 20) {
          timeDuration.push(index);
        }
        const data = {
          timeDuration: timeDuration,
          videoMaxDuration: duration
        };
        this.setState({
          videoDuration: data,
          videoDimentions: {
            videoHeight,
            videoWidth
          },
          isPlaying: false
        });
      };
    }
  };
  /**
   *
   */
  labelValueChange = value => {
    this.setState({
      currentTime: value
    });
  };
  /**
   *
   */
  playVideo = () => {
    this.video = document.getElementById("webm-video");
    this.setState({
      isPlaying: true
    });
    this.video.play();
  };
  /**
   *
   */
  pauseVideo = () => {
    this.setState({
      isPlaying: false
    });
    this.video.pause();
  };
  /**
   *
   */
  onVolumeChange = value => {
    logger(value);
    this.setState({
      audioSpeed: value,
      isMuted: value === 0
    });
    this.video.volume = value;
  };
  /**
   *
   */
  toggleMute = () => {
    const { isMuted } = this.state;
    this.setState({
      isMuted: !isMuted
    });
  };
  /**
   *
   */
  handleVideoFullScreen = () => {
    if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    } else if (this.video.webkitRequestFullScreen) {
      this.video.webkitRequestFullScreen();
    }
  };
  /**
   *
   */
  handleSpeed = speed => {
    this.video.playbackRate = speed;
    this.setState({
      playBackSpeed: speed
    });
  };
  /**
   *
   */
  handleMoveDelete = id => {
    const data = {
      moveId: id,
      isDeleted: true,
      setId: this.props.setIdPathName
    };
    this.props.deleteMove(data);
  };

  openTransferToModal = (id, setId) => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      moveToTransfer: id,
      setId: setId
    });
    this.props.modelOperate({
      modelDetails: {
        transferToModalOpenReq: !modelDetails.transferToModalOpenReq
      }
    });
  };

  handleMoveTransfer = data => {
    this.props.transferMove(data);
  };

  handlePreviousVideoPlay = () => {
    const { movesOfSet } = this.props;
    const { videoIndex } = this.state;
    this.props.loadVideoDataRequest(movesOfSet[videoIndex - 1]);
    this.setState({
      videoIndex: videoIndex - 1
    });
  };
  handleNextVideoPlay = () => {
    const { movesOfSet } = this.props;
    const { videoIndex } = this.state;
    this.props.loadVideoDataRequest(movesOfSet[videoIndex + 1]);
    this.setState({
      videoIndex: videoIndex + 1
    });
  };

  openViewInfoModal = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        viewInfoModalOpen: !modelDetails.viewInfoModalOpen
      }
    });
  };

  handleStarred = (id, isStarred) => {
    const data = {
      moveId: id,
      isStarred: isStarred ? false : true,
      setId: this.props.setIdPathName
    };
    this.props.isStarred(data);
  };

  openAddTagsModal = id => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      moveIdToAddTags: id
    });
    this.props.modelOperate({
      modelDetails: {
        addTagModalOpenReq: !modelDetails.addTagModalOpenReq
      }
    });
  };

  editMoveModalOpen = id => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      moveIdToEdit: id
    });
    this.props.modelOperate({
      modelDetails: {
        editMoveModalOpen: !modelDetails.editMoveModalOpen
      }
    });
  };

  render() {
    const {
      video,
      allSetList,
      modelInfoReducer,
      isVideoModalOpen,
      handleVideoModal,
      movesOfSet,
      isShareable,
      videoData
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    const {
      transferToModalOpenReq,
      viewInfoModalOpen,
      addTagModalOpenReq,
      editMoveModalOpen
    } = modelDetails;
    const { moveURL, title } = video;
    const {
      isPlaying,
      currentTime,
      audioSpeed,
      isMuted,
      playBackSpeed,
      setId,
      moveToTransfer,
      videoIndex,
      videoDuration,
      isVideoLoading,
      videoDimentions,
      moveIdToAddTags,
      moveIdToEdit
    } = this.state;

    return (
      <>
        <Modal
          className="modal-dialog-centered custom-model-wrap custom-video-model"
          isOpen={isVideoModalOpen}
          toggle={handleVideoModal}
        >
          <ModalHeader>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={handleVideoModal}
            >
              <span aria-hidden="true">
                <img src={closeBtn} alt="close-ic" />
              </span>
            </button>
          </ModalHeader>
          <ModalBody>
            <div className="video-slider-text">
              <div className="video-slider-title">
                {" "}
                {videoData ? videoData.title : title}{" "}
              </div>
              {!isShareable ? (
                <div className="video-slider-dropDown">
                  <div>
                    <UncontrolledDropdown
                      className="header-dropdown custom-dropdown dropdown-with-tip"
                      direction="left"
                    >
                      <DropdownToggle color={" "}>
                        <span id="edit" className="cursor_pointer ml-4">
                          <i
                            className="fa fa-ellipsis-v"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() =>
                            this.editMoveModalOpen(
                              videoData ? videoData._id : video._id
                            )
                          }
                          // onClick={() =>
                          //   this.props.onEditMove(
                          //     videoData ? videoData._id : video._id
                          //   )
                          // }
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            this.handleStarred(
                              videoData._id,
                              videoData.isStarred
                            )
                          }
                        >
                          Mark Star
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            videoData
                              ? this.openAddTagsModal(videoData._id)
                              : this.openAddTagsModal(video._id)
                          }
                        >
                          Add Tags
                        </DropdownItem>
                        <DropdownItem onClick={this.openViewInfoModal}>
                          View Info
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            videoData
                              ? this.openTransferToModal(
                                  videoData._id,
                                  videoData.setId
                                )
                              : this.openTransferToModal(video._id, video.setId)
                          }
                        >
                          Tranfer
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            videoData
                              ? this.handleMoveDelete(videoData._id)
                              : this.handleMoveDelete(video._id)
                          }
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="video-slider-img">
              <div className="custom-video-player">
                <div className="videos-arrows-wrap">
                  {videoIndex > 0 ? (
                    <div
                      onClick={() => this.handlePreviousVideoPlay()}
                      className="cursor_pointer left-arrow-wrap"
                    >
                      <i className="fa fa-angle-left" aria-hidden="true" />
                    </div>
                  ) : null}
                  {videoIndex < movesOfSet.length - 1 ? (
                    <div
                      onClick={() => this.handleNextVideoPlay()}
                      className="right-arrow-wrap cursor_pointer"
                    >
                      <i className="fa fa-angle-right" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>
                {!isVideoLoading ? (
                  <video
                    width={"100%"}
                    id="webm-video"
                    muted={isMuted}
                    className="video-loading-tag"
                  >
                    <source
                      src={`${
                        videoData && videoData.moveURL
                          ? videoData.moveURL
                          : moveURL
                      }`}
                      type="video/webm"
                    />
                  </video>
                ) : (
                  <div className="video-loader">
                    <Loader videoLoader={true} />
                  </div>
                )}
                <div className={"controls"}>
                  <div className="control-background-wrap"></div>
                  <InputRange
                    draggableTrack={false}
                    maxValue={videoDuration.videoMaxDuration}
                    minValue={0}
                    step={0.05}
                    formatLabel={value => ``}
                    value={currentTime}
                    onChange={this.labelValueChange}
                  />
                  <div className={"controls-wrap"}>
                    <div className={"control-left-block"}>
                      <div className="play-paus-wrap control-tile">
                        {isPlaying ? (
                          <span
                            onClick={this.pauseVideo}
                            className={"cursor_pointer"}
                          >
                            <i className={"fa fa-pause"}></i>
                          </span>
                        ) : (
                          <span
                            onClick={this.playVideo}
                            className={"cursor_pointer"}
                          >
                            <i className={"fa fa-play"}></i>
                          </span>
                        )}
                      </div>
                      <div className="video-time-wrap control-tile">
                        {SecondsToHHMMSS(parseInt(currentTime))} /{" "}
                        {SecondsToHHMMSS(
                          parseInt(videoDuration.videoMaxDuration)
                        )}
                      </div>
                      <div className="volume-up-down control-tile">
                        <span onClick={this.toggleMute}>
                          {isMuted ? (
                            <i className="fas fa-volume-mute"></i>
                          ) : audioSpeed ? (
                            audioSpeed > 0.6 ? (
                              <i className="fas fa-volume-up"></i>
                            ) : (
                              <i class="fas fa-volume-down"></i>
                            )
                          ) : (
                            <i class="fas fa-volume-mute"></i>
                          )}
                        </span>
                      </div>
                      <div className="volume-range cursor_pointer control-tile">
                        <div
                          style={{
                            width: 100
                          }}
                        >
                          <InputRange
                            draggableTrack
                            maxValue={1}
                            minValue={0}
                            step={0.1}
                            formatLabel={value => ``}
                            value={audioSpeed}
                            onChange={this.onVolumeChange}
                          />
                        </div>
                      </div>
                      <div className="speed-wrap control-tile">
                        <UncontrolledDropdown
                          className="header-dropdown custom-dropdown"
                          // direction="auto"
                        >
                          <DropdownToggle color={" "}>
                            <span
                              id="playback-speed"
                              className="cursor_pointer ml-2 text-white"
                            >
                              {playBackSpeed !== 1 ? `${playBackSpeed}x` : null}{" "}
                              <i
                                className="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              active={playBackSpeed === 0.5}
                              onClick={() => this.handleSpeed(0.5)}
                            >
                              0.5
                            </DropdownItem>
                            <DropdownItem
                              active={playBackSpeed === 1}
                              onClick={() => this.handleSpeed(1)}
                            >
                              1
                            </DropdownItem>
                            <DropdownItem
                              active={playBackSpeed === 1.5}
                              onClick={() => this.handleSpeed(1.5)}
                            >
                              1.5
                            </DropdownItem>
                            <DropdownItem
                              active={playBackSpeed === 2}
                              onClick={() => this.handleSpeed(2)}
                            >
                              2
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                    <div className="control-right-block">
                      <span
                        onClick={() => this.handleVideoFullScreen()}
                        className="control-tile cursor_pointer"
                      >
                        <i className="fas fa-expand" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <TransferToModal
          modal={transferToModalOpenReq}
          AllFolders={allSetList}
          moveToTransfer={moveToTransfer}
          handleFolderModel={this.handleFolderModel}
          folderId={setId}
          transferMove={true}
          handleOpen={this.openTransferToModal}
          handleMove={this.handleMoveTransfer}
        />
        <AddTagModal
          modal={addTagModalOpenReq}
          handleOpen={this.openAddTagsModal}
          moveIdToAddTag={moveIdToAddTags ? moveIdToAddTags : video._id}
          addTagstoMove={data => this.props.addTagstoMove(data)}
        />
        <ViewInfoModal
          modal={viewInfoModalOpen}
          handleOpen={this.openViewInfoModal}
          videoData={videoData}
          videoDimentions={videoDimentions}
        />
        <EditMoveModal
          modal={editMoveModalOpen}
          handleOpen={this.editMoveModalOpen}
          videoData={videoData}
          moveIdToEdit={moveIdToEdit}
          editMove={data => this.props.editMove(data)}
        />
      </>
    );
  }
}
export default WebmView;
