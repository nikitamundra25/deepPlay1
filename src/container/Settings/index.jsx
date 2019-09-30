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
    const { modelOperate, modelInfoReducer } = this.props
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
          modelInfoReducer={modelInfoReducer}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.profileInfoReducer.profileInfo,
    profileImage: state.profileImage.profileImage.profileThumbnail,
    modelInfoReducer: state.modelInfoReducer,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
