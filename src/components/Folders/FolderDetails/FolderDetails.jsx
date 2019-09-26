import React from "react";
import { UncontrolledTooltip, Button, Row, Col, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import {
  folderDetailRequest,
  modelOpenRequest,
  getFolderSetRequest,
  ManageSetRequest,
  getAllFolderRequest
} from "../../../actions";
import AddSetModal from "./addSet";
import TransferToModal from "./transferTo";
// core components
class RecentFolderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setListItem: [],
      show: false, //show setting popOver,
      pathName: "", // pathName of folderId
      setToTransfer: "" // pass set id to transfer to different folder
    };
  }
  componentDidMount() {
    const loaction = this.props.location;
    const pathName = loaction.pathname.split("/");
    this.props.folderDetail({ id: pathName[2] });
    this.props.getSetsList({ folderId: pathName[2] });
    this.setState({
      pathName: pathName[2]
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.getAllSetReducer.setListinFolder !==
      this.props.getAllSetReducer.setListinFolder
    ) {
      const setList = this.props.getAllSetReducer.setListinFolder;
      this.setState({
        setListItem: setList
      });
    }
  }

  openAddSetModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        addSetModalOpen: !modelDetails.addSetModalOpen
      }
    });
  };

  openTransferToModal = id => {
    this.props.allFolders();
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      setToTransfer: id
    });
    this.props.modelOperate({
      modelDetails: {
        transferToModalOpen: !modelDetails.transferToModalOpen
      }
    });
  };

  handleSets = (id, name) => {
    const loaction = this.props.location;
    const pathName = loaction.pathname.split("/");
    let data;
    data = {
      isFolderAdd: name === "add" ? true : false,
      setId: id,
      folderId: pathName[2],
      previousFolderId: pathName[2]
    };
    this.props.manageSets(data);
  };

  handleFolder = data => {
    this.props.manageSets(data);
  };

  showPopOver = () => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    const {
      modelOperate,
      modelInfoReducer,
      folderDetails,
      getAllFolders
    } = this.props;
    const { setListItem, show, pathName, setToTransfer } = this.state;

    return (
      <div className="page-body">
        <div className="content-header">
          <span className="content-title">
            {folderDetails.title ? folderDetails.title : "MyFolder"}
          </span>
          <div>
            <span
              className="dashboard-right-content"
              onClick={this.openAddSetModel}
              id="move"
            >
              <i className="fas fa-plus-circle fa-2x  "></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="move">
              Add Sets
            </UncontrolledTooltip>

            <span id="share">
              <i className="fas fa-share fa-2x"></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="share">
              Share
            </UncontrolledTooltip>
            <span id="edit">
              <i className="fas fa-sliders-h fa-2x"></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="edit">
              Edit & Delete
            </UncontrolledTooltip>
          </div>
        </div>{" "}
        <span className="content-title">{folderDetails.description}</span>
        <Row className="set-wrap">
          {setListItem.length ? (
            setListItem.map((list, i) => {
              if (list.folderId) {
                return (
                  <Col md="6" key={i}>
                    <div className="tile-wrap card">
                      <div className="cotent-tile d-flex">
                        <div className="cotent-text-tile">
                          <div className="content-heading-tile">
                            {" "}
                            {list.title}
                          </div>
                          <div className="content-heading-tile">
                            {" "}
                            {list.description}
                          </div>

                          <div className="content-number-tile"> 4 items</div>
                        </div>
                        <div
                          className="cotent-img-tile"
                          style={{
                            backgroundImage:
                              'url("' +
                              "https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Nikita%20Buida,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1469756538/dd3acf4nzzavkv4rf2ji.jpg" +
                              '")'
                          }}
                        ></div>
                        <span
                          onClick={this.showPopOver}
                          className="cursor_pointer"
                        >
                          {" "}
                          <i className="fas fa-ellipsis-v setting-icon "></i>
                        </span>
                        {show ? (
                          <ButtonGroup size="sm">
                            <Button>Copy</Button>
                            <Button
                              onClick={() => this.openTransferToModal(list._id)}
                            >
                              Transfer
                            </Button>
                            <Button
                              onClick={() =>
                                this.handleSets(list._id, "remove")
                              }
                            >
                              Remove
                            </Button>
                          </ButtonGroup>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                );
              }
            })
          ) : (
            <div className="inner-wrap">
              <h3>This folder has no Sets yet</h3>
              <p>Organize your Sets for you or your students</p>
              <Button
                color="default"
                type="button"
                className="btn-btn-right"
                onClick={this.openAddSetModel}
              >
                Add a Set
              </Button>
            </div>
          )}
        </Row>
        <AddSetModal
          openAddSetModel={this.openAddSetModel}
          modelInfoReducer={modelInfoReducer}
          modelOperate={modelOperate}
          getAllSet={setListItem}
          handleSets={this.handleSets}
        />
        <TransferToModal
          modelInfoReducer={modelInfoReducer}
          modelOperate={modelOperate}
          AllFolders={getAllFolders}
          pathName={pathName}
          setToTransfer={setToTransfer}
          handleFolder={this.handleFolder}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    folderDetails: state.getFolderReducer.folderDetails,
    modelInfoReducer: state.modelInfoReducer,
    getAllSetReducer: state.getAllSetReducer,
    getAllFolders: state.getFolderReducer.getAllFolders
  };
};
const mapDispatchToProps = dispatch => ({
  folderDetail: data => dispatch(folderDetailRequest(data)),
  modelOperate: data => dispatch(modelOpenRequest(data)),
  getSetsList: data => {
    dispatch(getFolderSetRequest(data));
  },
  manageSets: data => {
    dispatch(ManageSetRequest(data));
  },
  allFolders: () => {
    dispatch(getAllFolderRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentFolderComponent);
