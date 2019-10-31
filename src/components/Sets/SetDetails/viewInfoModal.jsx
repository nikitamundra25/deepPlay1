import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import closeBtn from "../../../assets/img/close-img.png";
import moment from "moment";
// core components
class ViewInfoModal extends React.Component {
  render() {
    const { modal, handleOpen, videoData, videoDimentions } = this.props;

    return (
      <div>
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={modal}
          toggle={handleOpen}
          backdrop={"static"}
        >
          <ModalHeader>
            <span className="custom-title" id="exampleModalLabel">
              View Info
            </span>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={handleOpen}
            >
              <span aria-hidden="true">
                <img src={closeBtn} alt="close-ic" />
              </span>
            </button>
          </ModalHeader>
          <ModalBody>
            <div>
              <div className="content-heading-tile d-flex flex-column ">
                <span className="content-title justify-content-between">
                  <div class="info-wrap">
                    {videoData.title ? (
                      <>
                        <span class="info-heading">Title </span>
                        <span className="info-content">
                          <span className="colon-wrap">: </span>{" "}
                          {videoData.title}
                        </span>
                      </>
                    ) : null}
                  </div>
                  <div class="info-wrap">
                    {" "}
                    {videoData.description ? (
                      <>
                        <span class="info-heading">Description </span>
                        <span className="info-content">
                          <span className="colon-wrap">: </span>
                          {videoData.description}
                        </span>
                      </>
                    ) : null}
                  </div>
                </span>
                <div class="info-wrap">
                  <span className="info-heading"> Source URL</span>
                  <a href={videoData.sourceUrl ? videoData.sourceUrl : null}>
                    <span className="info-content">
                      <span className="colon-wrap cursor_pointer">: </span>
                      {videoData.sourceUrl ? videoData.sourceUrl : null}{" "}
                    </span>
                  </a>
                </div>

                <div class="info-wrap">
                  {" "}
                  {videoData.setId &&
                  videoData.setId.folderId &&
                  videoData.setId.folderId.title ? (
                    <>
                      <span class="info-heading">Folder </span>
                      <span className="info-content">
                        <span className="colon-wrap">: </span>
                        {videoData.setId.folderId.title}
                      </span>
                    </>
                  ) : null}
                </div>
                <div class="info-wrap">
                  <span className="info-heading"> Dimensions</span>
                  <span className="info-content">
                    <span className="colon-wrap">: </span>
                    {videoDimentions ? videoDimentions.videoHeight : 0}px{" "}
                    <b className="multiply-option">x </b>{" "}
                    {videoDimentions ? videoDimentions.videoWidth : ""}px
                  </span>
                </div>
                {/* <div class="info-wrap">
                  <span className="info-heading"> Size</span>
                  <span className="info-content">
                    <span className="colon-wrap">: </span>
                  </span>
                </div> */}
                <div class="info-wrap">
                  <span className="info-heading"> Uploaded</span>{" "}
                  <span className="info-content">
                    <span className="colon-wrap">: </span>
                    {moment(
                      videoData.createdAt ? videoData.createdAt : null
                    ).format("l")}{" "}
                  </span>
                </div>
                <span></span>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ViewInfoModal;
