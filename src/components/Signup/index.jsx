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
  Row,
  Col,
  FormFeedback
} from "reactstrap";
// core components
import Validator from "js-object-validation";
import {
  SingupValidations,
  SingupValidationsMessaages
} from "../../validations";

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      roleType: true,
      errors: {}
    }
  }
  handleChange = e => {
    const { name, value, checked } = e.target;
    if (name === "roleType") {
      this.setState({
        roleType: checked
      })
    }
    this.setState({
      [name]: value
    })
  }
  /*
  /* 
  */
  handleSignupRequest = e => {
    e.preventDefault();
    const { email, password, firstName, lastName, confirmPassword, roleType } = this.state;
    const data = {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      roleType: roleType ? "I am a teacher" : "Unclassified"
    }
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
    this.props.signupRequest(data)
  }
  /*
  /* 
  */
  render() {
    const { openSignupModel, handleSignupModel } = this.props
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      roleType,
      errors
    } = this.state;
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={openSignupModel}
          toggle={handleSignupModel}
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
              <CardBody className="px-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
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
                        {errors.firstName && !firstName ? errors.firstName : null}
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
                        {errors.lastName && !lastName ? errors.lastName : null}
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
                  </FormGroup>
                  {
                    password ?
                      <div className="text-muted font-italic">
                        <small>
                          password strength:{" "}
                          <span className="text-success font-weight-700">
                            strong
                      </span>
                        </small>
                      </div> :
                      null
                  }
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
                  </FormGroup>
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
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
                          <span>
                            I am a Teacher
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      color="primary"
                      type="submit"
                    >
                      Create account
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

export default SignupComponent;
