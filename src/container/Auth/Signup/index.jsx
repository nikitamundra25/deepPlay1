import React from "react";
import SignupComponent from "../../../components/Signup";
// core components
class Signup extends React.Component {
  render() {
    const {
      openSignupModel,
      handleSignupModel,
      signupRequest,
      loginReducer
    } = this.props;
    return (
      <>
        <SignupComponent
          openSignupModel={openSignupModel}
          handleSignupModel={handleSignupModel}
          signupRequest={signupRequest}
          loginReducer={loginReducer}
          handleLoginModal={this.props.handleLoginModal}
        />
      </>
    );
  }
}

export default Signup;
