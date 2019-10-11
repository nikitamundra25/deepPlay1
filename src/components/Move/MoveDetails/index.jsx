import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";
import VideoView from "./videoView";
import VideoDetails from "./videoDetails";
import { getMoveDetailsRequest, getAllSetRequest } from "../../../actions";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
import FrameDetails from "./FrameDetails";
import { logger } from "helper/Logger";
import { completeVideoEditing } from "actions/Moves";
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
    this.videoDetails = React.createRef();
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
  completeEditing = e => {
    e.preventDefault();
    const { moveReducer } = this.props;
    const { moveDetails, isSavingWebM } = moveReducer;
    logger(isSavingWebM);
    const { _id: moveId } = moveDetails;
    const { timer } = this.state;
    const { tags, setId } = this.videoDetails.current.getDetails();
    logger(this.state, moveId);
    this.props.completeVideoEditing({
      timer,
      moveId,
      tags,
      setId,
      title: "Test Title",
      description: "this is a test description"
    });
  };
  /**
   *
   */
  render() {
    const { setReducer, moveReducer } = this.props;
    const { moveDetails, isSavingWebM } = moveReducer;
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
              {isSavingWebM ? (
                <Loader />
              ) : (
                <>
                  <Row>
                    <Col md={"12"}>
                      <Row className={"mt-3"}>
                        {moveDetails && moveDetails.videoUrl ? (
                          <>
                            <VideoView
                              moveReducer={moveReducer}
                              timer={timer}
                            />
                            <VideoDetails
                              setReducer={setReducer}
                              ref={this.videoDetails}
                            />
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
                    completeEditing={this.completeEditing}
                  />
                </>
              )}
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
  getAllSetRequest: data => dispatch(getAllSetRequest(data)),
  completeVideoEditing: data => dispatch(completeVideoEditing(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveDetails);
