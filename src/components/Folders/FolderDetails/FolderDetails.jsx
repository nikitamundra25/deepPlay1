import React from "react";
import { Button, Row, Col, ButtonGroup, Card, CardBody, CardHeader } from "reactstrap";
import { connect } from "react-redux";
import {
  folderDetailRequest,
  modelOpenRequest,
  getFolderSetRequest,
  ManageSetRequest,
  getAllFolderRequest,
  createSetRequest
} from "../../../actions";
import AddSetModal from "./addSet";
import TransferToModal from "./transferTo";
import { ConfirmBox } from "../../../helper/SweetAleart";

import emptyFolderIc from "../../../assets/img/empty-folder.png";
// core components
class RecentFolderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setListItem: [],
      show: false, //show setting popOver,
      folderId: "", // pathName of folderId
      setToTransfer: "" // pass set id to transfer to different folder
    };
  }
  componentDidMount() {
    const loaction = this.props.location;
    const pathName = loaction.pathname.split("/");
    this.props.folderDetail({ id: pathName[2] });
    this.props.getSetsList({ folderId: pathName[2] });
    this.setState({
      folderId: pathName[2]
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.getAllSetReducer &&
      (prevProps.getAllSetReducer.setListinFolder !==
        this.props.getAllSetReducer.setListinFolder)
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

  //Manage sets to add & remove.
  handleSets = (id, name) => {
    const loaction = this.props.location;
    const pathName = loaction.pathname.split("/");
    let data;
    data = {
      isFolderAdd: name !== "add" ? true : false,
      setId: id,
      folderId: pathName[2],
      previousFolderId: pathName[2]
    };
    this.props.manageSets(data);
  };

  //Remove sets from folder [ask sweetalert]
  onRemoveSets = async (id, name) => {
    const loaction = this.props.location;
    const pathName = loaction.pathname.split("/");
    let data;
    data = {
      isFolderAdd: name === "add" ? true : false,
      setId: id,
      folderId: pathName[2],
      previousFolderId: pathName[2]
    };
    const { value } = await ConfirmBox({
      text: "You want to remove Set from this folder!! "
    });
    if (value) {
      this.props.manageSets(data);
    }
  };

  handleFolder = data => {
    this.props.manageSets(data);
  };

  showPopOver = () => {
    this.setState({
      show: !this.state.show
    });
  };

  OnCreateSetCopy = list => {
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
    this.props.onSetsCreation(data);
  };

  render() {
    const {
      modelOperate,
      modelInfoReducer,
      getAllFolders
    } = this.props;
    const { setListItem, show, pathName, setToTransfer, folderId } = this.state;

    return (
      <>
        <div className="page-body">


          <Row className="set-wrap">
            {setListItem && setListItem.length ? (
              // eslint-disable-next-line
              setListItem.map((list, i) => {
                if (list.folderId) {
                  return (
                    <Col md="6" key={i}>
                      <Card className="tile-wrap">
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
                              <Button onClick={() => this.OnCreateSetCopy(list)}>
                                Copy
                            </Button>
                              <Button
                                onClick={() => this.openTransferToModal(list._id)}
                              >
                                Transfer
                            </Button>
                              <Button
                                onClick={() =>
                                  this.onRemoveSets(list._id, "remove")
                                }
                              >
                                Remove
                            </Button>
                            </ButtonGroup>
                          ) : null}
                        </div>
                      </Card>
                    </Col>
                  );
                }
              })
            ) : (
                <>
                  <div className="create-set-section mt-2 w-100">
                    <Card className="w-100 set-content-wrap">
                      <div className="set-content-block w-100">
                        <CardHeader className="empty-folder-header">
                          <img src={emptyFolderIc} alt={"Images"} />
                          <div className="content-header set-header">
                            <span className="content-title">      <h3>This folder has no Sets yet</h3>
                              <p>Organize your Sets for you or your students</p></span>
                          </div>
                        </CardHeader>
                        <CardBody className="">
                          <div className="create-set-tile">
                          </div>
                          <div className="text-center">
                            <Button
                              color=" "
                              type="button"
                              className="btn-black btn mt-3"
                              onClick={this.openAddSetModel}

                            >
                              <i className="fas fa-plus mr-1"></i>
                              Add a Set
                          </Button>
                          </div>
                        </CardBody>
                      </div>
                    </Card>
                  </div>
                </>
              )}
          </Row>
          <AddSetModal
            openAddSetModel={this.openAddSetModel}
            modelInfoReducer={modelInfoReducer}
            modelOperate={modelOperate}
            getAllSet={setListItem}
            folderId={folderId}
            handleSets={this.handleSets}
            {...this.props}
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
      </  >
    );
  }
}
const mapStateToProps = state => {
  return {
    folderDetails: state.getFolderReducer.folderDetails,
    modelInfoReducer: state.modelInfoReducer,
    getAllSetReducer: state.setReducer,
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
  },
  onSetsCreation: data => {
    dispatch(createSetRequest(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentFolderComponent);
