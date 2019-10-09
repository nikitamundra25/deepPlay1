import React from "react";
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from "reactstrap";
import closeIcon from "../../../assets/img/close-img.png";
import { logger } from "helper/Logger";
import AsyncSelect from 'react-select/async';

// core components
class TransferToModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferToList: [],
      selectFolderOptions: {
        label: "Select folder from list",
        value: ""
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.AllFolders !== this.props.AllFolders) {
      const folders = this.props.AllFolders;
      let arr = [];
      // eslint-disable-next-line
      folders.map((list, i) => {
        if (list._id !== this.props.folderId) {
          arr = [...arr, list];
        }
      });
      this.setState({
        transferToList: arr
      });
    }
  }

  onTransferTo = id => {
    const data = {
      setId: this.props.setToTransfer,
      folderId: id,
      isFolderAdd: true,
      previousFolderId: this.props.folderId
    };
    this.props.handleFolder(data);
    logger(data);
  };
  /* 
  */

  handleInputChange = (e) => {
    if (e && e.value) {
      this.setState({
        selectFolderOptions: {
          label: e.label,
          value: e.value
        }
      })
    } else {
      this.setState({
        selectFolderOptions: {
          label: "Select folder from list",
          value: ""
        }
      })
    }
  }

  render() {
    const { handleOpen, modal, folderId } = this.props;
    const { transferToList, selectFolderOptions } = this.state;
    const defaultFolderList = []
    if (transferToList && transferToList.length) {
      transferToList.map((item) => {
        let isNotAccesible
        if (folderId && folderId._id) {
          isNotAccesible = item._id === folderId._id
        }
        if (!isNotAccesible) {
          defaultFolderList.push({
            label: item && item.isCopy ? `Copy of ${item.title}` : item.title,
            value: item._id
          })
        }
        return true
      })
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
            <div className="wrap-folder">
              <AsyncSelect
                isClearable={selectFolderOptions.value ? true : false}
                defaultOptions={defaultFolderList}
                placeholder={"Select folder from list"}
                onChange={(e) => {
                  e && e.label === "+ Add New folder" ?
                    this.props.handleFolderModel() :
                    this.handleInputChange(e)
                }}
                value={selectFolderOptions.value ? selectFolderOptions : ""}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              onClick={() => this.onTransferTo(selectFolderOptions.value)}
              color=" "
              className="btn btn-black"
              disabled={selectFolderOptions.value === ""}
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
