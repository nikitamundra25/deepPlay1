import React from "react";
import {
  Button,
  Modal,
  FormGroup,
  Input,
  Label,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback
} from "reactstrap";
import closeBtn from "../../assets/img/close-img.png";
import {
  CreateFolderValidations,
  CreateFolderValidationsMessaages
} from "../../validations";
import Validator from "js-object-validation";

// core components
class FolderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      errors: {}
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
    if (prevProps.modal !== this.props.modal) {
      if (this.props.folderDetails) {
        const { title, description } = this.props.folderDetails;
        this.setState({
          title,
          description,
          errors: {}
        });
      } else {
        this.setState({
          title: "",
          description: "",
          errors: {}
        });
      }
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.replace(/  +/g, " ").trimStart(),
      errors: {
        ...this.state.errors,
        [name]: null
      }
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
    const { isValid, errors } = Validator(
      this.state,
      CreateFolderValidations,
      CreateFolderValidationsMessaages
    );
    if (!isValid) {
      this.setState({
        errors
      });
      return;
    }
    const { folderDetails } = this.props;
    const data = {
      id: folderDetails ? folderDetails._id : "",
      title: this.state.title,
      description: this.state.description,
      isCopy: false
    };
    this.props.createFolder(data);
  };

  handleClose = () => {
    this.setState({
      errors: "",
      title: "",
      description: ""
    });
    this.props.handleOpen();
  };

  render() {
    const { modal, handleOpen, folderDetails } = this.props;
    const { title, description, errors } = this.state;

    return (
      <div>
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={modal}
          toggle={handleOpen}
          backdrop={"static"}
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
              onClick={this.handleClose}
            >
              <span aria-hidden="true">
                <img src={closeBtn} alt="close-ic" />
              </span>
            </button>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title" className="font-weight-bold text-center">
                TITLE <span className="text-danger">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter a title"
                name="title"
                className={errors.title ? "is-invalid" : ""}
                onChange={this.handleChange}
                value={title}
              />
              <FormFeedback>{errors.title ? errors.title : null}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="description" className="font-weight-bold text-center">
                DESCRIPTION
              </Label>
              <Input
                id="exampleFormControlInput1"
                type="textarea"
                placeholder="Enter a description (optional) Limit is 250 characters."
                name="description"
                className={errors.description ? "is-invalid" : ""}
                onChange={this.handleChange}
                value={description}
                rows={3}
              />
              <FormFeedback>
                {errors.description ? errors.description : null}
              </FormFeedback>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              onClick={this.onCreateFolder}
              color=" "
              className="btn btn-black"
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
