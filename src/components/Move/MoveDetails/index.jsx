import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row } from "reactstrap";
import VideoView from "./videoView";
import VideoDetails from "./videoDetails";
import { getMoveDetailsRequest, getAllSetRequest } from "../../../actions";
import "./index.scss";
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
    this.props.getMoveDetailsRequest({ moveId: moveId[3] });
    this.props.getAllSetRequest({ isSetNoLimit: false });
  };

  render() {
    const { setReducer, moveReducer } = this.props;
    return (
      <>
        <div className="create-set-section step-2 ">
          <Card className="w-100">
            <CardBody>
              <span
                onClick={() => {
                  this.props.redirectTo("/move");
                }}
                className={"cursor_pointer back-arrow"}
              >
                {" "}
                <i className="fas fa-long-arrow-alt-left" /> Back
              </span>
              <Row className={"mt-3"}>
                <VideoView moveReducer={moveReducer} />
                <VideoDetails setReducer={setReducer} />
              </Row>
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
