import axios from "../../lib/axios";
import {
   SET_LOGO_LOADER,
   SET_SPINNER_LOADER,
   setNotification,
} from "../../redux/actions/sharedActions";

const saveUserData_LS = async (
   authToken,
   userId,
   userName,
   userEmail,
   userType,
   userProfilePic,
   expiryDate
) => {
   try {
      await localStorage.setItem("weGrad_USER_AUTH_TOKEN", authToken);
      await localStorage.setItem("weGrad_USER_ID", userId);
      await localStorage.setItem("weGrad_USER_NAME", userName);
      await localStorage.setItem("weGrad_USER_EMAIL", userEmail);
      await localStorage.setItem("weGrad_USER_TYPE", userType);
      await localStorage.setItem("weGrad_USER_PROFILE_PIC", userProfilePic);
      await localStorage.setItem("weGrad_USER_AUTH_EXPIRY", expiryDate);
   } catch (err) {}
};

export const setAuthtoken = (token) => ({
   type: "SET_AUTH_TOKEN",
   payload: token,
});
export const setAuthtokenExpiry = (expiry) => ({
   type: "SET_AUTH_TOKEN_EXPIRY",
   payload: expiry,
});
export const setUser = (user) => ({
   type: "SET_USER",
   payload: user,
});

const SET_USER_PROFILE_PIC = (profilePic) => ({
   type: "SET_USER_PROFILE_PIC",
   payload: profilePic,
});

export const setUserProfilePic = (profilePic) => (dispatch) => {
   localStorage.setItem("weGrad_USER_PROFILE_PIC", JSON.stringify(profilePic));
   dispatch(SET_USER_PROFILE_PIC(profilePic));
};

export const setSignupEmail = (email) => ({
   type: "SET_SIGNUP_EMAIL",
   payload: email,
});
export const setOTPVerified = (status) => ({
   type: "SET_OTP_VERIFIED",
   payload: status,
});

export const signupUser = (fullName, email, password) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   const data = {
      fullName: fullName,
      email: email,
      password: password,
   };
   axios
      .post("/auth/signup", data)
      .then((res) => {
         if (res.data.msg) {
            dispatch(setNotification(1, res.data.msg));
            dispatch(SET_SPINNER_LOADER(false));
            setTimeout(() => dispatch(setSignupEmail(email)), 2700);
         }
         if (res.data.err) {
            dispatch(setNotification(0, res.data.err));
            dispatch(SET_SPINNER_LOADER(false));
         }
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};
export const verifyOTP = (email, OTP) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));
   const data = {
      email: email,
      otp: OTP,
   };
   axios
      .post("/auth/verify/otp", data)
      .then((res) => {
         if (res.data.err) {
            dispatch(setNotification(0, res.data.err));
            dispatch(SET_SPINNER_LOADER(false));
         }
         if (res.data.msg) {
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(setNotification(1, res.data.msg));
            setTimeout(() => dispatch(setOTPVerified(true)), 2500);
         }
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};

export const signinUser = (email, password) => (dispatch) => {
   dispatch(SET_SPINNER_LOADER(true));

   const data = {
      email: email,
      password: password,
   };
   axios
      .post("/auth/signin", data)
      .then((res) => {
         if (res.data.msg) {
            let expiryDate = new Date(
               new Date().getTime() + res.data.expiresIn * 1000
            );
            let user = {
               _id: res.data._id,
               fullName: res.data.userName,
               email: res.data.userEmail,
               type: res.data.userType,
               profilePic: res.data.profilePic,
            };
            // dispatch(setUser(user));
            // dispatch(setAuthtoken(res.data.token));
            // dispatch(setAuthtokenExpiry(expiryDate));
            dispatch(SET_SPINNER_LOADER(false));
            dispatch(setNotification(1, 'Signin done!'));
            // saveUserData_LS(
            //    res.data.token,
            //    res.data._id,
            //    res.data.userName,
            //    res.data.userEmail,
            //    res.data.userType,
            //    res.data.profilePic
            //       ? JSON.stringify(res.data.profilePic)
            //       : "null",
            //    expiryDate
            // );
         }
         if (res.data.err) {
            dispatch(setNotification(0, res.data.err));
            dispatch(SET_SPINNER_LOADER(false));
         }
      })
      .catch((err) => {
         dispatch(SET_SPINNER_LOADER(false));
         dispatch(setNotification(0, "Server not reachable"));
      });
};
export const signoutUser = () => (dispatch) => {
   dispatch(setNotification(0, "Session Expired"));
   localStorage.removeItem("weGrad_USER_AUTH_TOKEN");
   localStorage.removeItem("weGrad_USER_ID");
   localStorage.removeItem("weGrad_USER_TYPE");
   localStorage.removeItem("weGrad_USER_NAME");
   localStorage.removeItem("weGrad_USER_EMAIL");
   localStorage.removeItem("weGrad_USER_PROFILE_PIC");
   localStorage.removeItem("weGrad_USER_AUTH_EXPIRY");
   dispatch(setAuthtoken(null));
   dispatch(setAuthtokenExpiry(null));
   dispatch(
      setUser({
         _id: null,
         fullName: null,
         email: null,
         type: null,
         profilePic: null,
      })
   );
};
