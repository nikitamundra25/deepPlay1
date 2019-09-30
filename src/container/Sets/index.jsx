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
  updateRecentTimeRequest
} from "../../actions";
import FolderModal from "../../components/Folders/createFolderModal";
import { createFolderRequest } from "actions/Folder";
import { ConfirmBox } from "../../helper/SweetAleart";
import TransferToModal from "../../components/Folders/FolderDetails/transferTo";
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
    this.props.getSetList();
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
        createFolderModalOpen: !modelDetails.createFolderModalOpen
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
      folderId: list.folderId,
      sharableLink: list.sharableLink,
      status: list.status,
      userId: list.userId,
      isCopy: true
    };
    const { value } = await ConfirmBox({
      text: "You want to copy this set!! "
    });
    if (value) {
      this.props.onSetsCreation(data);
    }
  };

  onHandleDelete = async id => {
    const { value } = await ConfirmBox({
      text: "You want to delete this folder.!! "
    });
    if (value) {
      this.props.onDeleteSets(id);
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
      text: "You want to transfer this set!! "
    });
    if (value) {
      this.props.manageSets(payload);
    }
  };

  render() {
    const {
      modelOperate,
      modelInfoReducer,
      getAllSetReducer,
      getAllFolders
    } = this.props;
    const { folderId, setToTransfer } = this.state;

    return (
      <>
        {this.state.createSet ? (
          <CreateSetComponent onCreateSet={this.onCreateSet} />
        ) : (
          <SetComponent
            handleSetComponent={this.handleSetComponent}
            handleFolderModel={this.handleFolderModel}
            getAllSet={getAllSetReducer.allSetList}
            OnCreateSetCopy={this.OnCreateSetCopy}
            onRemoveSets={this.onHandleDelete}
            handleRecentTime={this.handleRecentTime}
            openTransferToModal={this.openTransferToModal}
            {...this.props}
          />
        )}
        <FolderModal
          modelOperate={modelOperate}
          modelInfoReducer={modelInfoReducer}
          createFolder={this.createFolder}
        />
        <TransferToModal
          modelInfoReducer={modelInfoReducer}
          modelOperate={modelOperate}
          AllFolders={getAllFolders}
          setToTransfer={setToTransfer}
          pathName={folderId}
          handleFolder={this.folderToTransfer}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    modelInfoReducer: state.modelInfoReducer,
    getAllSetReducer: state.setReducer,
    getAllFolders: state.getFolderReducer.getAllFolders
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
    getSetList: () => {
      dispatch(getAllSetRequest());
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
    modelOperate: data => dispatch(modelOpenRequest(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Set);
