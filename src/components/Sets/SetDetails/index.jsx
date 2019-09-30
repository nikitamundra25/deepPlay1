import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  ButtonGroup,
  Button
} from "reactstrap";
import { getSetDetailsRequest } from "../../../actions";
import "./index.scss"
// core components
class SetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false
    };
  }
  componentDidMount = () => {
    const location = this.props.location
    const pathName = location.pathname.split("/")
    this.props.getSetDetailsRequest({ setId: pathName[2] })
  }
  render() {
    const { setReducer } = this.props
    const { setDetails } = setReducer
    return (
      <>
        <div className="create-set-section step-2 mt-2">
          <Card className="w-100">
            <CardBody>
              <div className={"d-flex justify-content-between"}>
                <div>
                  <h2 className={"capitalise"}>{setDetails.title}</h2>
                </div>
                <div>
                  <ButtonGroup size="sm">
                    <Button>
                      Copy
                    </Button>
                    <Button className={"ml-2"}>
                      Transfer
                    </Button>
                    <Button className={"ml-2"}>
                      Remove
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  setReducer: state.setReducer
});
const mapDispatchToProps = dispatch => ({
  getSetDetailsRequest: data => dispatch(getSetDetailsRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDetails);
