import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Col,
  Row,
} from "reactstrap";
import VideoView from "./videoView";
import VideoDetails from "./videoDetails";

import "./index.scss"
// core components
class MoveDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false
    };
  }

  componentDidMount = () => {

  }
  render() {
    return (
      <>
        <div className="create-set-section step-2 mt-2 ">
          <Card className="w-100">
            <CardBody>
              <div>
                <span className={"cursor_pointer"}> <i className="fas fa-long-arrow-alt-left" />{" "}Back</span>
              </div>
              <Col md={"12"}>
                <Row className={"mt-3"}>
                  <VideoView />
                  <VideoDetails/>
                </Row>
              </Col>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveDetails);
