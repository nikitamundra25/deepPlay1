import React from "react";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
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
      folders.map((list, i) => {
        if (list._id !== this.props.pathName) {
          arr = [...arr, list];
        }
      });
      this.setState({
        transferToList: arr
      });
    }
  }

  handleOpen = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        transferToModalOpen: !modelDetails.transferToModalOpen
      }
    });
  };

  onTransferTo = id => {
    const data = {
      setId: this.props.setToTransfer,
      folderId: id,
      isFolderAdd: true,
      previousFolderId: this.props.pathName
    };
    this.props.handleFolder(data);
  };

  render() {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { transferToModalOpen } = modelDetails;
    const { transferToList } = this.state;
    return (
      <div>
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={transferToModalOpen}
          size="md"
          backdrop={"static"}
          toggle={() => this.handleOpen}
        >
          <ModalHeader>
            <span className="custom-title">Transfer To...</span>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.handleOpen}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </ModalHeader>
          <ModalBody className="modal-text-center">
            <div className="wrap-folder">
              {transferToList.length
                ? transferToList.map((folders, i) => {
                    return (
                      <Row className="set-wrap" key={i}>
                        <Col md="12">
                          <div className="tile-wrap card">
                            <div className="cotent-tile d-flex">
                              <div className="cotent-text-tile d-flex">
                                <div className="content-heading-tile">
                                  {" "}
                                  {folders.title}
                                </div>
                                <div>
                                  <span
                                    onClick={() =>
                                      this.onTransferTo(folders._id)
                                    }
                                  >
                                    <i className="fas fa-check-square"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    );
                  })
                : ""}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default TransferToModal;
