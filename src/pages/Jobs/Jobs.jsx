import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Div, JobCard } from "./Jobs.styles";

import { fetchJobs } from "../../redux/actions/jobActions";
import { timeFormatter } from "../../lib/helperFunctions";

import { location, calendarCheck } from "../../svgIcons";
import nodata from "../../assets/no-data.webp";

const Jobs = () => {
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const JOBS = useSelector((state) => state.jobReducer.jobs);

   useEffect(() => {
      document.title = "Jobs | weGrad";
   });

   useEffect(() => {
      dispatch(fetchJobs(TOKEN));
   }, []);

   return (
      <Div>
         <motion.div className="new-job" whileTap={{ scale: 0.9 }}>
            <Link to="/home/jobs/create"></Link>
            <p>Post a Job</p>
         </motion.div>
         {JOBS && JOBS.length ? (
            <>
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
                  {JOBS.map((job) => {
                     return (
                        <JobCard key={job._id}>
                           <Link
                              style={{ textDecoration: "none" }}
                              to={`/jobs/` + job._id}
                           ></Link>
                           <div className="company">
                              <p>{job.company}</p>
                           </div>
                           <div className="role">
                              <p>{job.role}</p>
                           </div>
                           <div className="location">
                              <svg {...location.props} />
                              <p>{job.location}</p>
                           </div>
                           <div className="date">
                              <svg {...calendarCheck.props} />
                              <p>Posted: {timeFormatter(job.timestamp)}</p>
                           </div>
                        </JobCard>
                     );
                  })}
               </div>
            </>
         ) : (
            <div className="no-data">
               <img src={nodata} alt="no-data" />
               <p>No jobs found!</p>
            </div>
         )}
      </Div>
   );
};
export default Jobs;
