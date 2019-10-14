import React from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Input
} from "reactstrap";
import addPlusIc from "../../../assets/img/add_plus.png";
import starIc from "../../../assets/img/star.svg";
import { AppConfig } from "config/Appconfig";
import "./index.scss";

// core components
class MoveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      videoIndex: -1,
      isVideoChecked: false,
      page: 1
    };
  }

  handleVideoCheckBox = (index) => {
    this.setState({
      isVideoChecked: true,
      videoIndex: index
    })
  }

  handleVideoPlay = (index) => {
    let myVideo = document.getElementById(`webm-video-${index}`);
    myVideo.play();
  }
  handleVideoPause = (index) => {
    let myVideo = document.getElementById(`webm-video-${index}`);
    myVideo.pause();
  }
  render() {
    const { show, setIndex, moveCount, movesOfSet } = this.props
    const { isVideoChecked, videoIndex } = this.state
    return (
      <section className="play-list-collection set-detail-section">
        <Row>
          <Col md="12" className={"pb-3"}>
            <div class="content-header mt-3 mb-1">
              <span class="content-title">Moves in this set ({moveCount || 0})</span>
            </div>
          </Col>
          <div className="play-list-tile" >
            <div className="play-list-block  d-flex h-100 ">
              <div className="add-play-list-block d-flex w-100 justify-content-center align-items-center text-center flex-column">
                <div className="h5 font-dark-bold add-img">
                  <img src={addPlusIc} alt="" />
                </div>
                <Button color={" "} className="fill-btn btn mt-4">
                  {" "}
                  Create Now
                </Button>
              </div>
            </div>
          </div>
          {movesOfSet.map((video, index) => {
            return (
              <div onClick={() => this.props.handleShowVideo(index)} className="play-list-tile cursor_pointer" key={index}>
                <div className="play-list-block">
                  <div className="play-sub-block" onMouseLeave={() => this.handleVideoPause(index)}>
                    <div onMouseOver={() => this.handleVideoPlay(index)} className="play-list-img blur-img-wrap checked-wrap">
                      <div className="custom-control custom-control-alternative custom-checkbox set-img-thumnail">
                        {
                          !isVideoChecked ?
                            <span onClick={() => this.handleVideoCheckBox(index)} className="plus-ic-wrap">
                              <i className="text-white fa fa-plus-circle" aria-hidden="true" />
                            </span> :
                            <Input
                              className="custom-control-input"
                              id="customCheckRegister"
                              name={"videoChecked"}
                              value={videoIndex === index ? true : false}
                              type="checkbox"
                            />
                        }
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        ></label>
                      </div>
                      <div className="star-wrap">
                        <img src={starIc} alt={"star"} />
                      </div>
                      <video width={"100%"} id={`webm-video-${index}`} muted={false}>
                        <source
                          src={`${AppConfig.IMAGE_ENDPOINT}${video.moveURL}`}
                          type="video/webm"
                        />
                      </video>
                      <div
                        className="blur-img"
                        style={{ background: "#000" }}
                      />
                    </div>

                    <div onMouseLeave={() => this.props.closePopOver(index, show)} className="play-list-text">
                      <div className="text-capitalize play-list-heading h6 m-0">
                        {video.title || "unnamed"}
                      </div>
                      <div
                        onMouseOver={() =>
                          this.props.showPopOver(index, show)
                        }
                        className={"tooltip-btn-wrap right-btn-tip"}
                      >
                        <span className="cursor_pointer">
                          {" "}
                          <i className="fas fa-ellipsis-v setting-icon "></i>
                        </span>
                        {show && setIndex === index ? (
                          <ButtonGroup
                            onMouseOver={() =>
                              this.props.showPopOver(index, show)
                            }
                            size="sm">
                            <Button>
                              Copy
                            </Button>
                            <Button>Transfer</Button>
                            <Button>Remove</Button>
                          </ButtonGroup>) :
                          null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Row>
      </section >
    );
  }
}

export default MoveList;
