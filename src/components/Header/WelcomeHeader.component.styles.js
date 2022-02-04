import styled from "styled-components";

export const MobileHeader = styled.div`
   /* border: 1px solid greenyellow; */
   background-color: ${(props) => props.bgcolor};
   position: fixed;
   width: 100vw;
   /* height: 10; */
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 5vw;
   padding-top: 2vh;
   z-index: 1;
   .logo-container {
      width: 130px;
      z-index: 100;
      /* border: 1px solid yellow; */
      display: flex;
      align-items: center;
      img {
         width: 100%;
      }
   }
   .menu {
      /* transform: scale(1.5); */
      /* filter: invert(34%) sepia(80%) saturate(3826%) hue-rotate(200deg)
         brightness(94%) contrast(106%); */
   }
   @media (min-width: 700px) {
      display: none;
   }
`;

export const DesktopHeader = styled.div`
   display: none;
   @media (min-width: 700px) {
      background-color: ${(props) => props.bgcolor};
      z-index: 10;
      position: fixed;
      display: flex;
      width: 100vw;
      align-items: center;
      justify-content: space-between;
      padding: 0 4vw;
      padding-top: 20px;
      /* border:1px solid green; */

      .logo-container {
         width: 150px;
         img {
            width: 100%;
         }
      }
      .link-container {
         /* border: 1px solid red; */
         display: flex;
         p {
            font-size: 16px;
            padding: 0 15px;
         }
      }
   }
   @media (min-width: 1000px) {
      padding: 0 10vw;
      padding-top: 3vh;
   }
   @media (min-width: 1500px) {
      padding: 0 10vw;
      padding-top: 3vh;
   }
`;
