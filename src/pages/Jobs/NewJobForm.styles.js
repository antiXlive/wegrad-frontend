import styled from "styled-components";
import background from "../../assets/background1.png";

const Div = styled.div`
   width: 100vw;
   min-height: 100vh;
   /* height: auto; */
   background-color: #e7ebef;
   display: flex;
   flex-direction: column;
   box-sizing: border-box;
   background-image: url(${background});
   background-repeat: no-repeat;
   background-attachment: fixed;
   background-size: auto;
   padding-bottom: 20px;
   margin-top: -32px;
   @media (min-width: 1024px) {
      background-size: cover;
   }

   .header-card {
      /* margin-top:10px; */
      position: relative;
      bottom: -30px;
      width: 100%;
      display: flex;
      align-self: center;
      border-radius: 4px;
      height: 140px;
      background-color: #0573b9;
      padding: 30px 15px;
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
      p {
         color: #ededed;
         margin: 0;
         margin-top: 10px;
         font-size: 23px;
      }
   }
`;

const Card = styled.div`
   width: 95%;
   background: #fff;
   display: flex;
   align-self: center;
   flex-direction: column;
   margin-bottom: 20px;
   box-sizing: border-box;
   position: relative;
   border-radius: 4px;
   padding: 5px 0;
   box-shadow: 0px 2px 15px #00000015;
   a,
   svg {
      position: absolute;
      right: 8px;
      top: 8px;
   }
   a {
      width: 30px;
      height: 30px;
   }
   svg {
      color: #333;
   }
   .title {
      display: flex;
      height: 40px;
      align-items: center;
      margin-bottom: 30px;
      border-bottom: 1px solid #55555530;
      padding: 0 15px;
      p {
         margin: 0;
         display: inline-block;
         font-size: 16px;
         /* margin-left: 8px; */
         color: #444;
      }
   }
   .text-input {
      width: 100%;
      padding: 0 15px;
      margin-bottom: 20px;
      p {
         font-size: 14px;
         color: #666;
         margin: 0;
         margin-bottom: 10px;
      }
      input,
      textarea,
      select {
         width: 100%;
         height: 35px;
         border: 1px solid #55555590;
         border-radius: 3px;
         padding: 0 10px;
         background-color: transparent;
      }
      textarea {
         resize: vertical;
         height: 200px;
         max-height: 80vh;
         padding: 10px;
         overflow: auto;
      }
   }
   .new-button {
      width: max-content;
      padding: 4px 10px;
      border: 1px solid #55555570;
      display: flex;
      align-items: center;
      align-self: center;
      border-radius: 100px;
      color: #777;
      margin: 15px 0;
      cursor: pointer;
      p {
         padding: 0 5px;
         font-size: 12px;
         margin: 0;
         display: inline-block;
      }
      svg {
         color: #777;
         position: static;
      }
   }
   .chip {
      width: 95%;
      border: 1px solid #77777795;
      background-color: #77777710;
      min-height: 45px;
      padding: 4px 0;
      border-radius: 100px;
      position: relative;
      display: flex;
      align-items: center;
      align-self: center;
      margin-bottom: 30px;
      overflow: hidden;
      .one,
      .one-e,
      .two,
      .three {
         width: 10%;
         min-height: 40px;
         text-align: center;
         display: flex;
         align-items: center;
         justify-content: center;
         flex-direction: column;
         /* border: 1px solid red; */
      }
      .one {
         width: 15%;
         align-items: end;
      }
      .two {
         width: 70%;
         justify-content: space-around;
         p:nth-child(1) {
            font-size: 15px;
         }
         p:nth-child(2) {
            font-size: 11px;
         }
      }
      .three {
         align-items: flex-start;
      }
      .one-e {
         padding: 0 22px;
         width: 90%;
         align-items: flex-start;
         justify-content: space-evenly;
         text-align: left;
         p:nth-child(1) {
            font-size: 13px;
            line-height: 14px;
            margin-bottom: 5px;
         }
         p:nth-child(2) {
            font-size: 10px;
         }
      }
      svg {
         color: #777;
         position: static;
      }
      p {
         margin: 0;
         display: inline-block;
      }
   }
`;
const Button = styled.button`
   width: 120px;
   height: 35px;
   border-radius: 2px;
   background-color: var(--blue2);
   display: flex;
   align-self: center;
   align-items: center;
   justify-content: center;
   border: 0;
   cursor: pointer;
   p {
      margin: 0;
      color: #ffffff;
      letter-spacing: 1px;
      font-weight: 500;
   }
`;

export { Div, Card, Button };
