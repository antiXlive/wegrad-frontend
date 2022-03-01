import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Div, AlumniCard } from "./Alumni.styles";

import { fetchAlumni } from "../../redux/actions/profileActions";

import defaultavatar from "../../assets/default-avatar.webp";

const Profile = () => {
   const dispatch = useDispatch();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const ALUMNI = useSelector((state) => state.profileReducer.alumni);

   useEffect(() => {
      document.title = "Alumni | weGrad";
   }, []);

   useEffect(() => {
      console.log(ALUMNI);
      !ALUMNI.length && dispatch(fetchAlumni(TOKEN));
   }, [ALUMNI]);

   return (
      <Div>
         <div
            style={{
               width: "100%",
               height: "auto",
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "space-around",
               paddingTop: "5%",
               // border: "1px solid green",
            }}
         >
            {ALUMNI.map((alumni) => {
               return (
                  <AlumniCard key={alumni._id}>
                     <Link to={"/profile/" + alumni.email}></Link>
                     <div className="avatar">
                        <img
                           src={
                              alumni.profilePic
                                 ? alumni.profilePic
                                 : defaultavatar
                           }
                           alt={alumni.fullName}
                        />
                     </div>
                     <p className="name">{alumni.fullName}</p>
                     <p className="role">
                        {alumni.currentDesignation &&
                           alumni.currentDesignation +
                              " @ " +
                              alumni.currentCompany}
                     </p>
                  </AlumniCard>
               );
            })}
            {/* <div
               style={{
                  border: "1px solid",
                  width: "100%",
                  height: "10vw",
                  marginBottom: "20px",
               }}
            ></div> */}
         </div>
      </Div>
   );
};
export default Profile;
