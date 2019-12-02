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
import { logger } from "helper/Logger";
import {
  CreateFolderValidations,
  CreateFolderValidationsMessaages
} from "../../../validations";
import Validator from "js-object-validation";

class EditMoveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tags: "",
      sets: "",
      isEdit: false,
      open: false,
      errors: {}
    };
  }

  componentDidUpdate({ videoData, modal }) {
    if (videoData !== this.props.videoData) {
      const { title, description, tags, setId } = this.props.videoData;
      this.setState({
        title,
        description,
        tags: tags,
        sets: setId ? setId.title : ""
      });
    }
    if (modal !== this.props.modal) {
      const { title, description, tags, setId } = this.props.videoData;
      this.setState({
        title,
        description,
        tags: tags,
        sets: setId ? setId.title : "",
        errors: {}
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

  // handleTagChange = (newValue, actionMeta) => {
  //   //const { tagsList } = this.props.moveReducer
  //   console.log(newValue);
  //   if (newValue) {
  //     this.setState({
  //       tags: newValue
  //     });
  //   } else {
  //     this.setState({
  //       tags: []
  //     });
  //   }
  //   console.log(`action: ${actionMeta.action}`);
  //   if (actionMeta.action === "create-option") {
  //     this.props.addTagsInTagModalRequest({
  //       tags: newValue[newValue.length - 1]
  //     });
  //   }
  //   console.groupEnd();
  // };

  handleEditMove = async e => {
    e.preventDefault();
    try {
      const { title, description, tags } = this.state;
      const dataMove = {
        title,
        description: description
      };
      const { isValid, errors } = Validator(
        dataMove,
        CreateFolderValidations,
        CreateFolderValidationsMessaages
      );
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      const { moveIdToEdit, videoData } = this.props;
      const data = {
        moveId: moveIdToEdit,
        title: title,
        description: description,
        tags: tags,
        setId: videoData.setId._id,
        videoData: videoData,
        fromMoveList: false
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
    const { title, description, errors, sets } = this.state;

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
              Edit Move Details
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
              <Label for="description" className="font-weight-bold text-center">
                SELECTED SET
              </Label>
              <Input
                id="set"
                type="text"
                placeholder="Enter a description (optional)"
                name="sets"
                disabled={true}
                value={sets}
                rows={3}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="tags" className="font-weight-bold text-center">
                ADD TAGS
              </Label>
              <CreatableSelect
               classNamePrefix="react_select"
                isMulti
                onChange={this.handleTagChange}
                value={tags}
                options={tagsList}
              />
            </FormGroup> */}
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color=" "
              className="btn btn-black"
              onClick={this.handleEditMove}
            >
              Update Move
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditMoveModal;
