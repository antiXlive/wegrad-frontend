const INITIAL_STATE = {
   interviewExperiences: null,
   interviewExperience: null,
};

export const interviewExperienceReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_INTERVIEW_EXPERIENCES":
         return {
            ...state,
            interviewExperiences: action.payload,
         };
      case "SET_INTERVIEW_EXPERIENCE":
         return {
            ...state,
            interviewExperience: action.payload,
         };
      case "APPEND_NEW_INTERVIEW_EXPERIENCE":
         return {
            ...state,
            interviewExperiences: action.payload,
            ...state.interviewExperiences,
         };
      default: {
         return state;
      }
   }
};
