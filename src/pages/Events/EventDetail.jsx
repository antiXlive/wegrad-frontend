import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import { Div } from "./EventDetail.styles";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEvent } from "../../redux/actions/eventActions";

const EventDetail = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const EVENT = useSelector((state) => state.eventReducer.event);

   useEffect(() => {
      document.title = "Events | weGrad";
   });

   useEffect(() => {
      location.pathname.split("/")[2] &&
         dispatch(fetchEvent(TOKEN, location.pathname.split("/")[2]));
   }, [location]);

   return (
      EVENT && (
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
                  <p className="heading">{EVENT.name}</p>
                  <div className="section">
                     <p className="title">Speakers</p>
                     <p className="description">{EVENT.speakers}</p>
                  </div>
                  <div className="section">
                     <p className="title">Event Details</p>
                     <p className="description">{EVENT.description}</p>
                  </div>
                  <div className="section">
                     <p className="title">Date</p>
                     <p className="description">
                        {new Date(EVENT.date).toDateString()}
                     </p>
                  </div>
                  {EVENT.venue && (
                     <div className="section">
                        <p className="title">Venue</p>
                        <p className="description">{EVENT.venue}</p>
                     </div>
                  )}
                  {EVENT.link && (
                     <div className="section">
                        <p className="title">Link</p>
                        <p className="description">
                           <a target="_blank" href={EVENT.link}>
                              {EVENT.link.slice(0, 100)}
                              {EVENT.length > 100 && "..."}
                           </a>
                        </p>
                     </div>
                  )}
                  <div className="section">
                     <p className="title">Organizer</p>
                     <p className="description">{EVENT.organizer}</p>
                  </div>
               </div>
            </div>
         </Div>
      )
   );
};
export default EventDetail;
