import React, { Component } from "react";
import InputRange from "react-input-range";
import { AppConfig } from "config/Appconfig";
import { Input, Row, Col, FormGroup, Label } from "reactstrap";
import { orderBy } from "natural-orderby";
import { SecondsToHHMMSS } from "helper/Time";

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
      options.push(<option value={index}>{SecondsToHHMMSS(index)}</option>);
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
      <>
        <div>
          <InputRange
            draggableTrack
            maxValue={maxValue}
            minValue={0}
            formatLabel={value => ``}
            value={time}
            onChange={this.labelValueChange}
          />
        </div>
        {orderBy(frames).map((frame, index) => {
          return (
            <div
              key={index}
              style={{
                float: "left"
              }}
            >
              <img src={frame} alt={`Frame ${index + 1}`} width={100} />
              <br />
            </div>
          );
        })}
        <div className={"clearfix"}></div>
        <Row>
          <Col sm={"6"}>
            <Row>
              <Col sm={"6"}>
                <FormGroup inline>
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
                <FormGroup inline>
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
        </Row>
      </>
    );
  }
}

export default FrameDetails;
