import React, { useState, useEffect, useContext } from "react";
import RingScore from "./RingScore";
import Percentage from "./Percentage";
import { AppContext } from "../context/AppContext";

export default function ElementBlock({ marker }) {
  const { isLoading, configData, detailsActive, toggleDetails, setMarkerDetails } = useContext(AppContext);
  const { id, name, short, latestscore = 0, type, info, textColor, backgroundColor, measurements } = marker;

  const [latestMarker, setLatestMarker] = useState({date:"0"});
  const [score, setScore] = useState(0);


  // Update state with most recent marker and its score
  // useEffect(() => {
  //     // setLatestMarker(latest[0]);
  //     setScore(latestscore);
  // }, [latestscore]);
  // useEffect(() => {
  //     const getLatestMarker = () => {
  //       let latest = measurements.sort(function(a, b) {
  //         let dateA = new Date(a.date),
  //             dateB = new Date(b.date);
  //         return dateB - dateA;
  //       });
  //       setLatestMarker(latest[0]);
  //       setLatestScore(latestMarker.score);
  //     };
  //     getLatestMarker();

  // }, [latestMarker]);

  // Refresh details pane with updated info
  const showDetails = () => {
    setMarkerDetails(marker);
    toggleDetails();
  };

  return (
    <div className="comp-elementblock" onClick={() => showDetails()}>
      <RingScore score={latestscore} short={short} />
      <p>{name}</p>
      <Percentage score={latestscore} />
      <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="20px" viewBox="-3 -3 53 83">
    <polyline fill="none" stroke="#dddddd" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" points="
	0.375,0.375 45.63,38.087 0.375,75.8 "/>
  </svg>
    </div>
  );
}
