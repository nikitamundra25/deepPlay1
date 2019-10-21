import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  Button
} from "reactstrap";

// core components
class MoveSuccessModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   *
   */
  render() {
    const { isMoveSuccessModal, moveUrlDetails } = this.props;

    return (
      <>
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={isMoveSuccessModal}
        >
          <ModalBody>
            <div className="create-set-section step-2 mt-2">
              <Card className="w-100 set-content-wrap">
                <div className="set-content-block w-100">
                  <CardHeader className="">
                    <div className="content-header set-header flex-column">
                      <span className="content-title custom-head-title">
                        {" "}
                        your move has been created!
                      </span>
                    </div>
                  </CardHeader>
                  <CardBody className="">
                    <div className="d-flex vieos-add-section video-add-banner justify-content-center align-items-center">
                      <span className="play-ic-wrap">
                        <i className="fa fa-play" aria-hidden="true"></i>
                      </span>
                    </div>
                    <p className="font-weight-bold mt-3 text-center h5">
                      Would you like to create another Move from the same video?
                    </p>
                    <div className="text-center mt-4">
                      <Button
                        onClick={() =>
                          // this.props.handleMoveSuccessModal(MoveDetails.moveURL)
                          this.props.createAnother(moveUrlDetails.moveURL)
                        }
                        className="btn-line-black"
                        color=" "
                      >
                       Yes, Create another
                      </Button>
                      <Button
                        onClick={() =>
                          this.props.handleSetDetails(moveUrlDetails.setId)
                        }
                        className="btn-black"
                        color=" "
                      >
                        No i'm done
                      </Button>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default MoveSuccessModal;
