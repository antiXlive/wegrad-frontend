import axios from "../../lib/axios";
import {
   SET_LOGO_LOADER,
   SET_SPINNER_LOADER,
   setNotification,
} from "../../redux/actions/sharedActions";
import { clientEventDispatcher } from "../../lib/webSocket";

export const setFetchingNew = (status) => ({
   type: "FETCHING_NEW",
   payload: status,
});
export const setFetchingOld = (status) => ({
   type: "FETCHING_OLD",
   payload: status,
});
export const setNoMorePost = (status) => ({
   type: "NO_MORE_POSTS",
   payload: status,
});

export const setNewsFeed = (feed) => ({
   type: "SET_NEWS_FEED",
   payload: feed,
});
export const filterNewsFeed = (postid) => ({
   type: "FILTER_NEWS_FEED",
   payload: postid,
});
export const appendNewsFeed = (feed) => ({
   type: "APPEND_NEWS_FEED",
   payload: feed,
});
export const appendNewsFeedOld = (feed) => ({
   type: "APPEND_NEWS_FEED_OLD",
   payload: feed,
});
export const updateUserPollVote = (vote) => ({
   type: "UPDATE_USER_POLL_VOTE",
   payload: vote,
});
export const updatePollVote = (data) => ({
   type: "UPDATE_POLL_VOTE",
   payload: data,
});
export const appendNewComment = (comment) => ({
   type: "APPEND_NEW_COMMENT",
   payload: comment,
});
export const removeComment = (data) => ({
   type: "REMOVE_COMMENT",
   payload: data,
});

export const fetchNewsFeed = (token, skip1, skip2) => (dispatch) => {
   if (!skip1) dispatch(SET_LOGO_LOADER(true));
   if (skip1) dispatch(setFetchingOld(true));
   else dispatch(setFetchingNew(true));

   let endpoint = skip1 ? "/post?skip1=" + skip1 + "&skip2=" + skip2 : "/post";
   axios
      .get(endpoint, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         if (res.data.err) {
            dispatch(setNotification(0, res.data.err));
            dispatch(SET_LOGO_LOADER(false));
         }
         if (res.data) {
            if (res.data.length) {
               if (!skip1) {
                  dispatch(setFetchingNew(false));
                  dispatch(setNewsFeed(res.data));
                  dispatch(SET_LOGO_LOADER(false));
               } else {
                  dispatch(setFetchingOld(false));
                  dispatch(appendNewsFeedOld(res.data));
                  dispatch(SET_LOGO_LOADER(false));
               }
            } else {
               if (skip1) dispatch(setNoMorePost(true));
               dispatch(setFetchingNew(false));
               dispatch(setFetchingOld(false));
               dispatch(SET_LOGO_LOADER(false));
            }
         }
      })
      .catch((err) => {
         dispatch(setFetchingNew(false));
         dispatch(setFetchingOld(false));
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};

export const createNewPost = (token, text, author, image) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   let data = new FormData();
   data.append("text", text);
   data.append("author", author);
   data.append("image", image);
   axios
      .post("/post/create", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         if (res.data) {
            dispatch(SET_SPINNER_LOADER(false));
            let ws_data = {
               event: "new-post",
               data: res.data,
            };
            dispatch(setNotification(1, "Post created successfully"));
            clientEventDispatcher(ws_data);
            dispatch(appendNewsFeed(res.data));
         }
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setNotification(0, "Oops! Your post could not be posted"));
      });
};

export const deletePost = (token, postid, poll) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   let data = {
      id: postid,
   };
   let endpoint = poll ? "/post/delete?poll=true" : "/post/delete";
   axios
      .post(endpoint, data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         if (res.data.err) {
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(
               setNotification(0, "Oops! Your post could not be deleted")
            );
         } else if (res.data.msg) {
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(setNotification(1, "Post deleted successfully!"));
            dispatch(filterNewsFeed(postid));
            let ws_data = {
               event: "delete-post",
               data: postid,
            };
            clientEventDispatcher(ws_data);
         }
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setNotification(0, "Oops! Your post could not be deleted"));
      });
};

export const createNewPoll =
   (token, author, text, question, options) => (dispatch) => {
      dispatch(SET_SPINNER_LOADER(true));
      let data = {
         author: author,
         text: text,
         question: question,
         options: options,
      };
      axios
         .post("/post/create/poll", data, {
            headers: {
               authorization: "Bearer " + token,
            },
         })
         .then((res) => {
            if (res.data) {
               dispatch(SET_SPINNER_LOADER(false));
               let ws_data = {
                  event: "new-post",
                  data: res.data,
               };
               dispatch(setNotification(1, "Poll created successfully"));
               clientEventDispatcher(ws_data);
               dispatch(appendNewsFeed(res.data));
            }
         })
         .catch((err) => {
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(setNotification(0, "Oops! Your poll could not be posted"));
         });
   };

export const votePoll =
   (token, pollid, author, options, vote) => (dispatch) => {
      let data = {
         pollid: pollid,
         author: author,
         options: options,
         vote: vote,
      };
      axios
         .post("/post/poll/saveVote", data, {
            headers: {
               authorization: "Bearer " + token,
            },
         })
         .then((res) => {
            if (res.data) {
               let ws_data = {
                  event: "poll-vote",
                  data: { pollid, options },
               };
               clientEventDispatcher(ws_data);
               dispatch(updateUserPollVote(res.data));
            }
         })
         .catch((err) => {
            dispatch(setNotification(0, "Oops! Your vote could not be saved"));
         });
   };
export const revertvotePoll =
   (token, pollid, author, options) => (dispatch) => {
      let data = {
         pollid: pollid,
         author: author,
         options: options,
      };
      axios
         .post("/post/poll/revertVote", data, {
            headers: {
               authorization: "Bearer " + token,
            },
         })
         .then((res) => {
            if (res.data) {
               let ws_data = {
                  event: "poll-vote",
                  data: { pollid, options },
               };
               clientEventDispatcher(ws_data);
               dispatch(updateUserPollVote(res.data));
            }
         })
         .catch((err) => {
            dispatch(setNotification(0, "Oops! Your vote could not be saved"));
         });
   };

export const addComment = (token, postid, text, author) => (dispatch) => {
   let data = {
      postid,
      text,
      author,
   };
   axios
      .post("/post/add-comment", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         if (res.data.error) {
            dispatch(
               setNotification(0, "Oops! Your comment could not be saved")
            );
         }
         if (res.data.comment) {
            dispatch(appendNewComment(res.data.comment));
         }
      })
      .catch((err) => {
         dispatch(setNotification(0, "Oops! Your comment could not be saved"));
      });
};
export const deleteComment = (token, commentid, postid) => (dispatch) => {
   let data = {
      commentid,
   };
   axios
      .delete("/post/remove-comment", {
         headers: {
            authorization: "Bearer " + token,
         },
         data,
      })
      .then((res) => {
         if (res.data.error) {
            dispatch(
               setNotification(0, "Oops! Your comment could not be deleted1")
            );
         } else if (res.data.msg) {
            dispatch(removeComment({ commentid, postid }));
         }
      })
      .catch((err) => {
         dispatch(
            setNotification(0, "Oops! Your comment could not be deleted2")
         );
      });
};
