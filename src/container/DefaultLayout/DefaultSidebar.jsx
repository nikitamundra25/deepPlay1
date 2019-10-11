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
    const splitedImage = profiledata && profiledata.profileImage ? profiledata.profileImage.split("/") : []
    return (
      <div className="dashboard-left-wrap">
        <div className="dashboard-left">
          <ul className="list-group list-group-flush">
            {SidebarComponent.map((items, index) => {
              return (
                <React.Fragment key={index}>
                  <li>
                    <NavLink
                      className="list-group-item"
                      activeClassName="active"
                      aria-current="page"
                      to={items.url}
                    >
                      {/* <i className={items.icon} /> */}
                      <img src={items.iconUrl} alt={items.iconUrl} width="20" />
                      <span> {items.name}</span>
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
              {profiledata && profiledata.profileImage? (
                <img
                  src={splitedImage[0] === "uploads" ? `${AppConfig.API_ENDPOINT}${profiledata.profileImage}` : profiledata.profileImage}
                  className="w-100"
                  alt={"img"}
                />
              ) : (
                  <img src={defaultProfileImage} className="w-100" alt={"img"} />
                )}
            </div>
          </div>
          <div className="profile-text-tile color-black">
            <div className="font-weight-bold text-center mt-2">
              {profiledata
                ? `${profiledata.firstName}${" "} ${profiledata.lastName}`
                : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DefaultSidebar;
