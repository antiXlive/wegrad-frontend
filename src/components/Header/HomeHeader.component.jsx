import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// import logo from "../../assets/logo.png";
// import Default_Avatar from "../../assets/default_avatar1.png";

import { MobileHeader, DesktopHeader } from "./HomeHeader.component.styles";

import headerlogo from "../../assets/header-logo.png";

// import {
//    RiSearchLine,
//    RiMessage2Line,
//    RiNotification3Line,
//    RiSuitcaseLine,
//    RiCalendarEventFill,
//    RiGalleryLine,
//    RiContactsLine,
//    RiLogoutCircleLine,
// } from "react-icons/ri";

import { signoutUser } from "../../redux/actions/authActions";

const Header = styled.div`
   width: 100%;
   height: max-content;
   display: flex;
   padding: 1vh 0vw;
   justify-content: space-evenly;
   box-sizing: border-box;
   padding-top: 1.5vh;
   background-color: #ffffff;
   /* box-shadow: 0px 3px 10px #00000030; */
   border-bottom: 1px solid #55555540;
   /* border:1px solid red; */

   .link-box {
      /* border: 1px solid; */
      padding-left: 5%;
      width: 100%;
      height: 30px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #00000099;
      box-sizing: border-box;
      &:hover {
         color: #0573b9;
      }
      p {
         font-size: 15px;
      }
   }
   @media (min-width: 720px) {
      display: block;
      width: 20%;
   }

   .section-1 {
      /* border: 1px solid red; */
      width: 25%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .logoWrap {
         display: flex;
         height: 100%;
         box-sizing: border-box;
         align-items: center;
         img {
            cursor: pointer;
            width: 100%;
         }
      }
   }
   .section-2 {
      /* border: 1px solid; */
      width: 45%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .searchBox {
         border: 1px solid #00000040;
         border-radius: 100vw;
         /* max-width: 150px; */
         min-height: 28px;
         display: flex;
         align-items: center;
         padding: 0 15px;
      }

      input {
         border: none;
         border-radius: 100vw;
         width: 100%;
         height: 100%;
         outline: none;
         padding: 0 15px;
         background-color: transparent;
      }
   }
   .section-3 {
      /* border: 1px solid; */
      width: 15%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .icons {
         cursor: pointer;
         display: none;
      }
      .avatar-container {
         height: 100%;
         /* border:1px solid red; */
         width: 2.5vw;
         display: flex;
         align-items: center;
         justify-content: center;
         position: relative;
         img {
            cursor: pointer;
            width: 33px;
            height: 30px;
         }
      }
   }
`;

