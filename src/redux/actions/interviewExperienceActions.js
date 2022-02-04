import axios from "../../lib/axios";
import {
   SET_SPINNER_LOADER,
   SET_LOGO_LOADER,
   setNotification,
   setGoBack,
} from "../actions/sharedActions";

const SET_INTERVIEW_EXPERIENCE = (interviewExperiences) => ({
   type: "SET_INTERVIEW_EXPERIENCE",
   payload: interviewExperiences,
});

const APPEND_INTERVIEW_EXPERIENCE = (interviewExperience) => ({
   type: "APPEND_INTERVIEW_EXPERIENCE",
   payload: interviewExperience,
});

export const fetchInterviewExperience = (token) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/interviewExperience", {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_INTERVIEW_EXPERIENCE(res.data));
         dispatch(SET_LOGO_LOADER(false));
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};

export const saveInterviewExperience = (token, data) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   axios
      .post("/interviewExperience/create", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(APPEND_INTERVIEW_EXPERIENCE(res.data.interviewExperience));
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(
            setNotification(1, "Interview Experience Posted Successfully")
         );
         setTimeout(() => {
            dispatch(setGoBack());
         }, 2500);
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};
