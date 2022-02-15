import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Div, Card, Button } from "./NewInterviewExperienceForm.styles";

import { saveJob } from "../../redux/actions/jobActions";

const NewInterviewExperienceForm = () => {
   const dispatch = useDispatch();
   const history = useHistory();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const USER = useSelector((state) => state.auth.user);
   const GO_BACK = useSelector((state) => state.shared.goBack);

   useEffect(() => {
      document.title = "New Job";
   });
   useEffect(() => {
      if (GO_BACK) history.goBack();
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
            <p>Post Your Interview Experience</p>
         </div>
         <Card id="basic-info">
            <div className="title">
               <p>Interview Experience Details</p>
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
               <p>Status</p>
               <div
                  style={{
                     width: "100%",
                     display: "flex",
                  }}
               >
                  <div className="radio-input">
                     <input
                        className="radio"
                        type="radio"
                        name="status"
                        value="HTML"
                     />
                     <p>Accepted</p>
                  </div>
                  <div className="radio-input">
                     <input
                        className="radio"
                        type="radio"
                        name="status"
                        value="HTML"
                     />
                     <p>Rejected</p>
                  </div>
               </div>
            </div>
            <div className="text-input">
               <p>Hiring</p>
               <div
                  style={{
                     width: "100%",
                     display: "flex",
                  }}
               >
                  <div className="radio-input">
                     <input
                        className="radio"
                        type="radio"
                        name="hiring"
                        value="HTML"
                     />
                     <p>On-Campus</p>
                  </div>
                  <div className="radio-input">
                     <input
                        className="radio"
                        type="radio"
                        name="hiring"
                        value="HTML"
                     />
                     <p>Off-Campus</p>
                  </div>
               </div>
            </div>
         </Card>
         <Button onClick={handleSaveNewJob}>
            <p>SAVE</p>
         </Button>
      </Div>
   );
};
export default NewInterviewExperienceForm;
