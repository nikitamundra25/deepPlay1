import React from "react";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
// core components
class AddSetModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOpen = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        addSetModalOpen: !modelDetails.addSetModalOpen
      }
    });
  };

  render() {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { addSetModalOpen } = modelDetails;
    return (
      <div>
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={addSetModalOpen}
          size="md"
          backdrop={"static"}
          toggle={() => this.handleOpen}
        >
          <ModalHeader>
            <span className="custom-title">Add a Set</span>
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
              <Row className="set-wrap">
                <Col md="12">
                  <div className="tile-wrap card">
                    <div className="cotent-tile d-flex">
                      <div className="cotent-text-tile">
                        <div className="content-heading-tile">
                          {" "}
                          Salsa Footwork
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <div className="tile-wrap card">
                    <div className="cotent-tile d-flex">
                      <div className="cotent-text-tile">
                        <div className="content-heading-tile"> Group dance</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <div className="tile-wrap card">
                    <div className="cotent-tile d-flex">
                      <div className="cotent-text-tile">
                        <div className="content-heading-tile"> Zumba </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <div className="tile-wrap card">
                    <div className="cotent-tile d-flex">
                      <div className="cotent-text-tile">
                        <div className="content-heading-tile">
                          {" "}
                          Salsa Partnerwork
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddSetModal;
