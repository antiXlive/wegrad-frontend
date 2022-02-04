const INITIAL_STATE = {
   jobs: null,
};

export const jobReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_JOB":
         return {
            ...state,
            jobs: action.payload,
         };
      case "APPEND_NEW_JOB":
         return {
            ...state,
            jobs: action.payload,
            ...state.jobs,
         };
      default: {
         return state;
      }
   }
};
