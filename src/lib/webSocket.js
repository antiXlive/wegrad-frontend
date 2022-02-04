import React, { createContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { appendNewsFeed, filterNewsFeed } from "../redux/actions/postActions";

const WebSocketContext = createContext();

let baseURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
   baseURL = "ws://192.168.43.96:3001";
else baseURL = "ws://wegrad-backend.herokuapp.com/";

export const clientEventDispatcher = (payload) => {
   sendMessage(JSON.stringify(payload));
};

let sendMessage;

export const WebSocketProvider = ({ children }) => {
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const ws = useRef();

   useEffect(() => {
      ws.current = new WebSocket(baseURL);

      ws.current.onopen = () => {
         setOpen(true);
         ws.current.onmessage = (payload) =>
            handleIncomingMessage(JSON.parse(payload.data));
      };

      return () => ws.current.close();
   }, []);

   const handleIncomingMessage = ({ event, data }) => {
      switch (event) {
         case "new-post": {
            dispatch(appendNewsFeed(data));
            break;
         }
         case "delete-post": {
            dispatch(filterNewsFeed(data));
            break;
         }
         default:
            break;
      }
   };
   sendMessage = (payload) => {
      ws.current.send(payload);
   };

   return (
      <WebSocketContext.Provider value={open ? ws.current : null}>
         {children}
      </WebSocketContext.Provider>
   );
};
