import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sharedReducer from "./sharedReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";
import { jobReducer } from "./jobReducer";
import { eventReducer } from "./eventReducer";
import { mockInterviewReducer } from "./mockInterviewReducer";
import { interviewExperienceReducer } from "./interviewExperienceReducer";

const rootReducer = combineReducers({
   auth: authReducer,
   shared: sharedReducer,
   postReducer,
   profileReducer,
   jobReducer,
   eventReducer,
   mockInterviewReducer,
   interviewExperienceReducer,
});

export default rootReducer;
