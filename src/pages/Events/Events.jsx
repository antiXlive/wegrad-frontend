import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Div, EventCard } from "./Events.styles";

import { fetchEvents } from "../../redux/actions/eventActions";

import { personWorkspace, calendarCheck } from "../../svgIcons";
import nodata from "../../assets/no-data.webp";

const Events = () => {
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const EVENTS = useSelector((state) => state.eventReducer.events);

   useEffect(() => {
      document.title = "Events | weGrad";
   });

   useEffect(() => {
      !EVENTS && dispatch(fetchEvents(TOKEN));
   }, [EVENTS]);

   return (
      <Div>
         <motion.div className="button" whileTap={{ scale: 0.9 }}>
            <Link to="/home/events/create"></Link>
            <p>Schedule an Event</p>
         </motion.div>
         {EVENTS && EVENTS.length ? (
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
                  {EVENTS.map((event) => {
                     return (
                        <EventCard
                           key={event._id}
                           style={
                              new Date().getTime() >
                              new Date(event.date).getTime()
                                 ? {
                                      opacity: 0.6,
                                   }
                                 : {}
                           }
                           whileHover={{ opacity: 1 }}
                           whileTap={{ opacity: 1 }}
                        >
                           {new Date().getTime() >
                              new Date(event.date).getTime() && (
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
                              to={`/home/events/` + event._id}
                           ></Link>
                           <div className="name">
                              <p>{event.name}</p>
                           </div>

                           <div className="speaker">
                              <svg {...personWorkspace.props} />
                              <p>{event.speakers}</p>
                           </div>
                           <div className="date">
                              <svg {...calendarCheck.props} />
                              <p>{new Date(event.date).toDateString()}</p>
                           </div>
                           {/* <div className="date">
                              <p>Posted: {timeFormatter(job.timestamp)}</p>
                           </div> */}
                        </EventCard>
                     );
                  })}
               </div>
            </>
         ) : (
            <div className="no-data">
               <img src={nodata} alt="no-data" />
               <p>No events found!</p>
            </div>
         )}
      </Div>
   );
};
export default Events;
