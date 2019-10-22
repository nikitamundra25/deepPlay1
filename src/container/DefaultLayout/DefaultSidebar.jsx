import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarComponent } from "../../components/Sidebar";
import defaultProfileImage from "../../assets/img/profile-ic.png";
import { AppConfig } from "../../config/Appconfig";

class DefaultSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profileInfoReducer } = this.props;
    const profiledata =
      profileInfoReducer && profileInfoReducer.profileInfo
        ? profileInfoReducer.profileInfo
        : null;
    const splitedImage =
      profiledata && profiledata.profileImage
        ? profiledata.profileImage.split("/")
        : [];
    const ProfileImage =
      splitedImage[0] === "uploads"
        ? `${AppConfig.API_ENDPOINT}${
            profiledata ? profiledata.profileImage : ""
          }`
        : profiledata
        ? profiledata.profileImage
        : "";
    return (
      <div className="dashboard-left-wrap cutom-scroll">
        <div className="dashboard-left">
          <ul className="list-group list-group-flush">
            {SidebarComponent.map((items, index) => {
              return (
                <React.Fragment key={index}>
                  <li>
                    <NavLink
                      className={`list-group-item list-${index}`}
                      activeClassName="active"
                      aria-current="page"
                      to={items.url}
                    >
                      {/* <i className={items.icon} /> */}
                      <img src={items.iconUrl} alt={items.iconUrl} width="20" />
                      <span className="side-bar-text"> {items.name}</span>
                    </NavLink>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <div className="profile-wrap">
          <div className="profile-img-tile">
            <div className={profiledata ? "user-profile-img" : "profile-img"}>
              {profiledata && profiledata.profileImage ? (
                <div
                  style={{
                    backgroundImage: 'url("' + ProfileImage + '")'
                  }}
                  className="user-back-img-wrap"
                ></div>
              ) : (
                // <img
                //   src={
                //     splitedImage[0] === "uploads"
                //       ? `${AppConfig.API_ENDPOINT}${profiledata.profileImage}`
                //       : profiledata.profileImage
                //   }
                //   className="w-100"
                //   alt={"img"}
                // />
                // <img src={defaultProfileImage} className="w-100" alt={"img"} />
                <div
                  style={{
                    backgroundImage: 'url("' + defaultProfileImage + '")'
                  }}
                  className="user-back-img-wrap"
                ></div>
              )}
            </div>
          </div>
          <div className="profile-text-tile color-black">
            <div className="font-weight-bold text-center mt-2">
              <div className="cursor_pointer">
                <span onClick={this.props.handleSetting}>
                  {profiledata
                    ? `${profiledata.firstName}${" "} ${profiledata.lastName}`
                    : ""}
                </span>
              </div>
            </div>
            <div className={"text-center"}>
              {profiledata
                ? profiledata.roleType !== "Unclassified"
                  ? profiledata.roleType
                  : null
                : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DefaultSidebar;
