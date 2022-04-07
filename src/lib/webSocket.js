import React, { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
   appendNewsFeed,
   filterNewsFeed,
   updatePollVote,
} from "../redux/actions/postActions";

const WebSocketContext = createContext();

let baseURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
   baseURL = "ws://192.168.43.96:3001";
// baseURL = "wss://wegrad-backend.herokuapp.com/";
else baseURL = "wss://wegrad-backend.herokuapp.com/";

export const clientEventDispatcher = (payload) => {
   sendMessage(JSON.stringify(payload));
};

let sendMessage;

export const WebSocketProvider = ({ children }) => {
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const ws = useRef();

   const TOKEN = useSelector((state) => state.auth.authToken);

   useEffect(() => {
      if (TOKEN) {
         ws.current = new WebSocket(baseURL);

         ws.current.onopen = () => {
            setOpen(true);
            ws.current.onmessage = (payload) =>
               handleIncomingMessage(JSON.parse(payload.data));
         };
         return () => ws.current.close();
      }
   }, [TOKEN]);

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
         case "poll-vote": {
            dispatch(updatePollVote(data));
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
