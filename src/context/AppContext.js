import React, { useState, useEffect } from "react";
import axios from 'axios'

// import useAxios from 'axios-hooks'

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = (props) => {

  // const [{ data, loading, error }, refetch] = useAxios(
  //   'report.json'
  // )

  // const [state, setState] = useState({
  //   reportData:[],
  // });

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
        setMarkersData(repdata.data.markers);
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

  const toggleDetails = () => {
    setDetailsActive(!detailsActive)
  }

  const setMarkerDetails = (obj) => {
    setCurrentMarker(obj)
  }

  // useEffect( async ()=> {
  //   const res = await fetch("./report.json")
  //   let data = res.res.json()
  //   setState(state =>({...state, reportData: data}))
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <AppContext.Provider value={{isLoading, markersData, benefitsData, configData, detailsActive, toggleDetails, currentMarker, setMarkerDetails}}>
      {props.children}
    </AppContext.Provider>
  )
}

export {AppContext, AppProvider}