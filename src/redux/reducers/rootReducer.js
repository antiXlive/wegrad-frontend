import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sharedReducer from "./sharedReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";
import { jobReducer } from "./jobReducer";
import { interviewExperienceReducer } from "./interviewExperienceReducer";

const rootReducer = combineReducers({
   auth: authReducer,
   shared: sharedReducer,
   postReducer,
   profileReducer,
   jobReducer,
   interviewExperienceReducer,
});

export default rootReducer;
