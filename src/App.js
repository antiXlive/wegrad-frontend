import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import "./App.css";

import LandingPage from "./pages/LandingPage/LandingPage";

import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";

function App() {
   const dispatch = useDispatch();
   const location = useLocation();

   // console.log(location);

   const [processing, setProcessing] = useState(true);

   useEffect(() => {
      // let token = localStorage.getItem("weGrad_USER_AUTH_TOKEN")
      //    ? localStorage.getItem("weGrad_USER_AUTH_TOKEN")
      //    : null;
      // console.log(token);
      // if (token && token.length > 5) {
      //    let userId = localStorage.getItem("weGrad_USER_ID");
      //    let userType = localStorage.getItem("weGrad_USER_TYPE");
      //    let userName = localStorage.getItem("weGrad_USER_NAME");
      //    let userEmail = localStorage.getItem("weGrad_USER_EMAIL");
      //    let userProfilePic = localStorage.getItem("weGrad_USER_PROFILE_PIC");
      //    let expiryDate = localStorage.getItem("weGrad_USER_AUTH_EXPIRY");

      //    userProfilePic =
      //       userProfilePic === "null" || userProfilePic === "undefined"
      //          ? null
      //          : JSON.parse(userProfilePic)
      //          ? JSON.parse(userProfilePic)
      //          : null;

      //    let expiryDate1 = new Date(expiryDate);
      //    if (expiryDate1 <= new Date()) {
      //       // dispatch(signoutUser());
      //    } else {
      //       // dispatch(setAuthtoken(token));
      //       // dispatch(setAuthtokenExpiry(expiryDate));
      //       // dispatch(
      //       //    setUser({
      //       //       _id: userId,
      //       //       fullName: userName,
      //       //       email: userEmail,
      //       //       type: userType,
      //       //       profilePic: userProfilePic,
      //       //    })
      //       // );
      //    }
      // }
      setProcessing(false);
   }, []);
   return (
      !processing && (
         <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.key}>
               <Route path="/auth/signup" element={<Signup />} />
               <Route path="/auth/signin" element={<Signin />} />
               <Route path="/" element={<LandingPage />} />
            </Routes>
         </AnimatePresence>
      )
   );
}

export default App;
