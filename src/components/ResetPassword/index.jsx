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
  CardHeader
} from "reactstrap";
// import Validator from "js-object-validation";
// import { ForgetPasswordValidations, ForgetPasswordValidationsMessaages } from "../../validations";
// import { logger } from "helper/Logger";

// core components
class ResetPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      errors: {}
    }
  }
  /*
  /* 
  */
  render() {
    return (
      <>
        <div className={"mt-5 "}>
          <Container className={"mt-5"}>
            <div className={"text-center"}>
              <h2>Deep Play</h2>
            </div>
            <div className={"row"}>
              <Col md={6} className={"mx-auto"}>
                <Card className="bg-secondary shadow border-0 mt-5">
                  <CardHeader className={"text-center"}>
                    <h4>Reset Password</h4>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form onSubmit={this.handleLoginRequest}>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            // onChange={this.handleChange}
                            name={"password"}
                            type="password" />
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
                            // onChange={this.handleChange}
                            // className={errors.password ? "is-invalid" : ""}
                            name={"password"}
                            type="password" />
                        </InputGroup>
                      </FormGroup>
                      <div onClick={() => this.props.redirectTo("/")} className={"text-center text-primary cursor_pointer"}>
                        Back to home
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
              </Col>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default ResetPasswordComponent;
