import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import NewPost from "../../../components/NewPost.component";
import TextPost from "../../../components/PostCards/TextPost.component";

import nodata from "../../../assets/no-data.webp";

import { NewsFeedCard, Nodata, Spinner } from "./NewsFeed.styles";

import {
   fetchNewsFeed,
   setFetchingOld,
} from "../../../redux/actions/postActions";

const NewsFeed = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const spinnerRef = useRef();

   const FetchingNew = useSelector((state) => state.postReducer.fetchingNew);
   const FetchingOld = useSelector((state) => state.postReducer.fetchingOld);
   const NoMorePosts = useSelector((state) => state.postReducer.noMorePosts);
   const newsFeed = useSelector((state) => state.postReducer.newsFeed);
   const TOKEN = useSelector((state) => state.auth.authToken);

   useEffect(() => {
      !newsFeed && dispatch(fetchNewsFeed(TOKEN));
   }, [newsFeed]);
   // useEffect(() => {
   //    if (!newsFeed || newsFeed.length < 1) dispatch(fetchNewsFeed(TOKEN));
   //    // !newsFeed && dispatch(fetchNewsFeed(TOKEN));
   // }, [newsFeed]);

   useEffect(() => {
      if (newsFeed && newsFeed.length > 0) {
         window.addEventListener("scroll", throttle_handleScroll);
      }
      return () => {
         window.removeEventListener("scroll", throttle_handleScroll);
      };
   }, [newsFeed, NoMorePosts]);

   let executing = false;
   const throttle_handleScroll = () => {
      if (!NoMorePosts) {
         if (visible()) {
            if (!executing) {
               let skip1 = 0,
                  skip2 = 0;
               newsFeed.map((feed) => {
                  if (feed.question) skip2++;
                  else skip1++;
               });
               dispatch(setFetchingOld(true));
               dispatch(fetchNewsFeed(TOKEN, skip1, skip2));
               executing = true;
               setTimeout(() => (executing = false), 2000);
            }
         }
      }
   };
   const efp = (x, y) => {
      return document.elementFromPoint(x, y);
   };
   const visible = () => {
      if (spinnerRef.current) {
         let rect = spinnerRef.current.getBoundingClientRect();
         if (
            spinnerRef.current.contains(efp(rect.left, rect.top)) ||
            spinnerRef.current.contains(efp(rect.right, rect.top)) ||
            spinnerRef.current.contains(efp(rect.right, rect.bottom)) ||
            spinnerRef.current.contains(efp(rect.left, rect.bottom))
         ) {
            return true;
         }
         return false;
      }
      return false;
   };

   return (
      <NewsFeedCard>
         <NewPost />
         {newsFeed && newsFeed.length > 0 ? (
            newsFeed.map((post, i) => {
               return <TextPost post={post} key={i} />;
            })
         ) : (
            <Nodata>
               <img src={nodata} alt="no-data" />
               <p>No posts found:(</p>
            </Nodata>
         )}
         <Spinner ref={spinnerRef}>
            {FetchingOld && !NoMorePosts && (
               <motion.div
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
               ></motion.div>
            )}
            {NoMorePosts && <p className="no-more-post"> No More Posts</p>}
         </Spinner>
      </NewsFeedCard>
   );
};
export default NewsFeed;
