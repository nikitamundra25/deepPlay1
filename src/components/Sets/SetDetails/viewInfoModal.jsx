import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import closeBtn from "../../../assets/img/close-img.png";
import moment from "moment";
import { SecondsToHHMMSS } from "../../../helper/Time";
// core components
class ViewInfoModal extends React.Component {
  render() {
    const { modal, handleOpen, videoData, videoDimentions, video } = this.props;
    let temp = "";
    let stemp = "";
    let splitTime = "";
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
                    {videoData ? (
                      <>
                        <span className="info-heading">Title </span>
                        <span className="info-content">
                          <span className="colon-wrap">: </span>{" "}
                          {videoData.title}
                        </span>
                      </>
                    ) : null}
                  </div>{" "}
                  {videoData.description ? (
                    <div class="info-wrap">
                      <span class="info-heading">Description </span>
                      <span className="info-content">
                        <span className="colon-wrap">: </span>
                        {videoData.description}
                      </span>
                    </div>
                  ) : null}
                </span>

                {videoData.isYoutubeUrl ? (
                  <div class="info-wrap">
                    <span className="info-heading"> Source URL</span>
                    <span className="d-none">
                      {videoData.sourceUrl
                        ? (temp = videoData.sourceUrl.split("/"))
                        : null}
                      {temp ? (stemp = temp[4].split("?")) : null}
                      {videoData.startTime > 0
                        ? (splitTime = SecondsToHHMMSS(
                            videoData.startTime
                          ).split(":"))
                        : null}
                    </span>
                    <a
                      className="text-link"
                      href={
                        videoData.sourceUrl
                          ? splitTime
                            ? `https://www.youtube.com/watch?v=${stemp[0]}&feature=youtu.be&t=${splitTime[0]}h${splitTime[1]}m${splitTime[2]}s`
                            : `https://www.youtube.com/watch?v=${stemp[0]}&feature=youtu.be`
                          : null
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="info-content">
                        <span className="colon-wrap cursor_pointer">: </span>
                        {videoData.sourceUrl
                          ? splitTime
                            ? `https://www.youtube.com/watch?v=${stemp[0]}&feature=youtu.be&t=${splitTime[0]}h${splitTime[1]}m${splitTime[2]}s`
                            : `https://www.youtube.com/watch?v=${stemp[0]}&feature=youtu.be`
                          : null}
                      </span>
                    </a>
                  </div>
                ) : null}

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
                      videoData.createdAt
                        ? videoData.createdAt
                        : video.createdAt
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
