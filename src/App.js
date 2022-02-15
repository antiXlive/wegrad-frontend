import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   Route,
   Routes,
   useLocation,
   Link,
   Navigate,
   Outlet,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import "./App.css";

import LandingPage from "./pages/LandingPage/LandingPage";

import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import OtpVerification from "./pages/Auth/OtpVerification";

import HomePage from "./pages/HomePage/HomePage";
import NewsFeed from "./pages/HomePage/NewsFeed/NewsFeed";

import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";

import Alumni from "./pages/Alumni/Alumni";

import LogoLoader from "./components/Loader/LogoLoader";
import SpinnerLoader from "./components/Loader/SpinnerLoader";
import NotifyToast from "./components/Notification/NotifyToast";

import {
   setAuthtoken,
   setAuthtokenExpiry,
   setUser,
   signoutUser,
} from "./redux/actions/authActions";

function App() {
   const dispatch = useDispatch();
   const location = useLocation();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const notificationType = useSelector(
      (state) => state.shared.notificationType
   );
   const notificationMsg = useSelector((state) => state.shared.notificationMsg);
   const spinnerLoader = useSelector((state) => state.shared.spinnerLoader);
   const logoLoader = useSelector((state) => state.shared.logoLoader);

   const [processing, setProcessing] = useState(true);

   useEffect(() => {
      let token = localStorage.getItem("weGrad_USER_AUTH_TOKEN")
         ? localStorage.getItem("weGrad_USER_AUTH_TOKEN")
         : null;
      console.log(token);
      if (token && token.length > 5) {
         let userId = localStorage.getItem("weGrad_USER_ID");
         let userType = localStorage.getItem("weGrad_USER_TYPE");
         let userName = localStorage.getItem("weGrad_USER_NAME");
         let userEmail = localStorage.getItem("weGrad_USER_EMAIL");
         let userProfilePic = localStorage.getItem("weGrad_USER_PROFILE_PIC");
         let expiryDate = localStorage.getItem("weGrad_USER_AUTH_EXPIRY");

         userProfilePic =
            userProfilePic === "null" || userProfilePic === "undefined"
               ? null
               : JSON.parse(userProfilePic)
               ? JSON.parse(userProfilePic)
               : null;

         let expiryDate1 = new Date(expiryDate);
         if (expiryDate1 <= new Date()) {
            dispatch(signoutUser());
         } else {
            dispatch(setAuthtoken(token));
            dispatch(setAuthtokenExpiry(expiryDate));
            dispatch(
               setUser({
                  _id: userId,
                  fullName: userName,
                  email: userEmail,
                  type: userType,
                  profilePic: userProfilePic,
               })
            );
         }
      }
      setProcessing(false);
   }, []);

   return (
      <>
         {notificationMsg && (
            <NotifyToast type={notificationType} msg={notificationMsg} />
         )}
         {spinnerLoader && <SpinnerLoader />}
         {logoLoader && <LogoLoader />}
         {!processing && (
            <AnimatePresence exitBeforeEnter>
               <Routes location={location} key={location.key}>
                  <Route
                     path="/auth/signup"
                     element={
                        TOKEN ? <Navigate to="/home" replace /> : <Signup />
                     }
                  />
                  <Route
                     path="/auth/signin"
                     element={
                        TOKEN ? <Navigate to="/home" replace /> : <Signin />
                     }
                  />
                  <Route
                     path="/auth/verify-otp"
                     element={<OtpVerification />}
                  />
                  <Route
                     path="/"
                     element={TOKEN ? <HomePage /> : <LandingPage />}
                  >
                     {TOKEN && (
                        <>
                           <Route
                              index
                              element={
                                 TOKEN ? (
                                    <NewsFeed />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="feed"
                              element={
                                 TOKEN ? (
                                    <NewsFeed />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="alumni"
                              element={
                                 TOKEN ? (
                                    <Alumni />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="jobs"
                              element={
                                 TOKEN ? (
                                    <h1>Jobs</h1>
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="events"
                              element={
                                 TOKEN ? (
                                    <h1>Events</h1>
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="moments"
                              element={
                                 TOKEN ? (
                                    <h1>Moments</h1>
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="mock-interviews"
                              element={
                                 TOKEN ? (
                                    <h1>Mock Interviews</h1>
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="interview-experience"
                              element={
                                 TOKEN ? (
                                    <h1>Interview Experience</h1>
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />

                           <Route
                              exact
                              path="profile/:email"
                              element={
                                 TOKEN ? (
                                    <Profile />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              exact
                              path="edit-profile"
                              element={
                                 TOKEN ? (
                                    <EditProfile />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                        </>
                     )}
                  </Route>
                  <Route
                     path="*"
                     element={
                        <main style={{ padding: "1rem" }}>
                           <p>There's nothing here!</p>
                        </main>
                     }
                  />
               </Routes>
            </AnimatePresence>
         )}
      </>
   );
}

export default App;
