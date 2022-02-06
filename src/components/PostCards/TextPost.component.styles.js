import styled from "styled-components";

const Card = styled.div`
   width: 100%;
   /* min-height: 35vh; */
   margin-bottom: 15px;
   background-color: #fff;
   border-radius: 0.4vh;
   display: flex;
   flex-direction: column;
   box-sizing: border-box;
   box-shadow: 0 1px 5px #00000020;
   position: relative;
   /* border:1px solid red; */
   /* padding: 1vh 1vw; */
   .user-info {
      /* padding: 1.5vh 2vw; */
      /* border: 1px solid red; */
      padding-left: 20px;
      padding-top: 10px;
      /* flex-grow: 1; */
      /* max-height: 4vh; */
      display: flex;
      align-items: center;
      box-sizing: border-box;
      position: relative;
      .user-avatar {
         width: 30px;
         height: 30px;
         border-radius: 100vh;
         img {
            width: 100%;
            height: 100%;
            border-radius: 100vh;
         }
      }
      .user-info-data {
         /* border:1px solid red; */
         width: 80%;
         height: 100%;
         padding-left: 3%;
         display: flex;
         flex-direction: column;
         justify-content: space-evenly;
         a {
            width: max-content;
         }
         p {
            margin: 0;
         }
         .user-name {
         }
         .time-stamp {
            /* font-size: calc(1.5vw + 0.5vh); */
            font-size: 12px;
            margin-top: 4px;
            color: #00000080;
            letter-spacing: 0.8px;
         }
      }
   }
   .post-content {
      box-sizing: border-box;
      /* padding: 0 10px; */
      img {
         width: 100%;
         /* height:100%; */
         object-fit: fill;
      }
   }
   .post-stats {
      flex-grow: 1;
      /* border: 1px solid red; */
      box-sizing: border-box;
   }
   .post-actions {
      /* flex-grow: 1; */
      height: 50px;
      padding: 0.5vw 2vw;
      /* border: 1px solid red; */
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background-color: #f2f3f5;
      input {
         width: 80%;
         height: 75%;
         border-radius: 100vh;
         outline: none;
         border: none;
         /* border:1px solid #555555; */
         padding-left: 15px;
         margin-right: 10px;
      }
      .user-avatar {
         width: 24px;
         height: 23px;
         border-radius: 100vh;
         margin-right: 10px;
         img {
            width: 100%;
            height: 100%;
            border-radius: 100vh;
         }
      }
   }
`;

export { Card };
