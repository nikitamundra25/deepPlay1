import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  FormGroup,
  Input
} from "reactstrap";
import { AppRoutes } from "../../../config/AppRoutes";
import closeIcon from "../../../assets/img/close-img.png";
import "./index.scss";

// core components
class AddSetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setList: [],
      selectedSet: "yourSet"
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.getAllSet !== this.props.getAllSet) {
      const setList = this.props.getAllSet;
      const setItem = setList.filter(
        item => item.folderId === this.props.folderId
      );

      this.setState({
        setList: setItem
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
  handleSelect = e => {
    e.preventDefault();
    const setList = this.props.getAllSet;
    let setItem = [];
    if (e.target.value === "yourSet") {
      setItem = setList.filter(item => item.folderId === this.props.folderId);
    } else {
      setItem = this.props.getAllSet;
    }
    this.setState({
      selectedSet: e.target.value,
      setList: setItem
    });
  };

  render() {
    const { modal, folderId, handleOpen } = this.props;
    const { setList, selectedSet } = this.state;

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
              
                <img src={closeIcon} alt="close-ic" />
              </span>
            </button>
          </ModalHeader>
          <ModalBody className="modal-text-center">
            <div className="wrap-folder">
              <div className="tile-wrap card mb-3 d-block">
                <span
                  onClick={() => this.handleAddNewSet(folderId)}
                  className={"cursor_pointer create-btn font-14 text-uppercase"}
                >
                  + Create New Set
                </span>
              </div>
              <FormGroup>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  className="rounded-0"
                  onChange={this.handleSelect}
                  value={selectedSet}
                >
                  <option value="yourSet">Your Sets</option>
                  <option value="allSet">All Sets</option>
                </Input>
              </FormGroup>
              {setList && setList.length
                ? setList.map((set, i) => {
                    return (
                      <Row className="set-wrap" key={i}>
                        <Col md="12">
                          <div className="tile-wrap card">
                            <div className="d-flex flex-warp align-item-center">
                              <div className="sets-heading text-capitalize">
                                {" "}
                                {set.title}
                              </div>
                              <div className="sets-icon ml-auto">
                                {set.folderId !== null ? (
                                  <span
                                    onClick={() =>
                                      this.OnhandleSets(set._id, "add")
                                    }
                                    className="text-center cursor_pointer"
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                ) : (
                                  <span
                                    onClick={() =>
                                      this.OnhandleSets(set._id, "remove")
                                    }
                                    className="text-center cursor_pointer "
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                )}
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
