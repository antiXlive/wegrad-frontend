import styled from "styled-components";

const Div = styled.div`
   width: 100vw;
   min-height: 80vh;
   max-width: 550px;
   display: flex;
   flex-direction: column;
   box-sizing: border-box;
   padding-bottom: 20px;
   /* border: 1px solid red; */
`;

const AlumniCard = styled.div`
   width: 220px;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   padding: 15px 10px;
   background-color: #fff;
   box-shadow: 0px 3px 15px #00000010;
   position: relative;
   margin-bottom: 20px;
   a {
      width: 100%;
      height: 95%;
      position: absolute;
   }
   .avatar {
      width: 50px;
      border-radius: 1000px;
      img {
         width: 100%;
         border-radius: 1000px;
      }
   }
   p {
      margin: 0;
      margin-top: 10px;
      text-align: center;
   }
   .name {
      font-size: 18px;
   }
   .role {
      font-size: 11px;
      color: #777;
      margin-top: 5px;
      text-align: center;
      line-height: 15px;
   }
`;

export { Div, AlumniCard };
