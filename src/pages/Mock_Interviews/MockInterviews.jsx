import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Div, MICard } from "./MockInterviews.styles";

import { fetchMIS } from "../../redux/actions/mockInterviewActions";
import { timeFormatter } from "../../lib/helperFunctions";

import nodata from "../../assets/no-data.webp";
import { personWorkspace, calendarCheck } from "../../svgIcons";

const MockInterviews = () => {
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const MIS = useSelector((state) => state.mockInterviewReducer.mis);

   useEffect(() => {
      document.title = "Mock Interviews | weGrad";
   });

   useEffect(() => {
      dispatch(fetchMIS(TOKEN));
   }, []);

   return (
      <Div>
         <motion.div className="button" whileTap={{ scale: 0.9 }}>
            <Link to="/home/mock-interviews/create"></Link>
            <p>Schedule Mock Interview</p>
         </motion.div>
         {MIS && MIS.length ? (
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
                  {MIS.map((mi) => {
                     return (
                        <MICard
                           key={mi._id}
                           style={
                              new Date().getTime() > new Date(mi.date).getTime()
                                 ? {
                                      opacity: 0.6,
                                   }
                                 : {}
                           }
                           whileHover={{ opacity: 1 }}
                           whileTap={{ opacity: 1 }}
                        >
                           {new Date().getTime() >
                              new Date(mi.date).getTime() && (
                              <motion.div
                                 style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    background: "#00000020",
                                    top: 0,
                                    left: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    opacity: 0,
                                    zIndex: 100,
                                 }}
                                 whileHover={{ opacity: 1 }}
                                 whileTap={{ opacity: 1 }}
                              >
                                 <p
                                    style={{
                                       fontSize: "20px",
                                       fontWeight: "800",
                                       letterSpacing: 2,
                                       opacity: 1,
                                       margin: 0,
                                    }}
                                 >
                                    COMPLETED
                                 </p>
                              </motion.div>
                           )}
                           <Link
                              style={{ textDecoration: "none" }}
                              to={`/home/mock-interviews/` + mi._id}
                           ></Link>
                           <div className="topic">
                              <p>{mi.topic}</p>
                           </div>
                           <div className="interviewer">
                              <svg {...personWorkspace.props} />
                              <p>{mi.interviewer}</p>
                           </div>
                           <div className="date">
                              <svg {...calendarCheck.props} />
                              <p>{new Date(mi.date).toDateString()}</p>
                           </div>
                        </MICard>
                     );
                  })}
               </div>
            </>
         ) : (
            <div className="no-data">
               <img src={nodata} alt="no-data" />
               <p>No Mock Interviews found!</p>
            </div>
         )}
      </Div>
   );
};
export default MockInterviews;
