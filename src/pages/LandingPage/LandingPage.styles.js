import styled from "styled-components";
import Welcome_img from "../../assets/welcome-background.webp";

export const ParallaxDiv = styled.div`
   /* border: 1px solid red; */
   width: 100vw;
   background-attachment: fixed;
   background-position: center;
   /* background-color: #f6f6f6; */
   /* background-repeat: no-repeat; */
   background-size: cover;
   background-image: url(${Welcome_img});
   /* transform: rotate(180deg); */
   @media (min-width: 700px) {
      transform: rotate(0deg);
   }
`;
export const Div = styled.div`
   width: 100vw;
   position: absolute;
   top: 0;
   height: 100%;
   /* background-color: #f6f6f6; */
   display: flex;
   padding-top: 10vh;
   flex-direction: column;
   /* border: 5px solid red; */
   @media (min-width: 700px) {
      flex-direction: row;
   }
   .section-1 {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 2vw;
      padding-top: 7vh;
      /* border: 1px solid red; */
      @media (min-width: 700px) {
         width: 50%;
      }
      .cta {
         margin-top: 1.5vh;
         margin-bottom: 3vh;
         padding: 10px 15px;
         border-radius: 4px;
         background-color: var(--blue2);
         color: #fff;
         letter-spacing: 1px;
         box-shadow: 0px 5px 30px #4154f166;
      }
      p {
         font-size: 27px;
         font-weight: 500;
         line-height: 180%;
         letter-spacing: 1px;
         text-align: center;
         color: #333;
         /* text-shadow: 0 2px 40px #00000030; */
      }
   }
   .section-2 {
      width: 100vw;
      height: 50vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      height: 50%;
      /* border: 1px solid red; */
      @media (min-width: 700px) {
         width: 50%;
      }

      img {
         width: 100%;
      }
   }
`;
