import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import RingScore from "./RingScore";

export default function Measurement() {
  const { isLoading, configData, detailsActive, toggleDetails, currentMarker } = useContext(AppContext);
  const [sortedMeasurements, setSortedMeasurments] = useState(null);

  const { date, status, referenceId, score, measured } = currentMarker.measurements;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const filteredMeasurements = currentMarker.measurements.filter(item => item.status === "ok")
    setSortedMeasurments(filteredMeasurements.sort(compareValues("date", "desc")));
    console.log(sortedMeasurements)
  }, [currentMarker]);

  //   const computePercent = () => {
  //     return  Math.max.apply(Math, measurements.map(function(obj) { return obj.score; })) || 0;
  //   };



  const formatDate = str => {
    var date = new Date(str);
    return [date.getDate() + "-" + months[date.getMonth()], date.getFullYear()];
  };

  const compareValues = (key, order = "asc") => {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  return (
    <div className="comp-measurements">
      <h2>Historical Measurements</h2>
      <div className="measurements-block">
        {sortedMeasurements &&
          sortedMeasurements.map(measurement => {
            return (
              <div className="measurements-item" key={measurement.referenceId}>
                <RingScore score={measurement.score} short={measurement.short} configData={configData} reset/>
                <p>{Math.round(measurement.score) + "/100"}</p>
                <p>
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
