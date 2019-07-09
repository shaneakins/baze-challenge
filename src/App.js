import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";
import Report from "./components/Report";
import Details from "./components/Details";
import { AppContext } from "./context/AppContext";

function App() {
  const { markersData, benefitsData, configData, detailsActive } = useContext(AppContext);

  return (
    <div className="App" >
      <div className={`app-slider ${detailsActive ? "details-active" : null}`}>
        {/* <pre>{JSON.stringify(markersData, null, 2)}</pre> */}
        <Report />
        <Details />
      </div>
    </div>
  );
}

export default App;
