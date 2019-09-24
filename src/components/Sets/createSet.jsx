import React from "react";
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  Label,
  UncontrolledTooltip
} from "reactstrap";
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
      this.props.onCreateSet(data);
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
      <div>
        <Row>
          <h3>Create a New Set of Moves</h3>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <Input
                id="exampleFormControlInput1"
                className="capitalize"
                placeholder="Enter your title here"
                type="text"
                name="title"
                onChange={this.handleChange}
                value={title}
              />
            </FormGroup>
          </Col>
          <Col>
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
            <span
              onClick={() =>
                this.setState({
                  open: !open
                })
              }
              className="cursor_pointer "
              id="description"
            >
              <i className="fas fa-info-circle fa-2x"></i>
            </span>
            <UncontrolledTooltip placement="top" target="description">
              Add description
            </UncontrolledTooltip>
          </Col>
        </Row>
        <Row>
          <Button
            color="default"
            type="button"
            className="btn-btn-save"
            disabled={!title}
            onClick={this.onAddMove}
          >
            Add a Move
          </Button>
        </Row>
        <Modal
          className="modal-dialog-centered"
          isOpen={open}
          toggle={() => this.handleModal}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Description
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.handleModal}
            >
              <span aria-hidden={true} onClick={this.handleModal}>
                <i className="far fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div className="modal-body">
            <FormGroup>
              <Input
                id="exampleFormControlInput1"
                className="capitalize"
                type="text"
                name="description"
                onChange={this.handleChange}
                value={description}
              />
              <Label for="description">DESCRIPTION</Label>
            </FormGroup>
            <br />
            <Button
              color="info"
              type="button"
              onClick={this.onSaveDesc}
              className="fullSize-btn"
            >
              Save changes
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default CreateSetComponent;
