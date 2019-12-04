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

class FrameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        min: 0,
        max: 15
      }
    };
  }

  componentDidUpdate() {
    this.updateSlider();
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
                const siderWidth = newChild.childNodes[0].style.width;
                const actualRightWidth = 100 - parseFloat(rightWidth);
                // set properties
                leftContainer.style.width = leftWidth;
                leftContainer.style.left = 0;
                rightContainer.style.width = `${actualRightWidth}%`;
                rightContainer.style.left = rightWidth;
                leftCount[0].style.left = leftWidth;
                rightCount[0].style.left = rightWidth;
                logger(leftWidth, actualRightWidth, siderWidth);
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
      if (min !== time.min && min >= max) {
        max =
          min + AppConfig.MAX_VIDEO_LENGTH < maxValue
            ? min + AppConfig.MAX_VIDEO_LENGTH
            : maxValue;
        value.max = max;
      } else if (max !== time.max && min >= max) {
        min =
          max - AppConfig.MAX_VIDEO_LENGTH < 0
            ? max - AppConfig.MAX_VIDEO_LENGTH
            : 0;
        value.min = min;
      }
      if (max - min > AppConfig.MAX_VIDEO_LENGTH) {
        this.setState(
          {
            time: {
              max: max === time.max ? min + AppConfig.MAX_VIDEO_LENGTH : max,
              min: min === time.min ? max - AppConfig.MAX_VIDEO_LENGTH : min
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
      return
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
    const { videoMetaData } = this.props;
    const { duration } = videoMetaData || {};
    const trimmValue = e.target.value
    if (parseInt(trimmValue) >= 0) {
      if (
        parseInt(max) - parseInt(min) === AppConfig.MAX_VIDEO_LENGTH ||
        parseInt(max) - parseInt(min) === 1
      ) {
        if (e.keyCode === 38) {
          if (SecondsToMMSSMM(max + 0.1) <= SecondsToMMSSMM(duration.seconds)) {
            let changeValue = {
              min: min + 0.1,
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
        } else if (e.keyCode === 40) {
          if (min > 0) {
            let changeValue = {
              min: min - 0.1,
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
        } else {
          this.setState(
            {
              time: time
            },
            () => {
              this.props.onTimerChange(this.state.time);
            }
          );
        }
      } else {
        if (name === "from") {
          if (e.keyCode === 38) {
            if (SecondsToMMSSMM(max + 0.1) <= SecondsToMMSSMM(duration.seconds)) {
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
            }
          } else if (e.keyCode === 40) {
            if (min > 0) {
              let changeValue = {
                min: min - 0.1,
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
            if (SecondsToMMSSMM(max + 0.1) <= SecondsToMMSSMM(duration.seconds)) {
              let changeValue = {
                min: min,
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
          } else if (e.keyCode === 40) {
            if (min > 0) {
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
        }
      }
    }
  };
  /**
   *
   */
  render() {
    const { frames, videoMetaData, isIosDevice } = this.props;
    const { duration } = videoMetaData || {};
    const { seconds: maxValue } = duration || {};
    const { time } = this.state;

    return (
      <div className="fram-picker">
        <div className=" mt-5 video-controls " id={"video-controls"}>
          <div id={"left-container"}></div>
          <div id={"right-container"}></div>
          <InputRange
            draggableTrack
            maxValue={maxValue}
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
                return (
                  <div className="frem-inner" key={index}>
                    <img src={frame} alt={`Frame ${index + 1}`} />
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

export default FrameDetails;
