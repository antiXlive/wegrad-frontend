import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Div, ExperienceCard } from "./InterviewExperience.styles";
import HomeHeader from "../../components/Header/HomeHeader.component";
import NoData from "../../assets/no-data.webp";

import { fetchInterviewExperience } from "../../redux/actions/interviewExperienceActions";

import { useEffect } from "react";

const InterviewExperience = () => {
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const INTERVIEW_EXPERIENCES = useSelector(
      (state) => state.interviewExperienceReducer.interviewExperiences
   );
   console.log(INTERVIEW_EXPERIENCES);

   useEffect(() => {
      document.title = "Interview Experience | weGrad";
   });
   useEffect(() => {
      if (!INTERVIEW_EXPERIENCES) dispatch(fetchInterviewExperience(TOKEN));
      // !INTERVIEW_EXPERIENCES.length && dispatch(fetchInterviewExperience(TOKEN));
   }, [INTERVIEW_EXPERIENCES]);

   return (
      <Div>
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
                        {/* <Link to="/jobs/1decf234def"></Link> */}
                        <p
                           style={{
                              fontSize: "18px",
                              margin: 0,
                              fontWeight: "bold",
                           }}
                        >
                           {interviewExperience.role}
                        </p>
                        <p
                           style={{
                              fontSize: "14px",
                              margin: 0,
                              opacity: "0.8",
                              marginTop: "3%",
                           }}
                        >
                           {interviewExperience.company}
                        </p>
                        <p
                           style={{
                              fontSize: "14px",
                              margin: 0,
                              opacity: "0.8",
                              marginTop: "3%",
                           }}
                        >
                           {interviewExperience.mode}
                        </p>
                        <p
                           style={{
                              fontSize: "12px",
                              margin: 0,
                              opacity: "0.8",
                              marginTop: "2%",
                           }}
                        >
                           {interviewExperience.author}
                        </p>
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
