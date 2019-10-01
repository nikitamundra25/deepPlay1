import React from "react";
import {
  FormGroup,
  Input,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Form,
  ModalFooter,
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
            Sharable Link
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
            <p className="text-center sharable-modal-text">
              {isPublic ? "Anyone with link can view." : "Only you can view"}
            </p>
            <Form inline className="url-update-wrap copylink-form">
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
                    className="w-100"
                  />
                </div>
              </FormGroup>
              <div className="text-center ml-1">
                <Button
                  color=" "
                  type="button"
                  className="btn-black"
                  // onClick={this.copyLink}
                >
                  Copy Link
                </Button>
              </div>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-start">
          <div className="form-inline w-100">
            <span className="font-14">
              <b>Enable Public Access Link </b>
            </span>
            <label className="custom-toggle sharable-toggle ml-auto">
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
