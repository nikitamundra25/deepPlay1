import React from "react";
import {
  UncontrolledTooltip,
  Button,
  Row,
  Col,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { connect } from "react-redux";
import {
  folderDetailRequest,
  modelOpenRequest,
  getFolderSetRequest,
  ManageSetRequest,
  getAllFolderRequest,
  createSetRequest,
  publicAccessRequest,
  shareableLinkRequest
} from "../../../actions";
import AddSetModal from "./addSet";
import TransferToModal from "./transferTo";
import { ConfirmBox } from "../../../helper/SweetAleart";
import SharableLinkModal from "../../comman/shareableLink/SharableLink";
import emptySetIc from "../../../assets/img/empty-sets.png";
import { AppRoutes } from "../../../config/AppRoutes";

// core components
class RecentFolderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setListItem: [],
      modal: false,
      show: false, //show setting popOver,
      folderId: "", // pathName of folderId
      setToTransfer: "", // pass set id to transfer to different folder,
      setIndex: -1
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
    console.log(">>>>>>", data);
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

  handleFolder = async data => {
    const { value } = await ConfirmBox({
      text: "You want to transfer this set!! "
    });
    if (value) {
      this.props.manageSets(data);
    }
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

  handleSharableLink = () => {
    const { folderId } = this.state;
    this.props.shareableLink(folderId);
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        sharableLinkModalOpen: !modelDetails.sharableLinkModalOpen
      }
    });
  };

  showPopOver = index => {
    this.setState({
      show: true,
      setIndex: index
    });
  };
  closePopOver = () => {
    this.setState({
      show: false,
      setIndex: -1
    });
  };

  onTogglePublicAccess = isPublic => {
    const { folderId } = this.state;
    const data = {
      isFolderId: folderId,
      isSetId: null,
      isMoveId: null,
      isPublic: isPublic
    };
    this.props.publicAccess(data);
  };

  handleSetDetails = setId => {
    this.props.redirectTo(AppRoutes.SET_DETAILS.url.replace(":id", setId));
  };

  render() {
    const { modelInfoReducer, getFolderReducer, shareLinkReducer } = this.props;
    const { setListItem, show, setToTransfer, folderId, setIndex } = this.state;
    const { modelDetails } = modelInfoReducer;
    const { folderDetails, getAllFolders } = getFolderReducer;
    const { userEncryptedInfo } = shareLinkReducer;
    const {
      transferToModalOpen,
      addSetModalOpen,
      sharableLinkModalOpen
    } = modelDetails;
    const setOfFolder = setListItem.filter(item => item.folderId === folderId);
    // const path =
    //   AppRoutes.FOLDER_SHARED_LINK.url +
    //   `?userId=${encryptedUserId}&folderId=${encryptedFolderId}&isPublic=${this.state.isPublic}`;
    // const pathUrl = window.location.origin + path;
    return (
      <div className="page-body">
        <div className="content-header">
          <span className="content-title">
            {folderDetails ? folderDetails.title : "MyFolder"}
          </span>
          <div>
            <span
              className="dashboard-right-content cursor_pointer ml-4"
              onClick={this.openAddSetModel}
              id="move"
            >
              <i className="fas fa-plus-circle icon-font"></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="move">
              Add Sets
            </UncontrolledTooltip>

            <span
              id="share"
              onClick={this.handleSharableLink}
              className="cursor_pointer ml-4"
            >
              <i className="fas fa-share icon-font"></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="share">
              Get Shareable Link
            </UncontrolledTooltip>
            <span id="edit" className="cursor_pointer ml-4">
              <i className="fas fa-sliders-h icon-font"></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="edit">
              Edit & Delete
            </UncontrolledTooltip>
          </div>
        </div>{" "}
        <span className="content-title">
          {folderDetails ? folderDetails.description : ""}
        </span>
        <Row className="set-wrap">
          {setOfFolder && setOfFolder.length ? (
            // eslint-disable-next-line
            setOfFolder.map((list, i) => {
              return (
                <Col md="6" key={i}>
                  <div className="tile-wrap card">
                    <div className="cotent-tile d-flex">
                      <div className="cotent-text-tile">
                        <div className="content-heading-tile">
                          {" "}
                          <span
                            onClick={() => this.handleSetDetails(list._id)}
                            className={"cursor_pointer"}
                          >
                            {list.title}
                          </span>
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
                      <div
                        onMouseOver={() => this.showPopOver(i, show)}
                        onMouseLeave={() => this.closePopOver()}
                        className={"p-3 tooltip-btn-wrap right-btn-tip"}
                      >
                        <span
                          onClick={() => this.showPopOver(i)}
                          className="cursor_pointer"
                        >
                          {" "}
                          <i className="fas fa-ellipsis-v setting-icon "></i>
                        </span>
                        {show && setIndex === i ? (
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
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <>
              <div className="create-set-section mt-2 w-100">
                <Card className="w-100 set-content-wrap">
                  <div className="set-content-block w-100 empty-folder-wrap">
                    <CardHeader className="empty-folder-header">
                      <img src={emptySetIc} alt={"Images"} />
                      <div className="content-header set-header">
                        <span className="content-title">
                          {" "}
                          <h3>This folder has no Sets yet</h3>
                          <p>Organize your Sets for you or your students</p>
                        </span>
                      </div>
                    </CardHeader>
                    <CardBody className="">
                      <div className="create-set-tile"></div>
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
          handleOpen={this.openAddSetModel}
          modal={addSetModalOpen}
          getAllSet={setListItem}
          folderId={folderId}
          handleSets={this.handleSets}
          {...this.props}
        />
        <TransferToModal
          modal={transferToModalOpen}
          AllFolders={getAllFolders}
          folderId={folderId}
          handleOpen={this.openTransferToModal}
          setToTransfer={setToTransfer}
          handleFolder={this.handleFolder}
        />
        <SharableLinkModal
          modal={sharableLinkModalOpen}
          handleOpen={this.handleSharableLink}
          onTogglePublicAccess={this.onTogglePublicAccess}
          isPublic={folderDetails ? folderDetails.isPublic : ""}
          userEncryptedInfo={userEncryptedInfo ? userEncryptedInfo : ""}
          shareComponent="Folder"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    getFolderReducer: state.getFolderReducer,
    modelInfoReducer: state.modelInfoReducer,
    getAllSetReducer: state.setReducer,
    shareLinkReducer: state.shareLinkReducer
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
  },
  publicAccess: data => {
    dispatch(publicAccessRequest(data));
  },
  shareableLink: data => {
    dispatch(shareableLinkRequest(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentFolderComponent);
