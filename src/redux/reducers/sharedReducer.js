const INITIAL_STATE = {
   logoLoader: false,
   spinnerLoader: false,
   notificationMsg: null,
   notificationType: null,
   goBack: false,
};

const sharedReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_LOGO_LOADER":
         return {
            ...state,
            logoLoader: action.payload,
         };
      case "SET_SPINNER_LOADER":
         return {
            ...state,
            spinnerLoader: action.payload,
         };
      case "SET_NOTIFICATION":
         return {
            ...state,
            notificationMsg: action.notificationMsg,
            notificationType: action.notificationType,
         };
      case "SET_GO_BACK":
         return {
            ...state,
            goBack: action.payload,
         };
      default:
         return state;
   }
};

export default sharedReducer;
