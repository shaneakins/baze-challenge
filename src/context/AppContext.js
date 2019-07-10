import React, { useState, useEffect } from "react";
import axios from 'axios'

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = (props) => {
  const [markersData, setMarkersData] = useState(null);
  const [benefitsData, setBenefitsData] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [detailsActive, setDetailsActive] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // load external data
  useEffect(() => {
    try {
      const fetchData = async () => {
        const condata = await axios(
          'config.json'
        );
        const repdata = await axios(
          'report.json'
        );
        setIsLoading(false)  
        setIsError(false) 
        setMarkersData(cleanMarkerData(repdata.data.markers));
        setBenefitsData(repdata.data.healthBenefits);
        setConfigData(condata.data);
      };
      fetchData();
    }
    catch(err) {
      setIsLoading(false)  
      setIsError(true) 
      console.log("Error: " + err); 
    }

  }, []);

  // Show/hide details pane
  const toggleDetails = () => {
    setDetailsActive(!detailsActive)
  }

  // Get reference to current marker
  const setMarkerDetails = (obj) => {
    setCurrentMarker(obj)
  }

  // Detemine which range value falls in
  const getRange= (value) => {
    if (configData) {
      if (typeof value === "number") {
        return configData.filter(data => value >= data.from && value < data.to)[0];
      }
      if (typeof value === "string") {
        // console.log(configData.filter(data => value.toLowerCase() === data.assessment.toLowerCase()));
        return configData.filter(data => value.toLowerCase() === data.assessment.toLowerCase())[0];
      }
      return {color:"#000000"}
    }
  }

  // Normalize marker data
  const cleanMarkerData = (newdata) => {
    if (newdata) {
      const presorted = newdata.map((marker) => {
          // Filter out measurements without a status of ok
          let  measurements = marker.measurements.filter(measurement => measurement.status === "ok")

          // Sort measurements by date
          let ordered = measurements.sort(function(a, b) {
            let dateA = new Date(a.date),
                dateB = new Date(b.date);
            return dateB - dateA;
          });
          marker.measurements = ordered;

          // Add latest score property
          marker.latestscore = marker.measurements[0].score;

          // Find highest score in measurements
          // marker.highest = Math.max.apply(null, marker.measurements.map(function(obj) { return obj.score; }))

          return marker;
          });

      // Sort elements by latest score
      let sorted = presorted.sort(function(a, b) {
        let latestA = a.latestscore,
            latestB = b.latestscore;
        return latestB - latestA;
      });

      return sorted
    }
  }

  return (
    <AppContext.Provider value={{isLoading, markersData, benefitsData, configData, detailsActive, toggleDetails, currentMarker, setMarkerDetails, getRange}}>
      {props.children}
    </AppContext.Provider>
  )
}

export {AppContext, AppProvider}