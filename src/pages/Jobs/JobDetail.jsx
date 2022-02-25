import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import { Div } from "./Jobs.styles";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchJob } from "../../redux/actions/jobActions";

const JobDetail = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const JOB = useSelector((state) => state.jobReducer.job);

   useEffect(() => {
      document.title = "Jobs | weGrad";
   });

   useEffect(() => {
      location.pathname.split("/")[2] &&
         dispatch(fetchJob(TOKEN, location.pathname.split("/")[2]));
   }, [location]);
   return (
      JOB && (
         <Div>
            <div
               style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  // padding: "5% 0",
                  // border: "1px solid",
               }}
            >
               <div
                  style={{
                     backgroundColor: "#FFF",
                     width: "100%",
                     // minHeight: "70vw",
                     display: "flex",
                     //   alignSelf: "center",
                     // alignItems: "center",
                     borderRadius: "4px",
                     flexDirection: "column",
                     boxSizing: "border-box",
                     marginBottom: "5vw",
                     padding: "20px 15px",
                  }}
               >
                  <p
                     style={{ fontSize: "18px", margin: 0, fontWeight: "bold" }}
                  >
                     {JOB.role}
                  </p>
                  <p
                     style={{
                        fontSize: "14px",
                        margin: 0,
                        opacity: "0.8",
                        marginTop: "3%",
                     }}
                  >
                     {JOB.company}
                  </p>
                  <p
                     style={{
                        fontSize: "12px",
                        margin: 0,
                        opacity: "0.8",
                        marginTop: "2%",
                     }}
                  >
                     {JOB.location}
                  </p>
                  <div
                     style={{
                        //  border: "1px solid red",
                        width: "100%",
                        marginTop: "5%",
                     }}
                  >
                     <p
                        style={{
                           fontWeight: "bold",
                           fontSize: "12px",
                        }}
                     >
                        Job Description
                     </p>
                     <p
                        style={{
                           color: "#333",
                           fontSize: "13px",
                           letterSpacing: "1px",
                           lineHeight: "18px",
                        }}
                     >
                        {JOB.description}
                     </p>
                  </div>
                  <a
                     style={{
                        textDecoration: "none",
                        background: "#0573b9",
                        width: "130px",
                        height: "30px",
                        display: "flex",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "2px",
                        marginTop: "20px",
                        cursor: "pointer",
                        color: "#fff",
                     }}
                     target="_blank"
                     href={JOB.link}
                  >
                     Apply
                  </a>
               </div>
            </div>
         </Div>
      )
   );
};
export default JobDetail;
