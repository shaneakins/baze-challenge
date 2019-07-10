import React, { useContext } from "react";
import "./App.css";
import Report from "./components/Report";
import Details from "./components/Details";
import { AppContext } from "./context/AppContext";

function App() {
  const { detailsActive } = useContext(AppContext);

  return (
    <div className="App" >
      <div className={`app-slider ${detailsActive ? "details-active" : null}`}>
        <Report />
        <Details />
      </div>
    </div>
  );
}

export default App;
