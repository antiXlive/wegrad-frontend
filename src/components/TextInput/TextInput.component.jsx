import React, { useState } from "react";
import styled from "styled-components";

const InputDiv = styled.div`
   width: 100%;
   /* height: 40px; */
   margin-bottom: 20px;
   /* border: 1px solid red; */

   p {
      font-size: 10px;
      margin: 0;
      margin-bottom: 8px;
      letter-spacing: 2px;
      color: #333;
      font-weight: 500;
   }
   .inputBox {
      position: relative;
      /* width: 100%; */
      /* min-height: 30px; */
      /* border-radius: 10px; */
      /* border-radius: ; */
      /* border: 1px solid blue; */

      input {
         width: 100%;
         height: 35px;
         /* min-height: 30px; */
         /* height: 100%; */
         outline: none;
         border: 1px solid ${(props) => props.bcolor};
         background-color: transparent;
         padding-left: 2%;
         letter-spacing: 1.5px;
         border-radius: 4px;
         font-size: clamp(11px, 3vw, 13px);
         &:focus {
            outline: none;
            border: 1px solid ${(props) => props.bcolor};
         }
      }
   }
`;

const Textinput = (props) => {
   const [errorMsg, setErrMsg] = useState("");
   const [touched, setTouched] = useState(false);

   const handleChange = (e) => {
      if (!touched) setTouched(true);
      if (!props.validator(e.target.value)) setErrMsg(props.errMsg);
      else setErrMsg("");
      props.handleChange(e);
   };

   // render(){
   return (
      <InputDiv
         bcolor={errorMsg ? "#FF0000" : touched ? "#47b300" : "#666666"}
      >
         <p>{props.label}</p>
         <div className="inputBox">
            <input
               style={{ position: "relative" }}
               name={props.name}
               type={props.type}
               value={props.value}
               onChange={handleChange}
            />
         </div>
         {errorMsg && (
            <p
               style={{
                  color: "red",
                  textAlign: "right",
                  marginTop: "1.5%",
                  fontSize: "clamp(10px,2vw,12px)",
                  letterSpacing: 0,
               }}
            >
               {errorMsg}
            </p>
         )}
      </InputDiv>
   );
   // }
};
export default Textinput;
