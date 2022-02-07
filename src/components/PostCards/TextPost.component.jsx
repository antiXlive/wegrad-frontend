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
import { useEffect } from "react";
import { useRef } from "react";

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
                        <svg width="16" height="16">
                           <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                           <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
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
                  style={{
                     position: "absolute",
                     right: 10,
                     top: 8,
                     cursor: "pointer",
                  }}
               >
                  <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
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
            <img
               src={
                  USER.profilePic
                     ? USER.profilePic.thumbnail_url
                     : defaultavatar
               }
               alt={USER.fullName}
            />
            <input type="text" placeholder="Add a comment" />
            <svg width="16" height="16">
               <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
         </div>
      </Card>
   );
};

export default TextPost;
