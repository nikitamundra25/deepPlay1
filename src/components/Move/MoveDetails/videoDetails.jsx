import React from "react";
import { Col, FormGroup, Label, Button, Form, Row, Input } from "reactstrap";
import "react-tagsinput/react-tagsinput.css";
import InputRange from "react-input-range";
import "./index.scss";
import playIc from "../../../assets/img/icons/play.svg";
import replayIc from "../../../assets/img/icons/replay.svg";
import pauseIc from "../../../assets/img/icons/pause.svg";
import { SecondsToMMSSMM } from "helper/Time";
import { toast } from "react-toastify";
// core components
class VideoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        min: 0,
        max: 15
      },
      focusTip: false
    };
  }

  addCutHandler = () => {
    const cutCount = this.state.trimTime;
    const { totalOutput, videoMaxDuration } = this.props;
    if (parseInt(totalOutput) >= 15) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.warn(
          "Max limit exceeds, You cannot trim more than 15 sec video."
        );
      }
      return;
    }
    let difference = 15 - totalOutput;
    let minValue = cutCount[cutCount.length - 1].max + 0.1;
    let data;
    if (minValue + difference < videoMaxDuration) {
      data = {
        min: minValue,
        max: minValue + difference
      };
    } else {
      data = {
        min: 0,
        max: difference
      };
    }
    cutCount.push(data);
    this.setState({ trimTime: cutCount }, () => {
      this.props.onTimerChange(data, this.state.trimTime, {
        isVideoSleek: false
      });
    });
  };

  deletehandler = index => {
    const cutCount = this.state.trimTime;
    cutCount.pop(cutCount[index]);
    this.setState({ trimTime: cutCount }, () => {
      this.props.handleTotalOutput(this.state.trimTime);
    });
  };

  replayVideo = () => {
    const { time } = this.state;
    let videoPlayer = document.getElementById("video-trimmer");
    videoPlayer.currentTime = time.min;
    this.props.handleVideoPlay();
  };

  labelValueChange = value => {
    const { min, max } = value;
    const { time } = this.state;
    this.props.handleVideoPause();
    if (parseInt(min) >= 0) {
      if (parseInt(max) - parseInt(min) > 1) {
        this.setState(
          {
            time: {
              min: min,
              max: max,
              isVideoSleek: true
            }
          },
          () => {
            this.props.onTimerChange(this.state.time);
          }
        );
      } else {
        this.setState(
          {
            time: {
              min: time.min,
              max: time.min + 1,
              isVideoSleek: true
            }
          },
          () => {
            this.props.onTimerChange(this.state.time);
          }
        );
      }
    }
  };
  /*
   */
  changeComplete = () => {
    this.props.handlePlayPause();
  };
  /*
   */
  handleKeyEvent = (e, name) => {
    const { time } = this.state;
    const { max, min } = time;
    const { videoMaxDuration } = this.props;
    const newValue = e.target.value;
    const extract = newValue.split(":");
    this.props.handleVideoPause();

    if (parseInt(extract[0]) >= 0) {
      if (parseInt(max) - parseInt(min) > 1) {
        if (name === "from") {
          if (e.keyCode === 38) {
            let changeValue = {
              min: min + 0.1,
              max: max
            };

            this.setState(
              {
                time: changeValue
              },
              () => {
                this.props.onTimerChange(this.state.time);
              }
            );
          } else if (e.keyCode === 40) {
            if (min !== 0.0) {
              let changeValue = {
                min:
                  SecondsToMMSSMM(min) === "00:00.00" ||
                  SecondsToMMSSMM(min) === "00:00.10"
                    ? 0
                    : min - 0.1,
                max: max
              };
              this.setState(
                {
                  time: changeValue
                },
                () => {
                  this.props.onTimerChange(this.state.time);
                }
              );
            }
          }
        } else {
          if (e.keyCode === 38) {
            if (
              SecondsToMMSSMM(max + 0.1) < SecondsToMMSSMM(videoMaxDuration)
            ) {
              let changeValue = {
                min: min,
                max: max + 0.1,
                to: true
              };

              this.setState(
                {
                  time: changeValue
                },
                () => {
                  this.props.onTimerChange(this.state.time);
                }
              );
            } else {
              let changeValue = {
                min: min,
                max: videoMaxDuration,
                to: true
              };

              this.setState(
                {
                  time: changeValue
                },
                () => {
                  this.props.onTimerChange(this.state.time);
                }
              );
            }
          } else if (e.keyCode === 40) {
            let changeValue = {
              min: min,
              max: max - 0.1,
              to: true
            };

            this.setState(
              {
                time: changeValue
              },
              () => {
                this.props.onTimerChange(this.state.time);
              }
            );
          }
        }
      } else if (parseInt(max) - parseInt(min) === 1) {
        if (name === "from") {
          if (e.keyCode === 38) {
            if (
              SecondsToMMSSMM(max + 0.1) < SecondsToMMSSMM(videoMaxDuration)
            ) {
              let changeValue = {
                min: time.min,
                max: time.min + 1
              };
              this.setState(
                {
                  time: changeValue
                },
                () => {
                  this.props.onTimerChange(this.state.time);
                }
              );
            }
          } else if (e.keyCode === 40) {
            if (min !== 0.0) {
              let changeValue = {
                min:
                  SecondsToMMSSMM(min) === "00:00.00" ||
                  SecondsToMMSSMM(min) === "00:00.10"
                    ? 0
                    : min - 0.1,
                max: max
              };

              this.setState(
                {
                  time: changeValue
                },
                () => {
                  this.props.onTimerChange(this.state.time);
                }
              );
            }
          }
        } else {
          if (e.keyCode === 38) {
            if (
              SecondsToMMSSMM(max + 0.1) < SecondsToMMSSMM(videoMaxDuration)
            ) {
              let changeValue = {
                min: min,
                max: max + 0.1,
                to: true
              };

              this.setState(
                {
                  time: changeValue
                },
                () => {
                  this.props.onTimerChange(this.state.time);
                }
              );
            }
          } else if (e.keyCode === 40) {
            let changeValue = {
              min: time.min,
              max: time.min + 1
            };
            this.setState(
              {
                time: changeValue
              },
              () => {
                this.props.onTimerChange(this.state.time);
              }
            );

            // if (parseInt(max) - parseInt(min) > 1) {
            //   let changeValue = {
            //     min: min - 1,
            //     max: max - 1,
            //     to: true
            //   };

            //   this.setState(
            //     {
            //       time: changeValue
            //     },
            //     () => {
            //       this.props.onTimerChange(this.state.time);
            //     }
            //   );
            // } else {
            //   if (parseInt(min) === 0) {
            //     let changeValue = {
            //       min: min,
            //       max: min + 1
            //     };

            //     this.setState(
            //       {
            //         time: changeValue
            //       },
            //       () => {
            //         this.props.onTimerChange(this.state.time);
            //       }
            //     );
            //   } else {
            //     let changeValue = {
            //       min: min - 1,
            //       max: max - 1
            //     };

            //     this.setState(
            //       {
            //         time: changeValue
            //       },
            //       () => {
            //         this.props.onTimerChange(this.state.time);
            //       }
            //     );
            //   }
            // }
          }
        }
      }
    }
  };

  /*
   */

  /*
   */
  decreaseThreeSecond = () => {
    const vid = document.getElementById("video-trimmer");
    const currentTime = vid.currentTime;
    const { time } = this.state;
    const { min } = time;
    if (min.toFixed(2) < currentTime) {
      let temp = currentTime - 3;
      if (temp > min.toFixed(2)) {
        vid.currentTime = temp;
      } else {
        vid.currentTime = min;
      }
    } else {
      this.props.handleVideoPlay();
    }
  };

  /*
   */
  increaseThreeSecond = () => {
    const vid = document.getElementById("video-trimmer");
    const currentTime = vid.currentTime;
    const { time } = this.state;
    const { max } = time;
    if (max.toFixed(2) > currentTime) {
      let temp = currentTime + 3;
      if (temp < max.toFixed(2)) {
        vid.currentTime = temp;
      } else {
        vid.currentTime = max;
      }
    } else {
      this.props.handleVideoPlay();
    }
  };
  /*
   */

  render() {
    const {
      handlePlayPause,
      isPlaying,
      videoMaxDuration,
      currentTime,
      handleSingleInputRange,
      handleChangeComplete,
      totalOutput,
      videoError,
      maxLengthError,
      handleMouseLeave
    } = this.props;
    const { time } = this.state;

    return (
      <>
        <Col lg={8} className="trim-video-text">
          <div className="video-right-section">
            <div className={"font-weight-bold h4"}>Trim your video</div>
            <span>
              Use sliders below to trim your video (15 secs max). Or use your
              arrow keys on timestamps to get really precise.
            </span>
            <div className="triming-section">
              <div className="triming-wrap">
                <div className="triming-block">
                  <Button
                    className="triming-button play-button"
                    color={" "}
                    onClick={handlePlayPause}
                  >
                    <img src={!isPlaying ? playIc : pauseIc} alt={playIc} />
                  </Button>
                  <Button
                    className="triming-button pause-button "
                    color={" "}
                    onClick={this.replayVideo}
                  >
                    <img src={replayIc} alt={replayIc} />
                  </Button>
                  <Button
                    className="triming-button pause-button time-decrease "
                    color={" "}
                    onClick={this.decreaseThreeSecond}
                  >
                    -3s
                  </Button>
                  <Button
                    className="triming-button time-increase "
                    color={" "}
                    onClick={this.increaseThreeSecond}
                  >
                    +3s
                  </Button>
                  <div className="triming-bounds">
                    <b>{SecondsToMMSSMM(currentTime)} </b> /{" "}
                    {SecondsToMMSSMM(videoMaxDuration)}
                  </div>
                </div>
                <div className="triming-video-length">
                  Output:{" "}
                  <span className="triming-number">
                    {SecondsToMMSSMM(totalOutput)}s
                  </span>
                </div>
              </div>
              <div
                className="dot-rang-slider rang-slider pb-2 main-rang-slider"
                onContextMenu={e => e.preventDefault()}
                onMouseLeave={() => handleMouseLeave(time)}
              >
                <InputRange
                  maxValue={parseInt(videoMaxDuration)}
                  minValue={0}
                  step={0.1}
                  value={parseInt(currentTime)}
                  onChange={value => handleSingleInputRange(value, time)}
                  onChangeComplete={value => handleChangeComplete(value, time)}
                />
              </div>
              <div className="video-cutting-section">
                <div className="video-cutting-block">
                  <div className="rang-slider ">
                    <InputRange
                      draggableTrack
                      step={0.1}
                      maxValue={videoMaxDuration}
                      minValue={0}
                      value={time}
                      onChange={value => this.labelValueChange(value)}
                      onChangeComplete={value => this.changeComplete()}
                    />
                    <div className="cutting-time-frame">
                      <Form className="cutting-time-form">
                        <Row className="">
                          <Col sm={6}>
                            <FormGroup>
                              <Label for="lastName"> Start</Label>
                              <Input
                                id="exampleFormControlInput1"
                                placeholder="Doe"
                                type="text"
                                className={""}
                                value={
                                  SecondsToMMSSMM(time.min) < 0
                                    ? "00:00:00"
                                    : SecondsToMMSSMM(time.min)
                                }
                                autoComplete="off"
                                onKeyDown={e => this.handleKeyEvent(e, "from")}
                                onFocus={() => {
                                  this.setState({
                                    focusTip: true
                                  });
                                }}
                                onBlur={() => {
                                  this.setState({
                                    focusTip: false
                                  });
                                }}
                                onChange={e => e.preventDefault()}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm={6}>
                            <FormGroup>
                              <Label for="lastName">End</Label>
                              <Input
                                id="exampleFormControlInput1"
                                placeholder="Doe"
                                type="text"
                                className={""}
                                value={SecondsToMMSSMM(time.max)}
                                autoComplete="off"
                                onKeyDown={e => this.handleKeyEvent(e, "to")}
                                onFocus={() => {
                                  this.setState({
                                    focusTip: true
                                  });
                                }}
                                onBlur={() => {
                                  this.setState({
                                    focusTip: false
                                  });
                                }}
                                onChange={e => e.preventDefault()}
                              />
                            </FormGroup>
                          </Col>
                          {this.state.focusTip ? (
                            <Col sm={12}>
                              <label className="">
                                <b>Tip:</b> Use the{" "}
                                <i className="fas fa-arrow-up"></i> or{" "}
                                <i className="fas fa-arrow-down"></i> arrow keys
                                for finer adjustments
                              </label>
                            </Col>
                          ) : null}
                          <Col sm={12} className="p-3 video-maxlength-error">
                            {maxLengthError ? maxLengthError : ""}
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="trimming-buttons-wrap ">
                {/* <Button className="btn-line-black" onClick={this.addCutHandler}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add Cut
                </Button> */}
                <Button
                  className="btn-black "
                  color={" "}
                  onClick={this.props.completeEditing}
                  disabled={videoError}
                >
                  Done <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </>
    );
  }
}

