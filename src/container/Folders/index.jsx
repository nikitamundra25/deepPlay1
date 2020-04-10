import React from "react";
import FolderComponent from "../../components/Folders";
import { connect } from "react-redux";
import {
  modelOpenRequest,
  createFolderRequest,
  getAllFolderRequest,
  deleteFolderRequest,
  updateRecentTimeRequest,
  redirectTo
} from "../../actions";
import qs from "query-string";
import { AppRoutes } from "../../config/AppRoutes";
import { isEqual } from "../../helper/Object";

// core components
class Folder extends React.Component {
  componentDidMount = () => {
    const { location } = this.props;
    const lSearch = location.search;
    const search = lSearch.split("=");
    const temp = qs.parse(lSearch);
    temp.page
      ? this.props.allFolders({ page: search[1] })
      : this.props.allFolders({ search: search[1] });
  };

  handleForRecentFolder = folderId => {
    const data = {
      isSetId: null,
      isFolderId: folderId ? folderId : null
    };
    this.props.updateRecentTime(data);
  };

  createFolder = data => {
    this.props.onFolderCreation(data);
  };
  onDelete = id => {
    this.props.deleteFolder(id);
  };

  componentDidUpdate({ location }) {
    const prevQuery = qs.parse(location.search);
    const currQuery = qs.parse(this.props.location.search);
    if (!isEqual(prevQuery, currQuery)) {
      this.props.allFolders({ ...currQuery, page: currQuery.page || 1 });
    }
  }

  onPageChange = page => {
    this.props.onGoPage(
      `${AppRoutes.FOLDERS.url}?${qs.stringify({ page: page })}`
    );
  };

  handleResetSearch = () => {
    this.props.redirectTo(AppRoutes.FOLDERS.url);
  };

  render() {
    const { modelOperate, modelInfoReducer, folderReducer } = this.props;
    return (
      <>
        <FolderComponent
          handleFolderModel={this.handleFolderModel}
          modelInfoReducer={modelInfoReducer}
          modelOperate={modelOperate}
          handleForRecentFolder={this.handleForRecentFolder}
          createFolder={this.createFolder}
          folderReducer={folderReducer}
          isFolderLoading={folderReducer.isFolderLoading}
          onDelete={this.onDelete}
          onPageChange={this.onPageChange}
          handleResetSearch={this.handleResetSearch}
          {...this.props}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    modelInfoReducer: state.modelInfoReducer,
    folderReducer: state.getFolderReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFolderCreation: data => {
      dispatch(createFolderRequest(data));
    },
    modelOperate: data => dispatch(modelOpenRequest(data)),
    allFolders: data => {
      dispatch(getAllFolderRequest(data));
    },
    deleteFolder: id => {
      dispatch(deleteFolderRequest(id));
    },
    updateRecentTime: data => {
      dispatch(updateRecentTimeRequest(data));
    },
    onGoPage: data => {
      dispatch(redirectTo({ path: data }));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Folder);
