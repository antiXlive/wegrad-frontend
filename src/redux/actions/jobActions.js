import axios from "../../lib/axios";
import {
   SET_SPINNER_LOADER,
   SET_LOGO_LOADER,
   setNotification,
   setGoBack,
} from "../actions/sharedActions";

const SET_JOB = (jobs) => ({
   type: "SET_JOB",
   payload: jobs,
});

const APPEND_NEW_JOB = (job) => ({
   type: "APPEND_NEW_JOB",
   payload: job,
});

export const fetchJob = (token) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/job", {
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
