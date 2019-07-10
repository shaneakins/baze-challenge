import React, { useContext } from "react";
import RingScore from "./RingScore";
import Percentage from "./Percentage";
import { AppContext } from "../context/AppContext";

export default function ElementBlock({ marker }) {
  const { toggleDetails, setMarkerDetails } = useContext(AppContext);
  const { name, short, latestscore = 0 } = marker;

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
