import React, { useEffect } from "react";
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
import { useRef } from "react";

const NewsFeed = () => {
   const dispatch = useDispatch();
   const spinnerRef = useRef();

   const FetchingNew = useSelector((state) => state.postReducer.fetchingNew);
   const FetchingOld = useSelector((state) => state.postReducer.fetchingOld);
   const NoMorePosts = useSelector((state) => state.postReducer.noMorePosts);
   const newsFeed = useSelector((state) => state.postReducer.newsFeed);
   const TOKEN = useSelector((state) => state.auth.authToken);

   useEffect(() => {
      !newsFeed && dispatch(fetchNewsFeed(TOKEN));
   }, [newsFeed]);

   useEffect(() => {
      newsFeed &&
         newsFeed.length > 0 &&
         window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [newsFeed, NoMorePosts]);

   const efp = (x, y) => {
      return document.elementFromPoint(x, y);
   };
   const handleScroll = (e) => {
      if (!FetchingOld && !NoMorePosts && spinnerRef.current) {
         let rect = spinnerRef.current.getBoundingClientRect();
         if (
            spinnerRef.current.contains(efp(rect.left, rect.top)) ||
            spinnerRef.current.contains(efp(rect.right, rect.top)) ||
            spinnerRef.current.contains(efp(rect.right, rect.bottom)) ||
            spinnerRef.current.contains(efp(rect.left, rect.bottom))
         ) {
            dispatch(setFetchingOld(true));
            dispatch(fetchNewsFeed(TOKEN, newsFeed.length));
         }
      }
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
            {FetchingOld && (
               <motion.div
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
               ></motion.div>
            )}
            {NoMorePosts && !FetchingOld && (
               <p className="no-more-post"> No More Posts</p>
            )}
         </Spinner>
      </NewsFeedCard>
   );
};
export default NewsFeed;
