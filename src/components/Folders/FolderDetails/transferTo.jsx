import React from "react";
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from "reactstrap";
import closeIcon from "../../../assets/img/close-img.png";
import { logger } from "helper/Logger";
import AsyncSelect from "react-select/async";
import * as classnames from "classnames";

// core components
class TransferToModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferToList: [],
      errors: "",
      selectFolderOptions: {
        label: "Select folder from list",
        value: ""
      }
    };
  }

  componentDidUpdate({ modal }) {
    if (modal !== this.props.modal) {
      this.setState({
        selectFolderOptions: {
          label: this.props.transferMove
            ? "Select set from list"
            : "Select folder from list",
          value: ""
        }
      });
    }
  }

  onTransferTo = id => {
    let data;
    if (!id) {
      this.setState({
        errors: this.props.transferMove
          ? "Select set from list"
          : "Select folder from list"
      });
      return;
    } else {
      if (this.props.transferMove) {
        data = {
          moveId: this.props.moveToTransfer,
          setId: id,
          previousSetId: this.props.folderId
        };
        this.props.handleMove(data);
      } else {
        data = {
          setId: this.props.setToTransfer,
          folderId: id,
          isFolderAdd: true,
          previousFolderId: this.props.folderId
        };
        this.props.handleFolder(data);
      }
    }
    logger(data);
  };
  /*
   */

  handleInputChange = e => {
    if (e && e.value) {
      this.setState({
        selectFolderOptions: {
          label: e.label,
          value: e.value
        }
      });
    } else {
      this.setState({
        selectFolderOptions: {
          label: this.props.transferMove
            ? "Select set from list"
            : "Select folder from list",
          value: ""
        }
      });
    }
  };

  render() {
    const {
      handleOpen,
      modal,
      folderId,
      AllFolders,
      transferMove
    } = this.props;

    const { selectFolderOptions, errors } = this.state;
    const defaultFolderList = [];
    let list = [];
    if (AllFolders && AllFolders.length) {
      // eslint-disable-next-line
      AllFolders.map(item => {
        if (item._id !== folderId) {
          list = [...list, item];
        }
      });
    }
    if (list && list.length) {
      list.map(item => {
        let isNotAccesible;
        if (folderId && folderId._id) {
          isNotAccesible = item._id === folderId._id;
        }
        if (!isNotAccesible) {
          defaultFolderList.push({
            label:
              item && item.isCopy
                ? `${list.title} ${
                    list.copyCount > 0 ? `(${list.copyCount})` : ""
                  }`
                : item.title,
            value: item._id
          });
        }
        return true;
      });
    }
    return (
      <div>
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={modal}
          size="md"
          backdrop={"static"}
          toggle={() => handleOpen}
        >
          <ModalHeader>
            <span className="custom-title">Transfer To</span>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={handleOpen}
            >
              <span aria-hidden={true}>
                {" "}
                <img src={closeIcon} alt="close-ic" />
              </span>
            </button>
          </ModalHeader>
          <ModalBody className="">
            <div className="wrap-folder search-select-wrap">
              <AsyncSelect
                classNamePrefix="react_select"
                isClearable={selectFolderOptions.value ? true : false}
                defaultOptions={defaultFolderList}
                noOptionsMessage={() =>
                  transferMove ? "No set available" : "No folder available"
                }
                placeholder={
                  transferMove
                    ? "Select set from list"
                    : "Select folder from list"
                }
                onChange={e => {
                  e && e.label === "+ Add New folder"
                    ? this.props.handleFolderModel()
                    : this.handleInputChange(e);
                }}
                value={selectFolderOptions.value ? selectFolderOptions : ""}
                className={classnames("", {
                  "is-invalid": errors
                })}
              />
              <p className="text-danger">{errors ? errors : null}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              onClick={() => this.onTransferTo(selectFolderOptions.value)}
              color=" "
              className="btn btn-black"
              // disabled={selectFolderOptions.value === ""}
            >
              Transfer To
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TransferToModal;
