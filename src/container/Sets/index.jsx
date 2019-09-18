import React from "react";
import SetComponent from "../../components/Sets"
import { connect } from "react-redux";

// core components
class Set extends React.Component {
  render() {
    return (
      <>
        <SetComponent/>
      </>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Set);
