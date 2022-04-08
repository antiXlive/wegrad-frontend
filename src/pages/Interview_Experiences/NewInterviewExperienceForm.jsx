import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Div, Card, Button } from "../../shared/forms.styles";

import { saveInterviewExperience } from "../../redux/actions/interviewExperienceActions";

const NewInterviewExperienceForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const USER = useSelector((state) => state.auth.user);
   const GO_BACK = useSelector((state) => state.shared.goBack);

   useEffect(() => {
      document.title = "New Interview Experience";
   });
   useEffect(() => {
      if (GO_BACK) navigate(-1);
   }, [GO_BACK]);

   const [ie, setIE] = useState({
      company: "",
      role: "",
      description: "",
      status: null,
      hiring: null,
   });

   const textInputHandler = (category, field, value) => {
      switch (category) {
         case "IE": {
            let tmp = { ...ie };
            tmp[field] = value;
            if (field === "description") tmp[field] = tmp[field].slice(0, 1000);
            else tmp[field] = tmp[field].slice(0, 42);
            setIE(tmp);
            break;
         }
         default: {
            break;
         }
      }
   };

   const handleSaveNewIE = () => {
      if (ie.company && ie.role && ie.description && ie.status && ie.hiring) {
         let data = {
            role: ie.role,
            company: ie.company,
            description: ie.description,
            status: ie.status,
            hiring: ie.hiring,
            author: USER._id,
         };
         dispatch(saveInterviewExperience(TOKEN, data));
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
                  value={ie.company}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("IE", "company", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Role:</p>
               <input
                  type="text"
                  value={ie.role}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("IE", "role", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Description:</p>
               <textarea
                  maxLength={1000}
                  value={ie.description}
                  onChange={(e) =>
                     textInputHandler("IE", "description", e.target.value)
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
                        value={1}
                        onChange={(e) =>
                           textInputHandler("IE", "status", e.target.value)
                        }
                     />
                     <p>Accepted</p>
                  </div>
                  <div className="radio-input">
                     <input
                        className="radio"
                        type="radio"
                        name="status"
                        value={0}
                        onChange={(e) =>
                           textInputHandler("IE", "status", e.target.value)
                        }
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
                        value={1}
                        onChange={(e) =>
                           textInputHandler("IE", "hiring", e.target.value)
                        }
                     />
                     <p>On-Campus</p>
                  </div>
                  <div className="radio-input">
                     <input
                        className="radio"
                        type="radio"
                        name="hiring"
                        value={0}
                        onChange={(e) =>
                           textInputHandler("IE", "hiring", e.target.value)
                        }
                     />
                     <p>Off-Campus</p>
                  </div>
               </div>
            </div>
         </Card>
         <Button onClick={handleSaveNewIE}>
            <p>SAVE</p>
         </Button>
      </Div>
   );
};
export default NewInterviewExperienceForm;
