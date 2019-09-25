import React from "react";
import {
  Button,
  Modal,
  FormGroup,
  Input,
  Label,
  ModalHeader
} from "reactstrap";
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
          className="modal-dialog-centered auth-user-model"
          isOpen={addSetModalOpen}
          toggle={() => this.handleOpen}
        >
          <ModalHeader toggle={() => this.handleOpen}></ModalHeader>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add a Set
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.handleOpen}
            >
              <span aria-hidden={true} onClick={this.handleOpen}>
                <i className="far fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div className="modal-body">...........</div>
        </Modal>
      </div>
    );
  }
}

export default AddSetModal;
