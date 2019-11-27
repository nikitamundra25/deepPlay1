import React from "react";
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from "reactstrap";
import closeIcon from "../../../assets/img/close-img.png";
import { logger } from "helper/Logger";
import AsyncSelect from "react-select/async";
import * as classnames from "classnames";

// core components
class TransferMoveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferToList: [],
      errors: "",
      selectSetOptions: {
        label: "Select set from list",
        value: ""
      }
    };
  }

  componentDidUpdate({ modal }) {
    if (modal !== this.props.modal) {
      this.setState({
        selectSetOptions: {
          label: "Select set from list",
          value: ""
        }
      });
    }
  }

  onTransferTo = id => {
    let data;
    if (!id) {
      this.setState({
        errors: "Select set from list"
      });
      return;
    } else {
      data = {
        moveId: this.props.moveToTransfer,
        setId: id,
        previousSetId: this.props.setId ? this.props.setId._id : null,
        fromMoveSearch: this.props.fromMoveSearch ? true : false,
        isSearch: this.props.fromMoveSearch ? true : false
      };
      this.props.handleMove(data);
    }
    logger(data);
  };
  /*
   */

  handleInputChange = e => {
    if (e && e.value) {
      this.setState({
        selectSetOptions: {
          label: e.label,
          value: e.value
        }
      });
    } else {
      this.setState({
        selectSetOptions: {
          label: "Select set from list",
          value: ""
        }
      });
    }
  };

  render() {
    const { handleOpen, modal, setId, setList } = this.props;
    const { selectSetOptions, errors } = this.state;
    const defaultFolderList = [];
    let list = [];
    if (setList && setList.length) {
      // eslint-disable-next-line
      setList.map(item => {
        if (item._id !== setId) {
          list = [...list, item];
        }
      });
    }
    if (list && list.length) {
      list.map(item => {
        let isNotAccesible;
        if (setId && setId._id) {
          isNotAccesible = item._id === setId._id;
        }
        if (!isNotAccesible) {
          defaultFolderList.push({
            label:
              item && item.isCopy
                ? `Copy of ${item.title}${
                    item.copyIndex > 0 ? `(${item.copyIndex})` : ""
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
                isClearable={defaultFolderList.value ? true : false}
                defaultOptions={defaultFolderList}
                noOptionsMessage={() => "No set available"}
                placeholder={"Select set from list"}
                onChange={e => {
                  e && e.label === "+ Add New folder"
                    ? this.props.handleFolderModel()
                    : this.handleInputChange(e);
                }}
                value={selectSetOptions.value ? selectSetOptions : ""}
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
              onClick={() => this.onTransferTo(selectSetOptions.value)}
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

export default TransferMoveModal;
