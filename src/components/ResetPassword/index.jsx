import React from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  CardHeader,
  FormFeedback
} from "reactstrap";
import Validator from "js-object-validation";
import { logger } from "../../helper/Logger";
import {
  ResetPasswordValidations,
  ResetPasswordValidationsMessaages
} from "../../validations/login";
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
      <>
        <div className={"mt-5 "}>
          <Container className={"mt-5"}>
            <div className={"text-center"}>
              <h2
                className={"cursor_pointer"}
                onClick={() => this.props.redirectTo("/")}
              >
                Deep Play
              </h2>
            </div>
            <div className={"row"}>
              <Col md={6} className={"mx-auto"}>
                <Card className="bg-secondary shadow border-0 mt-5">
                  <CardHeader className={"text-center"}>
                    <h4>Reset Password</h4>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form onSubmit={this.resetPassword}>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
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
                        <InputGroup className="input-group-alternative">
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
                        <Button className="my-4" color="primary" type="submit">
                          Reset Password
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default ResetPasswordComponent;
