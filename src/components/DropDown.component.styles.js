import styled, { keyframes } from "styled-components";

const grow = keyframes`
0%{
   transform: scale(0.5);
   opacity: 0;
}
100%{
   transform: scale(1);
   opacity: 1;
}
`;

const Div = styled.div`
   position: absolute;
   background: #fff;
   z-index: 100;
   right: 10px;
   top: 10px;
   padding: 5px 15px;
   box-shadow: 0px 1px 8px #00000030;
   border-radius: 3px;
   animation: ${grow} 0.3s ease;
   transform-origin: top right;
`;
const Option = styled.div`
   height: 35px;
   display: flex;
   align-items: center;
   .icon {
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
   }
   .title {
      padding-top:3%;
      p {
         font-size: 13px;
         margin: 0;
         color: #000000e6;
      }
   }
`;

export { Div, Option };
