import axios from "../../lib/axios";
import {
   SET_LOGO_LOADER,
   SET_SPINNER_LOADER,
   setNotification,
   setGoBack,
} from "../actions/sharedActions";

import { setUserProfilePic } from "../actions/authActions";

const setUserProfile = (profile) => ({
   type: "SET_USER_PROFILE",
   payload: profile,
});
const setAlumni = (alumni) => ({
   type: "SET_ALUMNI",
   payload: alumni,
});
const setUpdating = (status) => ({
   type: "SET_UPDATING",
   payload: status,
});
export const setSearchedUsers = (users) => ({
   type: "SET_SEARCHED_USERS",
   payload: users,
});

export const fetchUserProfile = (token, email) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
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
         dispatch(SET_LOGO_LOADER(false));
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};

export const updateProfilePic = (token, userid, photo) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
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
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(setUpdating("failed"));
            dispatch(setNotification(0, "Profile pic update failed"));
         } else {
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(setUpdating("succeed"));
            dispatch(setNotification(1, "Profile pic updated"));
            dispatch(setUserProfilePic(res.data.data));
         }
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setUpdating("failed"));
         dispatch(setNotification(0, "Profile pic update failed"));
      });
};
export const updateCoverPic = (token, userid, photo) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
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
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(setUpdating("failed"));
            dispatch(setNotification(0, "Cover pic update failed"));
         } else {
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(setUpdating("succeed"));
            dispatch(setNotification(1, "Cover pic updated"));
         }
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setUpdating("failed"));
         dispatch(setNotification(0, "Cover pic update failed"));
      });
};

export const updateProfile = (token, data) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   axios
      .post("/user/update-profile", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         if (res.data.err) {
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(
               setNotification(0, "Oops! Your profile could not be updated")
            );
         } else if (res.data.msg) {
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(setNotification(1, res.data.msg));
            setTimeout(function () {
               dispatch(setGoBack());
            }, 1000);
         }
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(
            setNotification(0, "Oops! Your profile could not be updated")
         );
      });
};

export const fetchAlumni = (token) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/user/alumni", {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         if (res.data.err) {
            dispatch(SET_LOGO_LOADER(false));
         } else if (res.data) {
            dispatch(setAlumni(res.data));
            dispatch(SET_LOGO_LOADER(false));
         }
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
      });
};

export const searchUser = (token, searchQuery) => (dispatch) => {
   axios
      .get("/user/search", {
         headers: {
            authorization: "Bearer " + token,
         },
         params: {
            searchQuery: searchQuery,
         },
      })
      .then((res) => {
         if (!res.data.err) dispatch(setSearchedUsers(res.data));
      })
      .catch((err) => {
         // dispatch(SET_LOGO_LOADER(false));
      });
};
