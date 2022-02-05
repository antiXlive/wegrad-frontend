import styled from "styled-components";


const Div = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex;
   box-sizing: border-box;
   align-items: center;
   justify-content: center;
`;
const Box1 = styled.div`
   height: 100%;
   width: 108vw;
   background-size: cover;
   box-sizing: border-box;
`;
const Box2 = styled.div`
   min-height: max-content;
   width: 90vw;
   margin-top: -10%;
   background-color: #f3f7f6;
   padding-top: 6vh;
   box-sizing: border-box;
   position: absolute;
   border-radius: 1vw;
   box-shadow: 0px 2px 20px #00000020;
   padding-bottom: 3vh;
   /* border:1px solid red; */
   .title{
      margin:0;
      margin-left: 5vw;
      margin-bottom: 2vh;
      font-size: 6vw;
      opacity: 0.6;
   }
   .role-chip-container {
      /* border: 1px solid red; */
      min-height: 40px;
      height: 6vh;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 18vw;
      box-sizing: border-box;
   }
   .input-section{
      padding-top: 5vh;
      /* border:1px solid red; */
      display: flex;
      flex-direction: column;
      align-items: center;
      input{
          width:30px;
          height: 40px;
          font-size:20px;
          text-align:center;
      }
   }
`;

const Button = styled.div`
   width: 50vw;
   height: min-content;
   padding: 2.5% 0;
   background-color: ${(props) => (props.disabled ? "#0000004D" : "#0573B9")};
   cursor: pointer;
   margin-top: 7%;
   margin-bottom: 4%;
   border-radius: 0.3vh;
   display: flex;
   align-items: center;
   justify-content: center;
   box-sizing: border-box;
   :hover {
      background-color: ${(props) =>
         props.disabled ? "#00000030" : "#11659a"};
   }

   p {
      color: #fff;
      font-size: clamp(15px, 3vw, 18px);
      margin: 0;
      letter-spacing: 2px;
   }
`;

export { Div, Box1, Box2, Button };