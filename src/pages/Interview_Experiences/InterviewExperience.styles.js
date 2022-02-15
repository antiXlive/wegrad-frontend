import styled from "styled-components";
import background from "../../assets/background1.png";

export const Div = styled.div`
   width: 100vw;
   min-height: 100vh;
   height: auto;
   background-color: #e7ebef;
   display: flex;
   flex-direction: column;
   box-sizing: border-box;
   background-image: url(${background});
   background-repeat: no-repeat;
   background-attachment: fixed;
   background-size: auto;
   @media (min-width: 1024px) {
      background-size: cover;
   }
   .new-interview-experience {
      position: fixed;
      padding: 7px 10px;
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
         display: inline-block;
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
         font-size: 22px;
         letter-spacing: 1px;
         color: #55555570;
         margin: 0;
      }
   }
`;

export const ExperienceCard = styled.div`
   width: 90%;
   /* min-height: 130px; */
   height: 130px;
   background-color: #fff;
   border-radius: 3px;
   box-shadow: 0px 3px 20px #00000010;
   margin-bottom: 25px;
   display: flex;
   flex-direction: column;
   position: relative;
   padding: 1% 0;
   a {
      position: absolute;
      width: 100%;
      height: 95%;
   }
   .company,
   .role,
   .location,
   .date {
      padding: 0 15px;
      display: flex;
      align-items: center;
      /* border: 1px solid red; */
      width: 100%;
      p {
         /* font-size: 12px; */
         margin: 0;
         display: inline-block;
         letter-spacing: 0.5px;
      }
   }
   .company {
      margin-top: 10px;
      height: 20%;
      font-size: 16px;
      color: var(--blue2);
      letter-spacing: 1px;
   }
   .role {
      height: 25%;
      font-size: 17px;
      color: #333;
   }
   .location {
      height: 20%;
      font-size: 12px;
      color: #555;
      margin-bottom: 5px;
   }
   .date {
      align-items: flex-end;
      height: 15%;
      font-size: 11px;
      color: #555;
   }
`;
