import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  ButtonGroup
} from "reactstrap";
import Validator from "js-object-validation";
import Swal from "sweetalert2";
import {
  SingupValidations,
  SingupValidationsMessaages
} from "../../validations";
import UploadImage from "./uploadImageModal";
import profileIcon from "../../assets/img/profile-ic.png";
import { AppConfig } from "../../config/Appconfig";
import Loader from "../comman/Loader/Loader";

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
      name: "",
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
        name: firstName + " " + lastName,
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
      [name]: value.replace(/[^\w\s]|[0-9]|[_]/gi, "").trim()
    });
  };

  handleAccountEdit = e => {
    const { name } = e.target;
    if (name === "teacher" || name === "student") {
      this.setState({
        roleType: name
      });
      this.onHandleAccount(name);
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

  onHandleAccount = name => {
    const { firstName, lastName } = this.state;
    const data = {
      roleType: name,
      firstName: firstName,
      lastName: lastName,
      accountType: true
    };
    this.props.handleData(data);
  };

  handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete your account permanently!",
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
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        uploadImageModalOpen: !modelDetails.uploadImageModalOpen
      }
    });
  };

  handleImage = data => {
    this.props.uploadImage(data);
  };

  handlecancel = () => {
    const { firstName, lastName } = this.props.profileInfoReducer;
    this.setState({
      firstName,
      lastName,
      isDisabled: !this.state.isDisabled
    });
  };

  render() {
    const {
      profileInfoReducer,
      modelInfoReducer,
      isImageUploading,
      isprofileInfoLoading
    } = this.props;
    const {
      isDisabled,
      firstName,
      lastName,
      roleType,
      file,
      errors,
      imgError,
      name
    } = this.state;
    const { modelDetails } = modelInfoReducer;
    const { uploadImageModalOpen } = modelDetails;
    const splitedImage = this.state.file.split("/");
    const ProfileImage =
      splitedImage[0] === "uploads"
        ? `${AppConfig.API_ENDPOINT}${this.state.file}`
        : this.state.file;
    return (
      <div>
        <div className="setting-section">
          <div className="page-body">
            <div className="content-header ">
              <span className="content-title">Settings</span>
            </div>
            {!isprofileInfoLoading ? (
              <>
                <Card className="card-wrap ">
                  <CardHeader className="d-flex">
                    <CardTitle className="card-heading mb-0 h5">
                      Profile
                    </CardTitle>
                    <div className="heading-divider"></div>
                    {isDisabled ? (
                      <Button
                        className="dashboard-right-content btn-line-black"
                        onClick={this.onHandleEdit}
                        color=" "
                      >
                        {/* <i className="profile-ic fa fa-pencil-square-o"></i> */}
                        <span className="text-profile">Edit Profile</span>
                      </Button>
                    ) : (
                      <ButtonGroup>
                        <Button
                          color=" "
                          className="dashboard-right-content btn-black "
                          onClick={this.onSaveData}
                        >
                          {/* <i className="profile-ic fa fa-pencil-square-o"></i> */}
                          <span className="text-profile"> Update Info</span>
                        </Button>
                        <Button
                          color=" "
                          className="dashboard-right-content btn-line-black ml-2"
                          onClick={this.handlecancel}
                        >
                          Cancel
                        </Button>
                      </ButtonGroup>
                    )}
                  </CardHeader>
                  <CardBody>
                    <div className="profile-wrap">
                      <div className="profile-img-tile">
                        <div className="profile-img">
                          {file ? (
                            // <img
                            //   alt={"No Img Found"}
                            //   src={
                            //     splitedImage[0] === "uploads"
                            //       ? `${AppConfig.API_ENDPOINT}${this.state.file}`
                            //       : this.state.file
                            //   }
                            //   className="w-100"
                            // />
                            <div
                              style={{
                                backgroundImage: 'url("' + ProfileImage + '")'
                              }}
                              className="user-back-img-wrap"
                            ></div>
                          ) : (
                            <div
                              style={{
                                backgroundImage: 'url("' + profileIcon + '")'
                              }}
                              className="user-back-img-wrap"
                            ></div>
                            // <img alt="" src={profileIcon} className="w-100" />
                          )}
                          {!isDisabled ? (
                            <span
                              className="changeProfile"
                              onClick={this.handleOpen}
                            >
                              Change Profile
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        {imgError ? (
                          <div className="text-danger"> {imgError} </div>
                        ) : null}
                      </div>
                      <div className="profile-text-tile color-black">
                        <div className="h5 font-weight-bold text-center mt-2 text-capitalize">
                          {name}
                        </div>
                      </div>
                    </div>

                    <Form className="form-wrap settingForm">
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                              placeholder="John"
                              type="text"
                              disabled={isDisabled}
                              onChange={this.handleChange}
                              value={firstName}
                              name="firstName"
                            />
                            {errors.firstName && !firstName ? (
                              <p style={{ color: "red" }}>
                                {" "}
                                {errors.firstName}{" "}
                              </p>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                              id="exampleFormControlInput1"
                              placeholder="Doe"
                              type="text"
                              disabled={isDisabled}
                              onChange={this.handleChange}
                              value={lastName}
                              name="lastName"
                            />
                            {errors.lastName && !lastName ? (
                              <p style={{ color: "red" }}>
                                {" "}
                                {errors.lastName}{" "}
                              </p>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                              id="exampleFormControlInput1"
                              placeholder="johndoe@example.com"
                              type="email"
                              readOnly
                              value={
                                profileInfoReducer
                                  ? profileInfoReducer.email
                                  : ""
                              }
                            />
                          </FormGroup>
                        </Col>
                        {/* <Col md="6">
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="*******"
                          type="password"
                        />
                      </FormGroup>
                    </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="card-wrap mt-4">
                  <CardHeader>
                    <CardTitle className="card-heading mb-0 h5">
                      Account type
                    </CardTitle>
                    <div className="heading-divider mr-0"></div>
                  </CardHeader>
                  <CardBody>
                    <div className="account-type-wrap">
                      <Form className="form-wrap">
                        <Row>
                          <Col md="6">
                            <FormGroup className="custom-control custom-radio mb-3 ">
                              <Input
                                className="custom-control-input"
                                id="customRadio6"
                                name="teacher"
                                onChange={this.handleAccountEdit}
                                checked={roleType === "teacher"}
                                type="radio"
                                value=""
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customRadio6"
                              >
                                Teacher
                              </Label>
                            </FormGroup>
                          </Col>
                          <Col md="6" className="text">
                            <FormGroup className="custom-control custom-radio mb-3 ">
                              <Input
                                className="custom-control-input"
                                id="customRadio5"
                                name="student"
                                onChange={this.handleAccountEdit}
                                checked={roleType === "student"}
                                type="radio"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customRadio5"
                              >
                                Student
                              </Label>
                            </FormGroup>
                          </Col>
                          {/* <Col md="12" className="pt-3">
                        <FormGroup>
                          <Button className="btn-black ">Save Info</Button>
                        </FormGroup>
                      </Col> */}
                        </Row>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-wrap mt-4">
                  <CardHeader>
                    <CardTitle className="card-heading mb-0 h5 text-danger">
                      Delete account
                    </CardTitle>
                    <div className="heading-divider mr-0"></div>
                  </CardHeader>
                  <CardBody>
                    <div className="text-center">
                      <Form className="form-wrap settingForm ">
                        <Row>
                          <Col md="12" className="text">
                            <h5>Permanently delete this account</h5>
                            <p>
                              Be careful- this will delete your data and cannot
                              be undone.
                            </p>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <Button
                                color="danger"
                                type="button"
                                className="btn-btn-save mb-2"
                                onClick={this.handleDelete}
                              >
                                Delete Account
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </>
            ) : (
              <Row>
                <Col sm={12} className="loader-col">
                  <Loader />
                </Col>
              </Row>
            )}
          </div>
        </div>
        <UploadImage
          handleImage={this.handleImage}
          handleOpen={this.handleOpen}
          modal={uploadImageModalOpen}
          isImageUploading={isImageUploading}
        />
      </div>
    );
  }
}

export default SettingComponent;
