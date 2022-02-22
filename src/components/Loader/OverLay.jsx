import React from "react";
import styled from "styled-components";

const Div = styled.div`
   width: 100vw;
   height: 100vh;
   max-height: 100vh;
   overflow: hidden;
   background-color: #00000050;
   display: flex;
   align-items: center;
   justify-content: center;
   position: fixed;
   z-index: 100;
`;

const OverLay = () => {
   return <Div></Div>;
};
export default OverLay;
