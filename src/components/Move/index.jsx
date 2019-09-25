import React from "react";

import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  UncontrolledTooltip,
  InputGroup, InputGroupText, InputGroupAddon
} from "reactstrap";
import Dropzone from "react-dropzone";
import "./index.scss";
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
  handlePasteEvent = () => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$");
  }
  render() {
    const { error } = this.state;
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
                <Label className="upload-file-wrap"> 
                <Dropzone
                  onDrop={this.onSelectFile}
                  accept="video/mp4 , video/wmv ,video/avi,./webM"
                  multiple={false}
                  id
                >
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="add-more-img-wrap">
                          <div className="add-more-text">
                          <img
                  alt="..."
                  src={require("assets/img/icons/common/picture.svg")}
            className="w-100"
                />

                            <div className="upload-heading">Drag a profile photo here </div>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Dropzone>
                  </Label>
                  <FormGroup className="flex-fill">
                    <InputGroup>
                    <Input
                        id="url"
                        className="capitalize pl-2"
                        placeholder="Paste YouTube URL"
                        type="text"
                        onpaste={this.handlePasteEvent}
                        name="url"
                        onChange={this.handleChange}
                        value={this.state.url}
                      />
                   

                    </InputGroup>
                    {error ? <p style={{ color: "red" }}> {error} </p> : null}
                  </FormGroup>
                  {/* <div className="">
                <span
                  onClick={this.onAddMove}
                  className={this.state.title ? "cursor_pointer" : "disable-span"}
                  id="move"
                >
                  <i className="fas fa-plus-square fa-2x "></i>
                </span>
                <UncontrolledTooltip placement="top" target="move">
                  Add a move
            </UncontrolledTooltip>
              

              </div> */}
                </div>
                <div className="text-center">
                  <Button
                    color=" "
                    type="button"
                    className="btn-black btn mt-3"

                  >
                    <i className="fas fa-plus mr-1"></i>
                    Add a Move
                  </Button>
                </div>
              </CardBody>
            </div>
          </Card>
        </div>

        <div>

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
                    onpaste={this.handlePasteEvent}
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
      </>
    );
  }
}

export default MoveComponent;
