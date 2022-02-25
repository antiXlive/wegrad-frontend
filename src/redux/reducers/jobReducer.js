const INITIAL_STATE = {
   jobs: null,
   job:null
};

export const jobReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_JOBS":
         return {
            ...state,
            jobs: action.payload,
         };
      case "SET_JOB":
         return {
            ...state,
            job: action.payload,
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
