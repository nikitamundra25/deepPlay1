import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
      videoData
    } = this.props;
    const data = {
      moveId: moveIdToAddTag,
      tags: tags,
      index: moveIndexToAddTag,
      moveofSetList: moveofSetList,
      fromMoveList: fromMoveList,
      videoData: videoData ? videoData : ""
    };
    this.props.addTagstoMove(data);
  };

  render() {
    const { modal, handleOpen, tagsList, tags } = this.props;
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
              Add Tags
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
              <CreatableSelect
               classNamePrefix="react_select"
                isMulti
                onChange={this.props.handleTagChange}
                value={tags}
                options={tagsList}
                // options={colourOptions}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              onClick={this.onhandleTags}
              color=" "
              className="btn btn-black"
            >
              Save Tags
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddTagModal;
