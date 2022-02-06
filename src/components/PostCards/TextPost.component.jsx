import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Card } from "./TextPost.component.styles";
import DropDown from "../DropDown.component";
import ReadMoreText from "../ReadMoreText.component";
import { timeFormatter } from "../../lib/helperFunctions";

// import {
//    RiSendPlaneFill,
//    RiArrowDownSLine,
//    RiPencilLine,
//    RiDeleteBin4Line,
// } from "react-icons/ri";

import { deletePost } from "../../redux/actions/postActions";

import defaultavatar from "../../assets/default-avatar.webp";

const TextPost = (props) => {
   const dispatch = useDispatch();
   const [dropdown, setDropDown] = useState(false);

   const TOKEN = useSelector((state) => state.auth.authToken);
   const USER = useSelector((state) => state.auth.user);
   const USER_ID = useSelector((state) => state.auth.user._id);
   const newsFeed = useSelector((state) => state.postReducer.newsFeed);

   const handleDropDown = (status) => {
      setDropDown(status);
   };
   const handleDelete = () => {
      handleDropDown(false);
      dispatch(deletePost(TOKEN, props.post._id, newsFeed));
   };

   return (
      <Card>
         {dropdown && (
            <DropDown
               handleDropDown={handleDropDown}
               options={[
                  {
                     title: "Delete",
                     icon: (
                        <>
                           <svg width="16" height="16">
                              <path
                                 fill-rule="evenodd"
                                 d="M6.5 1a.5.5 0 0 0-.5.5v1h4v-1a.5.5 0 0 0-.5-.5h-3ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1H3.042l.846 10.58a1 1 0 0 0 .997.92h6.23a1 1 0 0 0 .997-.92l.846-10.58Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                              />
                           </svg>
                        </>
                     ),
                     action: handleDelete,
                  },
               ]}
            />
         )}
         <div className="user-info">
            <div className="user-avatar">
               <img
                  src={
                     props.post.authorAvatar
                        ? props.post.authorAvatar.thumbnail_url
                        : defaultavatar
                  }
                  alt={props.post.author}
               />
            </div>
            <div className="user-info-data">
               <Link
                  style={{ textDecoration: "none" }}
                  to={"/profile/" + props.post.authorEmail}
               >
                  <p className="user-name">{props.post.author}</p>
               </Link>
               <p className="time-stamp">{timeFormatter(props.post.time)}</p>
            </div>
            {USER_ID === props.post.authorId && (
               <svg
                  width="16"
                  height="16"
                  onClick={() => handleDropDown(true)}
                  style={{ position: "absolute", right: 10, top: 8,cursor:'pointer' }}
               >
                  <path
                     fill-rule="evenodd"
                     d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
               </svg>
            )}
         </div>
         <div className="post-content">
            <ReadMoreText text={props.post.text} />
            {props.post.image && (
               <img src={props.post.image.display_url} alt="post-image" />
            )}
         </div>
         {/* <div className="post-stats"></div> */}
         <div className="post-actions">
            <div className="user-avatar">
               {/* <img
                  src={
                     USER.profilePic
                        ? USER.profilePic.thumbnail_url
                        : Default_Avatar
                  }
                  alt={USER.fullName}
               /> */}
            </div>
            <input type="text" placeholder="Add a comment" />
            {/* <RiSendPlaneFill
               size={23}
               style={{ cursor: "pointer" }}
               color="#00000099"
            /> */}
         </div>
      </Card>
   );
};

export default TextPost;
