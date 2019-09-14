import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

// core components
class HomePage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h3>Heading</h3>
            <p>sfdskfkdsfgsdfgs</p>
          </Col>
          <Col>
            <div className={"p-5 boder"}>
            <iframe width="560" title={"Dance"} height="315" src="https://www.youtube.com/embed/nrDtcsyd-U4" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
