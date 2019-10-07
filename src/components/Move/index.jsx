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
  Form
} from "reactstrap";
import "./index.scss";
import { logger } from "helper/Logger";
import { connect } from "react-redux";
import { downloadYoutubeVideoRequest } from "../../actions";

// core components
class MoveComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isYouTubeUrl: false,
      isPaste: false
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      errors: "",
      [name]: value
    });
    if (value !== undefined || value !== "") {
      // eslint-disable-next-line
      var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
      var match = value.match(myregexp);
      if (match) {
        const ValidYouTubeUrl = this.validateYouTubeUrl(value);
        this.setState({
          url: ValidYouTubeUrl,
          isYouTubeUrl: true
        }, () => {
          this.handleMoveUpload()
        })
      } else {
        this.setState({
          errors: {
            validUrl: "Enter a valid youtube url."
          }
        });
      }
    }else{
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

  handleMoveUpload = () => {
    this.setState({
      errors: {}
    });
    try {
      if (!this.state.url) {
        this.setState({
          errors: {
            notUrl: "Enter youtube video link"
          }
        });
        if (this.state.errors) {
          return;
        }
        return;
      }
      const payload = {
        url: this.state.url,
        isYoutubeUrl: this.state.isYouTubeUrl
      };
      this.props.downloadVideo(payload);
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

  handleVideoFileSelect = (e) => {
    let files = e.target.files
    this.setState({
      url: files[0].name,
      errors:""
    }, () => {
      this.props.downloadVideo({ url: files[0], isYoutubeUrl: false })
    })
  }

  render() {
    const { errors, url } = this.state;
    const { moveReducer } = this.props;
    const { isVideoDownloading } = moveReducer;
    return (
      <>
        <div className="create-set-section step-2 ">
          <Card className="w-100 set-content-wrap">
            <div className="set-content-block w-100">
              <CardHeader className="">
                <div className="content-header set-header flex-column">
                  <span className="content-title">CREATE A MOVE</span>
                  <p className="font-weight-bold">
                    Trim any video to create a move
                  </p>
                </div>
              </CardHeader>
              <CardBody className="">
                <div className="create-set-tile">
                  <Form inline className="url-update-wrap">
                    <div className="text-center mr-2">
                      <FormGroup>
                        <Label
                          for="videoUpload"
                          className="btn-black btn"
                        >
                          <i className="fa fa-cloud-upload mr-2"></i>
                          {isVideoDownloading ? "Please wait..." : "Upload"}
                        </Label>
                        <CustomInput
                          onChange={this.handleVideoFileSelect}
                          type="file"
                          disabled={isVideoDownloading ? true : false}
                          className={"d-none"}
                          id="videoUpload"
                          name="customFile" />
                      </FormGroup>
                      {/* <Input
                        color=" "
                        type="file"

                        className="btn-black btn mt-3"
                        disabled={isVideoDownloading ? true : false}
                      // onClick={this.handleMoveUpload}
                      >

                      </Input> */}
                    </div>
                    <FormGroup className="flex-fill flex-column ">
                      <div className="flex-fill w-100">
                        <Input
                          id="url"
                          className={
                            errors
                              ? "capitalize pl-2 boder-1-invalid is-invalid w-100"
                              : "capitalize pl-2 boder-1 w-100"
                          }
                          placeholder="Paste YouTube Video URL or Type URL Manually"
                          type="text"
                          onPaste={this.handlePasteEvent}
                          name="url"
                          onChange={this.handleChange}
                          value={url}
                        />
                        <FormFeedback>
                          {errors.notUrl
                            ? errors.notUrl
                            : errors.validUrl && url
                              ? errors.validUrl
                              : null}
                        </FormFeedback>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
              </CardBody>
            </div>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    moveReducer: state.moveReducer
  };
};
const mapDispatchToProps = dispatch => ({
  downloadVideo: data => dispatch(downloadYoutubeVideoRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveComponent);
