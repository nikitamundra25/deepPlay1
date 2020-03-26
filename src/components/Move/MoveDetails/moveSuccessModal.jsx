import React from "react";
import { ModalHeader, Modal, ModalBody, Button } from "reactstrap";
import videoLoading from "../../../assets/img/loder/loader.svg";

// core components
class MoveSuccessModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      videoCanPlay: false
    };
  }

  componentDidMount = () => {};

  handleVideoPlay = () => {
    this.video = document.getElementById("video-trimmer");
    this.setState({
      isPlaying: true
    });
    this.video.load();
    this.video.play();
  };
  /**
   *
   */
  render() {
    const {
      isMoveSuccessModal,
      moveUrlDetails,
      isCreatingAnotherMove,
      moveDetails
    } = this.props;
    const { videoCanPlay } = this.state;

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
          <ModalBody>
            <div className="create-set-section step-2 ">
              <div className="w-100 set-content-wrap pt-0 mt-0 ">
                <div className="set-content-block w-100">
                  <div className="d-flex vieos-add-section video-add-banner justify-content-center align-items-center">
                    {!videoCanPlay ? (
                      <div className="video-spinner z-">
                        <img src={videoLoading} alt="" />
                      </div>
                    ) : null}
                    <video
                      width={"100%"}
                      autoPlay
                      loop={true}
                      onCanPlay={() => {
                        this.setState({
                          videoCanPlay: true
                        });
                      }}
                      onLoadedData={() => {
                        this.setState({
                          videoCanPlay: false
                        });
                      }}
                      id={"video-trimmer"}
                      playsinline
                    >
                      <source src={moveDetails.videoUrl} />
                    </video>
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
                      disabled={isCreatingAnotherMove}
                    >
                      {isCreatingAnotherMove
                        ? "Please wait..."
                        : "Yes, Create another"}
                    </Button>
                    <Button
                      onClick={() => this.props.redirectToSetDetails("done")}
                      className="btn-black"
                      color=" "
                      disabled={isCreatingAnotherMove}
                    >
                      No, i am done
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
