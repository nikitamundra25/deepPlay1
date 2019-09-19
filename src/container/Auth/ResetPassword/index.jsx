import React from "react";
import ResetPasswordComponent from "../../../components/ResetPassword"
import { connect } from "react-redux";

// core components
class ResetPassword extends React.Component {
	render() {
		return (
			<>
				<ResetPasswordComponent
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
)(ResetPassword);
