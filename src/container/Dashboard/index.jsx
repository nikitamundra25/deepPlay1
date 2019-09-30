import React from "react";
import { connect } from "react-redux";
import { Row, Col, Badge } from "reactstrap";
import { AppRoutes } from "../../config/AppRoutes";
import {
  profileRequest,
  recentFolderRequest,
  recentSetRequest
} from "../../actions";
// core components
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getProfile();
    this.props.getRecentFolders();
    this.props.getrecentSets();
  }
  handleViewAll = name => {
    if (name === "sets") {
      this.props.redirectTo(AppRoutes.SETS.url);
    } else {
      this.props.redirectTo(AppRoutes.FOLDERS.url);
    }
  };

  render() {
    const { recentFolders, recentSets } = this.props;
    return (
      <>
        <div className="page-body">
          {/* <div className="content-header">
            <span className="content-title">RECENT</span>
          </div> */}
          <div className="content-header">
            <span className="content-title">RECENT SETS</span>
            {recentSets.length > 4 ? (
              <span
                className="dashboard-right-content cursor_pointer"
                onClick={() => this.handleViewAll("sets")}
              >
                View all
              </span>
            ) : (
              " "
            )}
          </div>
          <Row>
            {recentSets.length
              ? recentSets.slice(0, 4).map((set, i) => {
                  return (
                    <Col md="6" key={i}>
                      <div className="tile-wrap card">
                        <div className="badge-wrap">
                          <Badge variant="secondary" className="draft-wrap">
                            DRAFT
                          </Badge>
                        </div>
                        <div className="cotent-tile d-flex">
                          <div className="cotent-text-tile">
                            <div className="content-heading-tile">
                              {" "}
                              {set.title}
                            </div>
                            <div className="content-heading-tile">
                              {" "}
                              {set.description ? set.description : ""}
                            </div>
                            <div className="content-number-tile"> 4 items</div>
                          </div>
                          <div
                            className="cotent-img-tile" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */
                          ></div>
                        </div>
                        <div className="bottom-content-tile">
                          <div
                            className="cotent-img-tile teacher-profile-img" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */
                          ></div>
                          <span className="bottom-text-tile">
                            {" "}
                            Mastershipclass
                          </span>
                          <span className="bottom-light-tile">
                            {" "}
                            Mastershipclass
                          </span>
                        </div>
                      </div>
                    </Col>
                  );
                })
              : ""}
          </Row>
        </div>
        <div className="page-body mt-4">
          <div className="content-header">
            <span className="content-title">RECENT FOLDERS</span>
            {recentFolders.length > 4 ? (
              <span
                className="dashboard-right-content cursor_pointer"
                onClick={() => this.handleViewAll("folders")}
              >
                View all
              </span>
            ) : (
              ""
            )}
          </div>
          <Row>
            {recentFolders.length
              ? recentFolders.slice(0, 4).map((folder, i) => {
                  return (
                    <Col md="6" key={i}>
                      <div className="tile-wrap card">
                        <div className="badge-wrap">
                          <Badge variant="secondary" className="draft-wrap">
                            DRAFT
                          </Badge>
                        </div>
                        <div className="cotent-tile d-flex">
                          <div className="cotent-text-tile">
                            <div className="content-heading-tile">
                              {" "}
                              {folder.title}
                            </div>
                            <div className="content-heading-tile">
                              {" "}
                              {folder.description ? folder.description : ""}
                            </div>
                            <div className="content-number-tile"> 4 items</div>
                          </div>
                          <div
                            className="cotent-img-tile" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */
                          ></div>
                        </div>
                        <div className="bottom-content-tile">
                          <div
                            className="cotent-img-tile teacher-profile-img" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */
                          ></div>
                          <span className="bottom-text-tile">
                            {" "}
                            Mastershipclass
                          </span>
                          <span className="bottom-light-tile">
                            {" "}
                            Mastershipclass
                          </span>
                        </div>
                      </div>
                    </Col>
                  );
                })
              : ""}
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    recentFolders: state.getFolderReducer.recentFolders,
    recentSets: state.setReducer.recentSets
  };
};
const mapDispatchToProps = dispatch => ({
  getProfile: () => {
    dispatch(profileRequest());
  },
  getRecentFolders: () => {
    dispatch(recentFolderRequest());
  },
  getrecentSets: () => {
    dispatch(recentSetRequest());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
