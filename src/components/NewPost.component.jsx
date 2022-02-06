import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import defaultavatar from "../assets/default-avatar.webp";

import { Card, Overlay, FileBox } from "./NewPost.component.styles";

import { createNewPost, createNewPoll } from "../redux/actions/postActions";
import { setNotification } from "../redux/actions/sharedActions";

import { fileValidator } from "../lib/helperFunctions";

const NewPost = (props) => {
   const dispatch = useDispatch();

   const USER = useSelector((state) => state.auth.user);
   const TOKEN = useSelector((state) => state.auth.authToken);

   const [active, setActive] = useState(false);
   const [poll, setPoll] = useState(0);
   const [postText, setPostText] = useState("");
   const [postImage, setPostImage] = useState(null);
   const [pollQuestion, setPollQuestion] = useState("");
   const [pollOptions, setPollOptions] = useState({
      1: "",
      2: "",
      3: "",
      4: "",
   });
   const [submitButton, setSubmitButton] = useState(false);

   useEffect(() => {
      if (
         postText ||
         postImage ||
         (pollQuestion && pollOptions[1] && pollOptions[2])
      )
         setSubmitButton(true);
      else setSubmitButton(false);
   }, [postText, postImage, pollQuestion, pollOptions]);

   const createPost = () => {
      if (postText || postImage) {
         handleNewPost(false);
         dispatch(createNewPost(TOKEN, postText, USER._id, postImage));
         clearData();
      }
      // if (poll && pollQuestion && pollOptions[1] && pollOptions[2]) {
      //    dispatch(
      //       createNewPoll(TOKEN, USER._id, postText, pollQuestion, pollOptions)
      //    );
      // }
   };

   const handleNewPost = (status) => {
      setActive(status);
   };
   const closeOverlay = () => {
      handleNewPost(false);
      clearData();
      setPoll(0);
   };
   const addNewPollOption = () => {
      let temp = poll;
      if (temp < 4) {
         temp++;
         setPoll(temp);
      }
   };
   const handlePoll = () => {
      if (poll) setPoll(0);
      else {
         setPoll(2);
         setPostImage(null);
      }
   };
   const handlePollOption = (value, index) => {
      let tmp = { ...pollOptions };
      tmp[index] = value;
      setPollOptions(tmp);
   };

   const removePollOptionInput = (index) => {
      let tmp = poll;
      if (tmp == 4 && index == 3) {
         let tmp = { ...pollOptions };
         tmp[3] = tmp[4];
         tmp[4] = "";
         setPollOptions(tmp);
      } else {
         handlePollOption("", index);
      }
      setPoll(--tmp);
   };

   const handleTextInput = (text) => {
      setPostText(text);
   };
   const handleFile = (file) => {
      if (file) {
         fileValidator("image", file)
            .then((res) => {
               setPoll(0);
               setPostImage(file);
            })
            .catch((err) => {
               dispatch(setNotification(0, err));
            });
      } else {
         setPostImage(null);
      }
   };

   const clearData = () => {
      setPoll(0);
      setPostText("");
      setPostImage(null);
      setPollQuestion("");
      setPollOptions({ 1: "", 2: "", 3: "", 4: "" });
   };
   return (
      <>
         {active ? <Overlay onClick={closeOverlay} /> : null}
         <Card onClick={() => !active && handleNewPost(true)} active={active}>
            <div className="user-info">
               <img
                  src={
                     USER.profilePic
                        ? USER.profilePic.display_url
                        : defaultavatar
                  }
                  alt={USER.fullName}
               />
               <p>{USER.fullName}</p>
            </div>
            <div className="input-box">
               <textarea
                  id="post_input"
                  placeholder="Share your thoughts here!"
                  onChange={(evt) => handleTextInput(evt.target.value)}
                  value={postText}
               ></textarea>
            </div>
            <div className="input-options">
               <div className="option">
                  {/* <input
                     type="file"
                     name="post-photo"
                     accept="image/x-png, image/jpg, image/jpeg, image/webp"
                     onClick={(e) => (e.target.value = null)}
                     onChange={(e) => handleFile(e.target.files[0])}
                  /> */}
                  <svg
                     width="16"
                     height="16"
                     style={{ transform: "scale(0.8)" }}
                  >
                     <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                     <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                  </svg>
                  <p>Image</p>
               </div>
               <div className="option">
                  <svg
                     width="16"
                     height="16"
                     style={{ transform: "scale(0.9)" }}
                  >
                     <path
                        fill-rule="evenodd"
                        d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
                     />
                  </svg>
                  <p>Video</p>
               </div>
               <div className="option">
                  <svg
                     width="16"
                     height="16"
                     style={{ transform: "scale(0.8)" }}
                  >
                     <path
                        fill-rule="evenodd"
                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
                     />
                  </svg>
                  <p>Document</p>
               </div>
               <div className="option">
                  <svg
                     width="15"
                     height="15"
                     style={{ transform: "scale(0.9)" }}
                  >
                     <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
                  </svg>
                  <p>Poll</p>
               </div>
            </div>
         </Card>
      </>
      // <>

      //       <div className="input-box">
      //          <textarea
      //             id="post_input"
      //             placeholder="Share your thoughts here!"
      //             onChange={(evt) => handleTextInput(evt.target.value)}
      //             value={postText}
      //          ></textarea>
      //       </div>
      //       {poll ? (
      //          <div className="poll-box">
      //             <textarea
      //                className="poll-textarea"
      //                maxLength={100}
      //                placeholder="Your question"
      //                onChange={(e) => setPollQuestion(e.target.value)}
      //                value={pollQuestion}
      //             ></textarea>
      //             {[...Array(poll)].map((_, i) => (
      //                <div className="answer-box" key={i}>
      //                   <input
      //                      type="text"
      //                      maxLength={30}
      //                      id={"option" + (i + 1)}
      //                      placeholder={"Option " + (i + 1)}
      //                      value={pollOptions[i + 1]}
      //                      onChange={(e) =>
      //                         handlePollOption(e.target.value, i + 1)
      //                      }
      //                   />
      //                   {/* {i > 1 && (
      //                      <RiCloseLine
      //                         size={25}
      //                         color="#FF0000"
      //                         onClick={() => removePollOptionInput(i + 1)}
      //                         style={{
      //                            cursor: "pointer",
      //                            position: "absolute",
      //                            left: "90%",
      //                            top: "5%",
      //                         }}
      //                      />
      //                   )} */}
      //                </div>
      //             ))}
      //             <div
      //                className="new-answer-box"
      //                onClick={() => addNewPollOption()}
      //             >
      //                {/* <RiAddFill /> */}
      //                <p>Add new option</p>
      //             </div>
      //          </div>
      //       ) : null}
      //       {postImage ? (
      //          <FileBox>
      //             <div className="icon" onClick={() => handleFile(null)}>
      //                {/* <RiCloseFill color="#FFF" size={20} /> */}
      //             </div>
      //             <img src={URL.createObjectURL(postImage)} />
      //          </FileBox>
      //       ) : null}
      //       <div className="option-box">
      //          <div className="options">
      //             <div className="option">
      //                <input
      //                   type="file"
      //                   name="post-photo"
      //                   accept="image/x-png, image/jpg, image/jpeg, image/webp"
      //                   onClick={(e) => (e.target.value = null)}
      //                   onChange={(e) => handleFile(e.target.files[0])}
      //                />
      //                <svg
      //                   xmlns="http://www.w3.org/2000/svg"
      //                   width="16"
      //                   height="16"
      //                   fill="currentColor"
      //                   class="bi bi-image"
      //                   viewBox="0 0 16 16"
      //                >
      //                   <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      //                   <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
      //                </svg>
      //                {/* <RiCameraLine size={16} color="#333" /> */}
      //                <p>Image</p>
      //             </div>
      //             <div className="option">
      //                {/* <input type="file" name="" id="" accept="video/*" /> */}
      //                <svg
      //                   xmlns="http://www.w3.org/2000/svg"
      //                   width="16"
      //                   height="16"
      //                   fill="currentColor"
      //                   class="bi bi-camera-video"
      //                   viewBox="0 0 16 16"
      //                >
      //                   <path
      //                      fill-rule="evenodd"
      //                      d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
      //                   />
      //                </svg>
      //                <p>Video</p>
      //             </div>
      //             <div className="option">
      //                {/* <input type="file" name="" id="" accept="document/pdf" /> */}
      //                <svg
      //                   xmlns="http://www.w3.org/2000/svg"
      //                   width="16"
      //                   height="16"
      //                   fill="currentColor"
      //                   class="bi bi-filetype-pdf"
      //                   viewBox="0 0 16 16"
      //                >
      //                   <path
      //                      fill-rule="evenodd"
      //                      d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
      //                   />
      //                </svg>
      //                <p>Document</p>
      //             </div>
      //             <div className="option" onClick={handlePoll}>
      //                <svg
      //                   xmlns="http://www.w3.org/2000/svg"
      //                   width="16"
      //                   height="16"
      //                   fill="currentColor"
      //                   class="bi bi-bar-chart"
      //                   viewBox="0 0 16 16"
      //                >
      //                   <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
      //                </svg>
      //                <p>Poll</p>
      //             </div>
      //          </div>
      //          <div className="button" onClick={createPost}>
      //             <p
      //                style={{
      //                   color: "#fff",
      //                   fontWeight: "bold",
      //                   fontSize: "14px",
      //                }}
      //             >
      //                SHARE
      //             </p>
      //          </div>
      //       </div>
      //    </Card>
      // </>
   );
};
export default NewPost;
