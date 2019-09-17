import { createBrowserHistory } from "history";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { routerMiddleware } from "react-router-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { createLogicMiddleware } from "redux-logic";
import { mode, EnviornmentTypes } from "./config/Appconfig";
import arrLogic from "./logic/index.jsx";
import AppReducer from "./reducers";
import AppRoutes from "./routes/";
import "assets/css/argon-design-system-react.min.css";
import "assets/css/argon-design-system-react.css.map";
import "assets/vendor/nucleo/css/nucleo.css"
import "assets/vendor/font-awesome/css/font-awesome.min.css"
import "assets/scss/theme.scss";
import "./App.scss"
/**
 *
 */
const logicMiddleware = createLogicMiddleware(arrLogic);
const history = createBrowserHistory({ basename: "/dev" });
const middlewares = [logicMiddleware, routerMiddleware(history)];
if (mode === EnviornmentTypes.DEV) {
   middlewares.push(logger);
}

export const store = createStore(AppReducer, applyMiddleware(...middlewares));

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router history={history}>
               <React.Suspense fallback={""}>
                  <AppRoutes />
               </React.Suspense>
            </Router>
            <ToastContainer
               position={toast.POSITION.TOP_RIGHT}
               autoClose={8000}
               hideProgressBar
               pauseOnFocusLoss={false}
               pauseOnHover={false}
               transition={Zoom}
            />
         </Provider>
      );
   }
}

export default App;
