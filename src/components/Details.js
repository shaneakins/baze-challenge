import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from "../context/AppContext";
import Measurement from "./Measurement";
import Tile from './Tile';


export default function Details() {
    const { configData, detailsActive, toggleDetails, currentMarker} = useContext(AppContext);
    const [ killDetails, setKillDetails] = useState(false);
    // const { name, short, type, info, textColor, backgroundColor, measurements, images } = currentMarker || null;
    

    useEffect(() => {
        if (currentMarker && !detailsActive) {
            const timer = setTimeout(() => {
                setKillDetails(true);
                clearTimeout(timer);
              }, 500);
        } else {
            setKillDetails(false);
        }
    }, [detailsActive])
    
    return (
        <div className="comp-details">
            <button type="button" onClick={() => toggleDetails()}>BACK</button>
            { (currentMarker && !killDetails) &&
            <>            
                <h1 style={{display:"flex",alignItems:"center"}}>{currentMarker.name}<Tile image={currentMarker.images}/></h1>
                
                <Measurement/>
                <div dangerouslySetInnerHTML={{__html: currentMarker.info }}></div>
            </> 
            }
        </div>
    )
}


