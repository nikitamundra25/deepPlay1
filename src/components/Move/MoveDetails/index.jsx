import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import VideoView from "./videoView";
import VideoDetails from "./videoDetails";
import { getMoveDetailsRequest, getAllSetRequest } from "../../../actions";
import "./index.scss";
import Loader from "components/comman/Loader/Loader";
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
    const location = this.props.location.pathname;
    const moveId = location.split("/");
    this.props.getMoveDetailsRequest({ moveId: moveId[2] });
    this.props.getAllSetRequest();
  };

  render() {
    const { setReducer, moveReducer } = this.props;
    const { moveDetails } = moveReducer;
    return (
      <>
        <div className="create-set-section step-2 mt-2">
          <Card className="w-100">
            <CardBody>
              <div>
                <span
                  onClick={() => {
                    this.props.redirectTo("/move");
                  }}
                  className={"cursor_pointer"}
                >
                  {" "}
                  <i className="fas fa-long-arrow-alt-left" /> Back
                </span>
              </div>
              <Col md={"12"}>
                <Row className={"mt-3"}>
                  {moveDetails && moveDetails.videoUrl ? (
                    <>
                      <VideoView moveReducer={moveReducer} />
                      <VideoDetails setReducer={setReducer} />
                    </>
                  ) : (
                    <Loader />
                  )}
                </Row>
              </Col>
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
