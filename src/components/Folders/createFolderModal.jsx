import React from "react";
import {
  Button,
  Modal,
  FormGroup,
  Input,
  Label,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
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
      description: this.state.description,
      isCopy: false
    };
    this.props.createFolder(data);
  };

  render() {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { createFolderModalOpen } = modelDetails;
    const { title, description } = this.state;
    return (
      <div>
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={createFolderModalOpen}
          toggle={() => this.handleOpen}
        >
          <ModalHeader>
            <h5 className="modal-title" id="exampleModalLabel">
              <span class="custom-title">Create a New Folder</span>
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.handleOpen}
            >
              <span aria-hidden="true">×</span>
            </button>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title" className="font-weight-bold text-center">
                TITLE
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter a title"
                name="title"
                onChange={this.handleChange}
                value={title}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description" className="font-weight-bold text-center">
                DESCRIPTION
              </Label>
              <Input
                id="exampleFormControlInput1"
                type="text"
                placeholder="Enter a description (optional)"
                name="description"
                onChange={this.handleChange}
                value={description}
              />
            </FormGroup>
            <br />
            <ModalFooter>
              <Button
                type="button"
                onClick={this.onCreateFolder}
                className="btn btn-black"
                disabled={!title}
              >
                Create Folder
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default FolderModal;
