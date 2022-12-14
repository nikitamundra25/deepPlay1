import React from "react";
import {
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import FolderModal from "./createFolderModal";
import { ConfirmBox } from "../../helper/SweetAleart";
import { AppRoutes } from "../../config/AppRoutes";
import emptyFolderIc from "../../assets/img/empty-folder.png";
import fileFolderIc from "../../assets/img/file-folder.png";
import Loader from "../comman/Loader/Loader";
import { logger } from "helper/Logger";
import PaginationHelper from "helper/Pagination";
import qs from "query-string";
import { AppConfig } from "../../config/Appconfig";
import "./index.scss";
import plusIc from "../../assets/img/add.svg";
// core components
class FolderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, // To show popOver Over setting icon
      modal: false,
      folderIndex: -1,
      page: 1
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const lSearch = location.search;
    const { page } = qs.parse(lSearch);
    this.setState({
      page: parseInt(page) || 1
    });
  }

  showPopOver = index => {
    this.setState({
      show: true,
      folderIndex: index
    });
  };
  closePopOver = () => {
    this.setState({
      show: false,
      folderIndex: -1
    });
  };

  onHandleDelete = async id => {
    const { value } = await ConfirmBox({
      text: "You want to remove this folder!"
    });
    if (value) {
      this.props.onDelete(id);
    }
  };

  handleFolderdetails = folderId => {
    this.props.handleForRecentFolder(folderId);
    this.props.redirectTo(
      AppRoutes.FOLDER_DETAILS.url.replace(":id", folderId)
    );
  };

  handleFolderModel = () => {
    try {
      const { modelInfoReducer } = this.props;
      const { modelDetails } = modelInfoReducer;
      this.props.modelOperate({
        modelDetails: {
          createFolderOpen: !modelDetails.createFolderOpen
        }
      });
    } catch (error) {
      logger(error);
    }
  };

  handleCopyFolder = async folder => {
    const data = {
      title: folder.title,
      description: folder.description,
      isDeleted: folder.isDeleted,
      isPublic: folder.isPublic,
      sharableLink: folder.sharableLink,
      status: folder.status,
      userId: folder.userId,
      copyOfFolderId: folder._id,
      isCopy: true
    };
    const { value } = await ConfirmBox({
      text: "You want to copy this folder!"
    });
    if (value) {
      this.props.createFolder(data);
    }
  };

  render() {
    const {
      modelInfoReducer,
      folderReducer,
      isFolderLoading,
      location
    } = this.props;
    const { getAllFolders, totalFolders } = folderReducer;
    const { show, folderIndex, page } = this.state;
    const { modelDetails } = modelInfoReducer;
    const { createFolderOpen } = modelDetails;
    const lSearch = location.search;
    const temp = qs.parse(lSearch);

    return (
      <div className="page-body">
        <div className="content-header">
          <span className="content-title">
            <div className="main-title"> {" Folders"}</div>
            <div className="sub-title">
              Total folders: {totalFolders ? totalFolders : "0"}
            </div>
          </span>
          <div className="d-flex  justify-content-center align-items-between pl-4">
            {temp && temp.search ? (
              <>
                <span
                  id="reset"
                  className={"cursor_pointer reset-search text-center mr-2 "}
                  onClick={this.props.handleResetSearch}
                >
                  <i className="fas fa-undo-alt" />
                </span>
                <UncontrolledTooltip placement="top" target="reset">
                  Reset search results
                </UncontrolledTooltip>
              </>
            ) : null}

            <span
              className="dashboard-right-content cursor_pointer ml-4 header-img-icon"
              onClick={this.handleFolderModel}
              id="move"
            >
              <img src={plusIc} alt="plusIc" />
            </span>
            <UncontrolledTooltip placement="top" target="move">
              Create a New Folder
            </UncontrolledTooltip>
          </div>
        </div>

        <div className="wrap-folder">
          <Row className="set-wrap">
            {!isFolderLoading ? (
              getAllFolders && getAllFolders.length ? (
                // eslint-disable-next-line
                getAllFolders.map((folder, i) => {
                  if (!folder.isDeleted) {
                    return (
                      <Col key={i} md={"6"}>
                        <div
                          className="tile-wrap card cursor_pointer content-tip-img"
                          onMouseLeave={() => this.closePopOver()}
                        >
                          <div
                            onClick={() => this.handleFolderdetails(folder._id)}
                          >
                            {" "}
                            <div className="cotent-tile d-flex content-with-tip content-with-img">
                              <div className="cotent-text-tile ">
                                <div className="text-capitalize content-heading-tile d-flex">
                                  {" "}
                                  <span className={"cursor_pointer"}>
                                    {folder.isCopy
                                      ? `${folder.title} ${
                                          folder.copyCount > 0
                                            ? `(${folder.copyCount})`
                                            : ""
                                        }`
                                      : folder.title}
                                  </span>
                                </div>
                                <span className={"content-sub-heading-tile"}>
                                  {folder.description
                                    ? folder.description.length > 100
                                      ? folder.description.substring(0, 80) +
                                        "..."
                                      : folder.description
                                    : ""}
                                </span>
                                <div className="content-number-tile">
                                  {" "}
                                  {folder.setCount} sets
                                </div>
                              </div>
                              <div className="d-flex img-tile-wrap cursor_pointer">
                                <div className="cotent-img-tile">
                                  {folder.setCount ? (
                                    <img
                                      src={fileFolderIc}
                                      alt=""
                                      className="folder-ic"
                                    />
                                  ) : (
                                    <img
                                      src={emptyFolderIc}
                                      alt=""
                                      className="folder-ic"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            onMouseOver={() => this.showPopOver(i, show)}
                            className={"tooltip-btn-wrap right-btn-tip"}
                          >
                            <span className="cursor_pointer">
                              {" "}
                              <i className="fas fa-ellipsis-v setting-icon "></i>
                            </span>
                            {show && folderIndex === i ? (
                              <ButtonGroup size="sm">
                                <Button
                                  onClick={() => this.handleCopyFolder(folder)}
                                  color=" "
                                >
                                  Copy
                                </Button>
                                <Button
                                  onClick={() =>
                                    this.onHandleDelete(folder._id)
                                  }
                                  color=" "
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
                <>
                  <Col>
                    <div className="create-set-section mt-2 w-100">
                      <Card className="set-content-wrap">
                        <div className="set-content-block w-100 empty-folder-wrap text-center">
                          <CardHeader className="empty-folder-header">
                            <img src={emptyFolderIc} alt={"folder"} />
                            <div className="content-header set-header">
                              <span className="content-title">
                                {" "}
                                <h3>You haven't created any folder yet</h3>
                                <p>Create a Folder to Organize your Sets.</p>
                              </span>
                            </div>
                          </CardHeader>
                          <CardBody className="">
                            <div className="create-set-tile"></div>
                            <div className="text-center">
                              <Button
                                color=" "
                                type="button"
                                className="btn-black btn mt-3 folder-create-btn"
                                onClick={this.handleFolderModel}
                              >
                                <i className="fas fa-plus mr-1"></i>
                                Create New Folder
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
          <FolderModal
            modal={createFolderOpen}
            modelInfoReducer={modelInfoReducer}
            createFolder={this.props.createFolder}
            handleOpen={this.handleFolderModel}
          />
        </div>
        {totalFolders && !isFolderLoading ? (
          <PaginationHelper
            totalRecords={totalFolders}
            currentPage={page}
            onPageChanged={page => {
              this.setState({ page });
              this.props.onPageChange(page);
            }}
            pageLimit={AppConfig.ITEMS_PER_PAGE}
          />
        ) : null}
      </div>
    );
  }
}

export default FolderComponent;
