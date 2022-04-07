import styled from "styled-components";
import { motion } from "framer-motion";

export const Div = styled.div`
   height: min-content;
   max-width: 550px;
   width: 100vw;
   height: 100%;
   display: flex;
   flex-direction: column;
   /* background-color: blue; */
   @media (min-width: 800px) {
      max-width: 500px;
   }
   @media (min-width: 1000px) {
      max-width: 550px;
   }
   .button {
      position: fixed;
      padding: 7px 15px;
      display: flex;
      align-items: center;
      align-self: center;
      margin-top: 20px;
      justify-content: center;
      background-color: var(--blue1);
      margin-bottom: 20px;
      cursor: pointer;
      position: relative;
      p {
         margin: 0;
         color: #fff;
      }
      a {
         position: absolute;
         width: 100%;
         height: 100%;
      }
   }
   .no-data {
      margin-top: 20vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
         width: 200px;
      }
      p {
         font-size: 25px;
         letter-spacing: 1px;
         color: #55555570;
         margin: 0;
      }
   }
`;

export const MICard = styled(motion.div)`
   width: 90%;
   min-height: 105px;
   background-color: #fff;
   border-radius: 3px;
   box-shadow: 0px 3px 20px #00000010;
   margin-bottom: 25px;
   display: flex;
   flex-direction: column;
   position: relative;
   padding: 5px 0;
   padding-bottom: 15px;
   cursor: pointer;
   a {
      position: absolute;
      width: 100%;
      height: 95%;
   }
   .topic,
   .interviewer,
   .date {
      padding: 0 15px;
      display: flex;
      align-items: center;
      width: 100%;
      p {
         margin: 0;
         display: inline-block;
         letter-spacing: 0.5px;
      }
   }
   .topic {
      margin-top: 10px;
      font-size: 16px;
      color: var(--blue2);
      letter-spacing: 1px;
      margin-bottom: 7px;
   }
   .interviewer,
   .date {
      margin-top: 10px;
      display: flex;
      align-items: center;
      color: #555;
      p {
         display: inline-block;
         font-size: 13px;
         margin-left: 10px;
      }
      svg {
         display: inline-block;
      }
   }
`;
