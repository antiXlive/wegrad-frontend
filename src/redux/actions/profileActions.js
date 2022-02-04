import axios from "../../lib/axios";
import {
   setLoader,
   setNotification,
   setGoBack,
} from "../actions/sharedActions";

import { setUserProfilePic } from "../actions/authActions";

const setUserProfile = (profile) => ({
   type: "SET_USER_PROFILE",
   payload: profile,
});
const setUpdating = (status) => ({
   type: "SET_UPDATING",
   payload: status,
});

export const fetchUserProfile = (token, email) => (dispatch) => {
   dispatch(setUserProfile(null));
   axios
      .get("/user/profile/", {
         headers: {
            authorization: "Bearer " + token,
         },
         params: {
            email: email,
         },
      })
      .then((res) => {
         let experiences = res.data.experiences;
         let completedPrograms = res.data.completedPrograms;
         completedPrograms.sort((a, b) => {
            return b.year - a.year;
         });
         experiences.sort((a, b) => {
            return new Date(b.from).getTime() - new Date(a.from).getTime();
         });
         delete res.data["completedPrograms"];
         delete res.data["experiences"];
         dispatch(
            setUserProfile({ ...res.data, completedPrograms, experiences })
         );
      })
      .catch((err) => {
         dispatch(setNotification(0, "Server not reachable"));
      });
};

export const updateProfilePic = (token, userid, photo) => (dispatch) => {
   dispatch(setUpdating(true));
   let data = new FormData();
   data.append("userid", userid);
   data.append("photo", photo);
   axios
      .post("/user/profile-pic", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         if (res.data.err) {
            dispatch(setUpdating("failed"));
            dispatch(setNotification(0, "Profile pic update failed"));
         } else {
            dispatch(setUpdating("succeed"));
            dispatch(setNotification(1, "Profile pic updated"));
            dispatch(setUserProfilePic(res.data.data));
         }
      })
      .catch((err) => {
         dispatch(setUpdating("failed"));
         dispatch(setNotification(0, "Profile pic update failed"));
      });
};
export const updateCoverPic = (token, userid, photo) => (dispatch) => {
   dispatch(setUpdating(true));
   let data = new FormData();
   data.append("userid", userid);
   data.append("photo", photo);
   axios
      .post("/user/cover-pic", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         if (res.data.err) {
            dispatch(setUpdating("failed"));
            dispatch(setNotification(0, "Cover pic update failed"));
         } else {
            dispatch(setUpdating("succeed"));
            dispatch(setNotification(1, "Cover pic updated"));
         }
      })
      .catch((err) => {
         dispatch(setUpdating("failed"));
         dispatch(setNotification(0, "Cover pic update failed"));
      });
};

export const updateProfile = (token, data) => (dispatch) => {
   axios
      .post("/user/update-profile", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         if (res.data.err) {
            dispatch(
               setNotification(0, "Oops! Your profile could not be updated")
            );
         } else if (res.data.msg) {
            dispatch(setNotification(1, res.data.msg));
            setTimeout(function () {
               dispatch(setGoBack());
            }, 1000);
         }
      })
      .catch((err) => {
         dispatch(
            setNotification(0, "Oops! Your profile could not be updated")
         );
      });
};
