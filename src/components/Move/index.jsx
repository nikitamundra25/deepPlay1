import React from "react";
import {
  FormGroup,
  Input,
  Button,
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
        this.validateYouTubeUrl(value);
        console.log("matches");
      } else {
        this.setState({
          errors: {
            validUrl: "You have entered wrong URL."
          }
        });
      }
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
        this.setState({
          url: result
        });
        if (this.state.isPaste) {
          this.handleMoveUpload();
        }
      }
    }
    return result;
  };

  handleMoveUpload = () => {
    this.setState({
      errors: {}
    });
    try {
      console.log("$$$$$$$$$$$$$$$$", this.state.url);

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
        url: this.state.url
      };
      this.props.downloadVideo(payload);
    } catch (error) {
      logger(error);
    }
  };

  handlePasteEvent = e => {
    if (e.target.value) {
      this.handleChange(e);
      this.setState({
        isPaste: true
      });
    }
  };

  render() {
    const { errors, url } = this.state;
    const { moveReducer } = this.props;
    const { isVideoDownloading } = moveReducer;
    return (
      <>
        <div className="create-set-section step-2 mt-2">
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
                      <Button
                        color=" "
                        type="button"
                        className="btn-black btn mt-3"
                        disabled={isVideoDownloading ? true : false}
                        onClick={this.handleMoveUpload}
                      >
                        <i className="fa fa-cloud-upload mr-2"></i>
                        {isVideoDownloading ? "Please wait..." : "Upload"}
                      </Button>
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
        {/* <div className="create-set-section step-2 mt-2">
          <Card className="w-100 set-content-wrap">
            <div className="set-content-block w-100">
              <CardHeader className="">
                <div className="content-header set-header flex-column">
                  <span className="content-title"> your move has been created!</span>
                </div>
              </CardHeader>
              <CardBody className="">
                <div className="d-flex vieos-add-section video-add-banner justify-content-center align-items-center">
                  <span className="play-ic-wrap">
                    <i className="fa fa-play" aria-hidden="true"></i>
                  </span>
                </div>
                <p className="font-weight-bold mt-3 text-center h5">Would you like to create another Move from the same video?</p>
                <div className="text-center mt-4">
                  <Button className="btn-line-black">Yes create another</Button>
                  <Button className="btn-black">No i'am done</Button>
                </div>
              </CardBody>
            </div>
          </Card>
        </div> */}
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
