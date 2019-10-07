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
import Loader from "../comman/Loader/Loader"
import { logger } from "helper/Logger";
// core components
class FolderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, // To show popOver Over setting icon
      modal: false,
      folderIndex: -1
    };
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
      text: "You want to delete this folder.!! "
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
      text: "You want to copy this folder!! "
    });
    if (value) {
      this.props.createFolder(data);
    }
  };

  render() {
    const { modelInfoReducer, getAllFolders, isFolderLoading } = this.props;
    const { show, folderIndex } = this.state;
    const { modelDetails } = modelInfoReducer;
    const { createFolderOpen } = modelDetails;
    return (
      <div className="page-body">
        <div className="content-header">
          <span className="content-title">Your Folders</span>
          <span onClick={this.handleFolderModel} id="move">
            <i className="fas fa-plus-circle icon-font"></i>
          </span>
          <UncontrolledTooltip placement="bottom" target="move">
            Create a New Folder
          </UncontrolledTooltip>
        </div>
        <p>Total folders {getAllFolders && getAllFolders.length ? getAllFolders.length : "0"}</p>{" "}
        <div className="wrap-folder">
          <Row className="set-wrap">
            {
              !isFolderLoading ?
                getAllFolders &&
                  getAllFolders.length ? (
                    // eslint-disable-next-line
                    getAllFolders.map((folder, i) => {
                      if (!folder.isDeleted) {
                        return (
                          <Col key={i} md={"6"}>
                            <Card className="tile-wrap folder-main-wrap"  onClick={() =>
                                        this.handleFolderdetails(folder._id)
                                      }>
                              <div className="cotent-tile d-flex content-with-tip">
                                <div className="cotent-text-tile">
                                  <div className="content-number-tile"> 4 sets</div>
                                  <div className="content-heading-tile d-flex">
                                    {" "}
                                    <span
                                     
                                      className={"cursor_pointer"}
                                    >
                                      {
                                        folder.isCopy ?
                                          `Copy of ${folder.title}` :
                                          folder.title
                                      }
                                    </span>
                                    <div
                                      onMouseOver={() => this.showPopOver(i, show)}
                                      onMouseLeave={() => this.closePopOver()}
                                      className={"tooltip-btn-wrap right-btn-tip"}
                                    >
                                      <span className="cursor_pointer">
                                        {" "}
                                        <i className="fas fa-ellipsis-v setting-icon "></i>
                                      </span>
                                      {show && folderIndex === i ? (
                                        <ButtonGroup size="sm">
                                          <Button
                                            onClick={() =>
                                              this.handleCopyFolder(folder)
                                            }
                                          >
                                            Copy
                                      </Button>
                                          <Button
                                            onClick={() =>
                                              this.onHandleDelete(folder._id)
                                            }
                                          >
                                            Delete
                                      </Button>
                                        </ButtonGroup>
                                      ) : null}
                                    </div>
                                  </div>
                                  {folder.description ? folder.description : ""}
                                </div>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                    })
                  ) : (
                    <>
                      <div className="create-set-section w-100 empty-folder-section">
                        <Card className="w-100 set-content-wrap empty-folder-card">
                          <div className="set-content-block w-100 empty-folder-wrap">
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
                                  className="btn-black btn folder-create-btn"
                                  onClick={this.handleFolderModel}
                                >
                                  <i className="fas fa-plus mr-1"></i>
                                  Folder
                            </Button>
                              </div>
                            </CardBody>
                          </div>
                        </Card>
                      </div>
                    </>
                  ) :
                <Col sm={12} className="loader-col">
                  <Loader />
                </Col>
            }
          </Row>
          <FolderModal
            modal={createFolderOpen}
            modelInfoReducer={modelInfoReducer}
            createFolder={this.props.createFolder}
            handleOpen={this.handleFolderModel}
          />
        </div>
      </div>
    );
  }
}

export default FolderComponent;
