import styled from "styled-components";
import { motion } from "framer-motion";
import Welcome_img from "../../assets/welcome-background.webp";

export const ParallaxDiv = styled(motion.div)`
   width: 100vw;
   background-attachment: fixed;
   background-position: center;
   background-size: cover;
   background-image: url(${Welcome_img});
`;
export const Div = styled.div`
   width: 100vw;
   max-width: 100vw;
   position: absolute;
   top: 0;
   /* height: 100%; */
   /* background-color: #f6f6f6; */
   display: flex;
   padding-top: 10vh;
   flex-direction: column;
   /* border: 2px solid red; */
   .section-1 {
      width: 100%;
      /* height: 50%; */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding: 0 2vw;
      padding-top: 7vh;
      /* border: 1px solid red; */
      .cta {
         margin-top: 1.5vh;
         margin-bottom: 8vh;
         padding: 6px 18px;
         border-radius: 4px;
         background-color: var(--blue2);
         letter-spacing: 1px;
         box-shadow: 0px 5px 30px #4154f166;
         p {
            margin: 0;
            color: #fff;
            font-size: clamp(14px, 4vw, 18px);
            font-weight: normal;
         }
      }
      p {
         font-size: clamp(20px, 7vw, 30px);
         font-weight: 600;
         line-height: 180%;
         letter-spacing: 1.3px;
         text-align: center;
         color: var(--blue4);
      }
      @media (min-width: 900px) {
         width: 50%;
         padding-top: 100px;
         padding-top: 0;
         justify-content: center;
         p {
            text-align: left;
         }
      }
   }
   .section-2 {
      width: 100%;
      /* height: 50vh; */
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      height: 50%;
      /* border: 1px solid blue; */
      @media (min-width: 900px) {
         width: 50%;
         padding-top: 100px;
      }

      img {
         width: 100%;
      }
   }

   @media (min-width: 700px) {
      padding: 0 5vw;
      padding-top: 100px;
      .section-1 {
         padding-top: 2vh;
         p {
            line-height: 150%;
         }
      }
      .section-2 {
         img {
            width: 70%;
         }
      }
   }
   @media (min-width: 900px) {
      flex-direction: row;
      /* padding-top: 10vh; */
   }
`;
