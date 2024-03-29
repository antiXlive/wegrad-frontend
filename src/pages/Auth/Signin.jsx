import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Textinput from "../../components/TextInput/TextInput.component";

import { Div, Card } from "./Shared.styles";

import iiitmlogo from "../../assets/iiitm-logo.webp";

import { validateEmail, validatePassword } from "../../lib/helperFunctions";

import { signinUser } from "../../redux/actions/authActions";

const Signup = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   // console.log(location.search);

   const TOKEN = useSelector((state) => state.auth.authToken);

   useEffect(() => {
      if (TOKEN) navigate("/");
   }, [TOKEN]);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
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

   const handleChange = (e) => {
      const val = e.target.value;
      if (e.target.name === "email") setEmail(val);
      if (e.target.name === "password") setPassword(val);
   };

   const handleSubmit = () => {
      if (email && password) {
         if (validateEmail(email) && validatePassword(password)) {
            dispatch(signinUser(email, password));
         }
      }
   };

   return (
      windowHeight && (
         <Div
            style={{ height: windowHeight < 500 ? "700px" : windowHeight }}
            // exit={{
            //    x: "-100vw",
            //    opacity: 0,
            //    transition: { duration: 0.5, ease: "easeInOut" },
            // }}
         >
            <Card
               initial={{ y: "90vh", scale: 0.1 }}
               animate={{ y: 0, scale: 1 }}
               transition={{ duration: 0.3, type: "tween" }}
               disabled={
                  !(validateEmail(email) && validatePassword(password))
                     ? true
                     : false
               }
            >
               <div className="college-info">
                  <div className="logo">
                     <img src={iiitmlogo} alt="IIITM" />
                  </div>
                  <div className="name">
                     <p>Indian Institute of Information Technology Senapati</p>
                  </div>
               </div>

               <div className="form">
                  <div className="form-title">
                     <p>Welcome back</p>
                  </div>

                  <div className="form-inputs">
                     <Textinput
                        name="email"
                        inputType="email"
                        type="email"
                        label="EMAIL"
                        value={email}
                        handleChange={handleChange}
                        validator={validateEmail}
                        errMsg="Please enter a valid institute email"
                     />
                     <Textinput
                        name="password"
                        inputType="password"
                        type="password"
                        label="PASSWORD"
                        value={password}
                        handleChange={handleChange}
                        validator={validatePassword}
                        errMsg="Password should be more than 7 characters"
                     />
                     <motion.div
                        className="submit-button-common submit-button-signin"
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSubmit}
                     >
                        <p>Signin</p>
                     </motion.div>
                  </div>
                  <div className="footer-links">
                     <p className="signup-cta">
                        Don't have an account?{" "}
                        {location.search === "?source=auth_switcher" ? (
                           <a onClick={() => navigate(-1)}>Signup</a>
                        ) : (
                           <Link to="/auth/signup">Signup</Link>
                        )}
                     </p>
                     <p className="forgot-cta">
                        {/* Forgot Password? <Link to="/auth/signup">Reset</Link> */}
                        {/* Forgot Password? <Link to="#">Reset</Link> */}
                     </p>
                  </div>
               </div>
            </Card>
         </Div>
      )
      //   <Div>
      //      {/* {signupEmail && (
      //         <Redirect
      //            push={true}
      //            to={{
      //               pathname: "/verify-otp",
      //               search: "?email=" + signupEmail,
      //            }}
      //         />
      //      )}
      //      {notificationMsg && (
      //         <NotificationToast type={notificationType} msg={notificationMsg} />
      //      )}
      //      {loading && <LogoLoader />} */}
      //      <Box1></Box1>

      //   </Div>
   );
};
export default Signup;
