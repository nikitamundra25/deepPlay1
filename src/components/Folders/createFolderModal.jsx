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
import closeBtn from "../../assets/img/close-img.png";

// core components
class FolderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.folderDetails !== this.props.folderDetails) {
      const { title, description } = this.props.folderDetails;
      this.setState({
        title,
        description
      });
    }
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
    const { folderDetails } = this.props;
    const data = {
      id: folderDetails ? folderDetails._id : "",
      title: this.state.title,
      description: this.state.description,
      isCopy: false
    };
    this.props.createFolder(data);
  };

  render() {
    const { modal, handleOpen, folderDetails } = this.props;
    const { title, description } = this.state;
    return (
      <div>
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={modal}
          toggle={handleOpen}
        >
          <ModalHeader>
            <span className="custom-title" id="exampleModalLabel">
              {folderDetails ? "Update Folder" : "Create a New Folder"}
            </span>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={handleOpen}
            >
              <span aria-hidden="true">
                <img src={closeBtn} alt="close-ic" />
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
                type="textarea"
                placeholder="Enter a description (optional)"
                name="description"
                onChange={this.handleChange}
                value={description}
                rows={3}
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
              {folderDetails ? "Update Folder" : "Create Folder"}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FolderModal;
