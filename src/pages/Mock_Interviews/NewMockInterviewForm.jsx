import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Div, Card, Button } from "./NewMockInterviewForm.styles";

import { saveMI } from "../../redux/actions/mockInterviewActions";

const NewMockInterviewForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const USER = useSelector((state) => state.auth.user);
   const GO_BACK = useSelector((state) => state.shared.goBack);

   useEffect(() => {
      document.title = "New Mock Interview";
   });
   useEffect(() => {
      if (GO_BACK) navigate(-1);
   }, [GO_BACK]);

   const [mi, setMI] = useState({
      topic: "",
      interviewer: "",
      studentLimit: 1,
      link: "",
      date: "",
   });

   const textInputHandler = (category, field, value) => {
      switch (category) {
         case "MI": {
            let tmp = { ...mi };
            tmp[field] = value;
            if (field === "description") tmp[field] = tmp[field].slice(0, 1000);
            else tmp[field] = tmp[field].slice(0, 42);
            setMI(tmp);
            break;
         }
         default: {
            break;
         }
      }
   };

   const handleSaveNewMI = () => {
      if (mi.topic && mi.studentLimit && mi.date && mi.link) {
         let data = {
            interviewer: USER._id,
            topic: mi.topic,
            studentLimit: mi.studentLimit,
            link: mi.link,
            date: mi.date,
         };
         dispatch(saveMI(TOKEN, data));
      }
   };

   return (
      <Div>
         <div className="header-card">
            <p>Schedule New Mock Interview</p>
         </div>
         <Card id="basic-info">
            <div className="title">
               <p>Mock Interview Details</p>
            </div>
            <div className="text-input">
               <p>Topic</p>
               <input
                  type="text"
                  value={mi.topic}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("MI", "topic", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Student Limit</p>
               <select
                  name="studentLimit"
                  value={mi.studentLimit}
                  onChange={(e) =>
                     textInputHandler("MI", "studentLimit", e.target.value)
                  }
               >
                  {Array.from({ length: 5 }, (_, i) => (
                     <option value={i + 1}>{i + 1}</option>
                  ))}
               </select>
            </div>
            <div className="text-input">
               <p>Link</p>
               <input
                  type="text"
                  value={mi.link}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("MI", "link", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Date:</p>
               <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={mi.date}
                  onChange={(e) =>
                     textInputHandler("MI", "date", e.target.value)
                  }
               />
            </div>
         </Card>
         <Button onClick={handleSaveNewMI} whileTap={{ scale: 0.9 }}>
            <p>SAVE</p>
         </Button>
      </Div>
   );
};
export default NewMockInterviewForm;