export default VideoDetails;
// <FormGroup className="flex-fill flex-column mt-3 input-w">

//           <Label className="mt-2">Add tags and press enter to separate</Label>
//           <div className="w-100 tag-input-wrap search-select-wrap">
//             {/* <TagsInput
//               value={tags}
//               className={"form-control"}
//               maxTags={"5"}
//               onChange={this.props.handleTagChange}
//             /> */}
//             <CreatableSelect
//               classNamePrefix="react_select"
//               isMulti
//               onChange={this.props.handleTagChange}
//               value={tags}
//               options={tagsList}
//               // options={colourOptions}
//             />
//           </div>
//         </FormGroup>
//         <FormGroup className="flex-fill flex-column mt-3">
//           {/* add search-select class for search select design  */}
//           <Label className="mt-2">
//             Select sets <span className="text-danger">*</span>
//           </Label>
//           <InputGroup>
//             <div className="w-100 search-select-wrap">
//               <AsyncSelect
//                 classNamePrefix="react_select"
//                 loadOptions={this.loadSets}
//                 isClearable={
//                   selectSetOptions && selectSetOptions.value ? true : false
//                 }
//                 defaultOptions={defaultSetoptions}
//                 onBlur={this.props.onBlur}
//                 placeholder="Type to select sets"
//                 className={
//                   errors && errors.setId
//                     ? "is-invalid form-control search-input-wrap"
//                     : ""
//                 }
//                 onChange={e => this.props.handleInputChange(e)}
//                 value={
//                   recentAddedSet &&
//                   recentAddedSet.label &&
//                   recentAddedSet.value
//                     ? recentAddedSet
//                     : selectSetOptions
//                 }
//               />
//               <FormFeedback>
//                 {errors &&
//                 errors.setId &&
//                 selectSetOptions &&
//                 selectSetOptions.value === ""
//                   ? errors.setId
//                   : null}
//               </FormFeedback>
//             </div>
//           </InputGroup>
//         </FormGroup>
