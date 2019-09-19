import React from "react";
import FolderComponent from "../../components/Folders"
import { connect } from "react-redux";

// core components
class Folder extends React.Component {
  render() {
    return (
      <>
        <FolderComponent/>
      </>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);
