import React from "react";
import { Row, Col, Card, CardHeader, Container } from "reactstrap";
import { connect } from "react-redux";
import {
  sharedFolderInfoRequest,
  publicUrlSetDetailsRequest
} from "../../actions";
import emptySetIc from "../../assets/img/empty-sets.png";
import qs from "query-string";
import "./index.scss";
// core components

class FolderSharedLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setListItem: []
    };
  }

  componentDidMount() {
    let parsed = qs.parse(this.props.location.search);
    this.props.encryptedQuery(parsed);
    this.props.publicUrlSetDetails(parsed);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.shareLinkReducer &&
      prevProps.shareLinkReducer.publicUrlSetDetails !==
        this.props.shareLinkReducer.publicUrlSetDetails
    ) {
      const setList = this.props.shareLinkReducer.publicUrlSetDetails;
      this.setState({
        setListItem: setList
      });
    }
  }

  render() {
    const { shareLinkReducer } = this.props;
    const { setListItem } = this.state;
    const { decryptedDetails } = shareLinkReducer;
    return (
      <div className="create-set-section mt-2 w-100">
        <Container className={" xl: 1140px"}>
          <div className="content-header">
            <span className="content-title">
              {decryptedDetails
                ? decryptedDetails.title
                : "MyFolder"}
            </span>
          </div>{" "}
          <span className="content-title">
            {decryptedDetails ? decryptedDetails.description : ""}
          </span>
          <Row className="set-wrap">
            {setListItem && setListItem.length ? (
              // eslint-disable-next-line
              setListItem.map((list, i) => {
                return (
                  <Col md="6" key={i}>
                    <div className="tile-wrap card">
                      <div className="cotent-tile d-flex">
                        <div className="cotent-text-tile">
                          <div className="content-heading-tile">
                            {" "}
                            {list.title}
                          </div>
                          <div className="content-heading-tile">
                            {" "}
                            {list.description}
                          </div>

                          <div className="content-number-tile"> 4 items</div>
                        </div>
                        <div
                          className="cotent-img-tile"
                          style={{
                            backgroundImage:
                              'url("' +
                              "https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Nikita%20Buida,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1469756538/dd3acf4nzzavkv4rf2ji.jpg" +
                              '")'
                          }}
                        ></div>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <>
                <div className="create-set-section mt-2 w-100">
                  <Card className="w-100 set-content-wrap">
                    <div className="set-content-block w-100 empty-folder-wrap">
                      <CardHeader className="empty-folder-header">
                        <img src={emptySetIc} alt={"Images"} />
                        <div className="content-header set-header">
                          <span className="content-title">
                            {" "}
                            <h3>This folder has no Sets yet</h3>
                            {/* <p>Organize your Sets for you or your students</p> */}
                          </span>
                        </div>
                      </CardHeader>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    shareLinkReducer: state.shareLinkReducer
  };
};

const mapDispatchToProps = dispatch => ({
  encryptedQuery: data => dispatch(sharedFolderInfoRequest(data)),
  publicUrlSetDetails: data => dispatch(publicUrlSetDetailsRequest(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderSharedLink);
