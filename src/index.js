import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { BrowserRouter } from "react-router-dom";

const store = createStore(
   //  rootReducer,
   // persistedState,
   compose(
      applyMiddleware(thunk)
      //  window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //     window.__REDUX_DEVTOOLS_EXTENSION__()
   )
);

const app = (
   <Provider store={store}>
      {/* <WebSocketProvider> */}
      <BrowserRouter>
         <App />
      </BrowserRouter>
      {/* </WebSocketProvider> */}
   </Provider>
);

ReactDOM.render(
   <React.StrictMode>{app}</React.StrictMode>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
