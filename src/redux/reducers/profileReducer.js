const INITIAL_STATE = {
   fetching: true,
   userProfile: null,
   updating: false,
};

const profileReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_USER_PROFILE":
         return {
            ...state,
            userProfile: action.payload,
            fetching: action.payload ? false : true,
         };
      case "SET_UPDATING":
         return {
            ...state,
            updating: action.payload,
         };
      default:
         return state;
   }
};

export default profileReducer;
