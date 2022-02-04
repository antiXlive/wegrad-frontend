import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { MobileHeader, DesktopHeader } from "./WelcomeHeader.component.styles";
import Logo from "../../assets/header-logo.png";

const Menu = () => {
   return (
      <svg height="14" width="15" fill="#0065db">
         <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
      </svg>
   );
};

const WelcomeHeader = () => {
   const [windowHeight, setWH] = useState(0);
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("resize", handleResize);
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   const handleResize = () => {
      if (window) {
         if (window.innerHeight > 700) {
            setWH(window.innerHeight);
         }
      }
   };

   const handleScroll = () => {
      if (window.pageYOffset > 80) setScrolled(true);
      else setScrolled(false);
   };

   return (
      <>
         <MobileHeader bgcolor={scrolled ? "#f6f6f6" : "transparent"}>
            <div className="logo-container">
               <Link to="/">
                  <img src={Logo} />
               </Link>
            </div>
            <motion.div
               initial={{ scale: 1.8 }}
               whileTap={{ scale: 1.7 }}
               className="menu"
            >
               <Menu />
            </motion.div>
         </MobileHeader>
         <DesktopHeader bgcolor={scrolled ? "#f6f6f6" : "transparent"}>
            <div className="logo-container">
               <Link to="/">
                  <img src={Logo} />
               </Link>
            </div>
            <div className="link-container">
               <Link to="/">
                  <motion.p
                     whileTap={{ color: "#0573b9" }}
                     whileHover={{ color: "#0573b9" }}
                  >
                     Home
                  </motion.p>
               </Link>
               <Link to="/">
                  <motion.p
                     whileTap={{ color: "#0573b9" }}
                     whileHover={{ color: "#0573b9" }}
                  >
                     About
                  </motion.p>
               </Link>
               <Link to="/">
                  <motion.p
                     whileTap={{ color: "#0573b9" }}
                     whileHover={{ color: "#0573b9" }}
                  >
                     Signin
                  </motion.p>
               </Link>
               <Link to="/">
                  <motion.p
                     whileTap={{ color: "#0573b9" }}
                     whileHover={{ color: "#0573b9" }}
                  >
                     Signup
                  </motion.p>
               </Link>
            </div>
         </DesktopHeader>
      </>
   );
};
export default WelcomeHeader;
