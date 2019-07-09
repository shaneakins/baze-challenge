import React, { useState, useEffect, useContext } from "react";
import RingScore from "./RingScore";
import Percentage from "./Percentage";
import { AppContext } from "../context/AppContext";

export default function ElementBlock({ marker }) {
  const { isLoading, configData, detailsActive, toggleDetails, setMarkerDetails } = useContext(AppContext);
  const { id, name, short, type, info, textColor, backgroundColor, measurements } = marker;

  const [latestMarker, setLatestMarker] = useState({date:"0"});
  const [latestScore, setLatestScore] = useState(0);


  // Update state with most recent marker and its score
  useEffect(() => {
      const getLatestMarker = () => {
        let latest = measurements.sort(function(a, b) {
          let dateA = new Date(a.date),
              dateB = new Date(b.date);
          return dateB - dateA;
        });
        setLatestMarker(latest[0]);
        setLatestScore(latestMarker.score);
      };
      getLatestMarker();

  }, [latestMarker]);

  // const getLatestDate = () => {
  //   let a = measurements.sort(function(a, b) {
  //     let dateA = new Date(a.date), dateB = new Date(b.date);
  //     return dateB - dateA;
  //   });
  //   console.log(a);
  // };

  // getLatestDate();

  // const computeScore = () => {
  //   const score = latestMarker.score ? latestMarker.score : 0;
  //   return  Math.max.apply(null, measurements.map(function(obj) { return obj.score; })) || 0;
  // };

  // Refresh details pane with updated infp
  const showDetails = () => {
    setMarkerDetails(marker);
    toggleDetails();
  };

  return (
    <div className="comp-elementblock" onClick={() => showDetails()}>
      <RingScore score={latestScore} short={short} />
      <p>{name}</p>
      <Percentage score={latestScore} />
    </div>
  );
}
