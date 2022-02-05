import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const loading = keyframes`
        0%{
            transform: scale(0);
            opacity: 0;
        }
        50%{
            opacity: 1;
        }
        100%{
            transform: scale(1);
            opacity: 0;
        }
    `;

const Div = styled.div`
   width: 100vw;
   height: ${(props) => props.height};
   position: fixed;
   top: 0;
   z-index: 1000;
   display: flex;
   align-items: center;
   justify-content: center;
   .overlay {
      width: 100vw;
      height: 100%;
      background-color: #00000050;
      display: flex;
      align-items: center;
      justify-content: center;
   }
`;

const Spinner = styled.div`
   z-index: 101;
   border: 0 solid transparent;
   border-radius: 50%;
   width: 150px;
   height: 150px;
   position: relative;
   top: -5%;
   left: -5%;
   ::before,
   ::after {
      content: "";
      border: 1em solid #11659a;
      border-radius: 50%;
      width: inherit;
      height: inherit;
      position: absolute;
      animation: ${loading} 2s linear infinite;
      opacity: 0;
   }
   ::before {
      animation-delay: 0.5s;
   }
`;
const SpinnerLoader = (props) => {
   const [windowHeight, setWH] = useState(0);

   useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const handleResize = () => {
      if (window) {
         if (window.innerHeight > 700) {
            setWH(window.innerHeight);
         }
      }
   };
   return (
      <Div height={windowHeight ? windowHeight + "px" : "100vh"}>
         <div className="overlay">
            <Spinner />
         </div>
      </Div>
   );
};
export default SpinnerLoader;
