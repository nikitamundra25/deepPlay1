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
import "./index.scss";
import closeBtn from "../../../assets/img/close-img.png";
import CreatableSelect from "react-select/creatable";
import { logger } from "helper/Logger";
const colourOptions = [
  {
    label: "Red",
    value: "red"
  },
  {
    label: "Green",
    value: "Green"
  },
  {
    label: "Yellow",
    value: "Yellow"
  },
  {
    label: "Blue",
    value: "Blue"
  }
];

class EditMoveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tags: "",
      isEdit: false,
      open: false,
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoData !== this.props.videoData) {
      console.log("title");

      const { title, description, tags } = this.props.videoData;
      this.setState({
        title,
        description,
        tags: tags
      });
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

  handleTagChange = (newValue, actionMeta) => {
    //const { tagsList } = this.props.moveReducer
    console.log(newValue);
    if (newValue) {
      this.setState({
        tags: newValue
      });
    } else {
      this.setState({
        tags: []
      });
    }
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  handleEditMove = async e => {
    e.preventDefault();
    const { title, description, tags } = this.state;
    try {
      if (!title) {
        this.setState({
          errors: {
            title: "Title is required."
          }
        });
        return;
      }
      const { moveIdToEdit, videoData } = this.props;
      const data = {
        moveId: moveIdToEdit,
        title: title,
        description: description,
        tags: tags,
        setId: videoData.setId._id
      };
      await this.props.editMove(data);
    } catch (error) {
      logger(error);
    }

    // await this.props.createSet(data);
    // this.setState({
    //   title: "",
    //   description: ""
    // });
  };

  render() {
    const { modal, handleOpen } = this.props;
    const { title, description, errors, tags } = this.state;

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
              Edit Move
            </span>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.props.handleOpen}
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
                id="description"
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
            <FormGroup>
              <Label for="tags" className="font-weight-bold text-center">
                ADD TAGS
              </Label>
              <CreatableSelect
                isMulti
                onChange={this.handleTagChange}
                value={tags}
                options={colourOptions}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color=" "
              className="btn btn-black"
              onClick={this.handleEditMove}
            >
              Edit Move
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditMoveModal;
