const INITIAL_STATE = {
   fetching: true,
   userProfile: null,
   updating: false,
   alumni:[],
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
      case "SET_ALUMNI":
         return {
            ...state,
            alumni: action.payload,
         };
      default:
         return state;
   }
};

export default profileReducer;
