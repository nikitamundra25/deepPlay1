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
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { toast } from "react-toastify";
// core components
class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    }
  }

  componentDidUpdate = ({ openLoginModel }) => {
    if (openLoginModel !== this.props.openLoginModel) {
      this.setState({
        email: "",
        password: "",
        errors: {}
      })
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  /*
  /* 
  */
  handleFacebookLogin = (response) => {
    try {
      const name = response.name.split(" ")
      const payload = {
        email: response.email,
        firstName: name[0],
        lastName: name[1],
        profileImage: response.picture.data.url,
        accessToken: response.accessToken
      }
      this.props.socialLoginRequest(payload)
    } catch (error) {
      logger(error)
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          error
        );
      }
    }
  }
  /*
  /* 
  */
  handleGoogleLogin = (response) => {
    try {
      const payload = {
        email: response.profileObj.email,
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        profileImage: response.profileObj.imageUrl,
        accessToken: response.accessToken
      }
    this.props.socialLoginRequest(payload)
    } catch (error) {
      logger(error)
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          error
        );
      }
    }
  }
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
        password: this.state.password,
      }
      this.props.loginRequest(payload)
    } catch (error) {
      logger(error);
    }
  }
  /*
  /* 
  */
  render() {
    const { openLoginModel, handleLoginModel } = this.props
    const { email, password, errors } = this.state;
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={openLoginModel}
          toggle={handleLoginModel}
          backdrop={"static"}
        >
          <ModalHeader toggle={handleLoginModel}>Sign In</ModalHeader>
          <ModalBody className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-2">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
                <div className="btn-wrapper text-center">
                  <span className="btn-inner--icon pr-2">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/facebook.svg")}
                      width={20}
                      height={20}
                    />
                    <FacebookLogin
                      appId="429677604320021"
                      autoLoad={false}
                      fields="name,email,picture"
                      textButton={"Facebook"}
                      callback={this.handleFacebookLogin}
                      cssClass={"btn-neutral btn-icon btn btn-default"}
                      icon={"assets/img/icons/common/facebook.svg"}
                    />
                  </span>
                  <span className="btn-inner--icon">
                    <GoogleLogin
                      clientId="52209426453-64s7do5ib1j1s3e9fhgnjgmvi3931vqm.apps.googleusercontent.com"
                      buttonText="Google"
                      className={"btn-neutral btn-icon btn btn-default"}
                      onSuccess={this.handleGoogleLogin}
                      onFailure={this.handleGoogleLogin}
                      cookiePolicy={'single_host_origin'}
                    />
                  </span>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
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
                        type="email" />
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
                        type="password" />
                      <FormFeedback>
                        {errors.password ? errors.password : null}
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="submit"
                    >
                      Sign in
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
