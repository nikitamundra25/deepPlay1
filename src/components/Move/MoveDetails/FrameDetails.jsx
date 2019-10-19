import React, { Component } from "react";
import InputRange from "react-input-range";
import { AppConfig } from "config/Appconfig";
import { Input, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { orderBy } from "natural-orderby";
import { SecondsToHHMMSS } from "helper/Time";
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
  /**
   *
   */
  render() {
    const { frames, videoMetaData } = this.props;
    const { duration } = videoMetaData || {};
    const { seconds: maxValue } = duration || {};
    const { time } = this.state;
    return (
      <div className="fram-picker">
        <div className=" mt-5 video-controls " id={"video-controls"}>
          {/* <div id={"left-container"}></div>
          <div id={"right-container"}></div> */}
          <InputRange
            draggableTrack
            maxValue={maxValue}
            minValue={0}
            formatLabel={() => `${time.min}`}
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
                    type={"select"}
                    value={time.min}
                    onChange={e =>
                      this.labelValueChange({
                        ...time,
                        min: parseInt(e.target.value)
                      })
                    }
                  >
                    {this.renderOptions("min")}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={"6"}>
                <FormGroup inline className="m-0">
                  <Label>Trim to: </Label>
                  <Input
                    type={"select"}
                    value={time.max}
                    onChange={e =>
                      this.labelValueChange({
                        ...time,
                        max: parseInt(e.target.value)
                      })
                    }
                  >
                    {this.renderOptions("max")}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col
            md={"6"}
            className="text-right d-flex align-items-end justify-content-end"
          >
            <Button
              color={"default"}
              className={"btn-black btn url-upload-btn"}
              onClick={e => this.props.completeEditing(e)}
            >
              Finish
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FrameDetails;
