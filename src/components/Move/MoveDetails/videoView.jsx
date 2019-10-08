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
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false
    };
  }
  componentDidMount() {
    var vid = document.getElementById("myVideo");
    vid.onloadedmetadata = function() {
      console.log(vid.duration);
    };
  }
  /**
   *
   */
  extractFramesFromVideo = async (videoUrl, fps = 25) => {
    return new Promise(async resolve => {
      // fully download it first (no buffering):
      let videoBlob = await fetch(videoUrl).then(r => r.blob());
      let videoObjectUrl = URL.createObjectURL(videoBlob);
      let video = document.createElement("video");
      let seekResolve;
      video.addEventListener("seeked", async function() {
        if (seekResolve) seekResolve();
      });

      video.src = videoObjectUrl;
      // workaround chromium metadata bug (https://stackoverflow.com/q/38062864/993683)
      while (
        (video.duration === Infinity || isNaN(video.duration)) &&
        video.readyState < 2
      ) {
        await new Promise(r => setTimeout(r, 1000));
        video.currentTime = 100 * Math.random();
        console.log("video.currentTime", video.currentTime);
      }
      console.log(video.duration);
      let duration = video.duration;

      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let [w, h] = [video.videoWidth, video.videoHeight];
      canvas.width = w;
      canvas.height = h;

      let frames = [];
      let interval = 1 / fps;
      let currentTime = 0;

      while (currentTime < duration) {
        video.currentTime = currentTime;
        // eslint-disable-next-line no-loop-func
        await new Promise(r => (seekResolve = r));

        context.drawImage(video, 0, 0, w, h);
        let base64ImageData = canvas.toDataURL();
        frames.push(base64ImageData);

        currentTime += interval;
        console.log(video.currentTime);
      }
      console.log("Resolved");
      resolve(frames);
    });
  };
  /**
   *
   */
  render() {
    const { moveReducer } = this.props;
    const { moveDetails } = moveReducer;
    return (
      <>
        <Col md={"6"}>
          <FormGroup className="flex-fill flex-column video-title-wrap">
            <div className=" w-100">
              <InputGroup className={"move-title-wrap"}>
                <Input
                  id="title"
                  className={"move-title"}
                  placeholder="Enter your title (optional)"
                  type="text"
                  name="title"
                />
                <InputGroupAddon addonType="prepend" className="discription-btn-wrap">
                  <InputGroupText
                    id="description"
                    className={"discription-btn cursor_pointer"}
                  >
                    <i className="fas fas fa-info " />
                    <UncontrolledTooltip placement="top" target="description">
                      Add description
                    </UncontrolledTooltip>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </FormGroup>
          {moveDetails && moveDetails.videoUrl ? (
            <>
              <video width={"100%"} autoPlay loop id={"myVideo"}>
                <source
                  src={`${AppConfig.API_ENDPOINT}${moveDetails.videoUrl}`}
                />
              </video>
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
