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
import Validator from "js-object-validation";
import { LoginValidations, LoginValidationsMessaages } from "../../validations";
import { logger } from "helper/Logger";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import closeIc from "../../assets/img/close-modal1.svg"
// core components
class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidUpdate = ({ openLoginModel }) => {
    if (openLoginModel !== this.props.openLoginModel) {
      this.setState({
        email: "",
        password: "",
        errors: {}
      });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (name === "email") {
      this.setState({
        [name]: value.trim(),
        errors: {
          ...this.state.errors,
          [name]: null
        }
      });
    } else {
      this.setState({
        [name]: value,
        errors: {
          ...this.state.errors,
          [name]: null
        }
      });
    }
  };
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
      this.props.socialLoginRequest(payload);
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
      this.props.socialLoginRequest(payload);
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
  handleLoginRequest = e => {
    e.preventDefault();
    this.setState({
      errors: {}
    });
    try {
      const { isValid, errors } = Validator(
        this.state,
        LoginValidations,
        LoginValidationsMessaages
      );
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      const payload = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.loginRequest(payload);
    } catch (error) {
      logger(error);
    }
  };
  /*
  /* 
  */
  render() {
    const { openLoginModel, handleLoginModel, loginReducer } = this.props;
    const { isLoginRequest } = loginReducer;
    const { email, password, errors } = this.state;
    return (
      <>
        <Modal
          className="modal-dialog-centered auth-user-model"
          isOpen={openLoginModel}
          toggle={handleLoginModel}
          size={"sm"}
        >
          <ModalHeader >
            <span onClick={handleLoginModel} className="close close-with-img">
              <img src={closeIc} alt={""} />
            </span>
          </ModalHeader>
          <ModalBody className="modal-body p-0 ">
            <Card className="bg-secondary shadow border-0 pb-0">
              <CardHeader>
                <div className=" login-heading text-center mb-3">
                  Log in with
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
                      clientId="84245123410-7pnbbrg7jkg1bcokb1nisdhcgis3oa7f.apps.googleusercontent.com"
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
                  <span> Or log in with credentials</span>
                </div>
                <Form onSubmit={this.handleLoginRequest}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        className={errors.email ? "is-invalid" : ""}
                        onChange={this.handleChange}
                        name={"email"}
                        value={email}
                        type="text"
                      // title="Please Provide A Valid Email Address !"
                      // oninvalid={() =>
                      //   this.setCustomValidity("Enter User Name Here")
                      // }
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
                        onChange={this.handleChange}
                        className={errors.password ? "is-invalid" : ""}
                        value={password}
                        name={"password"}
                        type="password"
                      />
                      <FormFeedback>
                        {errors.password ? errors.password : null}
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <div
                    className={
                      "text-right cursor_pointer forgot-password-bottom-wrap"
                    }
                  >
                    <span onClick={this.props.handleForgotPasswordModel}>
                      Forgot password?
                    </span>
                  </div>
                  <div className="text-center auth-btn-wrap">
                    <Button
                      className="mt-3 mb-2  btn-black btn-block"
                      type="submit"
                      color={" "}
                      disabled={isLoginRequest ? true : false}
                    >
                      {isLoginRequest ? "Please Wait..." : "Log in"}
                    </Button>

                    <Button
                      className="mb-4 btn-black btn-line-black btn-block"
                      color=" "
                      onClick={() => this.props.handleSignupModal()}
                      type="button"
                    >
                      Don't have an account? Sign Up
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

export default LoginComponent;
