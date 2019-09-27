import React from "react";
import FolderComponent from "../../components/Folders";
import { connect } from "react-redux";
import {
  modelOpenRequest,
  createFolderRequest,
  getAllFolderRequest,
  deleteFolderRequest
} from "../../actions";

// core components
class Folder extends React.Component {
  componentDidMount = () => {
    this.props.allFolders();
  };

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
  onDelete = id => {
    this.props.deleteFolder(id);
  };

  render() {
    const { modelOperate, modelInfoReducer, getAllFolders } = this.props;
    return (
      <>
        <FolderComponent
          handleFolderModel={this.handleFolderModel}
          modelInfoReducer={modelInfoReducer}
          modelOperate={modelOperate}
          createFolder={this.createFolder}
          getAllFolders={getAllFolders}
          onDelete={this.onDelete}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    modelInfoReducer: state.modelInfoReducer,
    getAllFolders: state.getFolderReducer.getAllFolders
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFolderCreation: data => {
      dispatch(createFolderRequest(data));
    },
    modelOperate: data => dispatch(modelOpenRequest(data)),
    allFolders: () => {
      dispatch(getAllFolderRequest());
    },
    deleteFolder: id => {
      dispatch(deleteFolderRequest(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);
