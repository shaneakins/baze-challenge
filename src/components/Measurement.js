import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import RingScore from "./RingScore";

export default function Measurement() {
  const { configData, currentMarker } = useContext(AppContext);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format date to D-MMM-YYYY
  const formatDate = str => {
    var date = new Date(str);
    return [date.getDate() + "-" + months[date.getMonth()], date.getFullYear()];
  };

  // Sort function
//   const compareValues = (key, order = "asc") => {
//     return function(a, b) {
//       if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
//         // property doesn't exist on either object
//         return 0;
//       }
//       const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
//       const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

//       let comparison = 0;
//       if (varA > varB) {
//         comparison = 1;
//       } else if (varA < varB) {
//         comparison = -1;
//       }
//       return order === "desc" ? comparison * -1 : comparison;
//     };
//   };

  return (
    <div className="comp-measurements">
      <h2>Recent Scores</h2>
      <div className="measurements-block">
        {currentMarker.measurements &&
          currentMarker.measurements.map(measurement => {
            return (
              <div className="measurements-item" key={measurement.referenceId}>
                <RingScore score={measurement.score} short={measurement.short} configData={configData} reset />
                <p className="measurements-score">
                  {Math.floor(measurement.score)}
                  <span> / 100</span>
                </p>
                <p className="measurements-date">
                  {formatDate(measurement.date)[0]}
                  <span>{formatDate(measurement.date)[1]}</span>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
