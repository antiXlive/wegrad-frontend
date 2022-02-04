export const SET_LOGO_LOADER = (status) => ({
   type: "SET_LOGO_LOADER",
   payload: status,
});

export const SET_SPINNER_LOADER = (status) => ({
   type: "SET_SPINNER_LOADER",
   payload: status,
});

export const setNotification = (type, msg) => (dispatch) => {
   dispatch({
      type: "SET_NOTIFICATION",
      notificationType: null,
      notificationMsg: null,
   });
   dispatch({
      type: "SET_NOTIFICATION",
      notificationType: type,
      notificationMsg: msg,
   });
   setTimeout(function () {
      dispatch({
         type: "SET_NOTIFICATION",
         notificationType: null,
         notificationMsg: null,
      });
   }, 2800);
};
export const setGoBack = () => (dispatch) => {
   dispatch({
      type: "SET_GO_BACK",
      payload: true,
   });
   setTimeout(function () {
      dispatch({
         type: "SET_GO_BACK",
         payload: false,
      });
   }, 1000);
};
