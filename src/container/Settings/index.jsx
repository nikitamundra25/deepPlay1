import React from "react";
import SettingComponent from "../../components/Settings";
import { profileRequest } from "../../actions";
import { connect } from "react-redux";
// core components
class Setting extends React.Component {
  componentDidMount = () => {
    //this.props.getProfile();
  };
  render() {
    return (
      <>
        <SettingComponent />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    loginState: state.LoginReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => {
      dispatch(profileRequest());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
