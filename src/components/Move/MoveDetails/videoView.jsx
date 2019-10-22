import React from "react";
import {
  Col,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip
} from "reactstrap";
import { AppConfig } from "../../../config/Appconfig";
import "./index.scss";

// core components
class VideoView extends React.Component {
  video;
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false
    };
  }
  /**
   *
   */
  componentDidMount() {
    this.video = document.getElementById("video-trimmer");
    this.video.addEventListener("timeupdate", () => {
      const { timer } = this.props;
      const { min, max } = timer || {};
      const { currentTime } = this.video;
      if (parseInt(currentTime) >= max) {
        this.video.pause();
        setTimeout(() => {
          this.video.currentTime = min;
          this.video.play();
        }, 500);
      }
    });
    let timeDuration = [];
    this.video.onloadeddata = () => {
      const { duration } = this.video;
      for (let index = 0; index < duration; index = index + duration / 20) {
        timeDuration.push(index);
      }
      const data = {
        timeDuration: timeDuration,
        videoMaxDuration: duration
      };
      this.props.videoDuration(data);
    };
  }
  /**
   *
   */
  componentDidUpdate({ timer: oldTimer, moveReducer }) {
    const prevMoveData = moveReducer.isCreatingAnotherMove;
    const newMoveData = this.props.moveReducer
      ? this.props.moveReducer.isCreatingAnotherMove
      : null;
    const { timer } = this.props;
    const { max: oldMax, min: oldMin } = oldTimer || {};
    const { max, min } = timer || {};
    if (this.video && (min !== oldMin || max !== oldMax)) {
      this.video.currentTime = min;
    }
    if (prevMoveData !== newMoveData) {
      this.video.load();
    }
  }
  /**
   *
   */
  render() {
    const { moveReducer, description, title, isEdit } = this.props;
    const { moveDetails } = moveReducer;

    return (
      <>
        <Col lg={"6"}>
          <FormGroup className="flex-fill flex-column video-title-wrap">
            <div className=" w-100">
              <InputGroup className={"move-title-wrap"}>
                <Input
                  id="title"
                  className={"move-title"}
                  placeholder="Enter your title (optional)"
                  onChange={e => this.props.handleChange(e)}
                  type="text"
                  name="title"
                  value={title}
                />
                <InputGroupAddon
                  addonType="prepend"
                  className="discription-btn-wrap"
                >
                  <div onClick={this.props.handleDesriptionModal}>
                    <InputGroupText
                      id="description"
                      className={"discription-btn cursor_pointer"}
                    >
                      <i className="fas fas fa-info " />
                      <UncontrolledTooltip placement="top" target="description">
                        {description ? "Update Description" : "Add description"}
                      </UncontrolledTooltip>
                    </InputGroupText>
                  </div>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </FormGroup>
          {moveDetails && moveDetails.videoUrl ? (
            <>
              {
                !isEdit ?
                  <video width={"100%"} autoPlay loop id={"video-trimmer"} muted>
                    <source
                      src={`${AppConfig.API_ENDPOINT}${moveDetails.videoUrl}`}
                    />
                  </video> :
                  <video width={"100%"} autoPlay loop id={"video-trimmer"} muted>
                    <source
                      src={`${moveDetails.moveURL}`}
                    />
                  </video>
              }
            </>
          ) : (
              <span>No video available for trimming</span>
            )}
        </Col>
      </>
    );
  }
}

export default VideoView;
