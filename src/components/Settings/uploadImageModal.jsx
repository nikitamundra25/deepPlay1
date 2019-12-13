import React, { Component } from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import Dropzone from "react-dropzone";
import { ConfirmBox } from "helper/SweetAleart";
import closeIcon from "../../assets/img/close-img.png";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: ""
    };
  }

  componentDidUpdate = ({ modal }) => {
    if (modal !== this.props.modal) {
      this.setState({
        imageData: ""
      });
    }
  };

  onSelectFile = async (file, rejectedFiles) => {
    if (file.length) {
      for (let x = 0; x < file.length; x++) {
        if (file[x].size > 10000000) {
          await ConfirmBox({
            text: "",
            title: "You can upload Image Size up to 10MB",
            showCancelButton: false,
            confirmButtonText: "Ok"
          });
          return;
        }
      }
      file.map(async (data, i) => {
        let picReader = new FileReader();
        let scope = this;
        // eslint-disable-next-line
        const type = data.type;
        await picReader.addEventListener("load", async event => {
          var image = new Image();
          image.src = event.target.result;
          image.onload = async function() {
            let dataURL = picReader.result;
            let imageData = "";
            imageData = dataURL;
            scope.setState({
              imageData
            });
          };
        });
        await picReader.readAsDataURL(data);
      });
    } else {
      await ConfirmBox({
        text: "",
        title:
          "This file type is not supported. We only accept png, jpg & jpeg.",
        showCancelButton: false,
        confirmButtonText: "Ok"
      });
      return;
    }
  };

  handleCancel = () => {
    this.setState({
      imageData: ""
    });
    this.props.handleOpen();
  };
  render() {
    const { isImageUploading } = this.props;

    return (
      <div className="modal-text-center">
        <Modal
          className="modal-dialog-centered custom-model-wrap"
          size="md"
          isOpen={this.props.modal}
          toggle={this.props.handleOpen}
          backdrop={"static"}
        >
          <ModalHeader>
            <span className="custom-title">Upload profile image</span>

            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.props.handleOpen}
            >
              <span aria-hidden={true}>
                {" "}
                <img src={closeIcon} alt="close-ic" />
              </span>
            </button>
          </ModalHeader>
          <ModalBody className="modal-text-center">
            {this.state.imageData ? (
              <div className="file-upload-wrap">
                <img alt="..." src={this.state.imageData} />
              </div>
            ) : (
              <>
                <div className="upload-file-wrap">
                  <Dropzone
                    onDrop={this.onSelectFile}
                    accept=".jpg,.png,.jpeg"
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => {
                      return (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className="add-more-img-wrap">
                            <div className="add-more-text">
                              <img
                                alt="..."
                                src={require("assets/img/icons/common/picture.svg")}
                                width="50px"
                                height="50px"
                              />

                              <div className="upload-heading">
                                Click here to upload a profile image or drag
                                your image{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </Dropzone>
                </div>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color=" "
              onClick={() => this.props.handleImage(this.state.imageData)}
              className="btn btn-black"
              disabled={!isImageUploading ? false : true}
            >
              {!isImageUploading ? "Set profile picture" : "Please Wait..."}
            </Button>{" "}
            <Button
              color=" "
              onClick={this.handleCancel}
              className="btn btn-line-black"
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UploadImage;
