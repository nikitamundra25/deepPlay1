import React from "react";
import MoveComponent from "../../components/Move";
import { connect } from "react-redux";

// core components
class Move extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>  
        <MoveComponent />
        <div className={"row"}></div>
      </>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Move);
