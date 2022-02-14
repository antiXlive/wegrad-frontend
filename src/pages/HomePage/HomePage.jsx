import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import HomeHeader from "../../components/Header/HomeHeader.component";

import {
   Div,
   NavigationCard,
   MainContentCard,
   HighlightCard,
   FixedWrapper,
} from "./HomePage.styles";

const HomePage = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      if (location.pathname == "/" && TOKEN) navigate("/feed");
   }, []);

   const newsFeed = useSelector((state) => state.postReducer.newsFeed);
   const TOKEN = useSelector((state) => state.auth.authToken);

   const navigationLinks = [
      {
         to: "/feed",
         title: "Home",
         path: (
            <>
               <path d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
               <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
            </>
         ),
      },
      {
         to: "/alumni",
         title: "Alumni",
         path: (
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
         ),
      },
      {
         to: "/jobs",
         title: "Jobs",
         path: (
            <>
               <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
               <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
            </>
         ),
      },
      {
         to: "/events",
         title: "Events",
         path: (
            <>
               {" "}
               <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
               <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
            </>
         ),
      },
      {
         to: "/moments",
         title: "Moments",
         path: (
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Zm6 1.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7Zm3.5.878c1.482-1.42 4.795 1.392 0 4.622-4.795-3.23-1.482-6.043 0-4.622ZM2.5 5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Z" />
         ),
      },
      {
         to: "/mock-interviews",
         title: "Mock Interviews",
         path: (
            <>
               <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
               <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
            </>
         ),
      },
      {
         to: "/interview-experience",
         title: "Interview Experience",
         path: (
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
         ),
      },
   ];

   return (
      <Div data={newsFeed && newsFeed.length > 0 ? 1 : 0}>
         <HomeHeader />
         <div className="content-section">
            <FixedWrapper className="fw-navigation">
               <NavigationCard>
                  {navigationLinks.map((item) => {
                     return (
                        <Link
                           style={{ textDecoration: "none" }}
                           to={item.to}
                           key={item.to}
                        >
                           <div className="link">
                              <svg width="16" height="16">
                                 {item.path}
                              </svg>
                              <p>{item.title}</p>
                           </div>
                        </Link>
                     );
                  })}
               </NavigationCard>
            </FixedWrapper>

            <MainContentCard>
               <Outlet />
            </MainContentCard>
            <FixedWrapper className="fw-highlight">
               <HighlightCard></HighlightCard>
            </FixedWrapper>
         </div>
      </Div>
   );
};
export default HomePage;
