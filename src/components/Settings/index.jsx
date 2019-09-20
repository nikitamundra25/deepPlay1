import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  FormFeedback
} from "reactstrap";
import Validator from "js-object-validation";
import Swal from "sweetalert2";
import {
  SingupValidations,
  SingupValidationsMessaages
} from "../../validations";
import UploadImage from "./uploadImageModal";

class SettingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      firstName: "",
      lastName: "",
      profileImage: "",
      roleType: false,
      imgError: "",
      file: "",
      modal: false,
      errors: {}
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.profileInfoReducer !== this.props.profileInfoReducer) {
      const {
        firstName,
        lastName,
        profileImage,
        roleType
      } = this.props.profileInfoReducer;
      this.setState({
        firstName,
        lastName,
        file: profileImage,
        roleType
      });
    }
    if (prevProps.profileImageThumb !== this.props.profileImageThumb) {
      this.setState({
        file: this.props.profileImageThumb,
        modal: false
      });
    }
  }
  onHandleEdit = () => {
    this.setState({
      isDisabled: !this.state.isDisabled
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    if (name === "teacher" || name === "student") {
      this.setState({
        roleType: name
      });
    } else {
      this.setState({
        roleType: "unClassified"
      });
    }
  };

  onSaveData = () => {
    const { firstName, lastName, roleType } = this.state;
    const data = {
      firstName: firstName,
      lastName: lastName,
      roleType: roleType
    };
    let { isValid, errors } = Validator(
      data,
      SingupValidations,
      SingupValidationsMessaages
    );
    if (!isValid) {
      this.setState({
        errors,
        isLoading: false
      });
      return;
    }
    this.props.handleData(data);
    this.setState({
      isDisabled: !this.state.isDisabled
    });
  };

  handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this account permanently!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.props.onDelete();
      }
    });
  };

  handleOpen = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleImage = data => {
    this.props.uploadImage(data);
  };

  render() {
    const { profileInfoReducer } = this.props;
    const {
      isDisabled,
      firstName,
      lastName,
      roleType,
      file,
      errors,
      imgError
    } = this.state;
    console.log("file", this.state.file);
    return (
      <div className="col-md-12 col-sm-12">
        <h1>Settings</h1>
        <div className="dashboard-right-profile">
          <h6>PROFILE </h6>
          <Button
            color="default"
            outline
            type="button"
            size="sm"
            className="btn-btn-right"
            onClick={this.onHandleEdit}
          >
            Edit Profile
          </Button>
        </div>
        <div className="user-profile">
          <div className="profileAvtar">
            {file ? (
              <img alt="..." src={this.state.file} />
            ) : (
              <img alt="..." src={require("assets/img/icons/common/boy.svg")} />
            )}
            {!isDisabled ? (
              <span className="changeProfile" onClick={this.handleOpen}>
                Change Profile
              </span>
            ) : (
              ""
            )}
          </div>
          {imgError ? <div className="text-danger"> {imgError} </div> : null}
        </div>
        <div className="settingForm">
          <Form>
            <Row className={"m-0"}>
              <Col md="6">
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    id="exampleFormControlInput1"
                    className="capitalize"
                    placeholder="firstName"
                    type="text"
                    name="firstName"
                    disabled={isDisabled}
                    onChange={this.handleChange}
                    value={firstName}
                  />
                  {errors.firstName && !firstName ? (
                    <p style={{ color: "red" }}> {errors.firstName} </p>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    id="exampleFormControlInput1"
                    className="capitalize"
                    placeholder="lastName"
                    type="text"
                    name="lastName"
                    disabled={isDisabled}
                    onChange={this.handleChange}
                    value={lastName}
                  />
                  {errors.lastName && !lastName ? (
                    <p style={{ color: "red" }}> {errors.lastName} </p>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    type="email"
                    value={profileInfoReducer ? profileInfoReducer.email : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="setting-account-type">
          <h6>ACCOUNT TYPE</h6>
        </div>
        <h4>
          <b>Teacher or Student account </b>
        </h4>
        <div className="custom-control custom-radio mb-3 control">
          <input
            className="custom-control-input"
            id="customRadio5"
            name="teacher"
            disabled={isDisabled}
            onChange={this.handleChange}
            checked={roleType === "teacher"}
            type="radio"
          />
          <label className="custom-control-label" htmlFor="customRadio5">
            Teacher
          </label>
        </div>
        <div className="custom-control custom-radio mb-3 control ">
          <input
            className="custom-control-input"
            id="customRadio6"
            name="student"
            disabled={isDisabled}
            onChange={this.handleChange}
            checked={roleType === "student"}
            type="radio"
            value=""
          />
          <label className="custom-control-label" htmlFor="customRadio6">
            Student
          </label>
        </div>
        <Button
          color="default"
          type="button"
          className="btn-btn-save"
          onClick={this.onSaveData}
        >
          Save
        </Button>
        <div className="setting-account-type">
          <h6>DELETE ACCOUNT</h6>
        </div>
        <h4>
          <b>Permanently delete this account </b>
          <p>Be careful- this will delete your data and cannot be undone.</p>
        </h4>
        <Button
          color="danger"
          type="button"
          className="btn-btn-save"
          onClick={this.handleDelete}
        >
          Delete Account
        </Button>
        <UploadImage
          handleImage={this.handleImage}
          handleOpen={this.handleOpen}
          modal={this.state.modal}
        />
      </div>
    );
  }
}

export default SettingComponent;
