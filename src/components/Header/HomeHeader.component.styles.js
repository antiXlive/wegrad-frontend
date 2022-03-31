import styled from "styled-components";

export const OverLay = styled.div`
   width: 100vw;
   height: 100vh;
   background-color: #00000050;
   display: flex;
   align-items: center;
   justify-content: center;
   position: fixed;
   z-index: 100;
   @media (min-width: 800px) {
      display: none;
   }
   .bottom-sheet {
      width: 100vw;
      /* height: 70vh; */
      background-color: #fff;
      position: fixed;
      /* top: 30vh; */
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      padding-top: 20px;
      .user-details {
         width: 100%;
         height: 50px;
         display: flex;
         border-bottom: 1px solid #66666630;
         /* padding-bottom: 20px; */
         .avatar {
            width: 20%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
               width: 40px;
               border-radius: 100vw;
            }
         }
         .user-info {
            padding-top: 4px;
            width: 80%;
            cursor: pointer;
            /* border:1px solid; */
         }
      }
      .navigation-links {
         position: relative;
         width: 100%;
         /* border:1px solid; */
         height: 82%;
         margin-top: 25px;
         .link {
            cursor: pointer;
            width: 100%;
            /* border:1px solid; */
            display: flex;
            align-items: center;
            padding-left: 25px;
            svg {
               margin-right: 10px;
            }
            p {
               font-size: 15px;
            }
         }
         /* background-color: red; */
      }
   }
`;

export const MobileHeader = styled.div`
   width: 100vw;
   height: 60px;
   padding: 2vh 2vw;
   display: flex;
   position: fixed;
   background-color: #ffffff;
   z-index: 10;
   /* border: 1px solid red; */
   justify-content: space-between;

   @media (min-width: 800px) {
      display: none;
   }
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
      width: 55%;
      height: 27px;
      /* border: 1px solid red; */
      background: #f3f2f6;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: 3px;
      input {
         width: 100%;
         background-color: inherit;
         border: none;
         padding-left: 30px;
         border-radius: 3px;
         &:focus {
            outline: none;
            border: 1px solid ${(props) => props.bcolor};
         }
      }
      svg {
         transform: scale(0.8);
      }
   }
   .menu-bar {
      width: 10%;
      height: 100%;
      /* border: 1px solid red; */
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
         width: 30px;
         height: 30px;
         path {
            transform: scale(1.8);
         }
      }
   }
`;

export const DesktopHeader = styled.div`
   display: none;
   @media (min-width: 800px) {
      z-index: 10;
      position: fixed;
      display: flex;
      width: 100vw;
      min-height: 50px;
      align-items: center;
      justify-content: space-around;
      padding: 8px 5vw;
      padding-top: 15px;
      /* border: 1px solid green; */
      background-color: #fff;
      @media (min-width: 1300px) {
         padding: 8px 10vw;
      }
      @media (min-width: 1500px) {
         padding: 8px 15vw;
      }

      .logo-container {
         width: 150px;
         img {
            width: 100%;
         }
      }
      .search-bar {
         width: 30%;
         max-width: 250px;
         height: 28px;
         /* border: 1px solid red; */
         background: #f3f2f6;
         display: flex;
         align-items: center;
         justify-content: center;
         position: relative;
         border-radius: 3px;
         input {
            width: 100%;
            height: 100%;
            background-color: inherit;
            border: none;
            padding-left: 30px;
            border-radius: 3px;
            &:focus {
               outline: none;
               border: 1px solid ${(props) => props.bcolor};
            }
         }
         svg {
            transform: scale(0.8);
         }
      }
      .link-section {
         /* border: 1px solid; */
         /* width: 40%; */
         height: 100%;
         display: flex;
         .link-item {
            /* border: 1px solid red; */
            width: 60px;
            display: flex;
            align-items: center;
            img {
               width: 35px;
               cursor: pointer;
               border-radius: 100vw;
            }
            svg {
               cursor: pointer;
            }
         }
      }
   }
`;
