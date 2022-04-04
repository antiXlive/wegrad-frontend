import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Div, EventCard } from "./Events.styles";

import { fetchEvents } from "../../redux/actions/eventActions";
import { timeFormatter } from "../../lib/helperFunctions";

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
                        <EventCard key={event._id}>
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
