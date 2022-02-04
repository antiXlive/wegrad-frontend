import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Div, ParallaxDiv } from "./LandingPage.styles";
import net from "../../assets/welcome-image.webp";

import WelcomeHeader from "../../components/Header/WelcomeHeader.component";

const LandingPage = () => {
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
         setWH(window.innerHeight);
      }
   };

   return (
      <ParallaxDiv
         style={{
            height: windowHeight,
            maxHeight: windowHeight,
         }}
      >
         <WelcomeHeader />
         <Div>
            <div className="section-1">
               <motion.p
                  initial={{ y: 50, scale: 0.5, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, type: "tween" }}
               >
                  Delivering on the promise of the Alumni Network
               </motion.p>
               <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="cta"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "tween" }}
               >
                  Get Started
               </motion.div>
            </div>
            <motion.div
               className="section-2"
               initial={{ scale: 1.5, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.5 }}
            >
               <img src={net} alt="alumni-network" />
            </motion.div>
         </Div>
      </ParallaxDiv>
   );
};
export default LandingPage;
