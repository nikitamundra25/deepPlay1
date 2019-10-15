import React from "react";
import SettingComponent from "../../components/Settings";
import {
  profileRequest,
  updateProfileRequest,
  deleteUserAccountRequest,
  uploadImageRequest,
  modelOpenRequest
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
      isprofileInfoLoading
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
    modelInfoReducer: state.modelInfoReducer
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
    modelOperate: data => dispatch(modelOpenRequest(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
