import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CreatableSelect from "react-select/creatable";
import closeBtn from "../../../assets/img/close-img.png";
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
// core components
class AddTagModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ""
    };
  }

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

  onhandleTags = () => {
    const data = {
      moveId: this.props.moveIdToAddTag,
      tags: this.state.tags
    };
    this.props.addTagstoMove(data);
  };
  render() {
    const { modal, handleOpen } = this.props;
    const { tags } = this.state;

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
                isMulti
                onChange={this.handleTagChange}
                value={tags}
                options={colourOptions}
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
              Add Tags
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddTagModal;
