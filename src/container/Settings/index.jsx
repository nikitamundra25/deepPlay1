import React from "react";
import SettingComponent from "../../components/Settings";
import { profileRequest } from "../../actions";
import { connect } from "react-redux";
// core components
class Setting extends React.Component {
  componentDidMount = () => {
    this.props.getProfile();
  };
  render() {
    console.log("888888", this.props.profileInfoReducer);
    return (
      <>
        <SettingComponent
          profileInfoReducer = {this.props.profileInfoReducer} />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    profileInfoReducer: state.profileInfoReducer.profileInfo
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
