import React from "react";
import SettingComponent from "../../components/Settings";
import {
  profileRequest,
  updateProfileRequest,
  deleteUserAccountRequest,
  uploadImageRequest
} from "../../actions";
import { connect } from "react-redux";
// core components
class Setting extends React.Component {
  componentDidMount = () => {
    this.props.getProfile();
  };

  handleData = data => {
    console.log("data", data);
    this.props.updateProfile(data);
  };
  onDelete = () => {
    this.props.onDeleteUserAccount();
  };
  // uploadImage = file => {
  //   console.log(">>>>.", file);
  //   this.props.uploadProfileImage(file);
  // };
  render() {
    return (
      <>
        <SettingComponent
          profileInfoReducer={this.props.userData}
          handleData={this.handleData}
          onDelete={this.onDelete}
          profileImageThumb= {this.props.profileImage}
          uploadImage={file =>
            this.props.uploadProfileImage({ imageData: file })
          }
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.profileInfoReducer.profileInfo,
    profileImage: state.profileImage.profileImage.profileThumbnail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => {
      dispatch(profileRequest());
    },
    updateProfile: payload => {
      dispatch(updateProfileRequest(payload));
    },
    onDeleteUserAccount: () => {
      dispatch(deleteUserAccountRequest());
    },
    uploadProfileImage: payload => {
      dispatch(uploadImageRequest(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
