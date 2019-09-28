import React from "react";
import SetComponent from "../../components/Sets";
import CreateSetComponent from "../../components/Sets/createSet";
import { connect } from "react-redux";
import {
  createSetRequest,
  getAllSetRequest,
  modelOpenRequest
} from "../../actions";
import FolderModal from "../../components/Folders/createFolderModal";
import { createFolderRequest } from "actions/Folder";

// core components
class Set extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createSet: false
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
    const { modelOperate, modelInfoReducer, getAllSetReducer } = this.props;
    return (
      <>
        {this.state.createSet ? (
          <CreateSetComponent  onCreateSet={this.onCreateSet}/>
        ) : (
          <SetComponent
            handleSetComponent={this.handleSetComponent}
            handleFolderModel={this.handleFolderModel}
            getAllSet={getAllSetReducer.allSetList}
            {...this.props}
          />
        )}
        <FolderModal
          modelOperate={modelOperate}
          modelInfoReducer={modelInfoReducer}
          createFolder={this.createFolder}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    modelInfoReducer: state.modelInfoReducer,
    getAllSetReducer: state.setReducer
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
    modelOperate: data => dispatch(modelOpenRequest(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Set);
