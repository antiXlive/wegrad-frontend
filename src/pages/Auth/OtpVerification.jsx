import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Div, Card } from "./Shared.styles";

import { verifyOTP } from "../../redux/actions/authActions";

import iiitmlogo from "../../assets/iiitm-logo.webp";

const OtpVerification = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();

   const [pin1, setPin1] = useState({ pin: "", error: false });
   const [pin2, setPin2] = useState({ pin: "", error: false });
   const [pin3, setPin3] = useState({ pin: "", error: false });
   const [pin4, setPin4] = useState({ pin: "", error: false });
   const [pin5, setPin5] = useState({ pin: "", error: false });
   const [pin6, setPin6] = useState({ pin: "", error: false });
   const [signupEmail, setSignupEmail] = useState(null);

   useEffect(() => {
      if (location.search) {
         let tmp = location.search;
         tmp = tmp.substring(1);
         tmp = window.atob(tmp);
         tmp = tmp.split("=")[1];
         setSignupEmail(tmp);
      } else navigate("/");
   }, []);

   const [windowHeight, setWH] = useState(0);
   useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const handleResize = () => {
      if (window) {
         setWH(window.innerHeight);
      }
   };

   const otpVerified = useSelector((state) => state.auth.otpVerified);
   useEffect(() => {
      if (otpVerified) navigate("/auth/signin");
   }, [otpVerified]);

   const pin1Ref = useRef();
   const pin2Ref = useRef();
   const pin3Ref = useRef();
   const pin4Ref = useRef();
   const pin5Ref = useRef();
   const pin6Ref = useRef();

   const handleChange = (value, pin) => {
      const numberValidator = /^\d+$/;
      const otpValidator = /^[0-9]+$|^$/;
      if (otpValidator.test(value)) {
         switch (pin) {
            case 1:
               setPin1({ pin: value, error: false });
               if (numberValidator.test(value)) pin2Ref.current.focus();
               break;
            case 2:
               setPin2({ pin: value, error: false });
               if (numberValidator.test(value)) pin3Ref.current.focus();
               break;
            case 3:
               setPin3({ pin: value, error: false });
               if (numberValidator.test(value)) pin4Ref.current.focus();
               break;
            case 4:
               setPin4({ pin: value, error: false });
               if (numberValidator.test(value)) pin5Ref.current.focus();
               break;
            case 5:
               setPin5({ pin: value, error: false });
               if (numberValidator.test(value)) pin6Ref.current.focus();
               break;
            case 6:
               setPin6({ pin: value, error: false });
               if (numberValidator.test(value)) pin6Ref.current.blur();
               break;
            default:
               break;
         }
      }
   };
   const resetPins = () => {
      setPin1({ pin: "", error: false });
      setPin2({ pin: "", error: false });
      setPin3({ pin: "", error: false });
      setPin4({ pin: "", error: false });
      setPin5({ pin: "", error: false });
      setPin6({ pin: "", error: false });
   };

   const handleSubmit = () => {
      if (
         pin1.pin &&
         pin2.pin &&
         pin3.pin &&
         pin4.pin &&
         pin5.pin &&
         pin6.pin
      ) {
         let otp =
            pin1.pin + pin2.pin + pin3.pin + pin4.pin + pin5.pin + pin6.pin;
         dispatch(verifyOTP(signupEmail, otp));
         setTimeout(() => resetPins(), 3000);
      }
   };
   const resendOTP = () => {
      console.log(signupEmail);
      // dispatch(setNotification(1, "OTP sent successfully"));
   };

   return (
      windowHeight && (
         <Div style={{ height: windowHeight < 500 ? "700px" : windowHeight }}>
            <Card
               initial={{ y: "90vh", scale: 0.1 }}
               animate={{ y: 0, scale: 1 }}
               transition={{ duration: 0.3, type: "tween" }}
               disabled={
                  !(
                     pin1.pin &&
                     pin2.pin &&
                     pin3.pin &&
                     pin4.pin &&
                     pin5.pin &&
                     pin6.pin
                  )
                     ? true
                     : false
               }
            >
               <div className="college-info">
                  <div className="logo">
                     <Link to="/" style={{ textDecoration: "none" }}>
                        <img src={iiitmlogo} alt="IIITM" />
                     </Link>
                  </div>
                  <div className="name">
                     <Link to="/" style={{ textDecoration: "none" }}>
                        <p>
                           Indian Institute of Information Technology Senapati
                        </p>
                     </Link>
                  </div>
               </div>

               <div className="form">
                  <div className="form-title">
                     <p>Verify your OTP</p>
                  </div>
                  <div className="otp-input">
                     <input
                        type="number"
                        value={pin1.pin}
                        ref={pin1Ref}
                        onChange={(e) => {
                           handleChange(e.target.value, 1);
                        }}
                        maxLength={1}
                     />
                     <input
                        type="number"
                        value={pin2.pin}
                        ref={pin2Ref}
                        onChange={(e) => {
                           handleChange(e.target.value, 2);
                        }}
                        maxLength={1}
                     />
                     <input
                        type="number"
                        value={pin3.pin}
                        ref={pin3Ref}
                        onChange={(e) => {
                           handleChange(e.target.value, 3);
                        }}
                        maxLength={1}
                     />
                     <input
                        type="number"
                        value={pin4.pin}
                        ref={pin4Ref}
                        onChange={(e) => {
                           handleChange(e.target.value, 4);
                        }}
                        maxLength={1}
                     />
                     <input
                        type="number"
                        value={pin5.pin}
                        ref={pin5Ref}
                        onChange={(e) => {
                           handleChange(e.target.value, 5);
                        }}
                        maxLength={1}
                     />
                     <input
                        type="number"
                        value={pin6.pin}
                        ref={pin6Ref}
                        onChange={(e) => {
                           handleChange(e.target.value, 6);
                        }}
                        maxLength={1}
                     />
                  </div>

                  <motion.div
                     className="submit-button-common"
                     whileTap={{ scale: 0.9 }}
                     onClick={handleSubmit}
                  >
                     <p>Verify</p>
                  </motion.div>
                  <div className="footer-links">
                     <p className="signin-cta">
                        Didn’t received the code?{" "}
                        <motion.a
                           whileTap={{ fontSize: "12px" }}
                           onClick={resendOTP}
                        >
                           Resend
                        </motion.a>
                     </p>
                     <p>By signing up you agree to our</p>
                     <p>
                        <Link to="/">terms & conditions</Link> and{" "}
                        <Link to="/">privacy policy</Link>.
                     </p>
                  </div>
               </div>
            </Card>
         </Div>

         //          <p
         //             style={{
         //                color: "#000",
         //                fontSize: "clamp(13px,2vw,12px)",
         //                cursor: "pointer",
         //                margin: 0,
         //                marginTop: "3%",
         //             }}
         //          >
         //             Didn’t received the code?
         //             <span
         //                onClick={resendOTP}
         //                style={{ margin: 0, color: "#0573B9" }}
         //             >
         //                {" "}
         //                Resend
         //             </span>
         //          </p>
         //          <p
         //             style={{ color: "#A7A7A7", fontSize: "clamp(13px,2vw,12px)" }}
         //          >
         //             Already an user?{" "}
         //             <span style={{ color: "#0573B9", cursor: "pointer" }}>
         //                <Link style={{ textDecoration: "none" }} to="/signin">
         //                   Sign in
         //                </Link>
         //             </span>
         //          </p>
         //          <p
         //             style={{
         //                color: "#A7A7A7",
         //                cursor: "pointer",
         //                marginTop: "3%",
         //                fontSize: "clamp(10px,2vw,12px)",
         //             }}
         //          >
         //             <Link style={{ textDecoration: "none" }} to="/privacy-policy">
         //                Privacy Policy
         //             </Link>{" "}
         //             &emsp; &emsp;{" "}
         //             <Link style={{ textDecoration: "none" }} to="/terms">
         //                Terms & Conditions
         //             </Link>
         //          </p>
         //       </div>
         //    </Box2>
         // </Div>
      )
   );
};
export default OtpVerification;