const HomeHeader = () => {
   const disptch = useDispatch();

   const USER = useSelector((state) => state.auth.user);

   const handleSignout = () => {
      disptch(signoutUser());
   };

   const [drawer, setDrawer] = useState(false);

   const [windowHeight, setWH] = useState(0);

   useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const handleResize = () => {
      if (window) {
         if (window.innerHeight > 700) {
            setWH(window.innerHeight);
         }
      }
   };

   return (
      <>
         <MobileHeader>
            <div className="logo-container">
               <img src={headerlogo} alt="iiitm" />
            </div>
            <div className="search-bar">
               <svg
                  style={{ position: "absolute", left: 17 }}
                  width="16"
                  height="16"
               >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
               </svg>
               <input
                  type="search"
                  placeholder="Search"
                  style={{
                     width: "90%",
                     borderRadius: "3px",
                     border: "none",
                     background: '#F3F2F6',
                     height: "27px",
                     padding: "0 25px",
                  }}
               />
            </div>
            <div className="menu-bar">
               <motion.svg whileTap={{ scale: 0.8 }} fill="#0065db">
                  <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
               </motion.svg>
            </div>
         </MobileHeader>
      </>

      //   <Header>
      //      {drawer ? (
      //         <div
      //            style={{
      //               position: "absolute",
      //               width: "100vw",
      //               height: "100vh",
      //               backgroundColor: "#00000070",
      //               zIndex: 200,
      //               bottom: 0,
      //               boxSizing: "border-box",
      //            }}
      //            onClick={() => {
      //               setDrawer(false);
      //            }}
      //         ></div>
      //      ) : null}
      //      {drawer ? (
      //         <div
      //            style={{
      //               boxSizing: "border-box",
      //               position: "absolute",
      //               width: "100vw",
      //               height: "70vh",
      //               backgroundColor: "#fff",
      //               bottom: 0,
      //               borderTopLeftRadius: "4vw",
      //               borderTopRightRadius: "4vw",
      //               zIndex: 210,
      //            }}
      //         >
      //            <div
      //               style={{
      //                  width: "100%",
      //                  height: "20%",
      //                  borderBottom: "1px solid #55555530",
      //                  boxSizing: "border-box",
      //                  display: "flex",
      //               }}
      //            >
      //               <div
      //                  style={{
      //                     width: "20%",
      //                     display: "flex",
      //                     alignItems: "center",
      //                     justifyContent: "center",
      //                  }}
      //               >
      //                  <Link
      //                     style={{ textDecoration: "none" }}
      //                     to={"/profile/" + USER.email}
      //                  >
      //                     <img
      //                        src={
      //                           USER.profilePic
      //                              ? USER.profilePic.thumbnail_url
      //                              : Default_Avatar
      //                        }
      //                        alt={USER.fullName}
      //                        style={{ width: "40px", height: "40px" }}
      //                     />
      //                  </Link>
      //               </div>
      //               <div style={{ width: "80%" }}>
      //                  <div
      //                     style={{
      //                        height: "50%",
      //                        paddingLeft: "5%",
      //                        display: "flex",
      //                        alignItems: "flex-end",
      //                     }}
      //                  >
      //                     <Link
      //                        style={{ textDecoration: "none" }}
      //                        to={"/profile/" + USER.email}
      //                     >
      //                        <p
      //                           style={{
      //                              fontSize: "20px",
      //                              letterSpacing: "1px",
      //                              margin: 0,
      //                           }}
      //                        >
      //                           {USER.fullName}
      //                        </p>
      //                     </Link>
      //                  </div>
      //                  <div
      //                     style={{
      //                        height: "50%",
      //                        paddingLeft: "5%",
      //                        display: "flex",
      //                        alignItems: "flex-start",
      //                        paddingTop: "3%",
      //                     }}
      //                  >
      //                     <Link
      //                        style={{ textDecoration: "none" }}
      //                        to={"/profile/" + USER.email}
      //                     >
      //                        <p
      //                           style={{
      //                              fontSize: "12px",
      //                              letterSpacing: "1px",
      //                              margin: 0,
      //                              opacity: "0.7",
      //                           }}
      //                        >
      //                           {USER.email}
      //                        </p>
      //                     </Link>
      //                  </div>
      //               </div>
      //            </div>
      //            <div
      //               style={{
      //                  width: "100%",
      //                  height: "80%",
      //                  paddingTop: "12%",
      //                  boxSizing: "border-box",
      //               }}
      //            >
      //               <Link style={{ textDecoration: "none" }} to="/alumni">
      //                  <div className="link-box">
      //                     <RiContactsLine size={19} />
      //                     <p style={{ marginLeft: "10px" }}>Alumni</p>
      //                  </div>
      //               </Link>
      //               <Link style={{ textDecoration: "none" }} to="/jobs">
      //                  <div className="link-box">
      //                     <RiSuitcaseLine size={20} />
      //                     <p style={{ marginLeft: "10px" }}>Jobs</p>
      //                  </div>
      //               </Link>
      //               <Link style={{ textDecoration: "none" }} to="/events">
      //                  <div className="link-box">
      //                     <RiCalendarEventFill size={20} />
      //                     <p style={{ marginLeft: "10px" }}>Events</p>
      //                  </div>
      //               </Link>
      //               <Link style={{ textDecoration: "none" }} to="/moments">
      //                  <div className="link-box">
      //                     <RiGalleryLine size={20} />
      //                     <p style={{ marginLeft: "10px" }}>Moments</p>
      //                  </div>
      //               </Link>
      //               <Link
      //                  style={{ textDecoration: "none" }}
      //                  to="/mock-interviews"
      //               >
      //                  <div className="link-box">
      //                     <RiSuitcaseLine size={20} />
      //                     <p style={{ marginLeft: "10px" }}>Mock Interviews</p>
      //                  </div>
      //               </Link>
      //               <Link
      //                  style={{ textDecoration: "none" }}
      //                  to="/interview-experiences"
      //               >
      //                  <div className="link-box">
      //                     <RiSuitcaseLine size={20} />
      //                     <p style={{ marginLeft: "10px" }}>
      //                        Interview Experiences
      //                     </p>
      //                  </div>
      //               </Link>
      //               <div
      //                  className="link-box"
      //                  style={{ position: "absolute", top: "90%" }}
      //                  onClick={handleSignout}
      //               >
      //                  <RiLogoutCircleLine size={20} />
      //                  <p style={{ marginLeft: "10px" }}>Sign Out</p>
      //               </div>
      //            </div>
      //         </div>
      //      ) : null}

      //      <div className="section-1">
      //         <div className="logoWrap">
      //            <Link style={{ textDecoration: "none" }} to="/">
      //               <img src={logo} alt="weGrad" />
      //            </Link>
      //         </div>
      //      </div>
      //      <div className="section-2">
      //         <div className="searchBox">
      //            <RiSearchLine />
      //            <input type="search" placeholder="Search Alumni" />
      //         </div>
      //      </div>
      //      <div className="section-3">
      //         <div className="icons">
      //            <RiMessage2Line color="#0573B9" />
      //         </div>
      //         <div className="icons">
      //            <RiNotification3Line color="#0573B9" />
      //         </div>
      //         <div className="avatar-container" onClick={() => setDrawer(true)}>
      //            <img
      //               src={
      //                  USER.profilePic
      //                     ? USER.profilePic.thumbnail_url
      //                     : Default_Avatar
      //               }
      //               alt={USER.fullName}
      //            />
      //            {/* <div style={{width:'8vw',borderRadius:'0.2vw',height:'10vh',position:'absolute',backgroundColor:'#FFF',bottom:'-110%',left:'-130%',boxShadow:'0px 2px 20px #00000040' }}>
      //                     <p>Piyush Kumar</p>
      //                     <p onClick={handleSignout}>Sign out</p>
      //                 </div> */}
      //         </div>
      //      </div>
      //   </Header>
   );
};

export default HomeHeader;
