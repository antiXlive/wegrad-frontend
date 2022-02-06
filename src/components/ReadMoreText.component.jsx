import React, { useState } from "react";
import styled from "styled-components";

const Text = styled.p`
   font-size: 14px;
   color: #000000e6;
   line-height: 22px;
   font-weight: 370;
   white-space: pre-wrap;
   padding: 0 10px;
`;

const ReadMoreText = (props) => {
   const [expand, setExpand] = useState(false);
   const [words, setWords] = useState(props.text.length);
   const [lines, setLines] = useState(props.text.split(/\n/g).length);

   if (words < 200 && lines < 6) {
      return <Text>{props.text}</Text>;
   } else {
      let splittedText = props.text.split(/\n/g);
      let trimmedText = splittedText[0];
      let i = 1;
      while (i < 6 && i < splittedText.length)
         trimmedText += "\n" + splittedText[i++];
      trimmedText = trimmedText.slice(0, 200);
      return expand ? (
         <Text>{props.text}</Text>
      ) : (
         <Text>
            {trimmedText}
            {"     "}
            <span
               style={{ opacity: 0.6, cursor: "pointer" }}
               onClick={() => setExpand(true)}
            >
               ...read more
            </span>
         </Text>
      );
   }
};

export default ReadMoreText;
