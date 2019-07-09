import React from 'react'

export default function Percentage({score}) {

    const adjScore = (score === undefined) ? 0 : Math.round(score); 
    return (
        <div className="comp-percentage">
            <p>{`${adjScore} / 100`}</p>
        </div>
    )
}
