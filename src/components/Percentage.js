import React from 'react'

export default function Percentage({score}) {

    // const adjScore = (score === undefined) ? "--" : Math.round(score); 
    const adjScore = Math.floor(score); 
    return (
        <div className="comp-percentage">
            <p className="percentage-score">{adjScore}<span> / 100</span></p>
        </div>
    )
}
