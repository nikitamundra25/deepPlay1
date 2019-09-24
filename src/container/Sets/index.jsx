import React from "react";
import SetComponent from "../../components/Sets";
import CreateSetComponent from "../../components/Sets/createSet";
import { connect } from "react-redux";
import { createSetRequest, getAllSetRequest } from "../../actions";

// core components
class Set extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createSet: false
    };
  }

  componentDidMount = async () => {
    await this.props.getSetList();
  };
  onCreateSet = data => {
    this.props.onSetsCreation(data);
  };
  handleSetComponent = () => {
    this.setState({
      createSet: true
    });
  };

  render() {
    return (
      <>
        {this.state.createSet ? (
          <CreateSetComponent onCreateSet={this.onCreateSet} />
        ) : (
          <SetComponent
            handleSetComponent={this.handleSetComponent}
            onCreateSet={this.onCreateSet}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => {
  return {
    onSetsCreation: data => {
      dispatch(createSetRequest(data));
    },
    getSetList: () => {
      dispatch(getAllSetRequest());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Set);
