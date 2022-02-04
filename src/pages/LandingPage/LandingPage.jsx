import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Div, ParallaxDiv } from "./LandingPage.styles";
import net from "../../assets/welcome-image.webp";

import WelcomeHeader from "../../components/Header/WelcomeHeader.component";

const LandingPage = () => {
   const [windowHeight, setWH] = useState(0);

   useEffect(() => {
      if (window) {
         setWH(window.innerHeight);
      }
      window.addEventListener("resize", () => {
         if (window) {
            setWH(window.innerHeight);
         }
      });
      return () => {
         window.removeEventListener("resize");
      };
   }, []);
   return (
      <ParallaxDiv
         style={{
            height: windowHeight,
            maxHeight: windowHeight,
         }}
      >
         <WelcomeHeader />
         <Div>
            <motion.div
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6, ease: "easeInOut" }}
               className="section-1"
            >
               <p>Delivering on the promise of the Alumni Network</p>
               <motion.div whileTap={{ scale: 0.8 }} className="cta">
                  Get Started
               </motion.div>
            </motion.div>
            <div className="section-2">
               <motion.img
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  src={net}
               />
            </div>
         </Div>
      </ParallaxDiv>
   );
};
export default LandingPage;
