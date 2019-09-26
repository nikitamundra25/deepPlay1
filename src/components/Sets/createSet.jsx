import React from "react";
import {
  FormGroup,
  Input,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
  Card,
  CardBody,
  CardHeader,
  UncontrolledTooltip,
  InputGroup,
  InputGroupText,
  InputGroupAddon
} from "reactstrap";
import { connect } from "react-redux";
import { createSetRequest } from "../../actions"
import "./index.scss";

class CreateSetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      errors: "",
      description: "",
      open: false
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onAddMove = async () => {
    if (!this.state.title) {
      await this.setState({
        errors: "Title is required"
      });
    } else {
      const data = {
        title: this.state.title,
        description: this.state.description
      };
      this.props.onSetsCreation(data);
    }
  };

  onSaveDesc = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleModal = () => {
    this.setState({
      open: !this.state.open,
      description: ""
    });
  };

  render() {
    const { title, open, description } = this.state;
    return (
      <div className="create-set-section mt-2">
        <Card className="w-100 set-content-wrap">
          <div className="set-content-block w-100">
            <CardHeader className="">
              <div className="content-header set-header">
                <span className="content-title">CREATE A NEW SET OF MOVES</span>
              </div>
            </CardHeader>
            <CardBody className="">
              <div className="create-set-tile">
                <FormGroup className="flex-fill">
                  <InputGroup>
                    <Input
                      id="exampleFormControlInput1"
                      className="capitalize"
                      placeholder="Enter your title here"
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      value={title}
                    />
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText
                        id="description"
                        onClick={() =>
                          this.setState({
                            open: !open
                          })
                        }
                      >
                        <span className="cursor_pointer ">
                          <i className="fas fas fa-info "></i>
                        </span>
                        <UncontrolledTooltip
                          placement="top"
                          target="description"
                        >
                          Add description
                        </UncontrolledTooltip>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                {/* <div className="">
                <span
                  onClick={this.onAddMove}
                  className={this.state.title ? "cursor_pointer" : "disable-span"}
                  id="move"
                >
                  <i className="fas fa-plus-square fa-2x "></i>
                </span>
                <UncontrolledTooltip placement="top" target="move">
                  Add a move
            </UncontrolledTooltip>
              

              </div> */}
              </div>
              <div className="text-center">
                <Button
                  color=" "
                  type="button"
                  className="btn-black btn mt-3"
                  disabled={!title}
                  onClick={this.onAddMove}
                >
                  <i className="fas fa-plus mr-1"></i>
                  Add a Move
                </Button>
              </div>
            </CardBody>
          </div>
        </Card>

        <Modal
          className="modal-dialog-centered custom-model-wrap"
          isOpen={open}
          toggle={() => this.handleModal}

        >
          <ModalHeader>
            <h5 className="modal-title" id="exampleModalLabel">
              <span class="custom-title">Upload profile image</span>
              <span class="custom-title">Description</span>
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.handleModal}
            >
              <span aria-hidden="true">×</span>
            </button>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="description" className="font-weight-bold text-center">
                DESCRIPTION
              </Label>
              <Input
                id="exampleFormControlInput1"
                className="capitalize"
                type="text"
                name="description"
                onChange={this.handleChange}
                value={description}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="info"
              type="button"
              onClick={this.onSaveDesc}
              className="btn btn-black"
            >
              Save changes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modelInfoReducer: state.modelInfoReducer,
    getAllSetReducer: state.getAllSetReducer
  };
};
const mapDispatchToProps = dispatch => ({
  onSetsCreation: data => dispatch(createSetRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSetComponent);