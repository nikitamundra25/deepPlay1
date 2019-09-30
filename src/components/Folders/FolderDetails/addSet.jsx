import React from "react";
import { Modal, ModalBody, ModalHeader, Row, Col, Button } from "reactstrap";
import { AppRoutes } from "../../../config/AppRoutes";
import closeIcon from "../../../assets/img/close-img.png";

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

  handleAddNewSet = folderId => {
    this.props.redirectTo(AppRoutes.CREATE_SET.url + `?folderId=${folderId}`);
  };

  render() {
    const { modal, folderId, handleOpen } = this.props;
    const { setList } = this.state;
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
            <span className="custom-title">Add a Set</span>
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
              <Button
                color=" "
                onClick={() => this.handleAddNewSet(folderId)}
                className={"cursor_pointer btn btn-black"}
              >
                + Create New Set
              </Button>
              {setList && setList.length
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
