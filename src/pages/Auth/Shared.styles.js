import styled from "styled-components";
import { motion } from "framer-motion";

import authbg from "../../assets/auth-bg.webp";

export const Div = styled(motion.div)`
   width: 100vw;
   /* min-height: 700px; */
   /* height: 100vh; */
   display: flex;
   box-sizing: border-box;
   align-items: center;
   justify-content: center;
   background-image: linear-gradient(#273a47f2, #1c50724f), url(${authbg});
   background-size: cover;
   background-repeat: no-repeat;
   backdrop-filter: saturate(180%) blur(10px);

   .card {
      width: 95vw;
      min-width: 320px;
      max-width: 500px;
      min-height: 460px;
      max-height: 700px;
      background-color: #ecebedc7;
      box-shadow: 0 5px 10px #00000010;
      border-radius: 5px;

      .college-info {
         width: 100%;
         display: flex;
         background-color: #ecebeda1;
         padding: 0 4%;
         .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
               width: 55px;
               @media (min-width: 600px) {
                  width: 70px;
               }
            }
         }
         .name {
            width: 80%;
            height: 100%;
            /* border: 1px solid; */
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-left: 10px;
            p {
               color: #222;
               font-size: 15px;
               font-weight: 600;
               letter-spacing: 0.5px;
               line-height: 150%;
            }
         }
      }

      .form {
         width: 100%;
         /* border:1px solid; */
         padding: 10% 0;
         .form-title {
            width: 100%;
            text-align: center;
            /* border:1px solid red; */
            padding: 0 3%;
            p {
               font-size: 22px;
               font-weight: 700;
               margin: 0;
               color: #444;
            }
         }

         .form-inputs {
            margin-top: 30px;
            width: 100%;
            /* border: 1px solid green; */
            padding: 0 5%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .submit-button-common {
               height: min-content;
               padding: 8px 20px;
               background-color: ${(props) =>
                  props.disabled ? "#0000004D" : "#0573B9"};
               cursor: pointer;
               margin-top: 10px;
               margin-bottom: 20px;
               border-radius: 3px;
               display: flex;
               align-items: center;
               justify-content: center;
               box-sizing: border-box;
               p {
                  color: #fff;
                  font-size: clamp(15px, 3vw, 18px);
                  margin: 0;
                  letter-spacing: 2px;
               }
            }
            .submit-button-signin {
               padding: 9px 40px;
               margin-top: 20px;
               margin-bottom: 30px;
            }
         }
      }

      .footer-links {
         /* border:1px solid; */
         width: 100%;
         padding: 0 10%;
         a {
            text-decoration: underline;
         }
         p {
            text-align: center;
            margin: 0;
            font-size: 11px;
            color: #44444499;
         }
         .signup-cta,
         .forgot-cta,
         .signin-cta {
            font-size: 13px;
            letter-spacing: 1px;
            margin-bottom: 10px;
            a {
               font-weight: 600;
               color: var(--blue2);
               text-decoration: none;
            }
         }
         .forgot-cta,
         .signin-cta {
            margin-bottom: 20px;
         }
         .forgot-cta {
            margin-bottom: 0;
         }
      }
   }
`;

// ---------------------------Sgnup Customs---------------------------

// ---------------------------Sgnin Customs---------------------------
