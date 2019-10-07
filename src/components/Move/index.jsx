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
        {/* <div className="content-header mt-3 mb-3">
          <span className="content-title">
           <div className="main-title">Add set</div>
            <div className="sub-title">
          Add youtube Url or upload video
        </div>
          </span>
         
        </div> */}
        <div className="create-set-section step-2 ">
          <Card className="set-content-wrap create-a-move p-0">
            <div className="set-content-block w-100">
              <CardHeader className="border-bottom pt-4 pb-2">
                <div className="content-header set-header flex-column">
                  <span className="content-title creat-set-title">Creat a move</span>
               
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <div className="create-set-tile">
                  <Form className="url-update-wrap">
                   <div className="ml-3 mr-3">
                    <FormGroup className="flex-fill flex-column ">
                    <Label className="text-center d-block mt-4 mb-3">Paste YouTube Video URL or Type URL Manually </Label>
                    </FormGroup>
                    <FormGroup className="flex-fill flex-column mt-0 ">
                    <InputGroup>
                        <Input
                          id="url"
                          className={
                            errors
                              ? "capitalize pl-2 boder-1-invalid is-invalid "
                              : "capitalize pl-2 boder-1 "
                          }
                          placeholder="Ex: https://www.youtube.com/watch?v=I5t894l5b1w"
                          type="text"
                          onPaste={this.handlePasteEvent}
                          name="url"
                          onChange={this.handleChange}
                          value={url}
                        />
                        <InputGroupAddon addonType="append" id="upload-title">
          <InputGroupText>
          <i class="fa fa-exclamation-circle display-5" aria-hidden="true"></i></InputGroupText>
        </InputGroupAddon>
        <UncontrolledTooltip
            placement="top"
            target="upload-title"
          >
            Paste YouTube Video URL or Type URL Manually 
          </UncontrolledTooltip>
        </InputGroup>
                        <FormFeedback>
                          {errors.notUrl
                            ? errors.notUrl
                            : errors.validUrl && url
                              ? errors.validUrl
                              : null}
                        </FormFeedback>
                      
                    </FormGroup>
                    </div>
                    <div className="divider-or mt-5 mb-5">
                     <span> OR </span>
                    </div>
                    <div className="text-center video-upload-manually pb-4">
                      <FormGroup>
                      <FormGroup className="flex-fill flex-column ">
                    <Label className="mb-3 set-wrap ">Upload video file from your system (mp4, 3gp, ogg, wmv, webm, flv etc..) </Label>
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
                          disabled={isVideoDownloading ? true : false}
                          className={"d-none"}
                          id="videoUpload"
                          name="customFile" />
                      </FormGroup>
                     
                    </div>
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
