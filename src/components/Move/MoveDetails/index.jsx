import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";
import VideoView from "./videoView";
import VideoDetails from "./videoDetails";
import { getMoveDetailsRequest, getAllSetRequest } from "../../../actions";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
import FrameDetails from "./FrameDetails";
// core components
class MoveDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false,
      timer: {
        min: 0,
        max: 15
      }
    };
  }

  componentDidMount = () => {
    const location = this.props.location.pathname;
    const moveId = location.split("/");
    this.props.getMoveDetailsRequest({ moveId: moveId[2] });
    this.props.getAllSetRequest({ isSetNoLimit: false });
  };
  /**
   *
   */
  onTimerChange = timer => {
    this.setState({
      timer
    });
  };
  /**
   *
   */
  render() {
    const { setReducer, moveReducer } = this.props;
    const { moveDetails } = moveReducer;
    const { frames, videoMetaData } = moveDetails || {};
    const { timer } = this.state;
    return (
      <>
        <div className="create-set-section step-2 ">
          <Card className="w-100">
            <CardBody>
              <div>
                <span
                  onClick={() => {
                    this.props.redirectTo("/move");
                  }}
                  className={"cursor_pointer back-arrow"}
                >
                  {" "}
                  <i className="fas fa-long-arrow-alt-left" /> Back
                </span>
              </div>
              <Row>
                <Col md={"12"}>
                  <Row className={"mt-3"}>
                    {moveDetails && moveDetails.videoUrl ? (
                      <>
                        <VideoView moveReducer={moveReducer} timer={timer} />
                        <VideoDetails setReducer={setReducer} />
                      </>
                    ) : (
                      <Loader />
                    )}
                  </Row>
                </Col>
              </Row>
              <FrameDetails
                frames={frames || []}
                videoMetaData={videoMetaData || {}}
                onTimerChange={this.onTimerChange}
              />
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  setReducer: state.setReducer,
  moveReducer: state.moveReducer
});
const mapDispatchToProps = dispatch => ({
  getMoveDetailsRequest: data => dispatch(getMoveDetailsRequest(data)),
  getAllSetRequest: data => dispatch(getAllSetRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveDetails);
