import React from "react";
import MoveComponent from "../../components/Move";
import { connect } from "react-redux";

// core components
class Move extends React.Component {
  render() {
    return (
      <>
        <MoveComponent />
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
