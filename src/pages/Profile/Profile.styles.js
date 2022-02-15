import styled from "styled-components";

const Div = styled.div`
   width: 100vw;
   min-height: 100vh;
   max-width: 550px;
   display: flex;
   flex-direction: column;
   box-sizing: border-box;
   padding-bottom: 20px;
`;

const Card = styled.div`
   width: 100%;
   background: #fff;
   display: flex;
   align-self: center;
   flex-direction: column;
   padding: 15px 10px;
   margin-bottom: 22px;
   box-sizing: border-box;
   position: relative;
   border-radius: 4px;
   a,
   svg {
      position: absolute;
      right: 8px;
      top: 8px;
      color: #333;
      z-index: 1;
      -webkit-tap-highlight-color: transparent;
   }
   a {
      z-index: 2;
      width: 40px;
      height: 40px;
   }
   .title {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      position: relative;
      p {
         margin: 0;
         display: inline-block;
         font-size: 14px;
         margin-left: 8px;
         color: #666;
         &:after {
            border-bottom: 2px solid #0573b9;
            border-radius: 100px;
            position: absolute;
            content: "";
            bottom: -45%;
            left: 10px;
            width: 20px;
         }
      }
   }
   .no-data {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      margin-top: -10px;
      margin-bottom: 10px;
      img {
         width: 80px;
         height: 80px;
      }
      p {
         font-size: 15px;
         letter-spacing: 1px;
         color: #55555590;
         margin: 0;
      }
   }
`;

const Cover = styled.div`
   width: 100%;
   height: 180px;
   background: #b3b3b3;
   position: relative;
   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
   input {
      position: absolute;
      /* border: 1px solid red; */
      width: 100%;
      height: 100%;
      opacity: 0;
   }
`;
const InfoCard = styled(Card)`
   top: -25px;
   margin-bottom: 0;
   .profile-pic {
      width: 110px;
      height: 110px;
      border-radius: 100vw;
      display: flex;
      align-self: center;
      position: relative;
      top: -60px;
      margin-bottom: -35px;
      overflow: hidden;
      img {
         width: 100%;
         object-fit: cover;
         border-radius: 100vh;
      }
      input {
         position: absolute;
         border: 1px solid red;
         width: 100%;
         height: 100%;
         border-radius: 100vh;
         opacity: 0;
      }
   }
   .name,
   .headline,
   .about {
      margin: 0;
      text-align: center;
      /* color: #383838; */
      color: #181818;
      letter-spacing: 1px;
   }
   .name {
      font-size: 24px;
      font-weight: 500;
      opacity: 0.8;
   }
   .headline {
      margin-top: 10px;
      font-size: 13px;
   }
   .about {
      margin-top: 25px;
      letter-spacing: 0.5px;
      text-align: justify;
      font-size: 12px;
      padding: 0 5px;
      line-height: 18px;
      /* color: #333; */
      /* border:1px solid red; */
   }
`;

const EducationCard = styled(Card)`
   /* .title {
      margin-bottom: 10px;
   } */

   .education {
      width: 100%;
      height: 50px;
      display: flex;
      padding: 0 10px;
      /* margin-top: 10px; */
      margin-bottom: 10px;
      .year {
         width: 30%;
         height: 100%;
         display: flex;
         align-items: center;
         opacity: 0.5;
         font-weight: 800;
         font-size: 24px;
         justify-content: center;
         /* border: 1px solid; */
      }
      .degree {
         width: 70%;
         height: 100%;
         display: flex;
         flex-direction: column;
         justify-content: space-evenly;
         p {
            margin: 0;
            font-size: 15px;
         }
         p:nth-child(2) {
            font-size: 13px;
         }
         /* justify-content: center; */
      }
   }
   .education:nth-child(1) {
      margin-top: 100px;
   }
`;
const ExperienceCard = styled(Card)`
   .experience {
      /* border-bottom: 1px solid #55555510; */
      width: 100%;
      height: 70px;
      padding: 5px 15px;
      margin-bottom: 5px;
      p {
         margin: 0;
      }
      .company {
         margin-bottom: 5px;
      }
      .role {
         font-size: 13px;
         color: #444;
         margin-bottom: 5px;
      }
      .time {
         font-size: 10px;
         color: #666;
      }
   }
`;
const ContactCard = styled(Card)`
   .contact {
      display: flex;
      align-items: center;
      color: #333;
      padding: 0 20px;
      margin-bottom: 15px;
      /* border: 1px solid red; */
      p {
         margin: 0;
         display: inline-block;
         font-size: 15px;
         margin-left: 8px;
      }
      svg {
         position: static;
         width: 25px;
         margin-right: 15px;
      }
   }
`;

export { Div, Cover, InfoCard, EducationCard, ExperienceCard, ContactCard };
