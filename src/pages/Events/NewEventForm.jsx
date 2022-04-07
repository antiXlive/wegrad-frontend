import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Div, Card, Button } from "./NewEventForm.styles";

import { saveEvent } from "../../redux/actions/eventActions";

const NewEventForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const TOKEN = useSelector((state) => state.auth.authToken);
   const USER = useSelector((state) => state.auth.user);
   const GO_BACK = useSelector((state) => state.shared.goBack);

   useEffect(() => {
      document.title = "New Event";
   });
   useEffect(() => {
      if (GO_BACK) navigate(-1);
   }, [GO_BACK]);

   const [event, setEvent] = useState({
      name: "",
      speakers: "",
      description: "",
      date: "",
      mode: "",
      venue: "",
      link: "",
   });

   const textInputHandler = (category, field, value) => {
      switch (category) {
         case "EVENT": {
            let tmp = { ...event };
            tmp[field] = value;
            if (field === "description" || field === "link")
               tmp[field] = tmp[field].slice(0, 1000);
            else tmp[field] = tmp[field].slice(0, 42);
            setEvent(tmp);
            break;
         }
         default: {
            break;
         }
      }
   };

   const handleSaveNewEvent = () => {
      if (
         event.name &&
         event.speakers &&
         event.description &&
         event.date &&
         event.mode &&
         (event.venue || event.link)
      ) {
         let data = {
            organizer: USER._id,
            name: event.name,
            speakers: event.speakers,
            description: event.description,
            date: event.date,
            mode: event.mode,
            venue: event.mode == "offline" ? event.venue : "",
            link: event.mode == "online" ? event.link : "",
         };
         dispatch(saveEvent(TOKEN, data));
      }
   };

   return (
      <Div>
         <div className="header-card">
            <p>Schedule New Event</p>
         </div>
         <Card id="basic-info">
            <div className="title">
               <p>Event Details</p>
            </div>
            <div className="text-input">
               <p>Event Name</p>
               <input
                  type="text"
                  value={event.name}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("EVENT", "name", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Speakers</p>
               <input
                  type="text"
                  value={event.speakers}
                  onKeyUp={(e) =>
                     (e.target.value = e.target.value.substring(0, 42))
                  }
                  onChange={(e) =>
                     textInputHandler("EVENT", "speakers", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Description:</p>
               <textarea
                  maxLength={1000}
                  value={event.description}
                  onChange={(e) =>
                     textInputHandler("EVENT", "description", e.target.value)
                  }
               ></textarea>
            </div>
            <div className="text-input">
               <p>Date:</p>
               <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={event.date}
                  onChange={(e) =>
                     textInputHandler("EVENT", "date", e.target.value)
                  }
               />
            </div>
            <div className="text-input">
               <p>Mode</p>
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
                        name="mode"
                        value="online"
                        onChange={(e) =>
                           textInputHandler("EVENT", "mode", e.target.value)
                        }
                     />
                     <p>Online</p>
                  </div>
                  <div className="radio-input">
                     <input
                        className="radio"
                        type="radio"
                        name="mode"
                        value="offline"
                        onChange={(e) =>
                           textInputHandler("EVENT", "mode", e.target.value)
                        }
                     />
                     <p>Offline</p>
                  </div>
               </div>
            </div>
            {event.mode == "online" && (
               <div className="text-input">
                  <p>Meeting Link</p>
                  <input
                     type="text"
                     value={event.link}
                     onKeyUp={(e) =>
                        (e.target.value = e.target.value.substring(0, 200))
                     }
                     onChange={(e) =>
                        textInputHandler("EVENT", "link", e.target.value)
                     }
                  />
               </div>
            )}
            {event.mode == "offline" && (
               <div className="text-input">
                  <p>Venue</p>
                  <input
                     type="text"
                     value={event.venue}
                     onKeyUp={(e) =>
                        (e.target.value = e.target.value.substring(0, 42))
                     }
                     onChange={(e) =>
                        textInputHandler("EVENT", "venue", e.target.value)
                     }
                  />
               </div>
            )}
         </Card>
         <Button onClick={handleSaveNewEvent} whileTap={{ scale: 0.9 }}>
            <p>SAVE</p>
         </Button>
      </Div>
   );
};
export default NewEventForm;
