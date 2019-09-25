import React from "react";
import FolderComponent from "../../components/Folders";
import { connect } from "react-redux";
import { modelOpenRequest, createFolderRequest } from "../../actions";

// core components
class Folder extends React.Component {
  handleFolderModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        createFolderModalOpen: !modelDetails.createFolderModalOpen
      }
    });
  };

  createFolder = data => {
    this.props.onFolderCreation(data);
  };

  render() {
    const { modelOperate, modelInfoReducer } = this.props;
    return (
      <>
        <FolderComponent
          handleFolderModel={this.handleFolderModel}
          modelInfoReducer={modelInfoReducer}
          modelOperate={modelOperate}
          createFolder={this.createFolder}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    modelInfoReducer: state.modelInfoReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFolderCreation: data => {
      dispatch(createFolderRequest(data));
    },
    modelOperate: data => dispatch(modelOpenRequest(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);
