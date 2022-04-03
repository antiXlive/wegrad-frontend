import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
   Div,
   Cover,
   InfoCard,
   EducationCard,
   ExperienceCard,
   ContactCard,
} from "./Profile.styles";

// import HomeHeader from "../../components/Header/HomeHeader.component";
// import LogoLoader from "../../components/LogoLoader.component";

// import Default_Avatar from "../../assets/default_avatar1.png";
import defaultavatar from "../../assets/default-avatar.webp";
import defaultcoverpic from "../../assets/DefaultCoverPic.webp";
import nodata from "../../assets/no-data.webp";

// import NoData from "../../assets/no-data.png";

import {
   fetchUserProfile,
   updateProfilePic,
   updateCoverPic,
} from "../../redux/actions/profileActions";
import { setNotification } from "../../redux/actions/sharedActions";

import { fileValidator } from "../../lib/helperFunctions";

const Profile = () => {
   const dispatch = useDispatch();
   const location = useLocation();

   const email = location.pathname.split("/")[3];

   const TOKEN = useSelector((state) => state.auth.authToken);
   const USER = useSelector((state) => state.auth.user);
   const USER_PROFILE = useSelector(
      (state) => state.profileReducer.userProfile
   );
   // const FETCHING = useSelector((state) => state.profileReducer.fetching);
   const UPDATING = useSelector((state) => state.profileReducer.updating);

   const [profilePic, setProfilePic] = useState(null);
   const [coverPic, setCoverPic] = useState(null);
   const [edit, setEdit] = useState(false);

   useEffect(() => {
      dispatch(fetchUserProfile(TOKEN, email));
   }, []);

   useEffect(() => {
      if (USER_PROFILE && USER_PROFILE.user === USER._id) setEdit(true);
      else setEdit(false);
   }, [USER_PROFILE, USER]);

   useEffect(() => {
      profilePic && dispatch(updateProfilePic(TOKEN, USER._id, profilePic));
   }, [profilePic, TOKEN, USER]);
   useEffect(() => {
      coverPic && dispatch(updateCoverPic(TOKEN, USER._id, coverPic));
   }, [coverPic, TOKEN, USER]);
   useEffect(() => {
      if (UPDATING === "failed") {
         setProfilePic(null);
         setCoverPic(null);
      }
   }, [UPDATING]);

   useEffect(() => {
      if (USER_PROFILE) document.title = USER_PROFILE.fullName + " | weGrad";
   }, [USER_PROFILE]);

   const handleFile = (file, name) => {
      fileValidator("image", file)
         .then((res) => {
            if (name === "profile-pic") setProfilePic(file);
            else if (name === "cover-pic") setCoverPic(file);
         })
         .catch((err) => {
            dispatch(setNotification(0, err));
         });
   };
   return (
      USER_PROFILE && (
         <Div>
            <Cover>
               {edit && (
                  <input
                     type="file"
                     accept="image/x-png,image/jpeg,image/jpg,image/webp"
                     name="cover-pic"
                     onChange={(e) =>
                        handleFile(e.target.files[0], e.target.name)
                     }
                  />
               )}
               <img
                  src={
                     coverPic
                        ? URL.createObjectURL(coverPic)
                        : USER_PROFILE && USER_PROFILE.coverPic
                        ? USER_PROFILE.coverPic.display_url
                        : defaultcoverpic
                  }
                  alt="Cover Pic"
               />
            </Cover>

            <InfoCard>
               {edit && (
                  <Link to="/home/edit-profile">
                     {" "}
                     <svg width="16" height="16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                     </svg>
                  </Link>
               )}
               <div className="profile-pic">
                  {edit && (
                     <input
                        type="file"
                        accept="image/x-png,image/jpeg,image/jpg,image/webp"
                        name="profile-pic"
                        onChange={(e) =>
                           handleFile(e.target.files[0], e.target.name)
                        }
                     />
                  )}
                  <img
                     src={
                        profilePic
                           ? URL.createObjectURL(profilePic)
                           : USER_PROFILE && USER_PROFILE.profilePic
                           ? USER_PROFILE.profilePic.display_url
                           : defaultavatar
                     }
                     alt="Profile Pic"
                  />
               </div>
               <p className="name">{USER_PROFILE && USER_PROFILE.fullName}</p>
               <p className="headline">
                  {USER_PROFILE.currentCompany
                     ? USER_PROFILE.currentDesignation +
                       " @ " +
                       USER_PROFILE.currentCompany
                     : ""}
               </p>
               <p className="about">{USER_PROFILE.about}</p>
            </InfoCard>

            <EducationCard>
               {edit && (
                  <Link
                     to={{
                        pathname: "/home/edit-profile",
                        hash: "#programs-completed",
                     }}
                  >
                     <svg width="16" height="16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                     </svg>
                  </Link>
               )}
               <div className="title">
                  <p>Programs Completed at IIITM</p>
               </div>
               {USER_PROFILE.completedPrograms &&
               USER_PROFILE.completedPrograms.length > 0 ? (
                  USER_PROFILE.completedPrograms.map(
                     (completedProgram, index) => {
                        return (
                           <div
                              className="education"
                              key={completedProgram.year}
                           >
                              <div className="year">
                                 <p>{completedProgram.year}</p>
                              </div>
                              <div className="degree">
                                 <p>{completedProgram.degree}</p>
                                 <p>{completedProgram.department}</p>
                              </div>
                           </div>
                        );
                     }
                  )
               ) : (
                  <div className="no-data">
                     <img src={nodata} alt="no-data" />
                     <p>Nothing to show!</p>
                  </div>
               )}
            </EducationCard>

            <ExperienceCard>
               {edit && (
                  <Link
                     to={{
                        pathname: "/home/edit-profile",
                        hash: "#professional-experience",
                     }}
                  >
                     <svg width="16" height="16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                     </svg>
                  </Link>
               )}
               <div className="title">
                  <p>Professional Experience</p>
               </div>
               {USER_PROFILE.experiences &&
               USER_PROFILE.experiences.length > 0 ? (
                  USER_PROFILE.experiences.map((experience, index) => {
                     return (
                        <div
                           key={experience.from}
                           className="experience"
                           style={{
                              borderTop: index > 0 ? "1px solid #55555510" : 0,
                              paddingTop: index > 0 ? "15px" : 0,
                           }}
                        >
                           <p className="company">{experience.company}</p>
                           <p className="role">{experience.designation}</p>
                           <p className="time">
                              {experience.from} - {experience.to}
                           </p>
                        </div>
                     );
                  })
               ) : (
                  <div className="no-data">
                     <img src={nodata} alt="no-data" />
                     <p>Nothing to show!</p>
                  </div>
               )}
            </ExperienceCard>

            <ContactCard>
               {edit && (
                  <Link
                     to={{
                        pathname: "/home/edit-profile",
                        hash: "#contact-info",
                     }}
                  >
                     <svg width="16" height="16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                     </svg>
                  </Link>
               )}
               <div className="title">
                  <p>Contact Information</p>
               </div>
               {!USER_PROFILE.location &&
               !USER_PROFILE.mobile &&
               !USER_PROFILE.linkedin &&
               !USER_PROFILE.website ? (
                  <div className="no-data">
                     <img src={nodata} alt="no-data" />
                     <p>Nothing to show!</p>
                  </div>
               ) : (
                  ""
               )}
               {USER_PROFILE.location && (
                  <div className="contact">
                     <svg width="16" height="16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                     </svg>
                     <p>{USER_PROFILE.location}</p>
                  </div>
               )}
               {USER_PROFILE.mobile && (
                  <div className="contact">
                     <svg width="16" height="16">
                        <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                     </svg>
                     <p>{USER_PROFILE.mobile}</p>
                  </div>
               )}
               {USER_PROFILE.linkedin && (
                  <div className="contact">
                     <svg width="16" height="16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                     </svg>
                     <p>{USER_PROFILE.linkedin}</p>
                  </div>
               )}
               {USER_PROFILE.website && (
                  <div className="contact">
                     <p>{USER_PROFILE.website}</p>
                  </div>
               )}
            </ContactCard>
         </Div>
      )
   );
};
export default Profile;
