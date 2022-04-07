import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
         if (window.innerHeight > 700) {
            setWH(window.innerHeight);
         }
      }
   };

   return (
      <ParallaxDiv
         style={{
            height: windowHeight ? windowHeight : "auto",
            maxHeight: windowHeight ? windowHeight : "auto",
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
               <Link to="/auth/signup">
                  <motion.div
                     className="cta"
                     initial={{
                        y: 40,
                        opacity: 0,
                        transition: {
                           delay: 0.5,
                           duration: 0.5,
                           type: "tween",
                        },
                     }}
                     animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                           delay: 0.5,
                           duration: 0.5,
                           type: "tween",
                        },
                     }}
                     whileTap={{ scale: 0.8 }}
                  >
                     <p>Get Started</p>
                  </motion.div>
               </Link>
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
