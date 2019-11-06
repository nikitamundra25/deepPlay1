import React from "react";
import {
  UncontrolledTooltip,
  Button,
  Row,
  Col,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem
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
  shareableLinkRequest,
  deleteFolderRequest,
  updateFolderRequest,
  redirectTo,
  getAllSetRequest,
  deleteSetRequest
} from "../../../actions";
import AddSetModal from "./addSet";
import TransferToModal from "./transferTo";
import { ConfirmBox } from "../../../helper/SweetAleart";
import SharableLinkModal from "../../comman/shareableLink/SharableLink";
import emptySetIc from "../../../assets/img/empty-sets.png";
import { AppRoutes } from "../../../config/AppRoutes";
import Loader from "../../comman/Loader/Loader";
import FolderModal from "../createFolderModal";
import PaginationHelper from "helper/Pagination";
import qs from "query-string";
import { AppConfig } from "../../../config/Appconfig";

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
      setIndex: -1,
      page: 1,
      showAll: false
    };
  }
  componentDidMount() {
    const location = this.props.location;
    const lSearch = location.search;
    const { page } = qs.parse(lSearch);
    const pathName = location.pathname.split("/");
    this.props.folderDetail({ id: pathName[3] });
    this.props.getSetsList({ folderId: pathName[3] });
    this.props.getAllSetRequest({ isSetNoLimit: true });
    this.setState({
      folderId: pathName[3],
      page: parseInt(page) || 1
    });
  }

  componentDidUpdate(prevProps) {
    const oldLocation = prevProps.location;
    const oldPathname = oldLocation.pathname.split("/");
    const newLocation = this.props.location;
    const newPathname = newLocation.pathname.split("/");
    if (
      prevProps.setReducer &&
      prevProps.setReducer.setListinFolder !==
      this.props.setReducer.setListinFolder
    ) {
      const setList = this.props.setReducer.setListinFolder;
      this.setState({
        setListItem: setList
      });
    }
    if (oldPathname[3] !== newPathname[3]) {
      this.props.folderDetail({ id: newPathname[3] });
      this.props.getSetsList({ folderId: newPathname[3] });
      this.setState({
        folderId: newPathname[3]
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
    this.setState({
      showAll: true
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
      folderId: pathName[3],
      previousFolderId: pathName[3]
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
      id,
      folderId: pathName[3],
    };
    const { value } = await ConfirmBox({
      text: "You want to remove Set from this folder!"
    });
    if (value) {
      this.props.onDeleteSets(data);
    }
  };

  handleFolder = async data => {
    const { value } = await ConfirmBox({
      text: "You want to transfer this set!"
    });
    if (value) {
      this.props.manageSets(data);
    }
  };

  handleDeleteFolder = async id => {
    const { value } = await ConfirmBox({
      text: "You want to delete this folder!"
    });
    if (value) {
      this.props.deleteFolder(id);
    }
  };

  OnCreateSetCopy = async list => {
    const data = {
      title: list.title,
      description: list.description,
      isDeleted: list.isDeleted,
      isPublic: list.isPublic,
      folderId: list.folderId && list.folderId._id ? list.folderId._id : null,
      sharableLink: list.sharableLink,
      copyOfSetId: list._id,
      status: list.status,
      userId: list.userId,
      isCopy: true
    };
    const { value } = await ConfirmBox({
      text: "You want to copy this set!"
    });
    if (value) {
      this.props.onSetsCreation(data);
    }
  };

  handleSharableLink = () => {
    const { folderId } = this.state;
    this.props.shareableLink({
      folderId: folderId,
      linkOf: "folder"
    });
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

  addSets = data => {
    this.props.onSetsCreation(data);
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

  handleFolderModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        createFolderOpen: !modelDetails.createFolderOpen
      }
    });
  };

  updateFolder = data => {
    this.props.updateFolderRequest(data);
  };

  onPageChange = page => {
    this.props.onGoPage(
      `${AppRoutes.FOLDER_DETAILS.url.replace(
        ":id",
        this.state.folderId
      )}?${qs.stringify({ page: page })}`
    );
    this.props.getSetsList({ folderId: this.state.folderId, page: page });
  };

  render() {
    const {
      modelInfoReducer,
      getFolderReducer,
      shareLinkReducer,
      setReducer
    } = this.props;
    const {
      setListItem,
      show,
      setToTransfer,
      folderId,
      setIndex,
      page
    } = this.state;
    const { modelDetails } = modelInfoReducer;
    const { folderDetails, getAllFolders } = getFolderReducer;
    const { userEncryptedInfo } = shareLinkReducer;
    const { isFolderSetLoading, totalSetsInFolder, allSetList } = setReducer;

    const {
      transferToModalOpen,
      addSetModalOpen,
      sharableLinkModalOpen,
      createFolderOpen
    } = modelDetails;
    const setOfFolder = setListItem.filter(
      item => item.folderId._id === folderId
    );

    return (
      <div className="page-body">
        <div className="content-header">
          <span className="content-title">
            <div className="main-title">
              {" "}
              {folderDetails
                ? folderDetails && folderDetails.isCopy
                  ? `Copy of ${folderDetails.title} ${
                  folderDetails.copyIndex > 0
                    ? `(${folderDetails.copyIndex})`
                    : ""
                  }`
                  : folderDetails.title
                : "MyFolder"}
              {/* {folderDetails ? folderDetails.title : "MyFolder"} */}
            </div>
            <div className="sub-title">
              {folderDetails ? folderDetails.description : ""}
            </div>
            <div className="sub-title">
              Total sets: {totalSetsInFolder ? totalSetsInFolder : 0}
            </div>
          </span>
          <div className="d-flex  justify-content-center align-items-between">
            <span
              className="dashboard-right-content cursor_pointer ml-4"
              onClick={this.openAddSetModel}
              id="move"
            >
              <i className="fas fa-plus icon-font"></i>
            </span>
            <UncontrolledTooltip placement="top" target="move">
              Add Sets
            </UncontrolledTooltip>
            <span
              id="share"
              onClick={this.handleSharableLink}
              className="cursor_pointer ml-4"
            >
              <i className="fas fa-share icon-font"></i>
            </span>
            <UncontrolledTooltip placement="top" target="share">
              Get Shareable Link
            </UncontrolledTooltip>
            <UncontrolledDropdown className="header-dropdown  ">
              <DropdownToggle color={" "} className="mr-0">
                <span id="edit" className="cursor_pointer ml-4 mr-0">
                  <i className="fas fa-sliders-h icon-font"></i>
                </span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleFolderModel}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => this.handleDeleteFolder(folderDetails._id)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledTooltip placement="top" target="edit">
              Edit & Delete
            </UncontrolledTooltip>
          </div>
        </div>{" "}
        <Row className="set-wrap">
          {!isFolderSetLoading ? (
            setOfFolder && setOfFolder.length ? (
              // eslint-disable-next-line
              setOfFolder.map((list, i) => {
                return (
                  <Col md="6" key={i}>
                    <div
                      className="tile-wrap card"
                      onMouseLeave={() => this.closePopOver()}
                    >
                      <div className="cotent-tile d-flex content-with-tip ">
                        <div
                          className="d-flex  content-with-img w-100 cursor_pointer"
                          onClick={() => this.handleSetDetails(list._id)}
                        >
                          <div className="cotent-text-tile text-capitalize">
                            <div className="content-heading-tile d-flex">
                              {" "}
                              <span
                                // onClick={() => this.handleSetDetails(list._id)}
                                className={"text-capitalize"}
                              >
                                <span>
                                  {list.isCopy
                                    ? `Copy of ${list.title} ${
                                    list.copyIndex > 0
                                      ? `(${list.copyIndex})`
                                      : ""
                                    }`
                                    : list.title}
                                </span>
                              </span>
                            </div>
                            <span className={"text-capitalize"}>
                              {list.description ? list.description : ""}
                            </span>
                            <div className="content-number-tile">
                              {" "}
                              {list.moveCount ? list.moveCount : 0} items
                            </div>
                          </div>
                          {list.recentlyAddMoveImg ? (
                            <div
                              className="d-flex img-tile-wrap cursor_pointer"
                              onClick={() => this.handleSetDetails(list._id)}
                            >
                              <div className="cotent-img-tile">
                                <video width={"100%"} id="webm-video">
                                  <source
                                    src={`${list.recentlyAddMoveImg}`}
                                    type="video/webm"
                                  />
                                </video>
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <div
                          onMouseOver={() => this.showPopOver(i, show)}
                          className={"tooltip-btn-wrap right-btn-tip"}
                        >
                          <span className="cursor_pointer">
                            {" "}
                            <i className="fas fa-ellipsis-v setting-icon "></i>
                          </span>
                          {show && setIndex === i ? (
                            <ButtonGroup size="sm">
                              <Button
                                onClick={() => this.OnCreateSetCopy(list)}
                                color=" "
                              >
                                Copy
                              </Button>
                              <Button
                                onClick={() =>
                                  this.openTransferToModal(list._id)
                                }
                                color=" "
                              >
                                Transfer
                              </Button>
                              <Button
                                onClick={() =>
                                  this.onRemoveSets(list._id, "remove")
                                }
                                color=" "
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
                  <Col>
                    <div className="create-set-section mt-2 w-100 empty-folder-section">
                      <Card className="set-content-wrap empty-folder-card">
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
                                className="btn-black btn "
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
                  </Col>
                </>
              )
          ) : (
              <Col sm={12} className="loader-col">
                <Loader />
              </Col>
            )}
        </Row>
        <AddSetModal
          handleOpen={this.openAddSetModel}
          modal={addSetModalOpen}
          getAllSet={allSetList}
          folderId={folderId}
          addNewSet={this.addSets}
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
        <FolderModal
          modal={createFolderOpen}
          modelInfoReducer={modelInfoReducer}
          handleOpen={this.handleFolderModel}
          createFolder={this.updateFolder}
          editFolder="true"
          folderDetails={folderDetails ? folderDetails : null}
        />
        {totalSetsInFolder && !isFolderSetLoading ? (
          <PaginationHelper
            totalRecords={totalSetsInFolder}
            currentPage={page}
            onPageChanged={page => {
              this.setState({ page });
              this.onPageChange(page);
            }}
            pageLimit={AppConfig.ITEMS_PER_PAGE}
          />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    getFolderReducer: state.getFolderReducer,
    modelInfoReducer: state.modelInfoReducer,
    setReducer: state.setReducer,
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
  },
  deleteFolder: id => {
    dispatch(deleteFolderRequest(id));
  },
  updateFolderRequest: data => {
    dispatch(updateFolderRequest(data));
  },
  onGoPage: data => {
    dispatch(redirectTo({ path: data }));
  },
  getAllSetRequest: data => dispatch(getAllSetRequest(data)),
  onDeleteSets: data => {
    dispatch(deleteSetRequest(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentFolderComponent);
