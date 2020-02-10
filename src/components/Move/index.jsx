import React from "react";
import {
  FormGroup,
  Input,
  Label,
  CustomInput,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  UncontrolledTooltip,
  Form,
  Progress,
  Button
} from "reactstrap";
import "./index.scss";
import { logger } from "helper/Logger";
import { connect } from "react-redux";
import {
  downloadYoutubeVideoRequest,
  videoCancelRequest,
  getSetDetailsRequest
} from "../../actions";
import { ConfirmBox } from "../../helper/SweetAleart";

// core components
class MoveComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isYouTubeUrl: false,
      isPaste: false,
      fileErr: ""
    };
  }

  componentDidMount = () => {
    const search = window.location.search;
    const setId = search.split("=");
    if (setId && setId.length && setId[1]) {
      this.props.getSetDetailsRequest({ setId: setId[1] });
    }
  };

  componentDidUpdate = ({ moveReducer }) => {
    const { cancelVideo } = this.props.moveReducer;
    if (
      this.props.moveReducer &&
      moveReducer.cancelVideo !== this.props.moveReducer.cancelVideo
    ) {
      if (cancelVideo) {
        this.setState({
          url: ""
        });
      }
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      errors: "",
      [name]: value.trim()
    });
    if (value !== undefined || value !== "") {
      // eslint-disable-next-line
      var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
      var match = value.match(myregexp);
      if (match) {
        const ValidYouTubeUrl = this.validateYouTubeUrl(value);
        if (ValidYouTubeUrl) {
          this.setState(
            {
              url: ValidYouTubeUrl,
              isYouTubeUrl: true
            },
            () => {
              this.handleMoveUpload(e);
            }
          );
        } else {
          this.setState({
            errors: {
              validUrl:
                'We accept only this "https://www.youtube.com/watch?v=1GWyCJHuNms" format.'
            }
          });
        }
      } else {
        this.setState({
          errors: {
            validUrl: "Enter a valid youtube url."
          }
        });
      }
    } else {
      this.setState({
        errors: ""
      });
    }
  };

  validateYouTubeUrl = url => {
    let result = "";
    if (url !== undefined || url !== "") {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=|\?v=)([^#]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length === 11) {
        result =
          "https://www.youtube.com/embed/" +
          match[2] +
          "?autoplay=0&enablejsapi=1";
      }
    }
    return result;
  };

  handleMoveUpload = e => {
    if (!this.state.isPaste) {
      e.preventDefault();
    }
    try {
      if (!this.state.url) {
        this.setState({
          errors: {
            notUrl: "Enter youtube video link"
          }
        });
        return;
      }
      if (!this.state.errors) {
        const search = window.location.search;
        const setId = search.split("=");
        const payload = {
          url: this.state.url,
          isYoutubeUrl: this.state.isYouTubeUrl,
          setId: setId ? setId[1] : ""
        };
        this.props.downloadVideo(payload);
      }
    } catch (error) {
      logger(error);
    }
  };

  handlePasteEvent = e => {
    if (e.target.name) {
      this.setState({
        isPaste: true
      });
    }
  };

  handleVideoFileSelect = async e => {
    this.setState({
      fileErr: ""
    });
    let files = e.target.files;
    // let videoDuration;
    if (files.length) {
      const fileType = files ? files[0].type.split("/") : "";
      if (fileType[1] !== "mp4" && fileType[1] !== "webm") {
        await ConfirmBox({
          title: "Oops...",
          text:
            "Unsupported file type!! We accept only video type of mp4 & webm.",
          type: "error",
          showCancelButton: false,
          confirmButtonText: "Okay"
        });
      } else {
        let video = document.createElement("video");
        video.setAttribute("src", window.URL.createObjectURL(files[0]));
        video.onloadeddata = async function(event) {
          // const { duration } = event.srcElement;
          // videoDuration = duration;
          // if (duration >= 36) {
          //   await ConfirmBox({
          //     title: "Oops...",
          //     text: "Video duration should be less than 1 hour.",
          //     type: "error",
          //     showCancelButton: false,
          //     confirmButtonText: "Okay"
          //   });
          //   return;
          // }
        };
        const search = window.location.search;
        const setId = search.split("=");
        this.setState(
          {
            url: files[0].name,
            errors: ""
          },
          () => {
            this.props.downloadVideo({
              url: files[0],
              isYoutubeUrl: false,
              setId: setId && setId.length ? setId[1] : null
            });
          }
        );
      }
    }
  };

  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.url && !this.state.errors) {
      this.handleMoveUpload(e);
    }
  };

  handleCancel = () => {
    this.props.videoCancelRequest();
  };

  render() {
    const { errors, url, fileErr } = this.state;
    const { moveReducer } = this.props;
    const { isVideoDownloading } = moveReducer;
    const location = window.location.href;
    const stemp = location.split("?");
    return (
      <>
        <div className="create-set-section step-2 create-move-section">
          <Card className="set-content-wrap create-a-move p-0">
            <div className="set-content-block w-100">
              <CardHeader className="border-bottom pt-4 pb-2">
                <div className="content-header set-header d-flex ">
                  {stemp[1] ? (
                    <div
                      onClick={() => {
                        window.history.back();
                      }}
                    >
                      <span className="cursor_pointer back-arrow create-move-back">
                        {" "}
                        <i className="fas fa-long-arrow-alt-left"></i> Back
                      </span>
                    </div>
                  ) : null}
                  <span className="content-title creat-set-title">
                    {isVideoDownloading ? "Preparing Move" : "Create New Move"}
                  </span>
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <div className="create-set-tile">
                  {isVideoDownloading ? (
                    <div className="url-update-wrap text-center download-process-container">
                      <Progress animated value={100} />
                      <h5>Please wait while we upload your video.</h5>
                      <p>
                        Please do not refresh or close this page while we are
                        processing.
                      </p>
                      <div className={"text-center"}>-Or-</div>
                      <p>Cancel video request by clicking below button.</p>
                      <div>
                        <Button
                          className={"btn btn-black"}
                          onClick={this.handleCancel}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Form
                      className="url-update-wrap"
                      onSubmit={e => this.onSubmitForm(e)}
                    >
                      <div className="ml-3 mr-3">
                        <FormGroup className="flex-fill flex-column ">
                          <Label className="text-center d-block mt-4 mb-3">
                            Paste YouTube Video URL or Type URL Manually{" "}
                          </Label>
                        </FormGroup>
                        <FormGroup
                          className={
                            errors
                              ? `flex-fill flex-column mt-0 form-custom-error error-with-append-btn`
                              : "flex-fill flex-column mt-0 form-custom-error"
                          }
                        >
                          <InputGroup>
                            <Input
                              id="url"
                              className={
                                errors
                                  ? " pl-2 boder-1-invalid is-invalid "
                                  : " pl-2 boder-1 "
                              }
                              placeholder="Ex: https://www.youtube.com/watch?v=I5t894l5b1w"
                              type="text"
                              onPaste={e => this.handlePasteEvent(e)}
                              name="url"
                              onChange={e => this.handleChange(e)}
                              value={url}
                            />
                            <FormFeedback>
                              {errors.validUrl && url ? errors.validUrl : null}
                              {errors.notUrl ? errors.notUrl : null}
                            </FormFeedback>
                            <InputGroupAddon
                              addonType="append"
                              id="upload-title"
                            >
                              <InputGroupText>
                                <i
                                  className="fa fa-exclamation-circle display-5"
                                  aria-hidden="true"
                                ></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <UncontrolledTooltip
                              placement="top"
                              target="upload-title"
                            >
                              Paste YouTube Video URL or Type URL Manually
                            </UncontrolledTooltip>
                          </InputGroup>
                          {/* <FormFeedback>
                            {errors.notUrl
                              ? errors.notUrl
                              : errors.validUrl && url
                              ? errors.validUrl
                              : null}
                          </FormFeedback> */}
                        </FormGroup>
                      </div>
                      <div className="divider-or mt-5 mb-5">
                        <span> OR </span>
                      </div>
                      <div className="text-center video-upload-manually pb-4">
                        <FormGroup>
                          <FormGroup className="flex-fill flex-column ">
                            <Label className="mb-3 set-wrap ">
                              Upload video file from your system (mp4, webm){" "}
                            </Label>
                          </FormGroup>
                          <Label
                            for="videoUpload"
                            className="btn-black btn url-upload-btn"
                          >
                            <i className="fa fa-cloud-upload mr-2"></i>
                            {isVideoDownloading ? "Please wait..." : "Upload"}
                          </Label>
                          <CustomInput
                            onChange={this.handleVideoFileSelect}
                            type="file"
                            accept="video/mp4,video/webm"
                            disabled={false}
                            className={fileErr ? "is-invalid d-none" : "d-none"}
                            id="videoUpload"
                            name="customFile"
                          />
                        </FormGroup>
                      </div>
                    </Form>
                  )}
                </div>
              </CardBody>
            </div>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  moveReducer: state.moveReducer
});
const mapDispatchToProps = dispatch => ({
  downloadVideo: data => dispatch(downloadYoutubeVideoRequest(data)),
  videoCancelRequest: () => dispatch(videoCancelRequest()),
  getSetDetailsRequest: data => dispatch(getSetDetailsRequest(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(MoveComponent);
