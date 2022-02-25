import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Div, Card, Button } from "./NewJobForm.styles";

import { saveJob } from "../../redux/actions/jobActions";

const NewJobForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const USER = useSelector((state) => state.auth.user);
   const GO_BACK = useSelector((state) => state.shared.goBack);

   useEffect(() => {
      document.title = "New Job";
   });
   useEffect(() => {
      if (GO_BACK) navigate(-1);
   }, [GO_BACK]);

   const [jd, setJD] = useState({
      company: "",
      role: "",
      location: "",
      description: "",
      link: "",
   });

   const textInputHandler = (category, field, value) => {
      switch (category) {
         case "JD": {
            let tmp = { ...jd };
            tmp[field] = value;
            if (field === "description") tmp[field] = tmp[field].slice(0, 1000);
            else tmp[field] = tmp[field].slice(0, 42);
            setJD(tmp);
            break;
         }
         default: {
            break;
         }
      }
   };

   const handleSaveNewJob = () => {
      if (jd.company && jd.role && jd.location && jd.description && jd.link) {
         let data = {
            role: jd.role,
            company: jd.company,
            location: jd.location,
            description: jd.description,
            link: jd.link,
            author: USER._id,
         };
         dispatch(saveJob(TOKEN, data));
      }
   };

   return (
      <Div>
         <div className="header-card">
            <p>Post New Job</p>
         </div>
         <Card id="basic-info">
            <div className="title">
               <p>Job Details</p>
            </div>
            <div className="text-input">
               <p>Company/Organisation:</p>
               <input
                  type="text"
                  value={jd.company}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("JD", "company", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Role:</p>
               <input
                  type="text"
                  value={jd.role}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("JD", "role", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Location:</p>
               <input
                  type="text"
                  value={jd.location}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("JD", "location", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Description:</p>
               <textarea
                  maxLength={1000}
                  value={jd.description}
                  onChange={(e) =>
                     textInputHandler("JD", "description", e.target.value)
                  }
               ></textarea>
            </div>
            <div className="text-input">
               <p>Apply Link:</p>
               <input
                  type="text"
                  value={jd.link}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("JD", "link", e.target.value)
                  }
               />
            </div>
         </Card>
         <Button onClick={handleSaveNewJob} whileTap={{ scale: 0.9 }}>
            <p>SAVE</p>
         </Button>
      </Div>
   );
};
export default NewJobForm;
