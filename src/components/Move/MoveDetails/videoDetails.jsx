import React from "react";
import {
  Col,
} from "reactstrap";
import "./index.scss"

// core components
class VideoDetails extends React.Component {
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
          <div>
            <h3 className={"pb-3"}><strong>Trim your video</strong></h3>
            <span>Use sliders below to trim your video (15 secs max).Or use your arrow keys on timestamps to get really precise.</span>
          </div>
        </Col>
      </>
    );
  }
}

export default VideoDetails;
