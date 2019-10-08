import React from "react";
import MoveComponent from "../../components/Move";
import { connect } from "react-redux";
import FrameDetails from "components/Move/MoveDetails/FrameDetails";

// core components
class Move extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: []
    };
  }
  async componentDidMount() {
    console.time("videoRender");
    const res = await this.extractFramesFromVideo(
      "/5d95d121e2998035dac56ad51570099990950deep_play_video.webm"
    );
    this.setState({
      frames: res
    });
    console.timeEnd("videoRender");
  }
  extractFramesFromVideo = async (videoUrl, fps = 0.5) => {
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
      video.onloadedmetadata = async () => {
        console.log(video.duration);
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
          frames.push({ img: base64ImageData, time: currentTime });

          currentTime += interval;
          console.log(video.currentTime);
        }
        console.log("Resolved");
        resolve(frames);
      };
    });
  };
  render() {
    const { frames } = this.state;
    return (
      <>
        <MoveComponent />
        <div className={"row"}>
          <div className={"col-12"}>
            <FrameDetails frames={frames} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Move);
