import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import { Div } from "./MockInterviewDetail.styles";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMI } from "../../redux/actions/mockInterviewActions";

const EventDetail = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const MI = useSelector((state) => state.mockInterviewReducer.mi);

   useEffect(() => {
      document.title = "Mock Interview | weGrad";
   });

   useEffect(() => {
      location.pathname.split("/")[3] &&
         dispatch(fetchMI(TOKEN, location.pathname.split("/")[3]));
   }, [location]);

   return (
      MI && (
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
                  <p className="heading">{MI.topic}</p>
                  <div className="section">
                     <p className="title">Interviewer</p>
                     <p className="description">{MI.interviewer}</p>
                  </div>
                  <div className="section">
                     <p className="title">Student Limit</p>
                     <p className="description">{MI.studentLimit}</p>
                  </div>
                  <div className="section">
                     <p className="title">Date</p>
                     <p className="description">
                        {new Date(MI.date).toDateString()}
                     </p>
                  </div>
                  <div className="section">
                     <p className="title">Link</p>
                     <p className="description">
                        <a target="_blank" href={MI.link}>
                           {MI.link.slice(0, 100)}
                           {MI.length > 100 && "..."}
                        </a>
                     </p>
                  </div>
               </div>
            </div>
         </Div>
      )
   );
};
export default EventDetail;
