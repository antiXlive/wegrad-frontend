import axios from "../../lib/axios";
import {
   SET_SPINNER_LOADER,
   SET_LOGO_LOADER,
   setNotification,
   setGoBack,
} from "../actions/sharedActions";

const SET_MIS = (mis) => ({
   type: "SET_MIS",
   payload: mis,
});
const SET_MI = (mi) => ({
   type: "SET_MI",
   payload: mi,
});

const APPEND_NEW_MI = (mi) => ({
   type: "APPEND_NEW_MI",
   payload: mi,
});

export const fetchMIS = (token) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/mockInterview", {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_MIS(res.data));
         dispatch(SET_LOGO_LOADER(false));
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};
export const fetchMI = (token, id) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/mockInterview/" + id, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_MI(res.data));
         dispatch(SET_LOGO_LOADER(false));
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};

export const saveMI = (token, data) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   axios
      .post("/mockInterview/create/", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_SPINNER_LOADER(false));
         if (res.data.err) {
            dispatch(setNotification(0, "Request Failed"));
         } else {
            dispatch(APPEND_NEW_MI(res.data.mi));
            dispatch(setNotification(1, "Mock Interview Created Successfully"));
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
