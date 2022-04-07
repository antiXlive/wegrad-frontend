import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { motion } from "framer-motion";

// import LogoLoader from "../../components/LogoLoader.component";
import Textinput from "../../components/TextInput/TextInput.component";
// import NotificationToast from "../../components/NotificationToast.component";

import { Div, Card, Button } from "./Shared.styles";

import iiitmlogo from "../../assets/iiitm-logo.webp";

import {
   validateFullname,
   validateEmail,
   validatePassword,
} from "../../lib/helperFunctions";

import { signupUser } from "../../redux/actions/authActions";

const Signup = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const signupEmail = useSelector((state) => state.auth.signupEmail);

   // console.log(location);

   const [windowHeight, setWH] = useState(0);
   const [fullname, setFullname] = useState("");
   const [email, setEmail] = useState("ab@iiitmanipur.ac.in");
   const [password, setPassword] = useState("");

   useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);
   useEffect(() => {
      let query = window.btoa("email=" + signupEmail);
      if (signupEmail) navigate("/auth/verify-otp?" + query);
   }, [signupEmail]);

   const handleResize = () => {
      if (window) {
         setWH(window.innerHeight);
      }
   };

   //    const loading = useSelector((state) => state.shared.loader);
   //    const notificationType = useSelector(
   //       (state) => state.shared.notificationType
   //    );
   //    const notificationMsg = useSelector((state) => state.shared.notificationMsg);

   const handleChange = (e) => {
      const val = e.target.value;
      if (e.target.name === "email") setEmail(val);
      if (e.target.name === "password") setPassword(val);
      if (e.target.name === "fullname") setFullname(val);
   };

   const handleSubmit = () => {
      if (
         validateEmail(email) &&
         validatePassword(password) &&
         validateFullname(fullname)
      ) {
         dispatch(signupUser(fullname, email, password));
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
               // className="card"
               initial={{ y: "90vh", scale: 0.1 }}
               animate={{ y: 0, scale: 1 }}
               transition={{ duration: 0.3, type: "tween" }}
               disabled={
                  !(
                     validateEmail(email) &&
                     validatePassword(password) &&
                     validateFullname(fullname)
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
                     <p>Create new account</p>
                  </div>

                  <div className="form-inputs">
                     <Textinput
                        name="fullname"
                        inputType="text"
                        type="name"
                        label="FULLNAME"
                        value={fullname}
                        handleChange={handleChange}
                        validator={validateFullname}
                        errMsg="Fullname should be more than 4 characters"
                     />
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
                        className="submit-button-common"
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSubmit}
                     >
                        <p>Create Account</p>
                     </motion.div>
                  </div>
                  <div className="footer-links">
                     <p className="signin-cta">
                        Already an user?{" "}
                        <Link to="/auth/signin?source=auth_switcher">
                           Signin
                        </Link>
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
