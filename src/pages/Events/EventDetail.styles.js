import styled from "styled-components";

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
   .card {
      background-color: #fff;
      width: 100%;
      height: 100%;
      /* min-height: 70vh; */
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      padding: 10px 15px;
      box-shadow: 0px 3px 20px #00000010;
   }
   .heading {
      font-size: 20px;
      color: var(--blue2);
   }
   .section {
      width: 100%;
      min-height: 30px;
      .title {
         font-size: 12px;
         font-weight: 700;
         letter-spacing: 1px;
         color: #333;
         opacity: 0.8;
         margin-bottom: -5px;
      }
      .description {
         font-size: 14px;
         color: #222;
         letter-spacing: 1px;
         line-height: 19px;
         a {
            color: var(--blue1);
            width: 100%;
         }
      }
   }
`;
