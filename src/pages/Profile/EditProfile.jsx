import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Div, Card, Button } from "./EditProfile.styles";

import {
   fetchUserProfile,
   updateProfile,
} from "../../redux/actions/profileActions";

const EditProfile = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const x = useLocation();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const USER = useSelector((state) => state.auth.user);
   const USER_PROFILE = useSelector(
      (state) => state.profileReducer.userProfile
   );
   const FETCHING = useSelector((state) => state.profileReducer.fetching);
   const GO_BACK = useSelector((state) => state.shared.goBack);

   useEffect(() => {
      document.title = "Edit Profile";
   });
   useEffect(() => {
      if (GO_BACK) navigate(-1);
   }, [GO_BACK]);
   useEffect(() => {
      if (!FETCHING) {
         const id = x.hash.replace("#", "");
         const element = document.getElementById(id);
         if (element) {
            let offset =
               element.getBoundingClientRect().top + (window.pageYOffset - 100);
            window.scrollTo({
               top: offset,
               behavior: "smooth",
            });
         }
      }
   }, [FETCHING]);
   useEffect(() => {
      dispatch(fetchUserProfile(TOKEN, USER.email));
   }, []);

   const [generalInfo, setGeneralInfo] = useState({
      fn: "",
      cc: "",
      cd: "",
      abm: "",
   });
   const [contactInfo, setContactInfo] = useState({
      cl: "",
      mb: "",
      lnk: "",
      wbs: "",
   });
   const [program, setProgram] = useState({
      dgr: "",
      dpt: "",
      psyr: "",
   });
   const [experience, setExperience] = useState({
      cmp: "",
      dsg: "",
      sd: "",
      ed: "",
   });
   const [addedProgram, setAddedProgram] = useState([]);
   const [addedExperience, setAddedExperience] = useState([]);

   useEffect(() => {
      if (USER_PROFILE) {
         setGeneralInfo({
            fn: USER_PROFILE.fullName ? USER_PROFILE.fullName : "",
            cc: USER_PROFILE.currentCompany ? USER_PROFILE.currentCompany : "",
            cd: USER_PROFILE.currentDesignation
               ? USER_PROFILE.currentDesignation
               : "",
            abm: USER_PROFILE.about ? USER_PROFILE.about : "",
         });
         setContactInfo({
            cl: USER_PROFILE.location ? USER_PROFILE.location : "",
            mb: USER_PROFILE.mobile ? USER_PROFILE.mobile : "",
            lnk: USER_PROFILE.linkedin ? USER_PROFILE.linkedin : "",
            wbs: USER_PROFILE.website ? USER_PROFILE.website : "",
         });
         if (USER_PROFILE.completedPrograms)
            setAddedProgram(USER_PROFILE.completedPrograms);
         if (USER_PROFILE.experiences)
            setAddedExperience(USER_PROFILE.experiences);
      }
   }, [USER_PROFILE]);

   const textInputHandler = (category, field, value) => {
      switch (category) {
         case "GINFO": {
            let tmp = { ...generalInfo };
            tmp[field] = value;
            if (field === "abm") tmp[field] = tmp[field].slice(0, 300);
            else tmp[field] = tmp[field].slice(0, 42);
            setGeneralInfo(tmp);
            break;
         }
         case "CINFO": {
            let tmp = { ...contactInfo };
            tmp[field] = value;
            tmp[field] = tmp[field].slice(0, 42);
            setContactInfo(tmp);
            break;
         }
         case "PRGM": {
            let tmp = { ...program };
            tmp[field] = value;
            if (field == "psyr") tmp[field] = tmp[field].slice(0, 4);
            else tmp[field] = tmp[field].slice(0, 42);

            setProgram(tmp);
            break;
         }
         case "EXP": {
            let tmp = { ...experience };
            tmp[field] = value;
            tmp[field] = tmp[field].slice(0, 42);
            setExperience(tmp);
            break;
         }
         default: {
            break;
         }
      }
   };
   const addNewProgram = () => {
      if (program.dgr && program.dpt && program.psyr) {
         let tmp = addedProgram;
         tmp.push({
            degree: program.dgr,
            department: program.dpt,
            year: program.psyr,
         });
         setAddedProgram(tmp);
         setProgram({ dgr: "", dpt: "", psyr: "" });
      }
   };
   const removeAddedProgram = (index) => {
      let tmp = [...addedProgram];
      tmp.splice(index, 1);
      setAddedProgram(tmp);
   };
   const addNewExperience = () => {
      if (experience.cmp && experience.dsg && experience.sd && experience.ed) {
         let tmp = addedExperience;
         tmp.push({
            company: experience.cmp,
            designation: experience.dsg,
            from: experience.sd,
            to: experience.ed,
         });
         setAddedExperience(tmp);
         setExperience({
            cmp: "",
            dsg: "",
            sd: "",
            ed: "",
         });
      }
   };
   const removeAddedExperience = (index) => {
      let tmp = [...addedExperience];
      tmp.splice(index, 1);
      setAddedExperience(tmp);
   };

   const handleUpdateProfile = () => {
      let updateData = {
         _id: USER_PROFILE._id,
         user: USER_PROFILE.user,
         fullName: generalInfo.fn,
         currentCompany: generalInfo.cc,
         currentDesignation: generalInfo.cd,
         about: generalInfo.abm,
         location: contactInfo.cl,
         mobile: contactInfo.mb,
         linkedin: contactInfo.lnk,
         website: contactInfo.wbs,
         experiences: addedExperience,
         completedPrograms: addedProgram,
      };
      dispatch(updateProfile(TOKEN, updateData));
   };

   return (
      <Div>
         <div className="header-card">
            <p>Update Your Profile</p>
         </div>
         <Card id="basic-info">
            <div className="title">
               <p>General Info</p>
            </div>
            <div className="text-input">
               <p>Full Name:</p>
               <input
                  type="text"
                  value={generalInfo.fn}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("GINFO", "fn", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Current Company:</p>
               <input
                  type="text"
                  value={generalInfo.cc}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("GINFO", "cc", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Current Designation:</p>
               <input
                  type="text"
                  value={generalInfo.cd}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("GINFO", "cd", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>About Me:</p>
               <textarea
                  maxLength={300}
                  value={generalInfo.abm}
                  onChange={(e) =>
                     textInputHandler("GINFO", "abm", e.target.value)
                  }
               ></textarea>
            </div>
         </Card>
         <Card id="programs-completed">
            <div className="title">
               <p>Programs Completed at IIITM</p>
            </div>
            {addedProgram
               ? addedProgram.map((program, index) => {
                    return (
                       <div className="chip" key={index}>
                          <div className="one">
                             <p>{program.year}</p>
                          </div>
                          <div className="two">
                             <p>{program.degree}</p>
                             <p>{program.department}</p>
                          </div>
                          <div
                             className="three"
                             onClick={() => removeAddedProgram(index)}
                          >
                             <svg width="16" height="16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                             </svg>
                          </div>
                       </div>
                    );
                 })
               : null}
            <div className="text-input">
               <p>Program/Degree</p>
               <select
                  name="degree"
                  id="degree"
                  value={program.dgr}
                  onChange={(e) =>
                     textInputHandler("PRGM", "dgr", e.target.value)
                  }
               >
                  <option value="">Select Degree</option>
                  <option value="Bachelors of Technology">
                     Bachelors of Technology
                  </option>
                  <option value="Masters of Technology">
                     Masters of Technology
                  </option>
                  <option value="Doctor of Philosophy">
                     Doctor of Philosophy
                  </option>
               </select>
            </div>
            <div className="text-input">
               <p>Department</p>
               <select
                  name="department"
                  id="department"
                  value={program.dpt}
                  onChange={(e) =>
                     textInputHandler("PRGM", "dpt", e.target.value)
                  }
               >
                  <option value="">Select Department</option>
                  <option value="Computer Science and Engineering">
                     Computer Science and Engineering
                  </option>
                  <option value="Electronics and Communication Engineering">
                     Electronics and Communication Engineering
                  </option>
                  <option value="Humanities and Social Sciences">
                     Humanities and Social Sciences
                  </option>
               </select>
            </div>
            <div className="text-input">
               <p>Passout Year</p>
               <input
                  type="number"
                  maxLength="4"
                  value={program.psyr}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 4))
                  }
                  onChange={(e) =>
                     textInputHandler("PRGM", "psyr", e.target.value)
                  }
               />
            </div>
            <div className="new-button" onClick={addNewProgram}>
               <svg width="16" height="16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
               </svg>
               <p>Add Program</p>
            </div>
         </Card>
         <Card id="professional-experience">
            <div className="title">
               <p>Professional Experience</p>
            </div>
            {addedExperience
               ? addedExperience.map((experience, index) => {
                    return (
                       <div className="chip" key={index}>
                          <div className="one-e">
                             <p>
                                {experience.company}, {experience.designation}
                             </p>
                             <p>
                                {experience.from} - {experience.to}
                             </p>
                          </div>
                          <div
                             className="three"
                             onClick={() => removeAddedExperience(index)}
                          >
                             <svg width="16" height="16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                             </svg>
                          </div>
                       </div>
                    );
                 })
               : null}
            <div className="text-input">
               <p>Company/Organisation:</p>
               <input
                  type="text"
                  value={experience.cmp}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("EXP", "cmp", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Designation</p>
               <input
                  type="text"
                  value={experience.dsg}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("EXP", "dsg", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Start Date:</p>
               <input
                  type="date"
                  max={experience.ed}
                  value={experience.sd}
                  onChange={(e) =>
                     textInputHandler("EXP", "sd", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>End Date:</p>
               <input
                  type="date"
                  min={experience.sd}
                  value={experience.ed}
                  onChange={(e) =>
                     textInputHandler("EXP", "ed", e.target.value)
                  }
               />
            </div>
            <div className="new-button" onClick={addNewExperience}>
               <svg width="16" height="16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
               </svg>
               <p>Add Experience</p>
            </div>
         </Card>
         <Card id="contact-info">
            <div className="title">
               <p>Contact Information</p>
            </div>
            <div className="text-input">
               <p>Current Location:</p>
               <input
                  type="text"
                  value={contactInfo.cl}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("CINFO", "cl", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Mobile</p>
               <input
                  type="text"
                  value={contactInfo.mb}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("CINFO", "mb", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Linkedin</p>
               <input
                  type="text"
                  value={contactInfo.lnk}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("CINFO", "lnk", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Website</p>
               <input
                  type="text"
                  value={contactInfo.wbs}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("CINFO", "wbs", e.target.value)
                  }
               />
            </div>
         </Card>
         <Button onClick={handleUpdateProfile}>
            <p>SAVE</p>
         </Button>
      </Div>
   );
};
export default EditProfile;
