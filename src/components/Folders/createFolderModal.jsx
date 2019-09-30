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
import closeIcon from "../../assets/img/close-img.png";
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
    const { handleOpen, modal } = this.props;
    const { title, description } = this.state;
    return (
      <div>
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={modal}
          toggle={() => handleOpen}
        >
          <ModalHeader>
            <span className="custom-title" id="exampleModalLabel">
              Create a New Folder
            </span>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={handleOpen}
            >
              <span aria-hidden="true">
                <img src={closeIcon} alt="close-ic" />
              </span>
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
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              onClick={this.onCreateFolder}
              color=" "
              className="btn btn-black"
              disabled={!title}
            >
              Create Folder
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FolderModal;
