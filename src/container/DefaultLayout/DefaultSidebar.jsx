import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.scss";
class DefaultSidebar extends React.Component {
  
  render() {
    // if (!this.props.loginstatus.isloggedIn) {
    //   this.props.history.push("/login");
    // }
    return (
      <div className="ct-sidebar col-12 col-md-3 col-xl-2 app-sidebar">
        <div className="dashboard-left-wrap">
          <div className="dashboard-left">
            <ul className="dashboard-left-nav">
              <li className="">
                <NavLink
                  activeClassName="active"
                  aria-current="page"
                  to="/home"
                >
                  <i className="fas fa-home-alt"></i>
                  Home
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/premium-content" activeClassName="active">
                  <i className="fas fa-calendar-minus"></i>
                  Premium content
                </NavLink>
              </li>

              <li className="">
                <NavLink to="/settings" activeClassName="active">
                  <i className="fas fa-cog"></i>
                  Settings
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/sets" activeClassName="active">
                  <i className="fad fa-folders"></i>
                  Sets
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/folders" activeClassName="active">
                  <i className="fas fa-folder"></i>
                  Folders
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   const loginstatus = state.LoginReducer;
//   return {
//     loginstatus
//   };
// };

//export default connect(mapStateToProps)(DefaultSidebar);
export default DefaultSidebar;
