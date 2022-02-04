import React from "react";
import ReactDOM from "react-dom";
// import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { BrowserRouter } from "react-router-dom";

import { WebSocketProvider } from "./lib/webSocket";

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
      <WebSocketProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </WebSocketProvider>
   </Provider>
);

ReactDOM.render(
   <React.StrictMode>{app}</React.StrictMode>,
   document.getElementById("root")
);
