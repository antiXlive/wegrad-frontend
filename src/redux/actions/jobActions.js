import axios from "../../lib/axios";
import {
   SET_SPINNER_LOADER,
   SET_LOGO_LOADER,
   setNotification,
   setGoBack,
} from "../actions/sharedActions";

const SET_JOBS = (jobs) => ({
   type: "SET_JOBS",
   payload: jobs,
});
const SET_JOB = (job) => ({
   type: "SET_JOB",
   payload: job,
});

const APPEND_NEW_JOB = (job) => ({
   type: "APPEND_NEW_JOB",
   payload: job,
});

export const fetchJobs = (token) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/job", {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_JOBS(res.data));
         dispatch(SET_LOGO_LOADER(false));
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};
export const fetchJob = (token, id) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/job/" + id, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_JOB(res.data));
         dispatch(SET_LOGO_LOADER(false));
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};

export const saveJob = (token, data) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   axios
      .post("/job/create/", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(APPEND_NEW_JOB(res.data.job));
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setNotification(1, "Job Posted Successfully"));
         setTimeout(() => {
            dispatch(setGoBack());
         }, 2500);
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};
