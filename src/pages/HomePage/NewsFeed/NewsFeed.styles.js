import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const NewsFeedCard = styled.div`
   height: min-content;
   max-width: 550px;
   width: 100vw;
   height: 100%;
   /* background-color: blue; */
   @media (min-width: 800px) {
      max-width: 500px;
   }
   @media (min-width: 1000px) {
      max-width: 550px;
   }
`;

export const Nodata = styled(motion.div)`
   /* border: 3px solid red; */
   padding-top: 20px;
   width: 100%;
   height: auto;
   display: flex;
   align-items: center;
   flex-direction: column;
   img {
      /* border: 1px solid; */
      position: relative;
      /* left: -10%; */
      height: 200px;
      /* width: 100%; */
   }
   p {
      opacity: 0.5;
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 18px;
      margin: 0;
   }
`;

export const Spinner = styled(motion.div)`
   width: 100%;
   height: 80px;
   display: flex;
   align-items: center;
   justify-content: center;
   .spinner {
      height: 45px;
      width: 45px;
      border: 4px solid rgba(0, 0, 0, 0.2);
      border-radius: 100%;
      &:before {
         content: "";
         display: block;
         position: absolute;
         left: -4px;
         top: -4px;
         height: 100%;
         width: 100%;
         border-top: 4px solid var(--blue2);
         border-left: 4px solid transparent;
         border-bottom: 4px solid transparent;
         border-right: 4px solid transparent;
         border-radius: 100%;
      }
   }
   .no-more-post {
      color: #55555580;
      font-size: 20px;
      letter-spacing: 1px;
      margin: 0;
      font-weight: 700;
   }
`;
