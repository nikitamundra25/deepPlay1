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
import { connect } from "react-redux";
import {
  createSetRequest,
  getSetDetailsRequest,
  UpdateSetRequest
} from "../../actions";
import {
  CreateFolderValidations,
  CreateFolderValidationsMessaages
} from "../../validations";
import Validator from "js-object-validation";
import "./index.scss";
import closeBtn from "../../assets/img/close-img.png";

class CreateSetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      isEdit: false,
      open: false,
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.setDetails !== this.props.setDetails) {
      if (this.props.setDetails) {
        const { title, description } = this.props.setDetails;
        this.setState({
          title,
          description
        });
      }
    }
    if (prevProps.modal !== this.props.modal) {
      if (this.props.setDetails) {
        const { title, description } = this.props.setDetails;
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
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null
      }
    });
  };

  onCreateSet = async name => {
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
    const { setDetails, folderId, fromMoveDetailsPage } = this.props;
    const data = {
      setId: setDetails ? setDetails._id : "",
      title: this.state.title,
      description: this.state.description,
      folderId: folderId ? folderId : null,
      addMove: name === "addMove" ? true : false,
      fromMoveDetailsPage: fromMoveDetailsPage ? true : false
    };
    await this.props.createSet(data);
    this.setState({
      title: "",
      description: ""
    });
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
    const { modal, handleOpen, setDetails } = this.props;
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
              {setDetails ? "Update Set" : "Create a New Set"}
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
                placeholder="Enter a description (optional)"
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
              onClick={this.onCreateSet}
              color=" "
              className="btn btn-black"
            >
              {setDetails ? "Update Set" : "Create Set"}
            </Button>
            {setDetails !== "" ? (
              <Button
                type="button"
                onClick={() => this.onCreateSet("addMove")}
                color=" "
                className="btn btn-black"
              >
                {setDetails ? "Update & Add Move" : "Add a Move"}
              </Button>
            ) : (
              ""
            )}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modelInfoReducer: state.modelInfoReducer,
    setReducer: state.setReducer
  };
};
const mapDispatchToProps = dispatch => ({
  onSetsCreation: data => dispatch(createSetRequest(data)),
  getSetDetailsRequest: data => dispatch(getSetDetailsRequest(data)),
  UpdateSetRequest: data => dispatch(UpdateSetRequest(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateSetComponent);
