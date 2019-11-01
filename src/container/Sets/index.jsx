import React from "react";
import SetComponent from "../../components/Sets";
import CreateSetComponent from "../../components/Sets/createSet";
import { connect } from "react-redux";
import {
  createSetRequest,
  getAllSetRequest,
  modelOpenRequest,
  ManageSetRequest,
  deleteSetRequest,
  getAllFolderRequest,
  shareableLinkRequest,
  updateRecentTimeRequest,
  redirectTo
} from "../../actions";
import FolderModal from "../../components/Folders/createFolderModal";
import { createFolderRequest } from "actions/Folder";
import { ConfirmBox } from "../../helper/SweetAleart";
import TransferToModal from "../../components/Folders/FolderDetails/transferTo";
import qs from "query-string";
import { isEqual } from "../../helper/Object";
import { AppRoutes } from "../../config/AppRoutes";

// core components
class Set extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createSet: false,
      setToTransfer: "",
      folderId: "" // pass folderId which we dont want to show in modal
    };
  }

  componentDidMount = () => {
    const { location } = this.props;
    const lSearch = location.search;
    const search = lSearch.split("=");
    this.props.getSetList({ isSetNoLimit: false, search: search[1] });
  };

  componentDidUpdate({ location }) {
    const prevQuery = qs.parse(location.search);
    const currQuery = qs.parse(this.props.location.search);
    if (!isEqual(prevQuery, currQuery)) {
      this.props.getSetList({
        ...currQuery,
        page: currQuery.page || 1,
        isSetNoLimit: false
      });
    }
  }

  onPageChange = page => {
    this.props.onGoPage(
      `${AppRoutes.SETS.url}?${qs.stringify({ page: page })}`
    );
  };

  onCreateSet = data => {
    this.props.onSetsCreation(data);
  };

  handleSetComponent = () => {
    this.setState({
      createSet: true
    });
  };

  handleRecentTime = setId => {
    const data = {
      isSetId: setId ? setId : null,
      isFolderId: null
    };
    this.props.updateRecentTime(data);
  };

  handleFolderModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        createFolderModalOpen: !modelDetails.createFolderModalOpen,
        transferToModalOpen: false
      }
    });
  };
  createFolder = data => {
    this.props.onFolderCreation(data);
  };

  OnCreateSetCopy = async list => {
    const data = {
      title: list.title,
      description: list.description,
      isDeleted: list.isDeleted,
      isPublic: list.isPublic,
      folderId: list.folderId && list.folderId._id ? list.folderId._id : "",
      sharableLink: list.sharableLink,
      status: list.status,
      userId: list.userId,
      copyOfSetId: list._id,
      isCopy: true
    };
    const { value } = await ConfirmBox({
      text: "You want to copy this set! "
    });
    if (value) {
      this.props.onSetsCreation(data);
    }
  };

  onHandleDelete = async id => {
    const { value } = await ConfirmBox({
      text: "You want to remove this set!"
    });
    if (value) {
      const data = {
        id
      };
      this.props.onDeleteSets(data);
    }
  };

  openTransferToModal = (id, folderId) => {
    this.props.allFolders();
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      setToTransfer: id,
      folderId: folderId
    });
    this.props.modelOperate({
      modelDetails: {
        transferToModalOpen: !modelDetails.transferToModalOpen
      }
    });
  };

  // Transfer sets to particular folder
  folderToTransfer = async data => {
    const payload = {
      setId: data.setId,
      folderId: data.folderId,
      isFolderAdd: data.isFolderAdd,
      previousFolderid: ""
    };
    const { value } = await ConfirmBox({
      text: "You want to transfer this set!"
    });
    if (value) {
      this.props.manageSets(payload);
    }
  };

  handleResetSearch = () => {
    this.props.redirectTo(AppRoutes.SETS.url);
  };
  render() {
    const {
      modelOperate,
      modelInfoReducer,
      setReducer,
      getAllFolders,
      shareLinkReducer
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { userEncryptedInfo } = shareLinkReducer;
    const { transferToModalOpen } = modelDetails;
    const { folderId, setToTransfer } = this.state;

    return (
      <>
        {this.state.createSet ? (
          <CreateSetComponent onCreateSet={this.onCreateSet} />
        ) : (
          <SetComponent
            handleSetComponent={this.handleSetComponent}
            handleFolderModel={this.handleFolderModel}
            setReducer={setReducer}
            OnCreateSetCopy={this.OnCreateSetCopy}
            onRemoveSets={this.onHandleDelete}
            modelInfoReducer={modelInfoReducer}
            handleRecentTime={this.handleRecentTime}
            openTransferToModal={this.openTransferToModal}
            onSetsCreation={data => this.props.onSetsCreation(data)}
            allFolders={this.props.allFolders}
            shareableLink={data => this.props.shareableLink(data)}
            onPageChange={this.onPageChange}
            userEncryptedInfo={userEncryptedInfo}
            handleResetSearch={this.handleResetSearch}
            {...this.props}
          />
        )}
        <FolderModal
          modal={modelDetails.createFolderModalOpen}
          handleOpen={this.handleFolderModel}
          createFolder={this.createFolder}
        />
        <TransferToModal
          modal={transferToModalOpen}
          modelOperate={modelOperate}
          AllFolders={getAllFolders}
          setToTransfer={setToTransfer}
          handleFolderModel={this.handleFolderModel}
          folderId={folderId}
          handleOpen={this.openTransferToModal}
          handleFolder={this.folderToTransfer}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    modelInfoReducer: state.modelInfoReducer,
    setReducer: state.setReducer,
    getAllFolders: state.getFolderReducer.getAllFolders,
    shareLinkReducer: state.shareLinkReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSetsCreation: data => {
      dispatch(createSetRequest(data));
    },
    onFolderCreation: data => {
      dispatch(createFolderRequest(data));
    },
    getSetList: data => {
      dispatch(getAllSetRequest(data));
    },
    manageSets: data => {
      dispatch(ManageSetRequest(data));
    },
    onDeleteSets: data => {
      dispatch(deleteSetRequest(data));
    },
    allFolders: () => {
      dispatch(getAllFolderRequest());
    },
    updateRecentTime: data => {
      dispatch(updateRecentTimeRequest(data));
    },
    onGoPage: data => {
      dispatch(redirectTo({ path: data }));
    },
    modelOperate: data => dispatch(modelOpenRequest(data)),
    shareableLink: data => {
      dispatch(shareableLinkRequest(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Set);
