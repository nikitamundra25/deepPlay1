import React from "react";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
import { AppRoutes } from "../../../config/AppRoutes"
// import CreateSetComponent from "../../Sets/createSet"

// core components
class AddSetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setList: []
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.getAllSet !== this.props.getAllSet) {
      const setList = this.props.getAllSet;
      this.setState({
        setList: setList
      });
    }
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

  OnhandleSets = (id, name) => {
    this.props.handleSets(id, name);
  };

  handleAddNewSet = (folderId) => {
    this.props.redirectTo(AppRoutes.CREATE_SET.url)
  }

  render() {
    const { modelInfoReducer, folderId } = this.props;
    const { modelDetails } = modelInfoReducer;
    const { addSetModalOpen } = modelDetails;
    const { setList } = this.state;
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
              <span onClick={() => this.handleAddNewSet(folderId)} className={"cursor_pointer"}>+ Create New Set</span>
              {setList
                ? setList.map((set, i) => {
                  return (
                    <Row className="set-wrap" key={i}>
                      <Col md="12">
                        <div className="tile-wrap card">
                          <div className="cotent-tile d-flex">
                            <div className="cotent-text-tile d-flex">
                              <div className="content-heading-tile">
                                {" "}
                                {set.title}
                              </div>
                              <div>
                                {set.folderId !== null ? (
                                  <span
                                    onClick={() =>
                                      this.OnhandleSets(set._id, "add")
                                    }
                                  >
                                    <i
                                      className="fa fa-plus-square-o"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                ) : (
                                    <span
                                      onClick={() =>
                                        this.OnhandleSets(set._id, "remove")
                                      }
                                    >
                                      <i
                                        className="fa fa-minus"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  )}
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

export default AddSetModal;
