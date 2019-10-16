import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { logger } from "helper/Logger";
import InputRange from "react-input-range";
import { SecondsToHHMMSS } from "helper/Time";

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
      playBackSpeed: 1
    };
  }
  /**
   *
   */
  componentDidMount() {
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
  }
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
  handleSpeed = speed => {
    this.video.playbackRate = speed;
    this.setState({
      playBackSpeed: speed
    });
  };
  /**
   *
   */
  render() {
    const { video } = this.props;
    const { moveURL, videoMetaData, title } = video;
    const { duration } = videoMetaData || {};
    const { seconds: videoLength } = duration || {};
    const {
      isPlaying,
      currentTime,
      audioSpeed,
      isMuted,
      playBackSpeed
    } = this.state;
    logger(videoLength, videoMetaData);
    return (
      <div className="">
        <div className="video-slider-text">
          <div className="video-slider-title"> {title} </div>
          <div className="video-slider-dropDown">
            <div>
              <UncontrolledDropdown
                className="header-dropdown  custom-dropdown"
                direction="left"
              >
                <DropdownToggle color={" "}>
                  <span id="edit" className="cursor_pointer ml-4">
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>View Info</DropdownItem>
                  <DropdownItem>Tranfer</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        </div>
        <div className="video-slider-img">
          <div className="custom-video-player">
            <video width={"100%"} id="webm-video" muted={isMuted}>
              <source
                src={`${moveURL}`}
                type="video/webm"
              />
            </video>
            <div className={"controls"}>
              <div className="control-background-wrap"></div>
              <InputRange
                draggableTrack
                maxValue={videoLength}
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
                    {SecondsToHHMMSS(videoLength)}
                  </div>
                  <div className="volume-up-down control-tile">
                    <span onClick={this.toggleMute}>
                      {isMuted ? (
                        <i class="fas fa-volume-mute"></i>
                      ) : audioSpeed ? (
                        audioSpeed > 0.6 ? (
                          <i class="fas fa-volume-up"></i>
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
                      direction="auto"
                    >
                      <DropdownToggle color={" "}>
                        <span
                          id="playback-speed"
                          className="cursor_pointer ml-4"
                        >
                          {playBackSpeed !== 1 ? `${playBackSpeed}x` : null}{" "}
                          <i class="fa fa-clock-o" aria-hidden="true"></i>
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
                <div className="control-left-block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WebmView;
