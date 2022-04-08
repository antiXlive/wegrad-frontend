import axios from "axios";
// import {
//    SET_LOGO_LOADER,
//    SET_SPINNER_LOADER,
//    setNotification,
// } from "../redux/actions/sharedActions";

let baseURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
   baseURL = "http://192.168.43.96:3001";
else baseURL = "https://wegrad-backend.herokuapp.com/";

// baseURL = "https://strange-fish-98.loca.lt/";

const axiosInstance = axios.create({
   baseURL: baseURL,
   // timeout: 10000,
   headers: { api_key: process.env.REACT_APP_API_KEY },
   validateStatus: function (status) {
      return status >= 200 && status <= 503;
   },
});

// axiosInstance.interceptors.response.use(
//    function (res) {
//       console.log("piyush => ", res);
//       return res;
//    },
//    function (err) {

//       console.log("piyush 2 => ", err);
//    }
// );

export default axiosInstance;
