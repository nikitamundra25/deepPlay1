import React from "react";
import { Button, Row, Col, FormGroup, Input } from "reactstrap";
import Dropzone from "react-dropzone";
import "./index.css";
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
          window.location.href = "./setting";
        } else {
          this.handleKeyboardEvent();
        }
      }
    }
    return result;
  };

  handleKeyboardEvent = e => {
    if (e.charCode === 13) {
    window.location.href = "./setting";
    }
  };

  paste = e => {
    this.setState({
      isPaste: true
    });
  };

  render() {
    const { errors, url } = this.state;
    return (
      <div>
        <div className="move-wrap">
          <h3>Create a Move</h3>
          <p>Trim any video to create a move</p>
        </div>
        <div className="move-wrap-inside">
          <Row>
            <Col md="6">
              <Dropzone
                onDrop={this.onSelectFile}
                accept="video/mp4 , video/wmv ,video/avi,./webM"
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => {
                  return (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div>
                        <Button
                          color="default"
                          type="button"
                          className="btn-btn-right"
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </Dropzone>
            </Col>
            <Col md="6">
              <FormGroup>
                <Input
                  id="url"
                  className="capitalize"
                  placeholder="Paste YouTube URL"
                  type="text"
                  name="url"
                  onPaste={this.paste}
                  onKeyPress={this.handleKeyboardEvent}
                  onChange={this.handleChange}
                  value={url}
                />
                {errors ? <p style={{ color: "red" }}> {errors} </p> : null}
              </FormGroup>
            </Col>
          </Row>
          <iframe
            src={url}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
      </div>
    );
  }
}

export default MoveComponent;
