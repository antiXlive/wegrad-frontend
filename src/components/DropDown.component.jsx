import React from "react";

import { Div, Option } from "./DropDown.component.styles";

const DropDown = (props) => {
   return (
      <>
         <div
            style={{
               position: "fixed",
               top: 0,
               right: 0,
               bottom: 0,
               left: 0,
               zIndex: 100,
            }}
            onClick={() => {
               props.handleDropDown(false);
            }}
         ></div>
         <Div>
            {props.options.map((option, index) => {
               return (
                  <Option key={index} onClick={() => option.action()}>
                     <div className="icon">{option.icon}</div>
                     <div className="title">
                        <p>{option.title}</p>
                     </div>
                  </Option>
               );
            })}
         </Div>
      </>
   );
};
export default DropDown;
