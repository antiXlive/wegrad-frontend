import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Div, JobCard } from "./Jobs.styles";
import HomeHeader from "../../components/Header/HomeHeader.component";

import { fetchJob } from "../../redux/actions/jobActions";
import { timeFormatter } from "../../lib/helperFunctions";

import NoData from "../../assets/no-data.png";

const Jobs = () => {
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const JOBS = useSelector((state) => state.jobReducer.jobs);

   useEffect(() => {
      document.title = "Jobs | weGrad";
   });

   useEffect(() => {
      dispatch(fetchJob(TOKEN));
   }, []);

   return (
      <Div>
         <HomeHeader />
         <div className="new-job">
            <Link to="/jobs/create"></Link>
            <p>Post a Job</p>
         </div>
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
                              to="/jobs/1decf234def"
                           ></Link>
                           <div className="company">
                              <p>{job.company}</p>
                           </div>
                           <div className="role">
                              <p>{job.role}</p>
                           </div>
                           <div className="location">
                              <p>{job.location}</p>
                           </div>
                           <div className="date">
                              <p>Posted: {timeFormatter(job.timestamp)}</p>
                           </div>
                        </JobCard>
                     );
                  })}
               </div>
            </>
         ) : (
            <div className="no-data">
               <img src={NoData} alt="no-data" />
               <p>No jobs found!</p>
            </div>
         )}
      </Div>
   );
};
export default Jobs;
