import React from "react";
import ForgotPasswordComponent from "../../../components/ForgotPassword"
import { connect } from "react-redux";

// core components
class ForgotPassword extends React.Component {
  render() {
    const {
      handleForgotPasswordModel,
      openForgotPasswordModel,
      forgotPasswordRequest,
      loginReducer } = this.props
    return (
      <>
        <ForgotPasswordComponent
          handleForgotPasswordModel={handleForgotPasswordModel}
          openForgotPasswordModel={openForgotPasswordModel}
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
)(ForgotPassword);
