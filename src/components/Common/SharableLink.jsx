import React from "react";
import {
  FormGroup,
  Input,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Form,
  ModalFooter
} from "reactstrap";
import closeIcon from "../../assets/img/close-img.png";

// core components
class SharableLinkModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPublic: false
    };
  }
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isPublic !== this.props.isPublic) {
      this.setState({
        isPublic: this.props.isPublic
      });
    }
  };

  handleOpen = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        sharableLinkModalOpen: !modelDetails.sharableLinkModalOpen
      }
    });
  };

  handlePublicAccess = e => {
    e.persist();
    const { checked } = e.target;
    this.setState({
      isPublic: checked
    });
    this.props.onTogglePublicAccess(checked);
  };

  render() {
    const { handleOpen, modal, sharableLinkPath } = this.props;
    const { isPublic } = this.state;
    return (
      <Modal
        className="modal-dialog-centered custom-model-wrap"
        isOpen={modal}
        toggle={() => handleOpen}
      >
        <ModalHeader>
          <span className="custom-title" id="exampleModalLabel">
            {/* {isPublic ? "Anyone with link can view." : "Only you can view"} */}
            SHAREABLE LINK
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
          <div className="create-set-tile">
            <Form inline className="url-update-wrap">
              <FormGroup className="flex-fill flex-column ">
                <div className="flex-fill w-100">
                  <Input
                    id="url"
                    placeholder="Link"
                    type="text"
                    name="url"
                    // onCopy={this.onCopy}
                    readOnly
                    // value={AppRoutes.FOLDER_DETAILS.url.replace(
                    //   ":id",
                    //   folderId
                    // )}
                    value={sharableLinkPath}
                  />
                </div>
              </FormGroup>
              <div className="text-center mr-2">
                <Button
                  color=" "
                  type="button"
                  className="btn-black btn mt-3"
                  // onClick={this.copyLink}
                >
                  Copy Link
                </Button>
              </div>
            </Form>
            <div>
              {" "}
              {isPublic
                ? "Anyone can view with this link."
                : "Only you can view"}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="form-inline">
            <span>Enable Public Access Link</span>
            <label className="custom-toggle">
              <input
                type="checkbox"
                name="toggle"
                onChange={this.handlePublicAccess}
                checked={isPublic ? isPublic : false}
              />
              <span className="custom-toggle-slider rounded-circle" />
            </label>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SharableLinkModal;
