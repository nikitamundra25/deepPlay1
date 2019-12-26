import React, { Component } from "react";
import InputRange from "react-input-range";
import { AppConfig } from "config/Appconfig";
import { Input, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { orderBy } from "natural-orderby";
import {
  SecondsToHHMMSS,
  //  SecondsToMMSS,
  SecondsToMMSSMM
} from "helper/Time";
import { logger } from "helper/Logger";
import videoLoading from "../../../assets/img/loder/loader.svg";

class YouTubeFrameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        min: 0,
        max: 15
      },
      imageLoadedIndex: []
    };
  }

  componentDidUpdate({ videoMaxDuration }) {
    this.updateSlider();
    if (videoMaxDuration !== this.props.videoMaxDuration) {
      if (this.props.videoMaxDuration <= 15) {
        this.setState({
          time: {
            min: 0,
            max: this.props.videoMaxDuration
          }
        });
      }
    }
  }

  /**
   *
   */

  updateSlider() {
    const containerEle = document.getElementById("video-controls");
    if (containerEle) {
      try {
        const { childNodes } = containerEle;
        for (let i = 0; i < childNodes.length; i++) {
          const child = childNodes[i];
          if (child.classList.contains("input-range")) {
            for (let k = 0; k < child.childNodes.length; k++) {
              const newChild = child.childNodes[k];
              if (newChild.classList.contains("input-range__track")) {
                const leftContainer = document.getElementById("left-container");
                const rightContainer = document.getElementById(
                  "right-container"
                );
                const leftCount = document.getElementsByClassName(
                  "input-range__label--min"
                );
                const rightCount = document.getElementsByClassName(
                  "input-range__label--max"
                );
                // get width for left and right container
                const leftWidth = newChild.childNodes[1].style.left;
                const rightWidth = newChild.childNodes[2].style.left;
                // const siderWidth = newChild.childNodes[0].style.width;
                const actualRightWidth = 100 - parseFloat(rightWidth);
                // set properties
                leftContainer.style.width = leftWidth;
                leftContainer.style.left = 0;
                rightContainer.style.width = `${actualRightWidth}%`;
                rightContainer.style.left = rightWidth;
                leftCount[0].style.left = leftWidth;
                rightCount[0].style.left = rightWidth;
              }
            }
          }
        }
      } catch (error) {
        logger(error);
      }
    }
  }
  /**
   *
   */
  labelValueChange = value => {
    let { min, max } = value;
    const { time } = this.state;
    const { videoMetaData } = this.props;
    const { duration } = videoMetaData || {};
    const { seconds: maxValue } = duration || {};
    if (min >= 0) {
      if (min !== parseInt(time.min) && min >= max) {
        max =
          parseInt(min) + AppConfig.MAX_VIDEO_LENGTH < maxValue
            ? parseInt(min) + AppConfig.MAX_VIDEO_LENGTH
            : maxValue;
        value.max = max;
      } else if (max !== parseInt(time.max) && min >= max) {
        min =
          max - AppConfig.MAX_VIDEO_LENGTH < 0
            ? max - AppConfig.MAX_VIDEO_LENGTH
            : 0;
        value.min = min;
      }
      if (parseInt(max) - parseInt(min) > AppConfig.MAX_VIDEO_LENGTH) {
        this.setState(
          {
            time: {
              max:
                parseInt(max) === Math.round(time.max)
                  ? parseInt(min) + AppConfig.MAX_VIDEO_LENGTH
                  : parseInt(max),
              min:
                parseInt(min) === Math.round(time.min)
                  ? parseInt(max) - AppConfig.MAX_VIDEO_LENGTH
                  : parseInt(min)
            }
          },
          () => {
            this.props.onTimerChange(this.state.time);
          }
        );
        return;
      }
      this.setState(
        {
          time: value
        },
        () => {
          this.props.onTimerChange(this.state.time);
        }
      );
    } else {
      return;
    }
  };
  /**
   *
   */
  renderOptions = type => {
    const options = [];
    const { videoMetaData } = this.props;
    const { duration } = videoMetaData || {};
    const { seconds: maxValue } = duration || {};
    for (
      let index = type === "max" ? 1 : 0;
      index <= (maxValue - (type === "max" ? 0 : 1) || 0);
      index++
    ) {
      options.push(
        <option key={index} value={index}>
          {SecondsToHHMMSS(index)}
        </option>
      );
    }
    return options;
  };

  handleKeyEvent = (e, name) => {
    const { time } = this.state;
    const { min, max } = time;
    const { videoMaxDuration } = this.props;
    const trimmValue = e.target.value;
    const extract = trimmValue.split(":");
    if (parseInt(extract[0]) >= 0) {
      if (parseInt(max) - parseInt(min) === AppConfig.MAX_VIDEO_LENGTH) {
        if (name === "from") {
          if (e.keyCode === 38) {
            if (
              SecondsToMMSSMM(max + 0.1) < SecondsToMMSSMM(videoMaxDuration)
            ) {
              let changeValue = {
                min: min + 0.1,
                max: max <= parseInt(videoMaxDuration) ? max : videoMaxDuration
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
          } else {
            let changeValue = {
              min: parseInt(min) === 0 ? 0 : min - 0.1,
              max: parseInt(max) - parseInt(min) === 1 ? max : max - 0.1
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
        } else {
          if (e.keyCode === 38) {
            let changeValue = {
              min: parseInt(max) - parseInt(min) === 1 ? min : min + 0.1,
              max:
                parseInt(max) === parseInt(videoMaxDuration)
                  ? parseInt(max) <= parseInt(videoMaxDuration)
                    ? max
                    : videoMaxDuration
                  : max + 0.1
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
              max: max - 0.1
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
      } else if (
        parseInt(max) - parseInt(min) < AppConfig.MAX_VIDEO_LENGTH &&
        parseInt(max) - parseInt(min) !== 1
      ) {
        if (name === "from") {
          if (e.keyCode === 38) {
            let changeValue = {
              min: parseInt(max) - parseInt(min) > 1 ? min + 0.1 : min,
              max:
                parseInt(max) <= parseInt(videoMaxDuration)
                  ? max
                  : parseInt(videoMaxDuration)
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
            let changeValue;
            if (parseFloat(min) > 0.1) {
              changeValue = {
                min:
                  parseInt(max) - parseInt(min) < AppConfig.MAX_VIDEO_LENGTH
                    ? min - 0.1
                    : parseInt(min) > 0
                    ? min
                    : 0,
                max: max <= parseInt(videoMaxDuration) ? max : videoMaxDuration
              };
            } else {
              changeValue = {
                min: 0,
                max: max
              };
            }
            this.setState(
              {
                time: changeValue
              },
              () => {
                this.props.onTimerChange(this.state.time);
              }
            );
          }
        } else {
          if (e.keyCode === 38) {
            let changeValue = {
              min: min,
              max:
                // parseInt(max) - parseInt(min) < 15
                //   ? max <= parseInt(videoMaxDuration)
                //     ? max + 0.1
                //     : parseInt(videoMaxDuration)
                //   : max
                parseInt(max) === parseInt(videoMaxDuration)
                  ? parseInt(max) <= parseInt(videoMaxDuration)
                    ? max
                    : parseInt(videoMaxDuration)
                  : max + 0.1
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
              max: parseInt(max) - parseInt(min) > 1 ? max - 0.1 : max
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
        console.log("heyyyyyyy");
        if (name === "from") {
          if (e.keyCode === 38) {
            if (
              SecondsToMMSSMM(max + 0.1) < SecondsToMMSSMM(videoMaxDuration)
            ) {
              let changeValue = {
                min: max - 1,
                max: max + 0.1
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
          } else {
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
                max:
                  parseInt(max) - parseInt(min) === AppConfig.MAX_VIDEO_LENGTH
                    ? max
                    : max + 0.1
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
          } else {
            console.log("height");

            if (parseInt(max) - parseInt(min) > 1) {
              let changeValue = {
                min: min - 1,
                max: max - 1
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
              if (parseInt(min) === 0) {
                let changeValue = {
                  min: min,
                  max: min + 1
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
                  min: min - 1,
                  max: max - 1
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
          }
        }
      } else {
        if (parseInt(max) - parseInt(min) > AppConfig.MAX_VIDEO_LENGTH) {
          let changeValue = {
            min: min,
            max: max - 1
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
      let changeValue = {
        min: 0,
        max: max <= 0 ? 0 + 1 : max
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
  };

  /**
   *
   */
  handleVideoLoading = index => {
    const ImageLoadedIndex = [...this.state.imageLoadedIndex];
    ImageLoadedIndex.push(index);
    this.setState({
      imageLoadedIndex: ImageLoadedIndex
    });
  };

  render() {
    const { frames, isIosDevice, moveReducer, videoMaxDuration } = this.props;
    const { time, imageLoadedIndex } = this.state;
    const { moveDetails } = moveReducer;
    return (
      <div className="fram-picker">
        <div className=" mt-5 video-controls " id={"video-controls"}>
          <div id={"left-container"}></div>
          <div id={"right-container"}></div>
          <InputRange
            draggableTrack
            maxValue={parseInt(videoMaxDuration)}
            minValue={0}
            formatLabel={(val, type) => {
              return type === "min"
                ? `${SecondsToMMSSMM(time.min >= 0 ? time.min : 0)}`
                : type === "max"
                ? `${SecondsToMMSSMM(time.max >= 0 ? time.max : 0)}`
                : null;
            }}
            value={time}
            onChange={this.labelValueChange}
          />
          <div className={"frame-container"}>
            <div className="fram-wrap py-4">
              {orderBy(frames).map((frame, index) => {
                return imageLoadedIndex &&
                  imageLoadedIndex.length - 1 === index ? (
                  <div className="video-spinner" key={index}>
                    <img src={videoLoading} alt="" />
                  </div>
                ) : (
                  <div className="frem-inner" key={index}>
                    <video
                      width={"100%"}
                      autoPlay={false}
                      // loop={true}
                      id={`video-trimmer-${index}`}
                      onLoadedData={() => {
                        this.handleVideoLoading(index);
                      }}
                    >
                      <source
                        src={
                          moveDetails && moveDetails.videoUrl
                            ? moveDetails.videoUrl +
                              `#t=${frame},${frames[index + 1]}`
                            : ""
                        }
                      />
                    </video>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={"clearfix"}></div>
        <Row className="mt-3">
          <Col sm={"6"}>
            <Row>
              <Col sm={"6"}>
                <FormGroup inline className="m-0">
                  <Label>Trim From: </Label>
                  <Input
                    type="text"
                    value={
                      SecondsToMMSSMM(time.min) < 0
                        ? "00:00:00"
                        : SecondsToMMSSMM(time.min)
                    }
                    // onChange={e =>
                    //   this.labelValueChange({
                    //     ...time,
                    //     min: parseInt(e.target.value)
                    //   })
                    // }
                    onKeyDown={e => this.handleKeyEvent(e, "from")}
                  >
                    {/* {this.renderOptions("min")} */}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={"6"}>
                <FormGroup inline className="m-0">
                  <Label>Trim to: </Label>
                  <Input
                    type={"text"}
                    value={SecondsToMMSSMM(time.max)}
                    // onChange={e =>
                    //   this.labelValueChange({
                    //     ...time,
                    //     max: parseInt(e.target.value)
                    //   })
                    // }
                    onKeyDown={e => this.handleKeyEvent(e, "to")}
                  >
                    {this.renderOptions("max")}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Label>
              <b>Tip:</b> Use the <i className="fas fa-arrow-up"></i> or{" "}
              <i className="fas fa-arrow-down"></i> arrow keys for finer
              adjustments
            </Label>
          </Col>
          <Col
            md={"6"}
            className="text-right d-flex align-items-end justify-content-end"
          >
            <Button
              color={"default"}
              className={"btn-line-black btn url-upload-btn mr-3"}
              onClick={() => {
                window.history.back();
              }}
            >
              Back
            </Button>
            <Button
              color={"default"}
              className={"btn-black btn url-upload-btn"}
              onClick={this.props.completeEditing}
            >
              {isIosDevice ? "Unsupported for this device" : "Finish"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default YouTubeFrameDetails;
