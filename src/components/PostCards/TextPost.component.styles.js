import styled from "styled-components";

const Card = styled.div`
   width: 100%;
   /* min-height: 35vh; */
   margin-bottom: 10px;
   background-color: #fff;
   border-radius: 5px;
   display: flex;
   flex-direction: column;
   box-sizing: border-box;
   box-shadow: 0 2px 10px #00000010;
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
      .poll-box {
         display: flex;
         flex-direction: column;
         margin: 0 auto;
         width: 96%;
         border: 1px solid #55555520;
         border-radius: 6px;
         padding: 10px;
         margin-bottom: 5px;
         .question {
            font-size: 15px;
            letter-spacing: 1px;
            color: #000;
            font-weight: 600;
         }
         .options {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .option {
               display: flex;
               align-items: center;
               justify-content: center;
               width: 95%;
               min-height: 30px;
               border: 1px solid;
               border-radius: 3px;
               margin-bottom: 10px;
               cursor: pointer;
               p {
                  font-size: 13px;
               }
            }
            .option-selected {
               position: relative;
               display: flex;
               justify-content: space-between;
               align-items: center;
               width: 95%;
               min-height: 30px;
               padding: 0 10px;
               border: 1px solid #55555510;
               border-radius: 3px;
               margin-bottom: 10px;
               svg {
                  position: relative;
                  top: 3px;
                  margin-left: 5px;
               }
               p {
                  font-size: 12px;
               }
               p:nth-child(2) {
                  font-size: 13px;
               }
               .overlay {
                  position: absolute;
                  border-radius: 3px;
                  height: 100%;
                  width: 0;
                  background-color: #1e90ff30;
                  top: 0;
                  left: 0;
               }
            }
         }
         p {
            margin: 0;
         }
      }
   }
   .post-stats {
      flex-grow: 1;
      border: 1px solid red;
      box-sizing: border-box;
   }
   .comment-container {
      width: 100%;
      padding: 10px 0;
      /* border: 1px solid red; */
      /* height: 100px; */
      background-color: #f2f3f5;
      border-bottom: 1px solid #55555515;
      .comment {
         width: 100%;
         padding: 5px 10px;
         /* border: 1px solid red; */
         .author {
            font-weight: 600;
            /* font-size: 14px; */
         }
         .text {
            /* font-size: 14px; */
            opacity: 0.8;
            padding-left: 5px;
         }
         .time {
            width: 50px;
            /* border: 1px solid red; */
            opacity: 0.5;
            float: right;
            p {
               font-size: 12px;
               text-align: left;
            }
         }
         p {
            margin: 0;
            font-size: 13px;
            display: inline-block;
         }
      }
      .load-more {
         /* border: 1px solid red; */
         padding: 0 10px;
         margin: 0;
         margin-top: 10px;
         font-size: 13px;
         opacity: 0.7;
         cursor: pointer;
         display: inline-block;
      }
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
         max-width: 26px;
         margin-right: 10px;
      }
      svg {
         margin-left: 10px;
         margin-right: 5px;
         cursor: pointer;
      }
   }
`;

export { Card };
