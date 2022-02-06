import styled from "styled-components";
import { motion } from "framer-motion";

const Card = styled(motion.div)`
   width: 100%;
   background-color: #fff;
   box-shadow: 0px 5px 20px #55555520;
   height: auto;
   padding-top: 10px;
   border-radius: ${(props) => (props.active ? "5px" : "0")};
   position: relative;
   display: flex;
   flex-direction: column;
   margin-bottom: 20px;
   z-index: ${(props) => (props.active ? 12 : 1)};
   transition: all 0.3s;
   .user-info {
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 15px;

      img {
         width: 28px;
         margin-right: 15px;
      }
      p {
         font-size: 15px;
         margin: 0;
      }
   }
   .input-box {
      width: 100%;
      margin: 15px 0;
      textarea {
         width: 100%;
         padding: 0 10px;
         padding-left: 20px;
         height: ${(props) => (props.active ? "100px" : "50px")};
         outline: none;
         border: none;
         resize: none;
      }
   }
   .input-options {
      width: 100%;
      height: 35px;
      display: flex;
      border-top: 1px solid #55555520;
      padding-top: 5px;
      align-items: center;
      justify-content: space-evenly;
      color: #000;
      margin-bottom: 10px;
      .option {
         cursor: pointer;
         position: relative;
         padding: 4px 10px;
         overflow: hidden;
         display: flex;
         align-items: center;
         border-radius: 100vw;
         background-color: #f2f2f2;
         input {
            position: absolute;
            left: 0;
            opacity: 0;
         }
         p {
            font-size: clamp(10px,1vw,12px);
            margin: 0;
            display: inline-block;
            margin-left: 5px;
            padding-top: 1px;
         }
      }
   }

   .poll-box {
      padding-top: 10px;
      height: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      /* border: 1px solid red; */
      .poll-textarea {
         width: 96.5%;
         height: 70px;
         outline: none;
         border: none;
         margin-bottom: 20px;
         padding: 10px 10px;
         box-sizing: border-box;
         border: 1px solid #b1b1b1;
         border-radius: 2px;
         resize: none;
         margin-left: -8px;
      }
      .answer-box {
         width: 98%;
         /* border: 1px solid orange; */
         margin-bottom: 10px;
         display: flex;
         align-items: center;
         justify-content: center;
         position: relative;
         input {
            width: 100%;
            height: 28px;
            outline: none;
            border: none;
            border: 1px solid #b1b1b1;
            border-radius: 2px;
            margin-bottom: 5px;
            padding-left: 15px;
            margin-right: 6px;
         }
      }
      .new-answer-box {
         display: ${(props) => (props.poll === 4 ? "none" : "flex")};
         cursor: pointer;
         width: max-content;
         padding: 5px 10px;
         border: 1px solid;
         align-items: center;
         align-self: flex-start;
         border-radius: 100vh;
         color: #555;
         p {
            font-size: 12px;
            margin: 0;
            margin-left: 5px;
            color: #333;
         }
      }
   }
   .option-box {
      border-top: 1px solid #55555540;
      padding-top: 2vh;
      margin-top: ${(props) => (props.poll ? "5vh" : "0")};
      margin-bottom: 1vw;
      .options {
         -webkit-tap-highlight-color: transparent;
         width: 100%;
         /* height: 100%; */
         display: flex;
         cursor: pointer;
         justify-content: space-evenly;
         /* border: 1px solid blue; */
         .option {
            /* border: 1px solid red; */
            cursor: pointer;
            /* min-width: 70px; */
            /* width:auto; */
            /* width: max-content; */
            height: 28px;
            border-radius: 100vw;
            background-color: #f2f2f2;
            padding: 2px 4px;
            display: flex;
            padding: 0 14px;
            /* margin-right: 15px; */
            box-sizing: border-box;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            position: relative;
            input {
               position: absolute;
               top: 0;
               right: 0;
               max-width: 100%;
               min-height: 100%;
               text-align: right;
               opacity: 0;
               outline: 0;
               background: #fff;
               cursor: inherit;
               display: block;
               border: 1px solid red;
            }
            p {
               cursor: pointer;
               color: #333;
               margin: 0;
               margin-left: 5px;
               font-size: 11px;
               color: #333;
               padding-top: 5%;
               /* border: 1px solid red; */
            }
         }
      }
   }
   .button {
      width: 95px;
      height: 32px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: ${(props) => (props.active ? 1 : 0)};
      /* display: ${(props) => (props.active ? "block" : "none")}; */
      margin: 0 auto;
      /* background-color: #0573b9; */
      background-color: ${(props) =>
         props.submitButton ? "#0573b9" : "#0000004D"};
      margin-top: ${(props) => (props.active ? "30px" : "-35px")};
      transition: all 0.4s;
   }
`;

const FileBox = styled.div`
   width: 100%;
   /* border: 1px solid red; */
   text-align: center;
   position: relative;
   .icon {
      position: absolute;
      right: 5%;
      top: 3%;
      width: 30px;
      height: 30px;
      border-radius: 100vw;
      background: #555;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
   }
   img {
      width: 90vw;
      height: 50vw;
      object-fit: cover;
   }
`;

const Overlay = styled.div`
   background-color: #00000050;
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
   z-index: 11;
   transition: opacity 0.5s;
`;

export { Card, Overlay, FileBox };
