import React from "react";
import { Button, Modal, FormGroup, Input, Label } from "reactstrap";
// core components
class FolderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleOpen = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        createFolderModalOpen: !modelDetails.createFolderModalOpen
      }
    });
  };

  onCreateFolder = () => {
    const data = {
      title: this.state.title,
      description: this.state.description
    };
    this.props.createFolder(data);
  };

  render() {
    const { modelInfoReducer  } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { createFolderModalOpen } = modelDetails;
    const { title, description } = this.state;
    return (
      <div>
        <Modal
          className="modal-dialog-centered"
          isOpen={createFolderModalOpen}
          toggle={() => this.handleOpen}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create a New Folder
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.handleOpen}
            >
              <span aria-hidden={true} onClick={this.handleOpen}>
                <i className="far fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div className="modal-body">
            <FormGroup>
              <Input
                id="title"
                type="text"
                placeholder="Enter a title"
                name="title"
                onChange={this.handleChange}
                value={title}
              />
              <Label for="description">TITLE</Label>
            </FormGroup>
            <FormGroup>
              <Input
                id="exampleFormControlInput1"
                type="text"
                placeholder="Enter a description (optional)"
                name="description"
                onChange={this.handleChange}
                value={description}
              />
              <Label for="description">DESCRIPTION</Label>
            </FormGroup>
            <br />
            <Button
              color="info"
              type="button"
              onClick={this.onCreateFolder}
              className="fullSize-btn"
              disabled={!title}
            >
              Create Folder
            </Button>
          </div>
        </Modal>
       
      </div>
    );
  }
}

export default FolderModal;
