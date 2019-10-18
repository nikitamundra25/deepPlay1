import React, { Component } from "react";
import { connect } from "react-redux";
import {
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  CardTitle,
  Button,
  CardHeader,
  Card,
  CardBody,
  FormFeedback
} from "reactstrap";
import {
  ChangePasswordValidations,
  ChangePasswordValidationsMessaages
} from "../../validations";
import { logger } from "../../helper/Logger";
import Validator from "js-object-validation";
import { changePasswordRequest } from "../../actions";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errors: {}
    };
  }

  componentDidUpdate = ({ loginReducer }) => {
    const previsousState = loginReducer.isChangePasswordDone
    const currentState = this.props.loginReducer.isChangePasswordDone;
    if (previsousState !== currentState) {
      this.setState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        errors: {}
      })
    }
  }

  handleChange = e => {
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

  changePassword = e => {
    e.preventDefault();
    this.setState({
      errors: {}
    });
    try {
      const { isValid, errors } = Validator(
        this.state,
        ChangePasswordValidations,
        ChangePasswordValidationsMessaages
      );
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      const { oldPassword, newPassword } = this.state;
      this.props.changePasswordRequest({
        oldPassword: oldPassword,
        newPassword: newPassword
      });
      // this.setState({
      //   oldPassword: "",
      //   newPassword: "",
      //   confirmPassword: ""
      // });
    } catch (error) {
      logger(error);
    }
  };

  render() {
    const { newPassword, oldPassword, confirmPassword, errors } = this.state;
    const { loginReducer } = this.props;
    const { isChangePasswordSuccess } = loginReducer;

    return (
      <div className="create-set-section step-2 setting-section password-section">
          <div className="page-body w-100">
            <div className="content-header ">
              <span className="content-title">Change password</span>
            </div>
        <Card className="set-content-wrap card-wrap ">
          <div className="set-content-block w-100 h-100">
            <CardHeader className="">
           
              <CardTitle className="card-heading mb-0 h5">
                      Password
                    </CardTitle> 
                    <div className="heading-divider"></div>
              
            </CardHeader>
            <CardBody className="">
              <div className="create-set-tile">
                <Form
                  className="url-update-wrap form-wrap settingForm"
                  onSubmit={this.changePassword}
                >
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="oldPassword">
                          Old Password <span className="text-danger">*</span>
                        </Label>
                        <Input
                          value={oldPassword}
                          name="oldPassword"
                          onChange={this.handleChange}
                          className={errors.oldPassword ? "is-invalid" : ""}
                          placeholder="Old Password"
                          type="password"
                        />
                        <FormFeedback>
                          {errors.oldPassword ? errors.oldPassword : null}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="newPassword">
                          New Password <span className="text-danger">*</span>
                        </Label>
                        <Input
                          id="newPassword"
                          placeholder="New Password"
                          type="password"
                          className={errors.newPassword ? "is-invalid" : ""}
                          onChange={this.handleChange}
                          value={newPassword}
                          name="newPassword"
                        />
                        <FormFeedback>
                          {errors.newPassword ? errors.newPassword : null}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="confirmPassword">
                          Confirm Password{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          type="password"
                          className={errors.confirmPassword ? "is-invalid" : ""}
                          onChange={this.handleChange}
                          value={confirmPassword}
                          name="confirmPassword"
                        />
                        <FormFeedback>
                          {errors.confirmPassword
                            ? errors.confirmPassword
                            : null}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      className="btn-black btn mt-3"
                      color=" "
                      type="submit"
                      disabled={isChangePasswordSuccess ? true : false}
                    >
                      {isChangePasswordSuccess
                        ? "Please Wait..."
                        : "Change Password"}
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </div>
        </Card>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginReducer: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  changePasswordRequest: data => {
    dispatch(changePasswordRequest(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
