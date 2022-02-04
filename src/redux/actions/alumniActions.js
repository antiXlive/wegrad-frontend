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