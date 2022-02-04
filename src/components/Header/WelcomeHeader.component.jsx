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
   const [pageHeight, setPH] = useState(0);
   useEffect(() => {
      if (window) {
         setPH(window.innerHeight);
      }
      window.addEventListener("resize", () => {
         if (window) {
            setPH(window.innerHeight);
         }
      });
   }, []);
   return (
      <>
         <MobileHeader>
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
         {/* <DesktopHeader>
            <div className="logo-container">
               <Link href="/">
                  <a>
                     <Image src={Logo} objectFit="contain" />
                  </a>
               </Link>
            </div>
            <div className="link-container">
               <LinkBox whileHover={{ color: "#0070f3" }}>
                  <Link href="/">
                     <a>Home</a>
                  </Link>
               </LinkBox>
               <LinkBox whileHover={{ color: "#0070f3" }}>
                  <Link href="/">
                     <a>About</a>
                  </Link>
               </LinkBox>
               <LinkBox whileHover={{ color: "#0070f3" }}>
                  <Link href="/">
                     <a>Signin</a>
                  </Link>
               </LinkBox>
               <LinkBox whileHover={{ color: "#0070f3" }}>
                  <Link href="/">
                     <a>Signup</a>
                  </Link>
               </LinkBox>
            </div>
         </DesktopHeader> */}
      </>
   );
};
export default WelcomeHeader;
