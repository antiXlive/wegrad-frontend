import React from "react";
import { useLocation } from "react-router-dom";

import { Div } from ".//InterviewExperienceDetail.styles";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchInterviewExperience } from "../../redux/actions/interviewExperienceActions";

const InterviewExperience = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const IE = useSelector(
      (state) => state.interviewExperienceReducer.interviewExperience
   );

   useEffect(() => {
      document.title = "Interview Experience | weGrad";
   });

   useEffect(() => {
      location.pathname.split("/")[3] &&
         dispatch(
            fetchInterviewExperience(TOKEN, location.pathname.split("/")[3])
         );
   }, [location]);

   return (
      IE && (
         <Div>
            <div
               style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
               }}
            >
               <div className="card">
                  <p className="heading">{IE.company}</p>
                  <div className="section">
                     <p className="title">Role</p>
                     <p className="description">{IE.role}</p>
                  </div>
                  <div className="section">
                     <p className="title">Mode</p>
                     <p className="description">
                        {IE.hiring ? "On-Campus" : "Off-Campus"}
                     </p>
                  </div>
                  <div className="section">
                     <p className="title">Status</p>
                     <p className="description">
                        {IE.status ? "Hired" : "Rejected"}
                     </p>
                  </div>
                  <div className="section">
                     <p className="title">Description</p>
                     <p className="description">{IE.description}</p>
                  </div>
                  <div className="section">
                     <p className="title">Posted</p>
                     <p className="description">
                        {new Date(IE.timestamp).toDateString()}
                     </p>
                  </div>
               </div>
            </div>
         </Div>
      )
   );
};
export default InterviewExperience;
