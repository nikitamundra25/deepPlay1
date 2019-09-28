import React from "react";
import { Row, Col, UncontrolledTooltip, Button, ButtonGroup, Card, CardBody, CardHeader } from "reactstrap";
import FolderModal from "./createFolderModal";
import { ConfirmBox } from "../../helper/SweetAleart";
import { AppRoutes } from "../../config/AppRoutes";
import emptyFolderIc from "../../assets/img/empty-folder.png";
// core components
class FolderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false // To show popOver Over setting icon
    };
  }
  showPopOver = () => {
    this.setState({
      show: true
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

  handleFolderdetails = (floderId) => {
    this.props.redirectTo(AppRoutes.FOLDER_DETAILS.url.replace(":id", floderId))
  }

  handleCopyFolder = folder => {
    const data = {
      title: folder.title,
      description: folder.description,
      isDeleted: folder.isDeleted,
      isPublic: folder.isPublic,
      sharableLink: folder.sharableLink,
      status: folder.status,
      userId: folder.userId,
      isCopy: true
    };
    this.props.createFolder(data);
  };

  render() {
    const { modelInfoReducer, modelOperate, getAllFolders } = this.props;
    const { show } = this.state;
    return (
      <div className="page-body">
        <div className="content-header folder-main-wrap">

          <span className="content-title">Your Folders
          <p className="mb-0">4 folders total</p>
          </span>
          <div>
            <span onClick={this.props.handleFolderModel} id="move">
              <i className="fas fa-plus-circle fa-2x"></i>

            </span>
            <span onClick={this.props.handleFolderModel} id="share">
              <i className="fa fa-share fa-2x"></i>

            </span>
            <span onClick={this.props.handleFolderModel} id="sliders">
              <i class="fa fa-sliders fa-2x"></i>
            </span>
          </div>
          <UncontrolledTooltip placement="bottom" target="move">
            Create a New Folder
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="bottom" target="share">
            Share Your Video
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="bottom" target="sliders">
            edit your your Video
          </UncontrolledTooltip>

        </div>


        <div className="wrap-folder">
          <Row className="set-wrap" >
            {getAllFolders && getAllFolders.length ? (
              getAllFolders.map((folder, i) => {
                return (
                  <Col md="6" key={i}>
                    {
                      !folder.isDeleted ?
                        <div className="tile-wrap card ">
                          <div className="cotent-tile d-flex content-with-tip">
                            <div className="cotent-text-tile">
                              <div className="content-number-tile"> 4 sets</div>
                              <div className="content-heading-tile d-flex">
                                {" "}
                                <span onClick={() => this.handleFolderdetails(folder._id)} className={"cursor_pointer"}>
                                  {folder.title}
                                </span>
                                <div className="tooltip-btn-wrap right-btn-tip">
                                  <span
                                    onClick={this.showPopOver}
                                    className="cursor_pointer"
                                  >
                                    {" "}
                                    <i className="fas fa-ellipsis-v setting-icon "></i>
                                  </span>
                                  {show ? (
                                    <ButtonGroup size="sm" >
                                      <Button
                                        onClick={() =>
                                          this.handleCopyFolder(folder)
                                        }
                                        color=" "
                                      >
                                        Copy
                                    </Button>
                                      <Button

                                        color=" "
                                      >
                                        Transfer
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
                        </div> : null
                    }
                  </Col>

                );
              })

            ) : (
                <>
                  <div className="create-set-section mt-2 w-100">
                    <Card className="w-100 set-content-wrap">
                      <div className="set-content-block w-100 empty-folder-wrap">
                        <CardHeader className="empty-folder-header">
                          <img src={emptyFolderIc} alt={"folder"}/>
                          <div className="content-header set-header">
                            <span className="content-title">      <h3>You haven't created any folder yet</h3>
                              <p>Create a Folder to Organize your Sets.</p></span>
                          </div>
                        </CardHeader>
                        <CardBody className="">
                          <div className="create-set-tile">

                          </div>
                          <div className="text-center">
                            <Button
                              color=" "
                              type="button"
                              className="btn-black btn mt-3 folder-create-btn"
                              onClick={this.props.handleFolderModel}

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
              )}

            <FolderModal
              modelOperate={modelOperate}
              modelInfoReducer={modelInfoReducer}
              createFolder={this.props.createFolder}
            />
          </Row>
        </div>
      </div>
    );
  }
}

export default FolderComponent;
