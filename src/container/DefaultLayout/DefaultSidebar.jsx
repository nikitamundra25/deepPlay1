import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.scss";
import { SidebarComponent } from "../../components/Sidebar";

class DefaultSidebar extends React.Component {

  render() {
    const { profileInfoReducer } = this.props
    const profiledata = profileInfoReducer && profileInfoReducer.profileInfo ? profileInfoReducer.profileInfo : null
    return (
      <div className="dashboard-left-wrap">
        <div className="dashboard-left">
          <ul className="list-group list-group-flush">
            {
              SidebarComponent.map((items, index) => {
                return (
                  <React.Fragment key={index}>
                    <li className="list-group-item" >
                      <NavLink
                        activeClassName="active"
                        aria-current="page"
                        to={items.url}
                      >
                        <i className={items.icon} />
                        <span>{" "}{items.name}</span>
                      </NavLink>
                    </li>
                  </React.Fragment>
                )
              })
            }
          </ul>
        </div>
        <div className="profile-wrap" >
          <div className="profile-img-tile">
            <div className="profile-img">
              <img alt="..." src="/static/media/boy.9a3a77b0.svg" className="w-100" />
            </div>
          </div>
          <div className="profile-text-tile color-black">
            <div className="font-weight-bold text-center mt-2">
              {
                profiledata ?
                  `${profiledata.firstName}${" "} ${profiledata.lastName}` : ""
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DefaultSidebar;
