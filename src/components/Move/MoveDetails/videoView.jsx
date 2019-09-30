import React from "react";
import {
  Col,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip
} from "reactstrap";
import "./index.scss"

// core components
class VideoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false
    };
  }

  render() {
    return (
      <>
        <Col md={"6"}>
          <FormGroup className="flex-fill flex-column ">
            <div className=" w-100">
              <InputGroup>
                <Input
                  id="title"
                  className={"move-title"}
                  placeholder="Enter your title (optional)"
                  type="text"
                  name="title"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText
                    id="description"
                    className={"discription-btn cursor_pointer"}
                  >
                    <i className="fas fas fa-info " />
                    <UncontrolledTooltip
                      placement="top"
                      target="description"
                    >
                      Add description
                  </UncontrolledTooltip>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </FormGroup>
          <div className="d-flex vieos-add-section video-add-banner ml-0 justify-content-center align-items-center">
            <span className="play-ic-wrap">
              <i className="fa fa-play" aria-hidden="true"></i>
            </span>
          </div>
        </Col>
      </>
    );
  }
}

export default VideoView;
