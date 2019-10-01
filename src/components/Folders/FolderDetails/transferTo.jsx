import React from "react";
import { Modal, ModalBody, ModalHeader, Card } from "reactstrap";
import closeIcon from "../../../assets/img/close-img.png";
import { logger } from "helper/Logger";
// core components
class TransferToModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferToList: []
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

  render() {
    const { handleOpen, modal } = this.props;
    const { transferToList } = this.state;
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
          <ModalBody className="modal-text-center">
            <div className="wrap-folder">
              <Card>
                {transferToList.length
                  ? transferToList.map((folders, i) => {
                      return (
                        <div className={"d-flex p-2 justify-content-between"}>
                          <div>{folders.title}</div>
                          <div key={i}>
                            <span
                              onClick={() => this.onTransferTo(folders._id)}
                            >
                              <input type="checkbox" />
                            </span>
                          </div>
                        </div>
                        // <Row className="set-wrap" key={i}>
                        //   <Col md="12">
                        //     <div className="tile-wrap card">
                        //       <div className="cotent-tile d-flex">
                        //         <div className="cotent-text-tile d-flex">
                        //           <div className="content-heading-tile">
                        //             {" "}
                        //           </div>
                        //           <div>
                        //           </div>
                        //         </div>
                        //       </div>
                        //     </div>
                        //   </Col>
                        // </Row>
                      );
                    })
                  : ""}
              </Card>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default TransferToModal;
