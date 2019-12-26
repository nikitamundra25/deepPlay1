import React from "react";
import SettingComponent from "../../components/Settings";
import {
  profileRequest,
  updateProfileRequest,
  deleteUserAccountRequest,
  uploadImageRequest,
  modelOpenRequest,
  cancelProfileRequest,
  changePasswordRequest
} from "../../actions";
import { connect } from "react-redux";
// core components
class Setting extends React.Component {
  componentDidMount = () => {
    this.props.getProfile();
  };

  handleData = data => {
    this.props.updateProfile(data);
  };
  onDelete = () => {
    this.props.onDeleteUserAccount();
  };

  render() {
    const {
      modelOperate,
      modelInfoReducer,
      isImageUploading,
      isprofileInfoLoading,
      cancelProfileRequest,
      loginReducer
    } = this.props;
    return (
      <>
        <SettingComponent
          profileInfoReducer={this.props.userData}
          handleData={this.handleData}
          onDelete={this.onDelete}
          profileImageThumb={this.props.profileImage}
          uploadImage={file =>
            this.props.uploadProfileImage({ imageData: file })
          }
          modelOperate={modelOperate}
          isImageUploading={isImageUploading}
          modelInfoReducer={modelInfoReducer}
          isprofileInfoLoading={isprofileInfoLoading}
          cancelProfileRequest={cancelProfileRequest}
          loginReducer={loginReducer}
          changePasswordRequest={data => this.props.changePasswordRequest(data)}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.profileInfoReducer.profileInfo,
    isprofileInfoLoading: state.profileInfoReducer.isprofileInfoLoading,
    profileImage: state.profileImage.profileImage.profileThumbnail,
    isImageUploading: state.profileImage.isImageUploading,
    modelInfoReducer: state.modelInfoReducer,
    loginReducer: state.loginReducer
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
    },
    modelOperate: data => dispatch(modelOpenRequest(data)),
    cancelProfileRequest: () => dispatch(cancelProfileRequest()),
    changePasswordRequest: data => {
      dispatch(changePasswordRequest(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
