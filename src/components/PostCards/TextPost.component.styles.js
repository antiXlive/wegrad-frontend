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
      /* background-color: #f2f3f5; */
      /* border: 1px solid red; */
      padding-top: 8px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      position: relative;
      .user-avatar {
         width: 35px;
         height: 35px;
         border-radius: 100vh;
         img {
            width: 100%;
            height: 100%;
            border-radius: 100vh;
         }
      }
      .user-info-data {
         height: 40px;
         padding-left: 15px;
         display: flex;
         flex-direction: column;
         justify-content: space-evenly;
         a {
            width: max-content;
         }
         p {
            margin: 0;
         }
         .time-stamp {
            font-size: 11px;
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
      height: 50px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      background-color: #f2f3f5;
      input {
         height: 70%;
         max-height: 32px;
         border-radius: 100vh;
         outline: none;
         border: none;
         flex-grow: 2;
         padding-left: 15px;
      }
      img {
         width: 7%;
         max-width: 28px;
         margin-right: 10px;
      }
      svg{
         margin-left: 10px;
      }
   }
`;

export { Card };
