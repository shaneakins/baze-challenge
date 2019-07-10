import React, { useEffect, useContext } from "react";
import Header from "./Header";
import ElementBlock from "./ElementBlock";
import { AppContext } from "../context/AppContext";

export default function Report() {
  const { markersData, benefitsData, configData, getRange } = useContext(AppContext);
  console.log(getRange("optimal"));
  return (
    <div className="comp-report">
      <Header />
      <div className="report-block">
          <h3 style={{color: getRange() ? getRange("optimal").color : "#000", padding:"0 20px"}}>Optimal</h3>
          {markersData &&
                markersData.map(marker => {
                    if (marker.latestscore >= 80) {
                        return <ElementBlock key={marker.id} marker={marker} configData={configData} />;
                    }
                })
            }
      </div>
    <div className="report-block">
    <h3 style={{color: getRange() ? getRange("normal").color : "#000", padding:"0 20px"}}>Normal</h3>
    	{markersData &&
    	        markersData.map(marker => {
    	            if (marker.latestscore >= 40 && marker.latestscore < 80) {
    	                return <ElementBlock key={marker.id} marker={marker} configData={configData} />;
    	            }
    	        })
    	    }
    </div>
    <div className="report-block">
        <h3 style={{color: getRange() ? getRange("off track").color : "#000", padding:"0 20px"}}>Off-track</h3>
        {markersData &&
                markersData.map(marker => {
                    if (marker.latestscore < 40) {
                        return <ElementBlock key={marker.id} marker={marker} configData={configData} />;
                    }
                })
            }
    </div>
    </div>
  );
}
