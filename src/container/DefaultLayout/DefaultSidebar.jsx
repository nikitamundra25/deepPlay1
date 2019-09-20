import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.scss";
import { SidebarComponent } from "../../components/Sidebar";

class DefaultSidebar extends React.Component {

  render() {
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
      </div>
    );
  }
}
export default DefaultSidebar;
