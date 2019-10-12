import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
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
import {
  ForgetPasswordValidations,
  ForgetPasswordValidationsMessaages
} from "../../validations";
import { logger } from "helper/Logger";

// core components
class ForgotPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {}
    };
  }

  componentDidUpdate = ({ openForgotPasswordModel }) => {
    if (openForgotPasswordModel !== this.props.openForgotPasswordModel) {
      this.setState({
        email: "",
        errors: {}
      });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleForgotPasswardRequest = e => {
    e.preventDefault();
    this.setState({
      errors: {}
    });
    try {
      const { isValid, errors } = Validator(
        this.state,
        ForgetPasswordValidations,
        ForgetPasswordValidationsMessaages
      );
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      const { email } = this.state;
      this.props.forgotPasswordRequest({
        email
      });
    } catch (error) {
      logger(error);
    }
  };
  /*
  /* 
  */
  render() {
    const {
      openForgotPasswordModel,
      handleForgotPasswordModel,
      loginReducer
    } = this.props;
    const { isSendingLink } = loginReducer;
    const { email, errors } = this.state;
    return (
      <>
        <Modal
          className="modal-dialog-centered auth-user-model forgot-password-wrap"
          size="sm"
          isOpen={openForgotPasswordModel}
          toggle={handleForgotPasswordModel}
          backdrop={"static"}
        >
          <ModalHeader toggle={handleForgotPasswordModel}></ModalHeader>
          <ModalBody className="modal-body p-0">
            <Card className="bg-secondary shadow border-0 pb-0">
              <CardHeader className={"text-center p-2 "}>
                Forgot Password
              </CardHeader>
              <CardBody className="px-lg-5">
                <Form onSubmit={this.handleForgotPasswardRequest}>
                  <FormGroup className="mb-3">
                    <InputGroup className="">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email Ex: abc@gmail.com"
                        className={errors.email ? "is-invalid" : ""}
                        onChange={this.handleChange}
                        name={"email"}
                        value={email}
                        type="text"
                      />
                      <FormFeedback>
                        {errors.email ? errors.email : null}
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="mt-3 mb-4 btn-black btn-block"
                      color=" "
                      type="submit"
                      disabled={isSendingLink ? true : false}
                    >
                      {isSendingLink ? "Plaese Wait..." : "Send Link"}
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

export default ForgotPasswordComponent;
