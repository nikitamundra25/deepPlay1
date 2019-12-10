import React from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Input,
  Row,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  CardHeader,
  FormFeedback,
  Navbar,
  NavbarBrand
} from "reactstrap";
import { Link } from "react-dom";
import Validator from "js-object-validation";
import { logger } from "../../helper/Logger";
import {
  ResetPasswordValidations,
  ResetPasswordValidationsMessaages
} from "../../validations/login";
import "./index.scss";

// core components
class ResetPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }
  /*
  /* 
  */
  handleInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null
      }
    });
  };
  /*
  /* 
  */
  resetPassword = e => {
    e.preventDefault();
    this.setState({
      errors: {}
    });
    try {
      const { isValid, errors } = Validator(
        this.state,
        ResetPasswordValidations,
        ResetPasswordValidationsMessaages
      );
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      const { password } = this.state;
      const { token, user, verification } = this.props;
      this.props.requestChangePassword({
        password,
        token,
        user,
        verification
      });
    } catch (error) {
      logger(error);
    }
  };
  /*
  /* 
  */
  render() {
    const { password, confirmPassword, errors } = this.state;
    return (
      <div className="forgot-password-wrap">
        <div className="external-header reset-header-background">
          <Navbar
            className="d-flex navbar-main header-navbar"
            // expand="lg"
            id="navbar-main"
          >
            <NavbarBrand className="m-0" to="/" tag={Link}>
              <h3
                className="mb-0 text-white cursor_pointer"
                onClick={() => this.props.redirectTo("/")}
              >
                DeepPlay
              </h3>
            </NavbarBrand>
          </Navbar>
        </div>
        <Container>
          <div className="dashboard-full-section without-sidebar">
            <Row>
              <Col md={12} className={"mx-auto"}>
                <Card className="mb-5 p-0 mt-5 shadow">
                  <CardHeader className={"text-center"}>
                    <h4 className="my-4">Reset Password</h4>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={this.resetPassword}>
                      <FormGroup>
                        <InputGroup className="">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            onChange={this.handleInputChange}
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
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Confirm Password"
                            onChange={this.handleInputChange}
                            className={
                              errors.confirmPassword ? "is-invalid" : ""
                            }
                            name={"confirmPassword"}
                            value={confirmPassword}
                            type="password"
                          />
                          <FormFeedback>
                            {errors.confirmPassword
                              ? errors.confirmPassword
                              : null}
                          </FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button
                          className="my-4 btn-black"
                          color=" "
                          type="submit"
                        >
                          Reset Password
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default ResetPasswordComponent;
