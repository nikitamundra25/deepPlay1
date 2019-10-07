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
import {
  createSetRequest,
  getSetDetailsRequest,
  UpdateSetRequest
} from "../../actions";
import * as qs from "query-string";
import { AppRoutes } from "../../config/AppRoutes";
import "./index.scss";

class CreateSetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      errors: "",
      description: "",
      isEdit: false,
      open: false
    };
  }

  componentDidMount = () => {
    let parsed = qs.parse(this.props.location.search);
    if (parsed && parsed.setid) {
      this.props.getSetDetailsRequest({ setId: parsed.setId });
    }
  };

  componentDidUpdate(prevProps) {
    let parsed = qs.parse(this.props.location.search);
    if (
      prevProps.setReducer &&
      prevProps.setReducer.setDetails !== this.props.setReducer.setDetails
    ) {
      const setList = this.props.setReducer.setDetails;
      if (parsed.isEdit) {
        this.setState({
          title: setList.title ? setList.title : " ",
          description: setList.description ? setList.description : " ",
          isEdit: true
        });
      }
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleBlur = async () => {
    let parsed = qs.parse(this.props.location.search);
    const data = {
      title: this.state.title,
      description: this.state.description,
      folderId: parsed.folderId ? parsed.folderId : ""
    };
    await this.props.onSetsCreation(data);
  };

  updateSet = () => {
    let parsed = qs.parse(this.props.location.search);
    const data = {
      title: this.state.title,
      description: this.state.description,
      setId: parsed.setId ? parsed.setId : ""
    };
    this.props.UpdateSetRequest(data);
  };

  onAddMove = async () => {
    this.props.redirectTo(AppRoutes.MOVE.url);
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
    const { title, open, description, isEdit } = this.state;
    let parsed = qs.parse(this.props.location.search);

    return (
      <div className="create-set-section">
        <Card className="w-100 set-content-wrap">
          <div className="set-content-block w-100">
            <CardHeader className="">
              <div className="content-header set-header">
                <span className="content-title">
                  {isEdit ? "Update Set" : "CREATE A NEW SET OF MOVES"}
                </span>
              </div>
            </CardHeader>
            <CardBody className="">
              <div className="create-set-tile">
                <FormGroup className="flex-fill">
                  <InputGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="Enter your title here"
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      value={title}
                      onBlur={!isEdit && title ? this.handleBlur : null}
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
              </div>
              <div className="text-center">
                {!parsed.isEdit ? (
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
                ) : (
                  <Button
                    color=" "
                    type="button"
                    className="btn-black btn mt-3"
                    disabled={!title}
                    onClick={this.updateSet}
                  >
                    Update Set
                  </Button>
                )}
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
              <span class="custom-title">Description</span>
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.handleModal}
            >
              <span aria-hidden="true">
                {" "}
                <img src="./assets/img/close-img.png" alt="close-ic" />
              </span>
            </button>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="description" className="font-weight-bold text-center">
                DESCRIPTION
              </Label>
              <Input
                id="exampleFormControlInput1"
                type="textarea"
                name="description"
                onChange={this.handleChange}
                value={description}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color=" "
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
    setReducer: state.setReducer
  };
};
const mapDispatchToProps = dispatch => ({
  onSetsCreation: data => dispatch(createSetRequest(data)),
  getSetDetailsRequest: data => dispatch(getSetDetailsRequest(data)),
  UpdateSetRequest: data => dispatch(UpdateSetRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSetComponent);
