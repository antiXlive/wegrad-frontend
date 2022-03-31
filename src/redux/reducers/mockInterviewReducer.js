const INITIAL_STATE = {
   mis: null,
   mi: null,
};

export const mockInterviewReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_MIS":
         return {
            ...state,
            mis: action.payload,
         };
      case "SET_MI":
         return {
            ...state,
            mi: action.payload,
         };
      case "APPEND_NEW_MI":
         return {
            ...state,
            mis: action.payload,
            ...state.mis,
         };
      default: {
         return state;
      }
   }
};
