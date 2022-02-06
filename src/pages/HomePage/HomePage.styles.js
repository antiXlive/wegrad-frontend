import styled, { keyframes } from "styled-components";
import background from "../../assets/home-bg.webp";
import { motion } from "framer-motion";

const Div = styled.div`
   width: 100vw;
   min-height: 100vh;
   height: auto;
   display: flex;
   flex-direction: column;
   background-image: ${(props) => (props.data ? `url(${background})` : null)};
   background-color: #f5f7f9;
   background-repeat: no-repeat;
   background-attachment: fixed;
   background-size: cover;
   .content-section {
      width: 100vw;
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
         padding: 0 5vw;
         padding-top: 80px;
      }
      @media (min-width: 1500px) {
         padding: 0 11vw;
         padding-top: 80px;
      }
   }
`;

export const FixedWrapper = styled.div`
   width: 280px;
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
export const NewsFeedCard = styled.div`
   height: min-content;
   max-width: 550px;
   width: 100vw;
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
   width: 250px;
   height: 50vh;
   position: fixed;
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

const animation = keyframes`
    0% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -105;
    }
    50% {
      stroke-dasharray: 80 10;
      stroke-dashoffset: -160;
    }
    100% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -300;
    }
  `;

const Loader = styled.div`
   width: 100vw;
   box-sizing: border-box;
   display: flex;
   justify-content: center;
   #container {
      width: 5vh;
      height: 5vh;
   }
   #spinner {
      transform-origin: center;
      animation-name: ${animation};
      animation-duration: 1.2s;
      animation-timing-function: cubic-bezier;
      animation-iteration-count: infinite;
   }
`;

export { Div, Loader };
