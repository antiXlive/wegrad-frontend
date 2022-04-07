import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Card } from "./TextPost.component.styles";
import DropDown from "../DropDown.component";
import ReadMoreText from "../ReadMoreText.component";
import { timeFormatter } from "../../lib/helperFunctions";

import {
   addComment,
   deleteComment,
   deletePost,
   votePoll,
   revertvotePoll,
} from "../../redux/actions/postActions";

import defaultavatar from "../../assets/default-avatar.webp";

const TextPost = (props) => {
   const dispatch = useDispatch();
   const [dropdown, setDropDown] = useState(false);
   const [pollOption, setPollOption] = useState(null);
   const [totalVotes, setTV] = useState(0);
   const [newComment, setNewComment] = useState("");
   const [showComments, setShowComments] = useState(false);

   useEffect(() => {
      if (props.post.question) {
         let totalVotes = 0;
         props.post.options.map((option) => {
            totalVotes += option.count;
         });
         setTV(totalVotes);
      }
   }, [props]);

   const TOKEN = useSelector((state) => state.auth.authToken);
   const USER = useSelector((state) => state.auth.user);
   const USER_ID = useSelector((state) => state.auth.user._id);

   const handleDropDown = (status) => {
      setDropDown(status);
   };
   const handleDelete = () => {
      handleDropDown(false);
      dispatch(deletePost(TOKEN, props.post._id, props.post.question));
   };

   let executing = false;

   const handleOption = (option) => {
      if (!executing) {
         let tmp = props.post.options;
         tmp[option].count += 1;
         dispatch(votePoll(TOKEN, props.post._id, USER_ID, tmp, option + 1));
         executing = true;
         setTimeout(() => (executing = false), 20000);
      }
   };

   const handleRevertVote = () => {
      if (!executing) {
         if (props.post.userVote) {
            let tmp = props.post.options;
            tmp[props.post.userVote.option - 1].count -= 1;
            dispatch(revertvotePoll(TOKEN, props.post._id, USER_ID, tmp));
         }
         executing = true;
         setTimeout(() => (executing = false), 20000);
      }
   };

   const handleAddComment = () => {
      if (newComment) {
         dispatch(addComment(TOKEN, props.post._id, newComment, USER_ID));
         setNewComment("");
      }
   };
   const handleDeleteComment = (commentid) => {
      dispatch(deleteComment(TOKEN, commentid, props.post._id));
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
                     props.post.authorData.avatar
                        ? props.post.authorData.avatar
                        : defaultavatar
                  }
                  alt={props.post.authorData.name}
               />
            </div>
            <div className="user-info-data">
               <Link
                  style={{ textDecoration: "none" }}
                  to={"/home/profile/" + props.post.authorData.email}
               >
                  <p className="user-name">{props.post.authorData.name}</p>
               </Link>
               <p className="time-stamp">{timeFormatter(props.post.time)}</p>
            </div>
            {USER_ID === props.post.author && (
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
               <img src={props.post.image.display_url} alt="post" />
            )}
            {props.post.question && (
               <div className="poll-box">
                  <p className="question">{props.post.question}</p>
                  <div className="options">
                     {props.post.options.map((option, index) => {
                        return props.post.userVote ? (
                           <div className="option-selected" key={index}>
                              <motion.div
                                 className="overlay"
                                 initial={{ width: 0 }}
                                 animate={{
                                    width:
                                       (option.count / totalVotes) * 100 > -1 &&
                                       (option.count / totalVotes) * 100 <
                                          101 &&
                                       (option.count / totalVotes) * 100 + "%",
                                 }}
                                 transition={{ duration: 0.4 }}
                              ></motion.div>
                              <p>
                                 {option.value}
                                 {index + 1 === props.post.userVote.option && (
                                    <svg width="16" height="16">
                                       <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                                       <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                                    </svg>
                                 )}
                              </p>
                              <p>
                                 {(option.count / totalVotes) * 100 > -1 &&
                                    (option.count / totalVotes) * 100 < 101 &&
                                    Math.round(
                                       (option.count / totalVotes) * 100
                                    ) + "%"}
                              </p>
                           </div>
                        ) : (
                           <motion.div
                              key={index}
                              className="option"
                              onClick={() => handleOption(index)}
                              whileHover={
                                 !pollOption && {
                                    backgroundColor: "#1e90ff",
                                    color: "#fff",
                                    borderColor: "#1e90ff",
                                 }
                              }
                              whileTap={
                                 !pollOption && {
                                    backgroundColor: "#1e90ff99",
                                 }
                              }
                              transition={{ type: "tween" }}
                           >
                              <p>{option.value}</p>
                           </motion.div>
                        );
                     })}
                  </div>
                  <div
                     style={{
                        width: "max-content",
                        marginTop: 5,
                        fontSize: "13px",
                     }}
                  >
                     <p
                        style={{
                           display: "inline-block",
                           marginRight: "10px",
                        }}
                     >
                        {totalVotes} Vote{totalVotes > 1 && "s"}
                     </p>
                     <motion.p
                        style={{
                           cursor: "pointer",
                           color: props.post.userVote ? "#0568a7" : "#66666699",
                           display: "inline-block",
                        }}
                        onClick={handleRevertVote}
                        whileTap={{ scale: 0.9 }}
                     >
                        Revert
                     </motion.p>
                  </div>
               </div>
            )}
         </div>
         {props.post?.comments?.length ? (
            <div className="comment-container">
               {showComments ? (
                  props.post.comments.map((comment) => {
                     return (
                        <div key={comment._id} className="comment">
                           <p className="author">
                              {comment.authorName}
                              <span className="text">{comment.text}</span>
                              <span className="time">
                                 {comment.author === USER_ID && (
                                    <motion.span
                                       onClick={() =>
                                          handleDeleteComment(comment._id)
                                       }
                                       className="delete-button"
                                       whileTap={{
                                          filter:
                                             "invert(34%) sepia(94%) saturate(5794%) hue-rotate(351deg) brightness(88%) contrast(133%)",
                                       }}
                                    >
                                       <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 16 16"
                                       >
                                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                       </svg>
                                    </motion.span>
                                 )}
                                 {timeFormatter(comment.time)}
                              </span>
                           </p>
                        </div>
                     );
                  })
               ) : (
                  <div className="comment">
                     <p className="author">
                        {props.post.comments[0].authorName}
                        <span className="text">
                           {props.post.comments[0].text}
                        </span>
                        <span className="time">
                           {props.post.comments[0].author === USER_ID && (
                              <motion.span
                                 onClick={() =>
                                    handleDeleteComment(
                                       props.post.comments[0]._id
                                    )
                                 }
                                 className="delete-button"
                                 whileTap={{
                                    filter:
                                       "invert(34%) sepia(94%) saturate(5794%) hue-rotate(351deg) brightness(88%) contrast(133%)",
                                 }}
                              >
                                 <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 16 16"
                                 >
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                 </svg>
                              </motion.span>
                           )}
                           {timeFormatter(props.post.comments[0].time)}
                        </span>
                     </p>
                  </div>
               )}
               {props.post.comments.length > 1 && !showComments && (
                  <motion.p
                     whileTap={{ scale: 0.9 }}
                     className="load-more"
                     onClick={() => setShowComments(true)}
                  >
                     Load More
                  </motion.p>
               )}
            </div>
         ) : null}
         <div className="post-actions">
            <img
               src={
                  USER.profilePic
                     ? USER.profilePic.thumbnail_url
                     : defaultavatar
               }
               alt={USER.fullName}
            />
            <input
               type="text"
               maxLength={100}
               value={newComment}
               onChange={(e) => setNewComment(e.target.value)}
               placeholder="Add a comment"
            />
            <motion.div whileTap={{ scale: 0.9 }}>
               <svg
                  width="16"
                  height="16"
                  onClick={handleAddComment}
                  style={{
                     filter: newComment
                        ? "invert(27%) sepia(98%) saturate(1515%) hue-rotate(183deg) brightness(92%) contrast(96%)"
                        : "invert(34%) sepia(0%) saturate(0%) hue-rotate(73deg) brightness(97%) contrast(95%)",
                  }}
               >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
               </svg>
            </motion.div>
         </div>
      </Card>
   );
};

export default TextPost;
