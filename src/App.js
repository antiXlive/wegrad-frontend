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

import Jobs from "./pages/Jobs/Jobs";
import JobDetail from "./pages/Jobs/JobDetail";
import NewJobForm from "./pages/Jobs/NewJobForm";

import Events from "./pages/Events/Events";
import EventDetail from "./pages/Events/EventDetail";
import NewEventForm from "./pages/Events/NewEventForm";

import InterviewExperience from "./pages/Interview_Experiences/InterviewExperience";
import InterviewExperienceDetail from "./pages/Interview_Experiences/InterviewExperienceDetail";
import NewInterviewExperienceForm from "./pages/Interview_Experiences/NewInterviewExperienceForm";

import MockInterviews from "./pages/Mock_Interviews/MockInterviews";
import MockInterviewDetail from "./pages/Mock_Interviews/MockInterviewDetail";
import NewMockInterviewForm from "./pages/Mock_Interviews/NewMockInterviewForm";

import OverLay from "./components/Loader/OverLay";
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
      // console.log(token);
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
         {/* {"op" && <OverLay />} */}
         {!processing && (
            <AnimatePresence exitBeforeEnter>
               <Routes location={location} key={location.key}>
                  <Route path="/home" element={<LandingPage />} />
                  <Route
                     path="/auth/signup"
                     element={TOKEN ? <Navigate to="/" replace /> : <Signup />}
                  />
                  <Route
                     path="/auth/signin"
                     element={TOKEN ? <Navigate to="/" replace /> : <Signin />}
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
                                 TOKEN ? <Jobs /> : <Navigate to="/" replace />
                              }
                           />
                           <Route
                              path="jobs/create"
                              element={
                                 TOKEN ? (
                                    <NewJobForm />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />

                           <Route
                              path="jobs/:id"
                              element={
                                 TOKEN ? (
                                    <JobDetail />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="events"
                              element={
                                 TOKEN ? (
                                    <Events />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="events/create"
                              element={
                                 TOKEN ? (
                                    <NewEventForm />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="events/:id"
                              element={
                                 TOKEN ? (
                                    <EventDetail />
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
                                    <MockInterviews />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="mock-interviews/create"
                              element={
                                 TOKEN ? (
                                    <NewMockInterviewForm />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="mock-interviews/:id"
                              element={
                                 TOKEN ? (
                                    <MockInterviewDetail />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="interview-experience"
                              element={
                                 TOKEN ? (
                                    <InterviewExperience />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="interview-experience/create"
                              element={
                                 TOKEN ? (
                                    <NewInterviewExperienceForm />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="interview-experience/:id"
                              element={
                                 TOKEN ? (
                                    <InterviewExperienceDetail />
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
                  <Route path="*" element={<Navigate to="/home" replace />} />
               </Routes>
            </AnimatePresence>
         )}
      </>
   );
}

export default App;
