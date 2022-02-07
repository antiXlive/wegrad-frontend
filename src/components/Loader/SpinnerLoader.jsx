import React from "react";
import styled, { keyframes } from "styled-components";

const fx = keyframes`
         100% {box-shadow: 0 0 0 80px #0000}
    `;

const Div = styled.div`
   width: 100vw;
   height: 100%;
   position: fixed;
   top: 0;
   z-index: 1000;
   display: flex;
   align-items: center;
   justify-content: center;
   .overlay {
      width: 100%;
      height: 100%;
      background-color: #00000050;
      display: flex;
      align-items: center;
      justify-content: center;
   }
   .pulse {
      width: 25px;
      height: 25px;
      position: relative;
      border-radius: 50%;
      background: #0573b9;
      box-shadow: 0 0 0 0 #1e90ff99;
      animation: ${fx} 1.5s infinite linear;
      &:before,
      &:after {
         content: "";
         position: absolute;
         inset: 0;
         border-radius: inherit;
         box-shadow: 0 0 0 0 #1e90ff99;
         animation: inherit;
         animation-delay: -0.5s;
      }
      &::after {
         animation-delay: -1s;
      }
   }
`;

const SpinnerLoader = () => {
   return (
      <Div>
         <div className="overlay">
            <div className="pulse" />
         </div>
      </Div>
   );
};
export default SpinnerLoader;
