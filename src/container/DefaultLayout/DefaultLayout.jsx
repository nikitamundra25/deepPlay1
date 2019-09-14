import React, { Suspense } from "react";
import { connect } from "react-redux";
import DefaultHeader from "./DefaultHeader"
import DefaultFooter from "./DefaultFooter"
import routes from "../../routes";
import { Route, Switch } from "react-router-dom";
import { modelOpenRequest } from "../../actions/index"

// core components
class DefaultLayout extends React.Component {

  render() {
    const { modelInfoReducer, modelOperate } = this.props
    return (
      <>
        <DefaultHeader
          modelInfoReducer={modelInfoReducer}
          modelOpenRequest={modelOperate}
        />
        <>
          <Suspense fallback={""}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <route.component
                        {...props}
                        {...this.props}
                      />
                    )}
                  />
                ) : null;
              })}
            </Switch>
          </Suspense>
        </>

        <DefaultFooter />
      </>
    );
  }
}

const mapStateToProps = state => ({
  modelInfoReducer: state.modelInfoReducer
});
const mapDispatchToProps = dispatch => ({
  modelOperate: data => { modelOpenRequest(data) }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
