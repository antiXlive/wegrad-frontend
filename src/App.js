import React, { useEffect, useState, Suspense, lazy } from "react";
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

const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms&Conditions"));

const Signup = lazy(() => import("./pages/Auth/Signup"));
const Signin = lazy(() => import("./pages/Auth/Signin"));
const OtpVerification = lazy(() => import("./pages/Auth/OtpVerification"));

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const NewsFeed = lazy(() => import("./pages/HomePage/NewsFeed/NewsFeed"));

const Profile = lazy(() => import("./pages/Profile/Profile"));
const EditProfile = lazy(() => import("./pages/Profile/EditProfile"));

const Alumni = lazy(() => import("./pages/Alumni/Alumni"));

const Jobs = lazy(() => import("./pages/Jobs/Jobs"));
const JobDetail = lazy(() => import("./pages/Jobs/JobDetail"));
const NewJobForm = lazy(() => import("./pages/Jobs/NewJobForm"));

const Events = lazy(() => import("./pages/Events/Events"));
const EventDetail = lazy(() => import("./pages/Events/EventDetail"));
const NewEventForm = lazy(() => import("./pages/Events/NewEventForm"));

const InterviewExperience = lazy(() =>
   import("./pages/Interview_Experiences/InterviewExperience")
);
const InterviewExperienceDetail = lazy(() =>
   import("./pages/Interview_Experiences/InterviewExperienceDetail")
);
const NewInterviewExperienceForm = lazy(() =>
   import("./pages/Interview_Experiences/NewInterviewExperienceForm")
);

const MockInterviews = lazy(() =>
   import("./pages/Mock_Interviews/MockInterviews")
);
const MockInterviewDetail = lazy(() =>
   import("./pages/Mock_Interviews/MockInterviewDetail")
);
const NewMockInterviewForm = lazy(() =>
   import("./pages/Mock_Interviews/NewMockInterviewForm")
);

const Rdr = () => {
   //  <h1>404</h1>;
   return <Navigate to="/" />;
};
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
               <Suspense fallback={<LogoLoader />}>
                  <Routes location={location} key={location.key}>
                     <Route path="*" element={<Rdr />} />
                     <Route
                        path="/"
                        element={
                           TOKEN ? (
                              <Navigate to="/home" replace />
                           ) : (
                              <LandingPage />
                           )
                        }
                     />
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
                        path="/privacy-policy"
                        element={<PrivacyPolicy />}
                     />
                     <Route
                        path="/terms-conditions"
                        element={<Terms />}
                     />
                     <Route
                        path="/home"
                        element={
                           TOKEN ? <HomePage /> : <Navigate to="/" replace />
                        }
                     >
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
                              path="/home/alumni"
                              element={
                                 TOKEN ? (
                                    <Alumni />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/jobs"
                              element={
                                 TOKEN ? <Jobs /> : <Navigate to="/" replace />
                              }
                           />
                           <Route
                              path="/home/jobs/create"
                              element={
                                 TOKEN ? (
                                    <NewJobForm />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />

                           <Route
                              path="/home/jobs/:id"
                              element={
                                 TOKEN ? (
                                    <JobDetail />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/events"
                              element={
                                 TOKEN ? (
                                    <Events />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/events/create"
                              element={
                                 TOKEN ? (
                                    <NewEventForm />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/events/:id"
                              element={
                                 TOKEN ? (
                                    <EventDetail />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/moments"
                              element={
                                 TOKEN ? (
                                    <h1>Moments</h1>
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/mock-interviews"
                              element={
                                 TOKEN ? (
                                    <MockInterviews />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/mock-interviews/create"
                              element={
                                 TOKEN ? (
                                    <NewMockInterviewForm />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/mock-interviews/:id"
                              element={
                                 TOKEN ? (
                                    <MockInterviewDetail />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/interview-experience"
                              element={
                                 TOKEN ? (
                                    <InterviewExperience />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/interview-experience/create"
                              element={
                                 TOKEN ? (
                                    <NewInterviewExperienceForm />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                           <Route
                              path="/home/interview-experience/:id"
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
                              path="/home/profile/:email"
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
                              path="/home/edit-profile"
                              element={
                                 TOKEN ? (
                                    <EditProfile />
                                 ) : (
                                    <Navigate to="/" replace />
                                 )
                              }
                           />
                        </>
                     </Route>
                  </Routes>
               </Suspense>
            </AnimatePresence>
         )}
      </>
   );
}

export default App;
