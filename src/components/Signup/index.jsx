import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  FormFeedback,
  ModalBody,
  ModalHeader
} from "reactstrap";
// core components
import Validator from "js-object-validation";
import {
  SingupValidations,
  SingupValidationsMessaages
} from "../../validations";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import { logger } from "helper/Logger";

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      roleType: false,
      passwordStrength: "weak",
      errors: {},
      termsService: false
    };
  }
  componentDidUpdate = ({ openSignupModel }) => {
    if (openSignupModel !== this.props.openSignupModel) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
        roleType: false,
        errors: {}
      });
    }
  };
  /*
  /* 
  */
  /*
   /* 
   */
  handleFacebookLogin = response => {
    try {
      const name = response.name.split(" ");
      const payload = {
        email: response.email,
        firstName: name[0],
        lastName: name[1],
        profileImage: response.picture.data.url,
        accessToken: response.accessToken
      };
      this.setState({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName
      });
    } catch (error) {
      logger(error);
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(error);
      }
    }
  };
  /*
  /* 
  */
  handleGoogleLogin = response => {
    try {
      const payload = {
        email: response.profileObj.email,
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        profileImage: response.profileObj.imageUrl,
        accessToken: response.accessToken
      };
      this.setState({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName
      });
    } catch (error) {
      logger(error);
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(error);
      }
    }
  };
  /*
  /* 
  */
  handleChange = e => {
    // this.setState({
    //   errors: ""
    // });
    const { name, value, checked } = e.target;
    console.log("name", name);

    if (name === "roleType") {
      this.setState({
        roleType: checked
      });
      return;
    }

    if (name === "termsService") {
      this.setState({
        termsService: checked
      });
      return;
    }

    if (name === "firstName" || name === "lastName") {
      this.setState({
        [name]: value.replace(/[^\w\s]|[0-9]|[_]/gi, "").trim(),
        errors: {
          ...this.state.errors,
          [name]: null
        }
      });
      return;
    }
    if (name === "password") {
      value.match(/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i);
      if (value.length >= 8) {
        this.setState({
          passwordStrength: "strong"
        });
      } else {
        this.setState({
          passwordStrength: "weak"
        });
      }
    }

    this.setState({
      [name]: value.trim(),
      errors: {
        ...this.state.errors,
        [name]: null
      }
    });
  };
  /*
  /* 
  */
  handleSignupRequest = e => {
    e.preventDefault();
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      roleType
    } = this.state;
    const data = {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      roleType: roleType ? "teacher" : "student"
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
    } else {
      this.setState({
        errors: {}
      });
    }
    this.props.signupRequest(data);
  };
  /*
  /* 
  */
  render() {
    const { openSignupModel, handleSignupModel, loginReducer } = this.props;
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      roleType,
      errors,
      passwordStrength,
      termsService
    } = this.state;
    const { isSignupLoading } = loginReducer;
    return (
      <>
        <Modal
          className="modal-dialog-centered auth-user-model sign-up-model"
          isOpen={openSignupModel}
          toggle={handleSignupModel}
          // backdrop={"static"}
          size={"sm"}
        >
          <ModalHeader toggle={handleSignupModel} />
          <ModalBody className="modal-body p-0">
            <Card className="bg-secondaryborder-0 pb-0 sign">
              <CardHeader>
                <div className=" login-heading text-center  mb-3">
                  Sign up with
                </div>
                <div className="btn-wrapper text-center social-media-wrap">
                  <span className="btn-inner--icon mr-2 facebook-wrap">
                    <FacebookLogin
                      appId="194959544980237"
                      autoLoad={false}
                      fields="name,email,picture"
                      textButton={"Facebook"}
                      callback={this.handleFacebookLogin}
                      cssClass={"btn-neutral btn-icon btn btn-default"}
                      icon={"fa-facebook"}
                    />
                  </span>
                  <span className="btn-inner--icon google-wrap">
                    <GoogleLogin
                      clientId="201270708097-vrbfettj9u5gnrpnjd6sn9o73skmjg3f.apps.googleusercontent.com"
                      buttonText="Google"
                      className={"btn-neutral btn-icon btn btn-default"}
                      onSuccess={this.handleGoogleLogin}
                      onFailure={this.handleGoogleLogin}
                      cookiePolicy={"single_host_origin"}
                    />
                  </span>
                </div>
              </CardHeader>

              <CardBody className="px-lg-5">
                <div className="text-center login-heading mb-4 auth-subheading">
                  <span> Sign up with email</span>
                </div>
                <Form role="form" onSubmit={this.handleSignupRequest}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={firstName}
                        name={"firstName"}
                        className={errors.firstName ? "is-invalid" : ""}
                        onChange={this.handleChange}
                        placeholder="First Name"
                        type="text"
                        // invalid={errors.firstName}
                      />
                      <FormFeedback>
                        {errors.firstName || !firstName
                          ? errors.firstName
                          : null}
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={lastName}
                        name={"lastName"}
                        className={errors.lastName ? "is-invalid" : ""}
                        onChange={this.handleChange}
                        placeholder="Last Name"
                        type="text"
                      />
                      <FormFeedback>
                        {errors.lastName || !lastName ? errors.lastName : null}
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={email}
                        name={"email"}
                        className={errors.email ? "is-invalid" : ""}
                        onChange={this.handleChange}
                        placeholder="Email"
                        type="text"
                      />
                      <FormFeedback>
                        {errors.email ? errors.email : null}
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name={"password"}
                        className={errors.password ? "is-invalid" : ""}
                        value={password}
                        onChange={this.handleChange}
                        autoComplete="off"
                      />
                      <FormFeedback>
                        {errors.password ? errors.password : null}
                      </FormFeedback>
                    </InputGroup>
                    {password ? (
                      <div className="text-muted font-italic">
                        <small>
                          password strength:{" "}
                          <span
                            className={`${
                              passwordStrength === "weak"
                                ? "text-danger"
                                : "text-success"
                            } font-weight-700`}
                          >
                            {passwordStrength}
                          </span>
                        </small>
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        className={errors.confirmPassword ? "is-invalid" : ""}
                        name={"confirmPassword"}
                        value={confirmPassword}
                        onChange={this.handleChange}
                        autoComplete="off"
                      />
                      <FormFeedback>
                        {errors.confirmPassword ? errors.confirmPassword : null}
                      </FormFeedback>
                    </InputGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox mt-2 mb-4">
                      <Input
                        className="custom-control-input"
                        id="customCheckRegister"
                        value={roleType}
                        name={"roleType"}
                        onChange={this.handleChange}
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span>I am a Teacher</span>
                      </label>
                    </div>
                    <div className="custom-control custom-control-alternative custom-checkbox mt-2 mb-4">
                      <Input
                        className="custom-control-input"
                        id="customCheck"
                        value={termsService}
                        name={"termsService"}
                        onChange={this.handleChange}
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck"
                      >
                        <span>
                          I agree to DeepPlay's Terms of Service and Privacy
                          Policy.{" "}
                        </span>
                      </label>
                    </div>
                  </FormGroup>

                  <div className="text-center auth-btn-wrap">
                    <Button
                      className="mb-2 btn-black btn-block"
                      color=" "
                      type="submit"
                      disabled={
                        termsService ? (isSignupLoading ? true : false) : true
                      }
                    >
                      {isSignupLoading ? "Please wait..." : "Create account"}
                    </Button>
                    <Button
                      className="mb-4 btn-black btn-line-black btn-block"
                      color=" "
                      onClick={this.props.handleLoginModal}
                      type="button"
                    >
                      Already have an account? Log in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default SignupComponent;
