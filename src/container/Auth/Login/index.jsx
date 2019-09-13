import React from "react";
import LoginComponent from "../../../components/Login"
import { connect } from "react-redux";

// core components
class Login extends React.Component {
  render() {
    return (
      <>
        <LoginComponent
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
