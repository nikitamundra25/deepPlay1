import React from "react";
import { Row, Col, UncontrolledTooltip, Button, ButtonGroup } from "reactstrap";
import FolderModal from "./createFolderModal";
import { ConfirmBox } from "../../helper/SweetAleart";
import { AppRoutes } from "../../config/AppRoutes"
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
    this.props.redirectTo(AppRoutes.FOLDER_DETAILS.url.replace(":id",floderId))
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
        <div className="content-header">
          <span className="content-title">Your Folders</span>
          <span onClick={this.props.handleFolderModel} id="move">
            <i className="fas fa-plus-circle fa-2x  "></i>
          </span>
          <UncontrolledTooltip placement="bottom" target="move">
            Create a New Folder
          </UncontrolledTooltip>
        </div>
        <Col></Col>
        <p>4 folders total</p>{" "}
        <div className="wrap-folder">
          {getAllFolders.length ? (
            // eslint-disable-next-line
            getAllFolders.map((folder, i) => {
              if (!folder.isDeleted) {
                return (
                  <Row className="set-wrap" key={i}>
                    <Col md="12">
                      <div className="tile-wrap card">
                        <div className="cotent-tile d-flex">
                          <div className="cotent-text-tile">
                            <div className="content-number-tile"> 4 sets</div>
                            <div className="content-heading-tile d-flex">
                              {" "}
                              <span onClick={() => this.handleFolderdetails(folder._id)} className={"cursor_pointer"}>
                                {folder.title}
                              </span>
                              <div>
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
                      </div>
                    </Col>
                  </Row>
                );
              }
            })
          ) : (
              <div className="set-wrap">
                <h3>YOU HAVEN'T CREATED ANY FOLDER YET</h3>
                <p>Create a Folder to Organize your Sets.</p>
                <Button
                  color="default"
                  type="button"
                  className="btn-btn-right"
                  onClick={this.props.handleFolderModel}
                >
                  Create a Folder
              </Button>
              </div>
            )}

          <FolderModal
            modelOperate={modelOperate}
            modelInfoReducer={modelInfoReducer}
            createFolder={this.props.createFolder}
          />
        </div>
      </div>
    );
  }
}

export default FolderComponent;
