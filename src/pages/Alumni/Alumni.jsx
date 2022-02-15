import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Div, AlumniCard } from "./Alumni.styles";
import HomeHeader from "../../components/Header/HomeHeader.component";

import { useEffect } from "react";

const Profile = () => {
   useEffect(() => {
      document.title = "Alumni | weGrad";
   });

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
            <AlumniCard>
               <Link to="/profile/piyush107@iiitmanipur.ac.in"></Link>
               <div className="avatar">
                  <img src="https://i.ibb.co/n3nqKsG/profile-pic61e695285aec07619c8fca71.webp" />
               </div>
               <p className="name">Piyush Kumar</p>
               <p className="role">Application Developer @ IBM GBS</p>
            </AlumniCard>
            <AlumniCard>
               <Link to="/profile/piyush107@iiitmanipur.ac.in"></Link>
               <div className="avatar">
                  <img src="https://i.ibb.co/MZDycxW/61c48482f376d28558eb986d.webp" />
               </div>
               <p className="name">Piyush Kumar</p>
               <p className="role">Application Developer @ IBM GBS</p>
            </AlumniCard>
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
