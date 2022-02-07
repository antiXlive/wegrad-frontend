import React from "react";
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
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   z-index: 1000;
   background-color: #f5f5f5;
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

const LogoLoader = () => {
   return (
      <Div>
         <img src={iiitmlogo} alt="weGrad" />
      </Div>
   );
};
export default LogoLoader;
