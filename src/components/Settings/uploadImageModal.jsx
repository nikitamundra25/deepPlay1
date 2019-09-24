import React, { Component } from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import Dropzone from "react-dropzone";
import { ConfirmBox } from "helper/SweetAleart";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: ""
    };
  }
  onSelectFile = async (file, index) => {
    for (let x = 0; x < file.length; x++) {
      if (file[x].size > 10000000) {
        await ConfirmBox({
          text: "",
          title: "Maximum allowed size for image is 10mb",
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
  };
  handleCancel = () => {
    this.setState({
      imageData: ""
    });
    this.props.handleOpen();
  };
  render() {
    return (
      <div className="modal-text-center">
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={this.props.modal}
          toggle={this.props.handleOpen}
          backdrop={"static"}
        >
          <ModalHeader>
            <h4>Upload profile image</h4>

            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.props.handleOpen}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </ModalHeader>
          <ModalBody className="modal-text-center">
            {this.state.imageData ? (
              <img
                alt="..."
                src={this.state.imageData}
                width="350px"
                height="250px"
              />
            ) : (
              <>
                <img
                  alt="..."
                  src={require("assets/img/icons/common/picture.svg")}
                  width="50px"
                  height="50px"
                />

                <Dropzone
                  onDrop={this.onSelectFile}
                  accept="image/*"
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="add-more-img-wrap">
                          <div className="add-more-text">
                            <h3>Drag a profile photo here </h3>
                            <br />
                            <Button
                              color="default"
                              type="button"
                              size="sm"
                              className="btn-btn-right"
                            >
                              Select a photo from your computer
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Dropzone>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.props.handleImage(this.state.imageData)}
            >
              Set profile picture
            </Button>{" "}
            <Button color="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UploadImage;
