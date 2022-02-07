import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import iiitmlogo from "../../assets/iiitm-logo.webp";

const breathing = keyframes`
        0%{
            transform: scale(0.9);
        }
        25%{
            transform: scale(1);
        }
        60%{
            transform: scale(0.9);
        }
        100%{
            transform: scale(0.9);
        }
    `;

const Div = styled.div`
   width: 100vw;
   height: 100vh;
   position: absolute;
   top: 0;
   z-index: 1000;
   background-color: #f5f5f5;
   /* background-color: #dbdbdb; */
   box-sizing: border-box;
   display: flex;
   align-items: center;
   justify-content: center;
   img {
      width: 40%;
      max-width: 150px;
      animation: ${breathing} 4s ease-out infinite;
   }
`;

const LogoLoader = (props) => {
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
         setWH(window.innerHeight);
      }
   };
   return (
      <Div style={{ height: windowHeight }}>
         <img src={iiitmlogo} alt="weGrad" />
      </Div>
   );
};
export default LogoLoader;
