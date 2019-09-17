import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";

// core components
class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        Dashboard Works!!
      </Container>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
