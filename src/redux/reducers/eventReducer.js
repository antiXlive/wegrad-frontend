const INITIAL_STATE = {
   events: null,
   event: null,
};

export const eventReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_EVENTS":
         return {
            ...state,
            events: action.payload,
         };
      case "SET_EVENT":
         return {
            ...state,
            event: action.payload,
         };
      case "APPEND_NEW_EVENT":
         return {
            ...state,
            events: action.payload,
            ...state.events,
         };
      default: {
         return state;
      }
   }
};
