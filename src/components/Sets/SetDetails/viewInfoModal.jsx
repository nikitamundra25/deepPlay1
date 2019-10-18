import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import closeBtn from "../../../assets/img/close-img.png";
import moment from "moment";
// core components
class ViewInfoModal extends React.Component {
  render() {
    const { modal, handleOpen, videoData, videoDimentions } = this.props;
    console.log("videoData", videoData);

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
                  <div className="">
                    {" "}
                    {videoData.title ? videoData.title : null}{" "}
                  </div>
                  <div className="">
                    {" "}
                    {videoData.description ? videoData.description : null}{" "}
                  </div>
                </span>
                <span>
                  Source URL:{" "}
                  <a href={videoData.sourceUrl ? videoData.sourceUrl : null}>
                    {videoData.sourceUrl ? videoData.sourceUrl : null}{" "}
                  </a>
                </span>
                <span>
                  Folder:{" "}
                  {videoData.setId &&
                  videoData.setId.folderId &&
                  videoData.setId.folderId.title
                    ? videoData.setId.folderId.title
                    : ""}
                </span>
                <span>
                  Dimensions:{" "}
                  {videoDimentions ? videoDimentions.videoHeight : 0}px x{" "}
                  {videoDimentions ? videoDimentions.videoWidth : ""}px
                </span>
                <span>Size:</span>
                <span>
                  Uploaded:{" "}
                  {moment(
                    videoData.updatedAt ? videoData.updatedAt : null
                  ).format("l")}{" "}
                </span>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ViewInfoModal;
