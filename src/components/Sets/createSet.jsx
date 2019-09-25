import React from "react";
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  UncontrolledTooltip,
  InputGroup,
  InputGroupText,
  InputGroupAddon
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
      <div className="creat-set-section mt-2">
        <Card className="w-100">
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
                    <InputGroupText>
                      <span
                        onClick={() =>
                          this.setState({
                            open: !open
                          })
                        }
                        className="cursor_pointer "
                        id="description"
                      >
                        <i className="fas fas fa-info "></i>
                      </span>
                      <UncontrolledTooltip placement="top" target="description">
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
                Add a Move
              </Button>
            </div>
          </CardBody>
        </Card>

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
            ></button>
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
