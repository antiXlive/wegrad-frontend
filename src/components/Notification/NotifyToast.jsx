import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes } from "styled-components";

const Div = styled(motion.div)`
   width: 100vw;
   height: 8vh;
   min-height: 60px;
   position: fixed;
   top: 0;
   z-index: 1000;
   display: flex;
   align-items: center;
   justify-content: center;
   box-sizing: border-box;
`;
const Card = styled.div`
   width: 96vw;
   max-width: 400px;
   height: 6vh;
   max-height: 45px;
   border-radius: 4px;
   background-color: ${(props) => (props.type ? "#33d896" : "#fb0604")};
   padding: 0 10px;
   box-sizing: border-box;
   display: flex;
   align-items: center;
   box-shadow: 0px 10px 20px #00000050;
   p {
      color: #fbfbfb;
      margin: 0;
   }
   svg {
      filter: invert(100%) sepia(4%) saturate(515%) hue-rotate(211deg)
         brightness(118%) contrast(100%);
   }
`;

const NotifyToast = ({ type, msg }) => {
   return (
      <Div
         initial={{ y: -100, opacity: 0, scale: 0.1 }}
         animate={{ y: 0, opacity: 1, scale: 1 }}
      >
         <Card type={type}>
            <div
               style={{
                  // minWidth: "12%",
                  width: '35px',
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // border: '1px solid'
               }}
            >
               {type ? (
                  <svg width="16" height="16">
                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
               ) : (
                  <svg width="16" height="16">
                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
               )}
            </div>
            <p>{msg}</p>
         </Card>
      </Div>
   );
};
export default NotifyToast;
