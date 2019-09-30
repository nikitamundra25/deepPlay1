import React from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import { AppRoutes } from "../../config/AppRoutes";
import "./index.scss";
import emptySetIc from "../../assets/img/empty-sets.png";
// core components
class SetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  showPopOver = () => {
    this.setState({
      show: true
    });
  };

  handleSetDetails = setId => {
    this.props.handleRecentTime(setId);
    this.props.redirectTo(AppRoutes.SET_DETAILS.url.replace(":id", setId));
  };

  render() {
    const { getAllSet } = this.props;
    const { show } = this.state;
    return (
      <div className="set-main-section">
        <div className="content-header">
          <span className="content-title">YOUR SETS</span>
          <span className="dashboard-right-content">
            {getAllSet.length ? getAllSet.length : 0} Sets total
          </span>
        </div>
        <Row className="set-wrap">
          {getAllSet.length ? (
            // eslint-disable-next-line
            getAllSet.map((setList, i) => {
              return (
                <Col md="6" key={i}>
                  <div className="tile-wrap card">
                    <div className="cotent-tile d-flex">
                      <div className="cotent-text-tile">
                        <div className="content-heading-tile">
                          {" "}
                          <span
                            onClick={() => this.handleSetDetails(setList._id)}
                            className={"cursor_pointer"}
                          >
                            {setList.title}
                          </span>
                        </div>
                        {setList.description ? setList.description : ""}
                        <div className="content-number-tile"> 46 moves</div>
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
                      <span
                        onClick={this.showPopOver}
                        className="cursor_pointer"
                      >
                        {" "}
                        <i className="fas fa-ellipsis-v setting-icon "></i>
                      </span>
                      {show ? (
                        <ButtonGroup size="sm">
                          <Button
                            onClick={() => this.props.OnCreateSetCopy(setList)}
                          >
                            Copy
                          </Button>
                          <Button
                            onClick={() =>
                              this.props.openTransferToModal(
                                setList._id,
                                setList.folderId
                              )
                            }
                          >
                            Transfer
                          </Button>
                          <Button
                            onClick={() =>
                              this.props.onRemoveSets(setList._id, "remove")
                            }
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      ) : null}
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
                      <img src={emptySetIc} alt={"Folder"} />
                      <div className="content-header set-header">
                        <span className="content-title">
                          {" "}
                          <h3>You haven't created any set yet</h3>
                          <p>Create a Set to Organize your Moves.</p>
                        </span>
                      </div>
                    </CardHeader>
                    <CardBody className="">
                      <div className="create-set-tile"></div>
                      <div className="text-center">
                        <Button
                          color=" "
                          type="button"
                          className="btn-black btn mt-3 folder-create-btn"
                          onClick={() =>
                            this.props.redirectTo(AppRoutes.CREATE_SET.url)
                          }
                        >
                          <i className="fas fa-plus mr-1"></i>
                          Create a Set
                        </Button>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </div>
            </>
          )}
        </Row>
      </div>
    );
  }
}

export default SetComponent;
