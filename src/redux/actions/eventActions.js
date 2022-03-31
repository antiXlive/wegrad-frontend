import axios from "../../lib/axios";
import {
   SET_SPINNER_LOADER,
   SET_LOGO_LOADER,
   setNotification,
   setGoBack,
} from "../actions/sharedActions";

const SET_EVENTS = (events) => ({
   type: "SET_EVENTS",
   payload: events,
});
const SET_EVENT = (event) => ({
   type: "SET_EVENT",
   payload: event,
});

const APPEND_NEW_EVENT = (event) => ({
   type: "APPEND_NEW_EVENT",
   payload: event,
});

export const fetchEvents = (token) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/event", {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_EVENTS(res.data));
         dispatch(SET_LOGO_LOADER(false));
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};
export const fetchEvent = (token, id) => (dispatch) => {
   dispatch(SET_LOGO_LOADER(true));
   axios
      .get("/event/" + id, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_EVENT(res.data));
         dispatch(SET_LOGO_LOADER(false));
      })
      .catch((err) => {
         dispatch(SET_LOGO_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};

export const saveEvent = (token, data) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   axios
      .post("/event/create/", data, {
         headers: {
            authorization: "Bearer " + token,
         },
      })
      .then((res) => {
         dispatch(SET_SPINNER_LOADER(false));
         if (res.data.err) {
            dispatch(setNotification(0, "Request Failed"));
         } else {
            dispatch(APPEND_NEW_EVENT(res.data.event));
            dispatch(setNotification(1, "Event Created Successfully"));
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
