import React from "react";
import ResetPasswordComponent from "../../../components/ResetPassword"
import { connect } from "react-redux";
import * as qs from "query-string";
import { validateResetToken, resetPasswordRequest } from "../../../actions";
// core components
class ResetPassword extends React.Component {

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.redirectTo("/dashboard");
    } else {
      const { token, user, verification } = qs.parse(this.props.location.search);
      if (!token || !user || !verification) {
        this.props.redirectTo("/404");
      } else {
        this.props.validateResetToken({ token, user, verification });
      }
    }
  }

  render() {
    const { token, user, verification } = qs.parse(this.props.location.search);
    return (
      <>
        <ResetPasswordComponent
          requestChangePassword={this.props.requestChangePassword}
          token={token}
          user={user}
          verification={verification}
          {...this.props}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  validateResetToken: data => {
    dispatch(validateResetToken(data));
  },
  requestChangePassword: data => {
    dispatch(resetPasswordRequest(data));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
