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

export const fetchNewsFeed = (token, skip) => (dispatch) => {
   if (!skip) dispatch(SET_LOGO_LOADER(true));
   if (skip) dispatch(setFetchingOld(true));
   else dispatch(setFetchingNew(true));

   let endpoint = skip ? "/post?skip=" + skip : "/post";
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
               if (!skip) {
                  dispatch(setFetchingNew(false));
                  dispatch(setNewsFeed(res.data));
                  dispatch(SET_LOGO_LOADER(false));
               } else {
                  dispatch(setFetchingOld(false));
                  dispatch(appendNewsFeedOld(res.data));
                  dispatch(SET_LOGO_LOADER(false));
               }
            } else {
               if (skip) dispatch(setNoMorePost(true));
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
         dispatch(setNotification(0, "Oops! Your post could not be posted"));
      });
};

export const deletePost = (token, postid, posts) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   let data = {
      id: postid,
   };
   axios
      .post("/post/delete", data, {
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
               // let ws_data = {
               //    event: "new-post",
               //    data: res.data,
               // };
               // clientEventDispatcher(ws_data);
               // dispatch(appendNewsFeed(res.data));
               console.log(res.data);
            }
         })
         .catch((err) => {
            dispatch(setNotification(0, "Oops! Your poll could not be posted"));
         });
   };
