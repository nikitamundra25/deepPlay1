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
import { AppConfig } from "../../../config/Appconfig";
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
    const { moveReducer } = this.props
    const { moveDetails } = moveReducer
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
          <video width={"100%"} controls>
            <source
              src={`${AppConfig.API_ENDPOINT}${moveDetails.videoUrl}`}
            />
          </video>
        </Col>
      </>
    );
  }
}

export default VideoView;
