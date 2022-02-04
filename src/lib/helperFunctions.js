import axiosInstance from "./axios";

export const timeFormatter = (time) => {
   time = new Date(time);
   let s = Math.floor((new Date() - time) / 1000);
   let interval = s / 31536000;
   if (interval > 1) return Math.floor(interval) + "yr";
   interval = s / 2592000;
   if (interval > 1) return Math.floor(interval) + "mo";
   interval = s / 86400;
   if (interval > 1) return Math.floor(interval) + "d";
   interval = s / 3600;
   if (interval > 1) return Math.floor(interval) + "h";
   interval = s / 60;
   if (interval > 1) return Math.floor(interval) + "m";
   return Math.abs(s < 2 ? s + 1 : s) + "s";
};

export const validateFullname = (name) => {
   return name.length > 4;
};

export const validateEmail = (email) => {
   const normalEmailValidator =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const iiitmEmailValidator = /@iiitmanipur.ac.in\s*$/;
   if (normalEmailValidator.test(email)) {
      return iiitmEmailValidator.test(email);
   }
};
export const validatePassword = (password) => {
   return password.length > 7;
};

export const fileValidator = (type, file) => {
   return new Promise(async (resolve, reject) => {
      const allowedImage = [
         "image/jpeg",
         "image/jpg",
         "image/png",
         "image/webp",
      ];
      switch (type) {
         case "image":
            if (allowedImage.includes(file.type)) {
               if (file.size < 2e6) resolve(true);
               else reject("Maximum Allowed File Size : 2Mb");
            } else reject("Allowed File Type : jpeg,jpg,png,webp");
            break;

         default:
            reject("Opps! Something went wrong");
            break;
      }
   });
};
