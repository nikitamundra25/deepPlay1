import React from "react";
import {
  FormGroup,
  Input,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Form,
  InputGroup,
  InputGroupAddon,
  ModalFooter
} from "reactstrap";
import closeIcon from "../../../assets/img/close-img.png";
import { AppRoutes } from "../../../config/AppRoutes";
import { CopyToClipboard } from "react-copy-to-clipboard";

// core components
class SharableLinkModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPublic: true,
      copied: false
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

  handleClose = () => {
    this.setState({
      copied: false
    });
    this.props.handleOpen();
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
    const { handleOpen, modal, userEncryptedInfo, shareComponent } = this.props;
    const {
      encryptedUserId,
      encryptedFolderId,
      encryptedSetId
    } = userEncryptedInfo;
    const { isPublic, copied } = this.state;
    let path = "";
    // eslint-disable-next-line
    {
      shareComponent !== "yourSets"
        ? shareComponent === "Folder"
          ? (path =
              AppRoutes.FOLDER_SHARED_LINK.url +
              `?userId=${encryptedUserId}&folderId=${encryptedFolderId}&isPublic=${this.state.isPublic}`)
          : (path =
              AppRoutes.SET_SHARED_LINK.url +
              `?userId=${encryptedUserId}&setId=${encryptedSetId}&isPublic=${this.state.isPublic}`)
        : (path =
            AppRoutes.ALL_SET_SHARED_LINK.url + `?userId=${encryptedUserId}`);
    }

    const pathUrl = window.location.origin + path;

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
            onClick={this.handleClose}
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
            <Form className="url-update-wrap copylink-form">
              <FormGroup className="flex-fill flex-column ">
                <div className="flex-fill w-100">
                  <InputGroup>
                    <CopyToClipboard
                      text={pathUrl}
                      onCopy={() => this.setState({ copied: true })}
                    >
                      <Input
                        id="url"
                        placeholder="Link"
                        type="textarea"
                        name="url"
                        readOnly
                        value={pathUrl}
                        className="w-100"
                        rows={5}
                      />
                    </CopyToClipboard>
                    <InputGroupAddon addonType="append">
                      <CopyToClipboard
                        text={pathUrl}
                        onCopy={() => this.setState({ copied: true })}
                      >
                        <Button
                          color=" "
                          type="button"
                          disabled={copied}
                          className=" btn-black"
                        >
                          {copied ? "Copied" : " Copy Link"}
                        </Button>
                      </CopyToClipboard>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </FormGroup>
            </Form>
          </div>
        </ModalBody>
        {shareComponent !== "yourSets" ? (
          <ModalFooter className="justify-content-start">
            <div className="form-inline w-100">
              <span className="font-14">
                <b>Enable Public Access Link </b>
              </span>
              <label className="custom-toggle sharable-toggle ml-auto custom-toggle-wrap">
                <input
                  type="checkbox"
                  name="toggle"
                  onChange={this.handlePublicAccess}
                  checked={isPublic ? isPublic : false}
                  disabled={copied ? true : false}
                />
                <span className="custom-toggle-slider rounded-circle" />
              </label>
            </div>
          </ModalFooter>
        ) : (
          ""
        )}
      </Modal>
    );
  }
}

export default SharableLinkModal;
