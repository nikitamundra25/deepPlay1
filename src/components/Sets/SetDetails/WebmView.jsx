import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  UncontrolledTooltip,
  ModalHeader,
} from "reactstrap";
import { logger } from "helper/Logger";
import InputRange from "react-input-range";
import { SecondsToMMSS } from "helper/Time";
import TransferMoveModal from "../../comman/TransferModal.jsx";
import Loader from "../../comman/Loader/Loader";
import closeBtn from "../../../assets/img/close-img.png";
import ViewInfoModal from "./viewInfoModal";
import AddTagModal from "./addTagsModal";
import EditMoveModal from "./editMoveModal";
import { ConfirmBox } from "helper/SweetAleart";
import { toast } from "react-toastify";
import videoLoading from "../../../assets/img/loder/loader.svg";
let videoDelay = false;
class WebmView extends Component {
  video;
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
      currentTime: 0,
      exactCurrentTime: 0,
      audioSpeed: 1,
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
      moveIdToEdit: "",
      doubleClickIndex: -1,
      title: " ",
      doubleClick: false,
      tags: [],
      edit: false,
      description: "",
      error: "",
      videoCanPlay: false,
      isBufferingVideo: false,
      isMouseMove: false,
      mouseOnControls: false,
    };
  }
  /**
   *
   */
  componentDidUpdate = ({
    isVideoModalOpen,
    videoData,
    isFullScreenMode,
    isVideoFromSearch,
    isHomePage,
  }) => {
    const vid = document.getElementById("webm-video");
    this.audio = document.getElementById("audio-trimmer");

    if (vid) {
      //       vid.addEventListener('ended', function () {
      //         console.count('loop restart');
      //         vid.pause()
      //         setTimeout(() => {
      //           vid.play()
      //         }, 1500);
      //       })

      document.onkeydown = (event) => {
        this.handleKeyEvent(event);
      };

      vid.onwaiting = () => {
        this.setState({
          isBufferingVideo: true,
        });
        if (this.audio) {
          this.audio.pause();
        }
      };
      vid.oncanplay = () => {
        this.setState({
          isBufferingVideo: false,
        });
        if (this.audio) {
          this.audio.play();
        }
      };
    }
    if (isFullScreenMode !== this.props.isFullScreenMode) {
      const videoFullScreen = true;
      if (this.video) {
        this.video.addEventListener("volumechange", () => {
          if (
            (this.video.volume === 0 || this.video.volume === 1) &&
            this.video.muted
          ) {
            this.setState({
              isMuted: true,
              audioSpeed: 0,
            });
          } else {
            this.setState({
              isMuted: false,
              audioSpeed: this.video.volume,
            });
          }
        });
        this.video.addEventListener("pause", () => {
          this.setState({
            isPlaying: false,
          });
          if (this.audio) {
            this.audio.pause();
          }
        });
        this.video.addEventListener("play", () => {
          this.setState({
            isPlaying: true,
          });
          if (this.audio) {
            this.audio.play();
          }
        });

        if (this.props.isFullScreenMode && videoFullScreen) {
          let isVideoScreenChange = false;
          this.customVideo.addEventListener("fullscreenchange ", () => {
            this.setState({
              isFullScreenMode: false,
            });
            if (!isVideoScreenChange) {
              this.props.videoFullscreenExit();
            }
          });
        }
        this.video.controls = false;
      }
    }
    if (isVideoModalOpen !== this.props.isVideoModalOpen) {
      this.props.loadVideoDataRequest(this.props.showVideo);
      this.setState({
        videoIndex: this.props.showVideoIndex,
        isPlaying: true,
        currentTime: 0,
        exactCurrentTime: 0,
        audioSpeed: 5,
        isMuted: this.props.videoClose ? true : false,
        playBackSpeed: 1,
      });
    }
    if (videoData !== this.props.videoData) {
      this.video = document.getElementById("webm-video");
      this.audio = document.getElementById("audio-trimmer");
      this.customVideo = document.getElementById("custom_video_control");
      if (this.video) {
        this.video.addEventListener("timeupdate", () => {
          let currentVideoTime;
          if (this.audio && this.props.videoData.isMoveProcessing) {
            currentVideoTime = parseFloat(
              this.video
                ? this.video.currentTime -
                    Number(this.props.videoData.startTime)
                : 0
            ).toFixed(2);
            if (
              Number(this.props.videoData.endTime) - this.video.currentTime <
              0.3
            ) {
              this.video.currentTime = Number(this.props.videoData.startTime);
              this.audio.currentTime = Number(this.props.videoData.startTime);
            }
          } else {
            currentVideoTime = parseFloat(
              this.video ? this.video.currentTime : 0
            ).toFixed(2);
          }
          this.setState({
            currentTime: currentVideoTime,
          });
        });
        this.video.addEventListener("ended", () => {
          this.setState({
            isPlaying: true,
          });
        });
        this.video.load();
        let timeDuration = [];
        this.video.onloadeddata = () => {
          const { videoHeight, videoWidth } = this.video;
          const duration =
            Number(this.props.videoData.endTime) -
            Number(this.props.videoData.startTime);
          for (let index = 0; index < duration; index = index + duration / 20) {
            timeDuration.push(index);
          }
          if (this.audio && this.props.videoData.isMoveProcessing) {
            this.video.currentTime = this.props.videoData.startTime;
            this.audio.currentTime = this.props.videoData.startTime;
          }
          const data = {
            timeDuration: timeDuration,
            videoMaxDuration: duration,
          };
          this.setState({
            videoDuration: data,
            videoDimentions: {
              videoHeight,
              videoWidth,
            },
            isPlaying: true,
          });
        };
      }
    }
    if (isVideoFromSearch !== this.props.isVideoFromSearch) {
      this.video = document.getElementById("webm-video");
      this.customVideo = document.getElementById("custom_video_control");
      if (this.video) {
        this.video.addEventListener("timeupdate", () => {
          const currentVideoTime = parseFloat(this.video.currentTime).toFixed(
            2
          );
          if (
            Number(this.props.videoData.endTime) - this.video.currentTime <
            0.3
          ) {
            this.video.currentTime = Number(this.props.videoData.startTime);
          }
          this.setState({
            currentTime: currentVideoTime,
          });
        });
        this.video.addEventListener("ended", () => {
          this.setState({
            isPlaying: true,
          });
        });

        this.video.load();
        let timeDuration = [];
        this.video.onloadeddata = () => {
          const { duration, videoHeight, videoWidth } = this.video;
          for (let index = 0; index < duration; index = index + duration / 20) {
            timeDuration.push(index);
          }
          console.log(this.video.currentTime, "this.video.currentTime");
          this.video.currentTime = this.props.videoData.startTime;
          const data = {
            timeDuration: timeDuration,
            videoMaxDuration: duration,
          };
          this.setState({
            videoDuration: data,
            videoDimentions: {
              videoHeight,
              videoWidth,
            },
            isPlaying: true,
          });
        };
      }
    }
  };
  /**
   *
   */
  labelValueChange = (value) => {
    this.video = document.getElementById("webm-video");

    const { videoData } = this.props;
    if (videoData.isMoveProcessing) {
      console.log("in Video Processing");
      let timeDuration = [];
      const duration =
        Number(this.props.videoData.endTime) -
        (Number(this.props.videoData.startTime) + Number(value));
      console.log(">>>>>>>>>>>>>>", duration);
      const videoMaxDuration =
        Number(this.props.videoData.endTime) -
        Number(this.props.videoData.startTime);
      for (let index = 0; index < duration; index = index + duration / 20) {
        timeDuration.push(index);
      }
      this.video.currentTime =
        Number(this.props.videoData.startTime) + Number(value);
      if (this.audio) {
        this.audio.currentTime =
          Number(this.props.videoData.startTime) + Number(value);
      }
      const data = {
        timeDuration: timeDuration,
        videoMaxDuration: videoMaxDuration,
      };

      this.setState({
        currentTime: parseFloat(value),
        videoDuration: data,
      });
    } else {
      this.video.currentTime = value;
      this.setState({
        currentTime: parseFloat(value),
      });
    }
  };
  /**
   *
   */
  playVideo = () => {
    this.video = document.getElementById("webm-video");
    if (this.video) {
      this.setState({
        isPlaying: true,
      });
      this.video.play();
      if (this.audio) {
        this.audio.play();
      }
    }
  };
  /**
   *
   */
  pauseVideo = () => {
    this.setState({
      isPlaying: false,
    });
    this.video.pause();
    if (this.audio) {
      this.audio.pause();
    }
  };
  /**
   *
   */
  onVolumeChange = (value) => {
    logger(value);
    this.setState({
      audioSpeed: value,
      isMuted: value === 0,
    });
    this.video.volume = value;
    if (this.audio) {
      this.audio.volume = value;
    }
  };
  /**
   *
   */
  toggleMute = () => {
    const { isMuted } = this.state;
    if (this.audio && !isMuted) {
      this.audio.volume = 0;
    } else if (this.audio && isMuted) {
      this.audio.volume = 1;
    }
    this.setState({
      isMuted: !isMuted,
    });
  };

  /**
   *
   */

  handleVideoFullScreen = () => {
    this.customVideo = document.getElementById("custom_video_control");
    if (!this.state.isPlaying) {
      this.playVideo();
    }

    if (this.customVideo.mozRequestFullScreen) {
      this.customVideo.mozRequestFullScreen();
    } else if (this.customVideo.webkitRequestFullScreen) {
      this.props.videoFullscreenReq();

      this.customVideo.webkitRequestFullScreen();
      this.setState({
        isFullScreenMode: true,
      });
    } else if (this.customVideo.webkitEnterFullscreen) {
      this.props.videoFullscreenReq();
      this.customVideo.webkitEnterFullscreen();
      this.setState({
        isFullScreenMode: true,
      });
    }
  };

  handleVideoResizeScreen = () => {
    this.customVideo = document.getElementById("custom_video_control");
    if (this.customVideo) {
      if (this.customVideo.mozRequestFullScreen) {
        document.mozCancelFullScreen();
      } else if (this.customVideo.webkitExitFullscreen) {
        document.exitFullscreen();
        this.setState({
          isFullScreenMode: false,
        });
      } else {
        document.exitFullscreen();
        this.setState({
          isFullScreenMode: false,
        });
      }
    }
  };

  /**
   *
   */
  handleSpeed = (speed) => {
    this.video.playbackRate = speed;
    if (this.audio) {
      this.audio.playbackRate = speed;
    }
    this.setState({
      playBackSpeed: speed,
    });
  };
  /**
   *
   */
  handleMoveDelete = async (id, setId) => {
    const data = {
      moveId: [id],
      isDeleted: true,
      setId: this.props.setIdPathName ? this.props.setIdPathName : setId,
      fromMoveSearch: this.props.fromMoveSearch
        ? this.props.fromMoveSearch
        : null,
    };
    const { value } = await ConfirmBox({
      text: "You want to remove this move! ",
    });
    if (value) {
      this.props.deleteMove(data);
    }
  };

  openTransferToModal = (id, setId) => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      moveToTransfer: id,
      setId: setId,
    });
    this.props.modelOperate({
      modelDetails: {
        transferMoveModalOpen: !modelDetails.transferMoveModalOpen,
      },
    });
  };

  handleMoveTransfer = async (data) => {
    const { value } = await ConfirmBox({
      text: "You want to transfer this move!",
    });
    if (value) {
      this.props.transferMove(data);
    }
  };

  handlePreviousVideoPlay = (isSkipable) => {
    const { movesOfSet } = this.props;
    const { videoIndex } = this.state;
    if (this.props.isHomePage) {
      this.props.loadVideoDataRequest(
        isSkipable
          ? {
              moveURL:
                movesOfSet[videoIndex - 2 < 0 ? 0 : videoIndex - 2].video,
              isMoveProcessing: false,
              title: movesOfSet[videoIndex - 2 < 0 ? 0 : videoIndex - 2].title,
              startTime:
                movesOfSet[videoIndex - 2 < 0 ? 0 : videoIndex - 2].startTime,
              endTime:
                movesOfSet[videoIndex - 2 < 0 ? 0 : videoIndex - 2].endTime,
            }
          : {
              moveURL: movesOfSet[videoIndex - 1].video,
              isMoveProcessing: false,
              title: movesOfSet[videoIndex - 1].title,
              startTime: movesOfSet[videoIndex - 1].startTime,
              endTime: movesOfSet[videoIndex - 1].endTime,
            }
      );
    } else {
      this.props.loadVideoDataRequest(
        isSkipable
          ? movesOfSet[videoIndex - 2 < 0 ? 0 : videoIndex - 2]
          : movesOfSet[videoIndex - 1]
      );
    }
    const highlightText = document.getElementById("video-title");
    if (highlightText) {
      highlightText.classList.remove("text-selected");
    }
    this.setState({
      videoIndex: videoIndex - 1,
      doubleClick: false,
      playBackSpeed: 1,
    });
  };

  handleNextVideoPlay = () => {
    const { movesOfSet } = this.props;
    const { videoIndex } = this.state;
    console.log("Next video Data", movesOfSet[videoIndex + 1]);
    if (this.props.isHomePage) {
      this.props.loadVideoDataRequest({
        moveURL: movesOfSet[videoIndex + 1].video,
        isMoveProcessing: false,
        title: movesOfSet[videoIndex + 1].title,
        startTime: movesOfSet[videoIndex + 1].startTime,
        endTime: movesOfSet[videoIndex + 1].endTime,
      });
    } else {
      this.props.loadVideoDataRequest(movesOfSet[videoIndex + 1]);
    }
    const highlightText = document.getElementById("video-title");
    if (highlightText) {
      highlightText.classList.remove("text-selected");
    }
    this.setState({
      videoIndex: videoIndex + 1,
      doubleClick: false,
      playBackSpeed: 1,
    });
  };

  openViewInfoModal = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        viewInfoModalOpen: !modelDetails.viewInfoModalOpen,
      },
    });
  };

  handleStarred = (id, isStarred) => {
    const videoData = this.props.videoData;
    if (isStarred) {
      videoData.isStarred = false;
    } else {
      videoData.isStarred = true;
    }
    const data = {
      moveId: id,
      isStarred: isStarred ? false : true,
      setId: this.props.setIdPathName,
      videoData: videoData,
    };
    this.props.isStarred(data);
  };

  openAddTagsModal = (id, name) => {
    const { modelInfoReducer, videoData } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.getTagListRequest();
    this.setState({
      moveIdToAddTags: id,
      tags: videoData.tags ? videoData.tags : [],
      edit: name === "edit" ? true : false,
      description: videoData ? videoData.description : null,
    });
    this.props.modelOperate({
      modelDetails: {
        addTagModalOpenReq: !modelDetails.addTagModalOpenReq,
      },
    });
  };

  editMoveModalOpen = (id) => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      moveIdToEdit: id,
    });
    this.props.modelOperate({
      modelDetails: {
        editMoveModalOpen: !modelDetails.editMoveModalOpen,
      },
    });
  };

  handleTagChange = (newValue, actionMeta) => {
    //const { tagsList } = this.props.moveReducer
    if (newValue) {
      this.setState({
        tags: newValue,
      });
    } else {
      this.setState({
        tags: [],
      });
    }
    if (actionMeta.action === "create-option") {
      this.props.addTagsInTagModalRequest({
        tags: newValue[newValue.length - 1],
      });
    }
    console.groupEnd();
  };

  onDoubleClick = (title) => {
    const highlightText = document.getElementById("video-title");
    if (highlightText) {
      highlightText.classList.add("text-selected");
    }
    this.setState({
      doubleClick: true,
      title: title,
    });
  };

  onpaste = (e) => {
    e.preventDefault();
    if (window.clipboardData) {
      let content = window.clipboardData.getData("Text");
      if (window.getSelection) {
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);
        selRange.deleteContents();
        selRange.insertNode(document.createTextNode(content));
      }
    } else if (e.clipboardData) {
      let content = (e.originalEvent || e).clipboardData.getData("text/plain");
      document.execCommand("insertText", false, content);
    }
  };

  handleKeyPress = (e, videoData, showVideoIndex, video) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.handleonBlur(e, videoData, showVideoIndex, video);
    } else {
      return;
    }
  };

  handleonBlur = (e, videoData) => {
    const highlightText = document.getElementById("video-title");
    const value = e.target.textContent;
    const error =
      value && value.length > 50
        ? "Title cannot have more than 50 characters"
        : "";
    if (error) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error("Title cannot have more than 50 characters");
      }
      return;
    } else {
      if (highlightText) {
        highlightText.classList.remove("text-selected");
      }

      if (value !== "" || this.state.errorTitle !== null) {
        const data = {
          moveId: videoData._id,
          title: value,
          description:
            videoData && videoData.description ? videoData.description : null,
          tags: videoData ? videoData.tags : null,
          setId: videoData && videoData.setId ? videoData.setId._id : null,
          videoData: videoData ? videoData : null,
          fromMoveList: false,
        };
        this.setState({
          doubleClick: false,
          title: "",
        });
        this.props.editMove(data);
      }
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const error =
      value && value.length > 250
        ? "Description cannot have more than 250 characters"
        : "";
    this.setState({
      [name]: value,
      error,
    });
  };

  handleVideoModal = () => {
    this.setState({
      isMuted: true,
    });
  };

  onmousemove = (e) => {
    this.setState({
      isMouseMove: true,
    });
    setTimeout(() => {
      this.setState({
        isMouseMove: false,
      });
    }, 2000);
  };

  onMouseOver = () => {
    this.setState({
      mouseOnControls: true,
    });
  };

  handleVideoModal = () => {
    this.props.handleVideoModal();
  };

  handleKeyEvent = (e) => {
    if (e.which === 32 || e.keyCode === 32) {
      if (this.state.isPlaying) {
        this.pauseVideo();
      } else {
        this.playVideo();
      }
    } else {
      return true;
    }
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
      videoData,
      tagsList,
      fromMoveSearch,
      showVideoIndex,
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    const {
      viewInfoModalOpen,
      addTagModalOpenReq,
      editMoveModalOpen,
      transferMoveModalOpen,
    } = modelDetails;
    const { moveURL } = video;
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
      moveIdToEdit,
      tags,
      isFullScreenMode,
      doubleClick,
      // title,
      description,
      edit,
      error,
      videoCanPlay,
      isBufferingVideo,
      isMouseMove,
    } = this.state;
    let isFullScreenMode1 =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    let isSkipable = false;
    isSkipable =
      movesOfSet[videoIndex - 1] && movesOfSet[videoIndex - 1].isMoveProcessing
        ? true
        : false;
    let playScreen = false;

    if (isFullScreenMode1) {
      if (isFullScreenMode && !isPlaying && playScreen) {
        this.playVideo();
      }
    }

    playScreen = !isFullScreenMode ? (isFullScreenMode1 ? true : false) : true;

    if (isFullScreenMode1) {
      let control = document.getElementsByClassName("controls");
      if (control[0] && !isMouseMove && !this.state.mouseOnControls) {
        control[0].classList.add("hide-controls");
      } else {
        control[0].classList.remove("hide-controls");
      }
    } else {
      let control = document.getElementsByClassName("controls");
      if (control && control[0]) {
        control[0].classList.remove("hide-controls");
      }
    }
    console.log("videoData++++++++++++++", videoData);

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
              onClick={() => {
                this.setState({
                  doubleClick: false,
                });
                handleVideoModal(videoData, null);
              }}
            >
              <span aria-hidden="true">
                <img src={closeBtn} alt="close-ic" />
              </span>
            </button>
          </ModalHeader>
          <ModalBody>
            <div className="video-slider-text">
              <div
                id="video-title"
                suppressContentEditableWarning={true}
                contentEditable={doubleClick ? "true" : "false"}
                className={
                  videoData && videoData.title !== "Unnamed" && videoData.title
                    ? "text-capitalize video-slider-title font-weight-bold"
                    : "text-capitalize text-untitled-slider font-weight-bold"
                }
                onDoubleClick={
                  !isShareable
                    ? () => this.onDoubleClick(videoData.title)
                    : null
                }
                onPaste={doubleClick ? this.onpaste : null}
                onBlur={
                  doubleClick ? (e) => this.handleonBlur(e, videoData) : null
                }
                onKeyPress={
                  doubleClick
                    ? (e) => this.handleKeyPress(e, videoData, showVideoIndex)
                    : null
                }
              >
                {videoData && videoData.title ? videoData.title : "Unnamed"}
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
                        >
                          Edit Move Details
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
                          Transfer
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="video-slider-img pb-3">
              <div
                className="custom-video-player"
                id="custom_video_control"
                onMouseMove={isFullScreenMode1 ? this.onmousemove : null}
              >
                <div className="videos-arrows-wrap">
                  {videoIndex > 0 ? (
                    <div
                      onClick={() => this.handlePreviousVideoPlay(isSkipable)}
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
                {isBufferingVideo === true || videoDelay ? (
                  <div className="video-spinner z-">
                    <img src={videoLoading} alt="" />
                  </div>
                ) : null}
                {!videoCanPlay || videoDelay ? (
                  <div className="video-spinner z-">
                    <img src={videoLoading} alt="" />
                  </div>
                ) : null}
                {!isVideoLoading ? (
                  <>
                    <video
                      width={"100%"}
                      id="webm-video"
                      muted={isMuted}
                      className={
                        isFullScreenMode
                          ? "full-video-mode video-loading-tag cursor_pointer"
                          : "video-loading-tag cursor_pointer"
                      }
                      loop
                      preload="auto"
                      playsInline
                      autoPlay
                      onCanPlay={() => {
                        this.setState({
                          videoCanPlay: true,
                        });
                      }}
                      onLoadedData={() => {
                        this.setState({
                          videoCanPlay: false,
                        });
                      }}
                      disablecontrols="true"
                      disablepictureinpicture="true"
                      controlsList="nodownload"
                      onContextMenu={(e) => e.preventDefault()}
                      onClick={isPlaying ? this.pauseVideo : this.playVideo}
                    >
                      <source
                        src={`${
                          videoData && videoData.isMoveProcessing
                            ? videoData.videoUrl
                            : videoData.moveURL
                            ? videoData.moveURL
                            : moveURL
                        }`}
                        type="video/webm"
                      />
                    </video>
                    {videoData && videoData.isMoveProcessing ? (
                      <audio
                        id={"audio-trimmer"}
                        className={"d-none"}
                        controls
                        autoPlay
                        loop
                      >
                        <source src={videoData.audioUrl} type="audio/ogg" />
                      </audio>
                    ) : null}
                  </>
                ) : (
                  <div className="video-loader">
                    <Loader videoLoader={true} />
                  </div>
                )}

                <div
                  className={"controls"}
                  onMouseOver={isFullScreenMode1 ? this.onMouseOver : null}
                  onMouseLeave={
                    isFullScreenMode1
                      ? () =>
                          this.setState({
                            mouseOnControls: false,
                          })
                      : null
                  }
                >
                  <div className="control-background-wrap"></div>
                  <InputRange
                    draggableTrack={false}
                    maxValue={videoDuration.videoMaxDuration}
                    minValue={0}
                    step={0.05}
                    formatLabel={(value) => ``}
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
                        {SecondsToMMSS(parseInt(currentTime))} /{" "}
                        {SecondsToMMSS(
                          parseInt(
                            videoDuration && videoDuration.videoMaxDuration
                              ? videoDuration.videoMaxDuration
                              : 0
                          )
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
                              <i className="fas fa-volume-down"></i>
                            )
                          ) : (
                            <i className="fas fa-volume-mute"></i>
                          )}
                        </span>
                      </div>
                      <div className="volume-range cursor_pointer control-tile">
                        <div
                          style={{
                            width: 100,
                          }}
                        >
                          <InputRange
                            draggableTrack={false}
                            maxValue={1}
                            minValue={0}
                            step={0.1}
                            formatLabel={(value) => ``}
                            value={audioSpeed}
                            onChange={this.onVolumeChange}
                          />
                        </div>
                      </div>
                      {isFullScreenMode1 ? (
                        <div className={"video-slider-btn ml-4 cursor_pointer"}>
                          <div className={"d-flex justify-content-between"}>
                            {videoIndex > 0 ? (
                              <div
                                onClick={() => this.handlePreviousVideoPlay()}
                                className="cursor_pointer left-arrow-wrap"
                              >
                                <span id={"previous-video"}>
                                  <i className="fas fa-step-backward" />
                                </span>
                                <UncontrolledTooltip
                                  placement="top"
                                  target="previous-video"
                                >
                                  Previous video
                                </UncontrolledTooltip>
                              </div>
                            ) : null}
                            {videoIndex < movesOfSet.length - 1 ? (
                              <div
                                onClick={() => this.handleNextVideoPlay()}
                                className="right-arrow-wrap cursor_pointer"
                              >
                                <span id={"next-video"}>
                                  <i className="fas fa-step-forward" />
                                </span>
                                <UncontrolledTooltip
                                  placement="top"
                                  target="next-video"
                                >
                                  Next video
                                </UncontrolledTooltip>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                      <div className="speed-wrap control-tile">
                        <UncontrolledDropdown
                          className="header-dropdown custom-dropdown"
                          // direction="auto"
                        >
                          <DropdownToggle
                            color={" "}
                            className="ml-2"
                            id="playback-speed-wrap"
                          >
                            <span
                              id="playback-speed"
                              className="cursor_pointer  text-white d-flex align-items-center"
                            >
                              <span>
                                {playBackSpeed !== 1
                                  ? `${playBackSpeed}x`
                                  : null}{" "}
                              </span>
                              <i
                                className="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </DropdownToggle>
                          <UncontrolledTooltip
                            placement="top"
                            target="playback-speed-wrap"
                          >
                            Playback speed
                          </UncontrolledTooltip>
                          <DropdownMenu>
                            <DropdownItem
                              active={playBackSpeed === 0.25}
                              onClick={() => this.handleSpeed(0.25)}
                            >
                              0.25
                            </DropdownItem>
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
                              Normal
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
                      {!isFullScreenMode1 ? (
                        <span
                          onClick={() => this.handleVideoFullScreen()}
                          className="control-tile cursor_pointer"
                        >
                          <i className="fas fa-expand" />
                        </span>
                      ) : (
                        <span
                          onClick={() => this.handleVideoResizeScreen()}
                          className="control-tile cursor_pointer"
                        >
                          <i className="fa fa-arrows-alt" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right pr-4">
              {((videoData && videoData.tags && videoData.tags.length) ||
                (videoData && videoData.description)) &&
              !isShareable ? (
                <span
                  className="cursor_pointer"
                  onClick={() => this.openAddTagsModal(videoData._id, "edit")}
                >
                  Edit
                </span>
              ) : null}
            </div>
            <div className="pt-3 d-flex video-tag-wrap">
              {videoData && videoData.tags && videoData.tags.length ? (
                <>
                  <div className="font-weight-bold video-tag-heading">
                    {" "}
                    <i className="fa fa-tags" aria-hidden="true" /> Tags :
                  </div>
                  <div className={"pl-2 pb-3 video-tag-content"}>
                    {videoData.tags.map((tags, index) => {
                      return (
                        <span className="video-tags" key={index}>
                          {" "}
                          {tags.value}{" "}
                        </span>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </div>
            <div className="mt-2">
              {videoData && videoData.description ? (
                <div>
                  <span className="font-weight-bold pr-2 d-inline-flex align-items-center float-left">
                    {" "}
                    <i className="fas fa-comment-alt pr-1" aria-hidden="true" />
                    Description :
                  </span>
                  <span>{videoData.description}</span>
                </div>
              ) : null}
            </div>
          </ModalBody>
        </Modal>

        <TransferMoveModal
          modal={transferMoveModalOpen}
          setList={allSetList}
          moveToTransfer={moveToTransfer}
          setId={setId}
          transferMove={true}
          handleOpen={this.openTransferToModal}
          handleMove={this.handleMoveTransfer}
          fromMoveSearch={fromMoveSearch}
        />
        <AddTagModal
          modal={addTagModalOpenReq}
          handleOpen={this.openAddTagsModal}
          moveIdToAddTag={moveIdToAddTags ? moveIdToAddTags : video._id}
          addTagstoMove={(data) => this.props.addTagstoMove(data)}
          tagsList={tagsList}
          handleTagChange={this.handleTagChange}
          tags={tags}
          videoData={videoData}
          fromMoveList={false}
          edit={edit}
          description={description}
          handleChange={this.handleChange}
          error={error}
        />
        <ViewInfoModal
          modal={viewInfoModalOpen}
          handleOpen={this.openViewInfoModal}
          videoData={videoData}
          video={this.props.video}
          videoDimentions={videoDimentions}
        />
        <EditMoveModal
          modal={editMoveModalOpen}
          handleOpen={this.editMoveModalOpen}
          videoData={videoData}
          moveIdToEdit={moveIdToEdit}
          editMove={(data) => this.props.editMove(data)}
        />
      </>
    );
  }
}
export default WebmView;
