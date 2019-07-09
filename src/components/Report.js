import React, { useContext } from "react";
import Header from "./Header";
import ElementBlock from "./ElementBlock";
import { AppContext } from "../context/AppContext";

export default function Report() {
  const { markersData, benefitsData, configData } = useContext(AppContext);
  return (
    <div className="comp-report">
      <Header />
      {markersData &&
        markersData.map(marker => {
          return <ElementBlock key={marker.id} marker={marker} configData={configData} />;
        })}
    </div>
  );
}
