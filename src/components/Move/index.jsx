import React from "react";

import {
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  InputGroup,
  FormFeedback
} from "reactstrap";
import "./index.scss";
import { logger } from "helper/Logger";

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
          errors: "You have entered wrong URL."
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
          this.props.redirectTo("/setting");
        } else {
          this.handleKeyboardEvent();
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
      if (!this.state.url) {
        this.setState({
          errors: "Enter youtube video link"
        });
        return;
      }
      // const payload = {
      //   url: this.state.url,
      // }
      //this.props.loginRequest(payload)
    } catch (error) {
      logger(error);
    }
  }

  handleKeyboardEvent = e => {
    if (e.charCode === 13) {
      this.props.redirectTo("/setting");
    }
  };

  handlePasteEvent = e => {
    this.setState({
      isPaste: true
    });
  };

  render() {
    const { errors } = this.state;
    console.log("##############", errors);

    return (
      <>
        <div className="create-set-section step-2 mt-2 ">
          <Card className="w-100 set-content-wrap">
            <div className="set-content-block w-100">
              <CardHeader className="">
                <div className="content-header set-header flex-column">
                  <span className="content-title">CREATE A MOVE</span>
                  <p className="font-weight-bold">Trim any video to create a move</p>
                </div>
              </CardHeader>
              <CardBody className="">
                <div className="create-set-tile">
                  <FormGroup className="flex-fill">
                    <InputGroup>
                      <Input
                        id="url"
                        className={errors ? "capitalize pl-2 .boder-1-invalid is-invalid" : "capitalize pl-2 boder-1"}
                        placeholder="Paste YouTube URL or Type URL Manually"
                        type="text"
                        onPaste={this.handlePasteEvent}
                        name="url"
                        onChange={this.handleChange}
                        value={this.state.url}
                      />
                      <FormFeedback>
                        {errors ? errors : null}
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>
                </div>
                <div className="text-center">
                  <Button
                    color=" "
                    type="button"
                    onClick={this.handleMoveUpload}
                    className="btn-black btn mt-3"
                  >
                    Upload
                     {" "}
                    <i className="fas fa-upload" />
                  </Button>
                </div>
              </CardBody>
            </div>
          </Card>
        </div>
      </>
    );
  }
}

export default MoveComponent;
