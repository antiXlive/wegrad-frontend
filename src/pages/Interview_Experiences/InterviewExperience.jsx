import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Div, ExperienceCard } from "./InterviewExperience.styles";
import HomeHeader from "../../components/Header/HomeHeader.component";
import NoData from "../../assets/no-data.png";

import { fetchInterviewExperience } from "../../redux/actions/interviewExperienceActions";

import { useEffect } from "react";

const InterviewExperience = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      document.title = "Interview Experience | weGrad";
   });
   useEffect(() => {
      dispatch(fetchInterviewExperience(TOKEN));
   }, []);

   const TOKEN = useSelector((state) => state.auth.authToken);
   const INTERVIEW_EXPERIENCES = useSelector(
      (state) => state.interviewExperienceReducer.interviewExperiences
   );

   return (
      <Div>
         <HomeHeader />
         <div className="new-interview-experience">
            <Link to="/interview-experiences/create"></Link>
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
                        <Link to="/jobs/1decf234def"></Link>
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
