import axios from "axios";

let baseURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
   baseURL = "http://192.168.43.96:3001";
else baseURL = "https://wegrad-backend.herokuapp.com/";

const axiosInstance = axios.create({
   baseURL: baseURL,
   // timeout: 10000,
   headers: { api_key: "e52ss1bl50ba-67tc4-s482o6-8h2e6-8fdde8cc779f" },
   validateStatus: function (status) {
      return status >= 200 && status <= 503;
   },
});

export default axiosInstance;
