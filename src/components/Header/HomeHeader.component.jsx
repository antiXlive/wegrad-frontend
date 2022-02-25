import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import {
   OverLay,
   MobileHeader,
   DesktopHeader,
} from "./HomeHeader.component.styles";

import headerlogo from "../../assets/header-logo.png";
import defaultavatar from "../../assets/default-avatar.webp";

import { signoutUser } from "../../redux/actions/authActions";

const HomeHeader = (props) => {
   const disptch = useDispatch();
   const location = useLocation();

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
         {drawer ? (
            <OverLay onClick={() => setDrawer(false)}>
               <motion.div
                  className="bottom-sheet"
                  style={{
                     height: windowHeight ? windowHeight * 0.7 : "70vh",
                     bottom: 0,
                  }}
                  initial={{ y: "100vh" }}
                  animate={{ y: 0 }}
                  transition={{ type: "tween", duration: 0.2 }}
               >
                  <div className="user-details">
                     <div className="avatar">
                        <Link
                           style={{ textDecoration: "none" }}
                           to={"/profile/" + USER.email}
                        >
                           <img
                              src={
                                 USER.profilePic
                                    ? USER.profilePic.thumbnail_url
                                    : defaultavatar
                              }
                              alt={USER.fullName}
                           />
                        </Link>
                     </div>
                     <div className="user-info">
                        <Link
                           style={{ textDecoration: "none" }}
                           to={"/profile/" + USER.email}
                        >
                           <p
                              style={{
                                 fontSize: "18px",
                                 letterSpacing: "1px",
                                 margin: 0,
                              }}
                           >
                              {USER.fullName}
                           </p>
                        </Link>
                        <Link
                           style={{ textDecoration: "none" }}
                           to={"/profile/" + USER.email}
                        >
                           <p
                              style={{
                                 fontSize: "12px",
                                 letterSpacing: "1px",
                                 margin: 0,
                                 paddingTop: "5px",
                                 opacity: "0.7",
                              }}
                           >
                              {USER.email}
                           </p>
                        </Link>
                     </div>
                  </div>
                  <div className="navigation-links">
                     {props.navigationLinks.map((link) => {
                        return (
                           <Link
                              style={{ textDecoration: "none" }}
                              to={link.to}
                              key={link.to}
                           >
                              <div
                                 className="link"
                                 style={
                                    location.pathname === link.to
                                       ? {
                                            filter:
                                               "invert(51%) sepia(33%) saturate(6768%) hue-rotate(194deg) brightness(102%) contrast(106%)",
                                         }
                                       : {
                                            filter:
                                               "invert(37%) sepia(7%) saturate(11%) hue-rotate(333deg) brightness(103%) contrast(91%)",
                                         }
                                 }
                              >
                                 <svg width="16" height="16">
                                    {link.path}
                                 </svg>
                                 <p>{link.title}</p>
                              </div>
                           </Link>
                        );
                     })}
                     <div
                        className="link"
                        onClick={handleSignout}
                        style={{
                           position: "absolute",
                           bottom: 0,
                           filter:
                              "invert(37%) sepia(7%) saturate(11%) hue-rotate(333deg) brightness(103%) contrast(91%)",
                        }}
                     >
                        <svg width="16" height="16" viewBox="0 0 16 16">
                           <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                           <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>
                        <p>Signout</p>
                     </div>
                  </div>
               </motion.div>
            </OverLay>
         ) : null}

         <MobileHeader>
            <div className="logo-container">
               <img src={headerlogo} alt="iiitm" />
            </div>
            <div className="search-bar">
               <>
                  <svg
                     style={{ position: "absolute", left: 8, top: "22%" }}
                     width="16"
                     height="16"
                  >
                     <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  <input type="search" placeholder="Search" />
               </>
            </div>
            <div className="menu-bar" onClick={() => setDrawer(true)}>
               <motion.svg whileTap={{ scale: 0.8 }} fill="#0065db">
                  <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
               </motion.svg>
            </div>
         </MobileHeader>

         <DesktopHeader>
            <div className="logo-container">
               <img src={headerlogo} alt="iiitm" />
            </div>
            <div className="search-bar">
               <>
                  <svg
                     style={{ position: "absolute", left: 8, top: "22%" }}
                     width="16"
                     height="16"
                  >
                     <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  <input type="search" placeholder="Search" />
               </>
            </div>
            <div className="link-section">
               <div className="link-item">
                  <motion.svg
                     width="17"
                     height="17"
                     viewBox="0 0 16 16"
                     whileTap={{scale:0.8}}
                  >
                     <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </motion.svg>
               </div>
               <div className="link-item">
                  <motion.svg
                     width="17"
                     height="17"
                     viewBox="0 0 16 16"
                     whileTap={{scale:0.8}}
                  >
                     <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  </motion.svg>
               </div>
               <div className="link-item">
                  <Link
                     style={{ textDecoration: "none" }}
                     to={"/profile/" + USER.email}
                  >
                     <img
                        src={
                           USER.profilePic
                              ? USER.profilePic.thumbnail_url
                              : defaultavatar
                        }
                        alt={USER.fullName}
                     />
                  </Link>
               </div>
            </div>
         </DesktopHeader>
      </>
   );
};

export default HomeHeader;
