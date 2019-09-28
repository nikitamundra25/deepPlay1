import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  Col
} from "reactstrap";
import { getSetDetailsRequest } from "../../../actions";
import Slider from "react-slick";
import { AppConfig } from "../../../config/Appconfig"
import { AppRoutes } from "../../../config/AppRoutes"
import "./index.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
// core components
class SetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false
    };
  }
  componentDidMount = () => {
    const location = this.props.location
    const pathName = location.pathname.split("/")
    this.props.getSetDetailsRequest({ setId: pathName[2] })
  }
  /*
  /*  
  */ 
  handleMoveAdd = () =>{
    this.props.redirectTo(AppRoutes.MOVE.url)
  }

  render() {
    const { setReducer, moveReducer } = this.props
    const { setDetails } = setReducer
    const { movesOfSet } = moveReducer
    return (
      <>
        <div className="create-set-section step-2 mt-2">
          <Card className="w-100">
            <CardBody>
              <div className={"d-flex justify-content-between"}>
                <div>
                  <h2 className={"capitalise"}>{setDetails.title}</h2>
                  <span className={"pt-2"}> 3 Moves</span>
                </div>
                <div>
                  <ButtonGroup size="sm">
                    <Button>
                      Copy
                    </Button>
                    <Button className={"ml-2"}>
                      Transfer
                    </Button>
                    <Button className={"ml-2"}>
                      Remove
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              <div className={"pt-3 d-flex justify-content-center"}>
                <Col md={"10"}>
                  <Slider {...settings}>
                    {
                      movesOfSet && movesOfSet.length ? movesOfSet.map((video, index) => {
                        return (
                          <div>
                            <video width={"100%"} controls>
                              <source src={`${AppConfig.API_ENDPOINT}${video.videoUrl}`} type="video/mp4" />
                            </video>
                          </div>
                        )
                      }) :
                        <div className={"text-center"}>
                          <div>No move availabe for this set</div>
                          <div onClick={this.handleMoveAdd}><Button>Click To Add +</Button></div>
                        </div>
                    }
                  </Slider>
                </Col>
              </div>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  setReducer: state.setReducer,
  moveReducer: state.moveReducer,
});
const mapDispatchToProps = dispatch => ({
  getSetDetailsRequest: data => dispatch(getSetDetailsRequest(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDetails);
