import React from "react";
import LoginComponent from "../../../components/Login"
import { connect } from "react-redux";

// core components
class Login extends React.Component {
  render() {
    const { openLoginModel, handleLoginModel, loginRequest, socialLoginRequest } = this.props
    return (
      <>
        <LoginComponent
          openLoginModel={openLoginModel}
          handleLoginModel={handleLoginModel}
          loginRequest={loginRequest}
          socialLoginRequest={socialLoginRequest}
          {...this.props}
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
