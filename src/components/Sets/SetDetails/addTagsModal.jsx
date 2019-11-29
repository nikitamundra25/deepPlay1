import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import CreatableSelect from "react-select/creatable";
import closeBtn from "../../../assets/img/close-img.png";

// core components
class AddTagModal extends React.Component {
  onhandleTags = () => {
    const {
      moveIdToAddTag,
      tags,
      moveIndexToAddTag,
      moveofSetList,
      fromMoveList,
      videoData,
      description,
      edit
    } = this.props;
    const data = {
      moveId: moveIdToAddTag,
      tags: tags,
      index: moveIndexToAddTag,
      moveofSetList: moveofSetList,
      fromMoveList: fromMoveList,
      videoData: videoData ? videoData : "",
      description: description ? description : "",
      edit: edit ? true : false
    };

    if (!this.props.error) {
      this.props.addTagstoMove(data);
    } else {
      return;
    }
  };

  render() {
    const {
      modal,
      handleOpen,
      tagsList,
      tags,
      edit,
      description,
      error
    } = this.props;

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
              {edit ? "Edit Tags & Description" : "Add Tags"}
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
            <div className="w-100 tag-input-wrap search-select-wrap">
              {edit ? (
                <Label for="tags" className="font-weight-bold text-center">
                  TAGS
                </Label>
              ) : null}
              <CreatableSelect
                classNamePrefix="react_select"
                isMulti
                onChange={this.props.handleTagChange}
                value={tags}
                options={tagsList}
                // options={colourOptions}
              />
            </div>
            {edit ? (
              <FormGroup>
                <Label
                  for="description"
                  className="font-weight-bold text-center pt-2"
                >
                  DESCRIPTION
                </Label>
                <Input
                  id="description"
                  type="textarea"
                  placeholder="Enter a description (optional)"
                  name="description"
                  className={error ? "is-invalid" : ""}
                  onChange={this.props.handleChange}
                  value={description}
                  rows={3}
                />
                <FormFeedback>{error ? error : null}</FormFeedback>
              </FormGroup>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              onClick={this.onhandleTags}
              color=" "
              className="btn btn-black"
            >
              {edit ? "Update" : "Save Tags"}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddTagModal;
