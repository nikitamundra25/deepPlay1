import React from "react";
import LoginComponent from "../../../components/Login";
import { connect } from "react-redux";
import ForgotPassword from "../ForgotPassword";

// core components
class Login extends React.Component {
  handleForgotPasswordModel = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOpenRequest({
      modelDetails: {
        forgotPasswordModalOpen: !modelDetails.forgotPasswordModalOpen
      }
    });
  };
  /*
   */
  render() {
    const {
      openLoginModel,
      handleLoginModel,
      loginRequest,
      socialLoginRequest,
      modelInfoReducer,
      forgotPasswordRequest,
      loginReducer
    } = this.props;
    const { modelDetails } = modelInfoReducer;
    return (
      <>
        <LoginComponent
          openLoginModel={openLoginModel}
          handleLoginModel={handleLoginModel}
          loginRequest={loginRequest}
          socialLoginRequest={socialLoginRequest}
          handleForgotPasswordModel={this.handleForgotPasswordModel}
          handleSignupModal={this.props.handleSignupModal}
          {...this.props}
        />

        <ForgotPassword
          openForgotPasswordModel={modelDetails.forgotPasswordModalOpen}
          handleForgotPasswordModel={this.handleForgotPasswordModel}
          forgotPasswordRequest={forgotPasswordRequest}
          loginReducer={loginReducer}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
