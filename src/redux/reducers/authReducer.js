const INITIAL_STATE = {
   signupEmail: null,
   otpVerified: false,
   authToken: null,
   authTokenExpiry: null,
   user: {
      _id: null,
      fullName: null,
      email: null,
      type: null,
      profilePic: null,
   },
};

const authReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_SIGNUP_EMAIL":
         return {
            ...state,
            signupEmail: action.payload,
         };
      case "SET_OTP_VERIFIED":
         return {
            ...state,
            otpVerified: action.payload,
         };
      case "SET_AUTH_TOKEN":
         return {
            ...state,
            authToken: action.payload,
         };
      case "SET_AUTH_TOKEN_EXPIRY":
         return {
            ...state,
            authTokenExpiry: action.payload,
         };
      case "SET_USER":
         return {
            ...state,
            user: action.payload,
         };
      case "SET_USER_PROFILE_PIC":
         return {
            ...state,
            user: {
               _id: state.user._id,
               fullName: state.user.fullName,
               email: state.user.email,
               type: state.user.type,
               profilePic: action.payload,
            },
         };
      default:
         return state;
   }
};

export default authReducer;
