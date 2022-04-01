import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Div, ExperienceCard } from "./InterviewExperience.styles";
import NoData from "../../assets/no-data.webp";
import { company, location, personBadge } from "../../svgIcons";

import { fetchInterviewExperiences } from "../../redux/actions/interviewExperienceActions";

import { useEffect } from "react";

const InterviewExperience = () => {
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const INTERVIEW_EXPERIENCES = useSelector(
      (state) => state.interviewExperienceReducer.interviewExperiences
   );

   useEffect(() => {
      document.title = "Interview Experience | weGrad";
   });
   useEffect(() => {
      dispatch(fetchInterviewExperiences(TOKEN));
   }, []);

   return (
      <Div>
         <div className="new-interview-experience">
            <Link to="/home/interview-experience/create"></Link>
            <p>Post your Interview Experience</p>
         </div>
         {INTERVIEW_EXPERIENCES && INTERVIEW_EXPERIENCES.length ? (
            <div
               style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "5% 0",
               }}
            >
               {INTERVIEW_EXPERIENCES.map((interviewExperience) => {
                  return (
                     <ExperienceCard>
                        <Link
                           style={{ textDecoration: "none" }}
                           to={
                              `/home/interview-experience/` + interviewExperience._id
                           }
                        ></Link>
                        <div className="role">
                           <p>{interviewExperience.role}</p>
                        </div>
                        <div className="company">
                           <svg {...company.props} />
                           <p>{interviewExperience.company}</p>
                        </div>
                        <div className="mode">
                           <svg {...location.props} />
                           <p>
                              {interviewExperience.hiring
                                 ? "On-Campus"
                                 : "Off-Campus"}
                           </p>
                        </div>
                        <div className="author">
                           <svg {...personBadge.props} />
                           <p>{interviewExperience.author}</p>
                        </div>
                     </ExperienceCard>
                  );
               })}
            </div>
         ) : (
            <div className="no-data">
               <img src={NoData} alt="no-data" />
               <p>No Interview Experience found!</p>
            </div>
         )}
      </Div>
   );
};
export default InterviewExperience;
