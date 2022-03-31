import styled, { keyframes } from "styled-components";
import background from "../../assets/home-bg.webp";
import { motion } from "framer-motion";

const Div = styled.div`
   width: 100vw;
   min-height: 100vh;
   display: flex;
   flex-direction: column;
   background-image: ${(props) => (props.data ? `url(${background})` : null)};
   background-color: #f5f7f9;
   background-repeat: no-repeat;
   background-attachment: fixed;
   background-size: cover;
   .content-section {
      width: 100vw;
      height: 100%;
      padding-top: 80px;
      display: flex;
      height: auto;
      justify-content: center;
      .fw-navigation,
      .fw-highlight {
         display: none;
      }
      @media (min-width: 800px) {
         justify-content: space-evenly;
         .fw-navigation {
            display: block;
         }
      }
      @media (min-width: 1000px) {
         padding: 0 5vw;
         padding-top: 80px;
      }
      @media (min-width: 1100px) {
         padding: 0;
         padding-top: 80px;
         .fw-highlight {
            display: block;
         }
      }
      @media (min-width: 1250px) {
         padding: 0 6vw;
         padding-top: 80px;
      }
      @media (min-width: 1500px) {
         padding: 0 12vw;
         padding-top: 80px;
      }
      @media (min-width: 1700px) {
         padding: 0 18vw;
         padding-top: 80px;
      }
   }
`;

export const FixedWrapper = styled.div`
   width: 260px;
   display: flex;
   flex-direction: column;
   align-items: center;
`;
export const NavigationCard = styled.div`
   display: none;
   position: fixed;
   width: 250px;
   padding: 20px 0;
   background-color: #fff;
   box-shadow: 0px 5px 20px #00000020;
   .link {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      padding-left: 10%;
      filter: invert(37%) sepia(7%) saturate(11%) hue-rotate(333deg)
         brightness(103%) contrast(91%);
      &:hover {
         filter: invert(51%) sepia(33%) saturate(6768%) hue-rotate(194deg)
            brightness(102%) contrast(106%);
      }
      p {
         margin: 0;
         padding-left: 10px;
         font-size: 15px;
      }
   }
   @media (min-width: 800px) {
      display: block;
   }
`;
export const MainContentCard = styled.div`
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
export const HighlightCard = styled.div`
   display: none;
   width: 260px;
   height: 50vh;
   max-height: 500px;
   position: fixed;
   overflow: hidden;
   /* background-color: #fff; */
   /* box-shadow: 0px 5px 20px #00000020; */
   /* border-radius: 1vw; */
   img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 0px 5px 20px #00000020;
      position: relative;
      /* height: 50%; */
   }
   p {
      position: absolute;
      top: 10px;
      left: 15px;
      color: #101010;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
   }
   .quote {
      position: absolute;
      top: 60px;
      font-size: 12px;
      letter-spacing: 0.5px;
      padding-right: 10px;
      line-height: 15px;
      /* color: #464646; */
   }
   /* background-color: green; */
   @media (min-width: 1100px) {
      display: block;
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

export { Div };
