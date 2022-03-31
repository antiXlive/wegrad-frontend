import axios from "../../lib/axios";
import {
   SET_SPINNER_LOADER,
   SET_LOGO_LOADER,
   setNotification,
   setGoBack,
} from "../actions/sharedActions";

const SET_INTERVIEW_EXPERIENCES = (interviewExperiences) => ({
   type: "SET_INTERVIEW_EXPERIENCES",
   payload: interviewExperiences,
});
const SET_INTERVIEW_EXPERIENCE = (interviewExperience) => ({
   type: "SET_INTERVIEW_EXPERIENCE",
   payload: interviewExperience,
});

const APPEND_INTERVIEW_EXPERIENCE = (interviewExperience) => ({
   type: "APPEND_INTERVIEW_EXPERIENCE",
   payload: interviewExperience,
});

export const fetchInterviewExperiences = (token) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/interviewExperience", {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_INTERVIEW_EXPERIENCES(res.data));
         dispatch(SET_LOGO_LOADER(false));
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};
export const fetchInterviewExperience = (token, id) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/interviewExperience/" + id, {
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
         dispatch(SET_SPINNER_LOADER(false));
         if (res.data.err) {
            dispatch(setNotification(0, "Request Failed"));
         } else {
            dispatch(APPEND_INTERVIEW_EXPERIENCE(res.data.interviewExperience));
            dispatch(
               setNotification(1, "Interview Experience Posted Successfully")
            );
            setTimeout(() => {
               dispatch(setGoBack());
            }, 2500);
         }
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};
