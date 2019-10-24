import React from "react";
import {
  ModalHeader,
  Modal,
  ModalBody,
  Button
} from "reactstrap";
//import { AppConfig } from "../../../config/Appconfig";
// core components
class MoveSuccessModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }

  handleVideoPlay = () => {
    this.video = document.getElementById("video-trimmer");
    this.setState({
      isPlaying: true
    });
    this.video.play();
  }
  /**
   *
   */
  render() {
    const { isMoveSuccessModal, moveUrlDetails } = this.props;
    const { isPlaying } = this.state
    return (
      <>
        <Modal
          className="modal-dialog-centered custom-model-wrap video-complete-popup"
          isOpen={isMoveSuccessModal}
        >
          <ModalHeader>
            <div className="content-header set-header flex-column">
              <span className="content-title text-white custom-head-title">
                {" "}
                Your move has been created!
              </span>
            </div>
          </ModalHeader>
          <ModalBody >
            <div className="create-set-section step-2 ">
              <div className="w-100 set-content-wrap pt-0 mt-0 ">
                <div className="set-content-block w-100">

                  <div className="d-flex vieos-add-section video-add-banner justify-content-center align-items-center">
                    <video width={"100%"} loop id={"video-trimmer"}>
                      <source
                        src={`${moveUrlDetails.s3VideoUrl}`}
                      />
                    </video>
                    {
                      !isPlaying ?
                        <span onClick={this.handleVideoPlay} className="play-ic-wrap">
                          <i className="fa fa-play" aria-hidden="true"></i>
                        </span> : null
                    }
                  </div>
                  <p className="font-weight-bold my-3 text-center h5 mb">
                    Would you like to create another Move from the same video?
                    </p>
                  <div className="text-center ">
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

                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default MoveSuccessModal;