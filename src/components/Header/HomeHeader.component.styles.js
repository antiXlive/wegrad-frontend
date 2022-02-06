import styled from "styled-components";

export const MobileHeader = styled.div`
   width: 100vw;
   height: 60px;
   padding: 2vh 2vw;
   display: flex;
   position: fixed;
   background-color: #ffffff;
   z-index: 10;
   /* border-bottom: 1px solid #55555540; */
   /* box-shadow: 0 2px 20px #00000020; */
   .logo-container {
      width: 28%;
      max-width: 170px;
      height: 100%;
      /* border: 1px solid red; */
      display: flex;
      align-items: center;
      img {
         width: 100%;
      }
   }
   .search-bar {
      width: 60%;
      height: 100%;
      /* border: 1px solid red; */
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      svg {
         transform: scale(0.8);
      }
   }
   .menu-bar {
      width: 10%;
      height: 100%;
      /* border: 1px solid red; */
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
         /* border: 1px solid; */
         width: 30px;
         height: 30px;
         /* text-align: center; */
         /* display: flex; */
         /* align-items: center; */
         /* justify-content: center; */
         path {
            transform: scale(1.8);
         }
      }
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
