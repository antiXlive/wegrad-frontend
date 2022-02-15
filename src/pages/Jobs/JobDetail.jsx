import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Div } from "./Jobs.styles";
import HomeHeader from "../../components/Header/HomeHeader.component";


import { useEffect } from "react";

const JobDetail = () => {
   useEffect(() => {
      document.title = "Jobs | weGrad";
   });
   return (
      <Div>
         <HomeHeader />
         <div
            style={{
               width: "100%",
               height: "auto",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               justifyContent: "space-evenly",
               padding: "5% 0",
               border: "1px solid",
            }}
         >
            <div
               style={{
                  backgroundColor: "#FFF",
                  width: "92vw",
                  minHeight: "70vw",
                  display: "flex",
                  //   alignSelf: "center",
                  alignItems: "center",
                  borderRadius: "4px",
                  flexDirection: "column",
                  boxSizing: "border-box",
                  marginBottom: "5vw",
                  padding: "5vw",
               }}
            >
               <p style={{ fontSize: "18px", margin: 0, fontWeight: "bold" }}>
                  Software Development Engineer I
               </p>
               <p
                  style={{
                     fontSize: "14px",
                     margin: 0,
                     opacity: "0.8",
                     marginTop: "3%",
                  }}
               >
                  Google
               </p>
               <p
                  style={{
                     fontSize: "12px",
                     margin: 0,
                     opacity: "0.8",
                     marginTop: "2%",
                  }}
               >
                  Bengaluru, Karnataka, India
               </p>
               <div
                  style={{
                     //  border: "1px solid red",
                     width: "100%",
                     marginTop: "5%",
                  }}
               >
                  <p
                     style={{
                        fontWeight: "bold",
                        fontSize: "12px",
                     }}
                  >
                     Job Description
                  </p>
                  <p
                     style={{
                        color: "#333",
                        fontSize: "13px",
                        letterSpacing: "1px",
                        lineHeight: "18px",
                     }}
                  >
                     {/* <pre> */}
                        Note: Google’s hybrid workplace includes remote and
                        in-office roles. By applying to this position you will
                        have an opportunity to share your preferred working
                        location from the following: In-office locations:
                        Bengaluru, Karnataka, India. Remote location(s): India.
                        Minimum qualifications: Bachelor's degree in Computer
                        Science, a similar technical field, or equivalent
                        practical experience. 3 years of experience in threat
                        modeling, data anonymization and classification,
                        auditing access to data, and review of requests for data
                        access. Preferred qualifications: Experience in code
                        maintenance and review using general purpose languages.
                        Experience achieving good user outcomes with excellent
                        discussion management skills. Understanding of technical
                        privacy issues (cookie management, encryption), and
                        experience with the software development lifecycle.
                        Understanding and history of applying research to
                        problems. Ability to communicate across disciplines
                        (e.g. engineering, legal, policy). About The Job Whether
                        working on our cloud systems, researching the latest in
                        anonymization, or keeping Google’s internal systems
                        humming, our Privacy Engineers work to create great
                        products that provide great benefit to consumers and at
                        the same time treat their data respectfully, with
                        transparency, and reasonable practices. Both Product and
                        Infrastructure are looking for Privacy Engineers to work
                        on a wide range of important privacy design areas, such
                        as the Google Assistant, and machine learning privacy.
                        We work on protecting users on our platforms and
                        products and in promoting privacy-enhancing design; we
                        do so in partnership with Developer Relations teams. We
                        range from back-end and front-end experts and work
                        cross-functionally with product strategy teams (e.g.,
                        Engineering, Legal, Policy, Developer Relations) and
                        partners (e.g., device manufacturers and third-party
                        developers). Responsibilities Guide Engineering teams
                        during product development to ensure that their data
                        collection and usage practices are transparent, protect
                        user privacy, mitigate risk, and play a role in Google’s
                        product design process and launch cycle. Conduct
                        technical and policy reviews to identify and escalate
                        potential privacy concerns. Lead and manage proactive
                        development of privacy features and tools. Contribute to
                        product/business strategy and public policy and legal
                        initiatives to address and mitigate privacy risks, and
                        conduct outreach to Googlers on Privacy topics. Respond
                        to privacy incidents, if they occur, including
                        collecting information on scope and root cause as well
                        as managing remediation. Google is proud to be an equal
                        opportunity workplace and is an affirmative action
                        employer. We are committed to equal employment
                        opportunity regardless of race, color, ancestry,
                        religion, sex, national origin, sexual orientation, age,
                        citizenship, marital status, disability, gender identity
                        or Veteran status. We also consider qualified applicants
                        regardless of criminal histories, consistent with legal
                        requirements. See also Google's EEO Policy and EEO is
                        the Law. If you have a disability or special need that
                        requires accommodation, please let us know by completing
                        our Accommodations for Applicants form .
                     {/* </pre> */}
                  </p>
               </div>
               <div
                  style={{
                     background: "#0573b9",
                     width: "30vw",
                     height: "10vw",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     borderRadius: "2px",
                  }}
               >
                  <p style={{ margin: 0, color: "#fff" }}>Apply</p>
               </div>
            </div>
         </div>
      </Div>
   );
};
export default JobDetail;
