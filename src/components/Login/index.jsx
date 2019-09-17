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
  FormFeedback
} from "reactstrap";
import Validator from "js-object-validation";
import { LoginValidations, LoginValidationsMessaages } from "../../validations";
import { logger } from "helper/Logger";

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
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
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
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/facebook.svg")}
                      />
                    </span>
                    <span className="btn-inner--text">Facebook</span>
                  </Button>
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/google.svg")}
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
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
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
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
          </div>
        </Modal>
      </>
    );
  }
}

export default LoginComponent;
