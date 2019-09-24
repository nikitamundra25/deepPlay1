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
      error: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      error: "",
      [name]: value
    });

    // var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    // var match = value.match(regExp);
    // console.log(">>", match);
    // if (match && match[2].length == 11) {
    //   const finalUrl = "http://www.youtube.com/embed?v=" + match[2];
    //   this.setState({
    //     url: finalUrl
    //   });
    // } else {
    //   console.log("not match");
    // }
    if (value !== undefined || value !== "") {
      // eslint-disable-next-line
      var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
      var match = value.match(myregexp);
      if (match) {
        // myregexp.split("v=")[1].substring(0, 11);
        // console.log("kkkkkk", myregexp);
        // const finalUrl = "http://www.youtube.com/embed?v=" + myregexp;
        // console.log("final", finalUrl);

        console.log("matches");
      } else {
        this.setState({
          error: "You have entered wrong URL."
        });
      }
    }
  };

  render() {
    const { error } = this.state;
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
                  onChange={this.handleChange}
                  value={this.state.url}
                />
                {error ? <p style={{ color: "red" }}> {error} </p> : null}
              </FormGroup>
            </Col>
          </Row>
          <iframe
            src={this.state.url}
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
